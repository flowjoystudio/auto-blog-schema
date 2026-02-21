(function () {
  "use strict";

  function toAbsoluteUrl(url) {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith("//")) return window.location.protocol + url;
    if (url.startsWith("/")) return window.location.origin + url;
    return null;
  }

  function generateBlogSchema() {
    if (document.querySelector("script[data-flowjoy='blog-schema']")) return;

    var list = document.querySelector("[fj-blog='list']");
    if (!list) return;

    var publisherName = list.getAttribute("fj-blog-publisher-name") || null;
    var publisherLogo = toAbsoluteUrl(list.getAttribute("fj-blog-publisher-logo")) || null;

    var items = list.querySelectorAll("[fj-blog='item']");
    if (!items || items.length === 0) return;

    var blogPosts = [];

    items.forEach(function (el) {
      var headline = el.getAttribute("fj-blog-headline");
      var image = toAbsoluteUrl(el.getAttribute("fj-blog-image"));
      var datePublished = el.getAttribute("fj-blog-date-published");
      var authorName = el.getAttribute("fj-blog-author-name");

      // Skip item if any required field is missing
      if (!headline || !image || !datePublished || !authorName) return;

      var post = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": headline,
        "image": image,
        "datePublished": datePublished,
        "author": {
          "@type": "Person",
          "name": authorName
        }
      };

      // Strongly recommended fields
      var dateModified = el.getAttribute("fj-blog-date-modified");
      if (dateModified) post.dateModified = dateModified;

      var description = el.getAttribute("fj-blog-description");
      if (description) post.description = description;

      var url = toAbsoluteUrl(el.getAttribute("fj-blog-url"));
      if (url) {
        post.url = url;
        post.mainEntityOfPage = {
          "@type": "WebPage",
          "@id": url
        };
      }

      if (publisherName || publisherLogo) {
        post.publisher = {
          "@type": "Organization"
        };
        if (publisherName) post.publisher.name = publisherName;
        if (publisherLogo) {
          post.publisher.logo = {
            "@type": "ImageObject",
            "url": publisherLogo
          };
        }
      }

      blogPosts.push(post);
    });

    if (blogPosts.length === 0) return;

    // Output as array if multiple posts, single object if one
    var output = blogPosts.length === 1 ? blogPosts[0] : blogPosts;

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-flowjoy", "blog-schema");
    script.textContent = JSON.stringify(output, null, 2);
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", generateBlogSchema);
  } else {
    generateBlogSchema();
  }

})();
