# Auto Blog Schema

Automatically generates [BlogPosting schema markup](https://schema.org/BlogPosting) (`application/ld+json`) from CMS collection list items on a blog index or listing page. Built for Webflow but works on any HTML page.

> For individual blog post pages, use a static CMS-bound schema block in Webflow instead. This script is designed for listing pages where multiple posts are present.

---

## Installation

Add the following `<script>` tag to your page's `<head>` or before `</body>`. Replace `@1.0.0` with the latest release version.

```html
<script defer src="https://cdn.jsdelivr.net/gh/flowjoystudio/auto-blog-schema@1.0.0/auto-blog-schema.js"></script>
```

---

## How it works

The script looks for a wrapper element with `fj-blog="list"` and loops through all child elements with `fj-blog="item"`. For each item it reads the bound attributes, validates the required fields, and builds a `BlogPosting` schema object. All posts are injected into the `<head>` as a single `<script type="application/ld+json">` block.

Publisher name and logo are set once on the wrapper element so they don't need to be repeated on every collection item.

---

## Attributes

### Wrapper (set once)

| Attribute | Value | Required |
|---|---|---|
| `fj-blog` | `list` | Yes |
| `fj-blog-publisher-name` | Organisation name | Recommended |
| `fj-blog-publisher-logo` | Logo image URL | Recommended |

### Item (bound to CMS fields in Webflow)

| Attribute | Value | Required |
|---|---|---|
| `fj-blog` | `item` | Yes |
| `fj-blog-headline` | Post title | Yes |
| `fj-blog-image` | Featured image URL | Yes |
| `fj-blog-date-published` | Publication date | Yes |
| `fj-blog-author-name` | Author name | Yes |
| `fj-blog-date-modified` | Last updated date | Recommended |
| `fj-blog-description` | Post summary or excerpt | Recommended |
| `fj-blog-url` | Post URL or slug | Recommended |

Items missing any required field are silently skipped — they won't break the schema for other items.

---

## Webflow setup

1. Select your **Collection List Wrapper** and add:
   - `fj-blog` / `list`
   - `fj-blog-publisher-name` / your organisation name
   - `fj-blog-publisher-logo` / your logo URL

2. Select your **Collection Item** and add `fj-blog` / `item`

3. On the **Collection Item**, add each of the following custom attributes and bind them to the corresponding CMS field:

| Attribute | Bind to CMS field |
|---|---|
| `fj-blog-headline` | Post name / title |
| `fj-blog-image` | Featured / main image |
| `fj-blog-date-published` | Published on |
| `fj-blog-author-name` | Author name |
| `fj-blog-date-modified` | Updated on |
| `fj-blog-description` | Post summary / excerpt |
| `fj-blog-url` | Slug or full URL field |

---

## Example output

```json
[
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "How to build a field team that scales",
    "image": "https://www.example.com/images/field-team.jpg",
    "datePublished": "2026-01-15",
    "dateModified": "2026-02-01",
    "description": "A practical guide to scaling your field sales team without losing quality or consistency.",
    "url": "https://www.example.com/blog/how-to-build-a-field-team-that-scales",
    "author": {
      "@type": "Person",
      "name": "Jane Smith"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Apple",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.example.com/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.example.com/blog/how-to-build-a-team-that-scales"
    }
  }
]
```

---

## Known limitations

- Designed for blog listing/index pages — for individual post pages use a static CMS-bound schema block
- Items missing any required field (`fj-blog-headline`, `fj-blog-image`, `fj-blog-date-published`, `fj-blog-author-name`) are skipped
- Relative URLs are automatically converted to absolute using the current page origin
- Only the first `fj-blog="list"` element on the page is used

---

## License

MIT
