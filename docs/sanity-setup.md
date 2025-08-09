# Sanity CMS Setup for Locksmith Starter

This starter can read real content from Sanity (with siteConfig-based fallbacks). Copy the schemas below into your Sanity Studio (v3) and deploy.

## 1) Create a Sanity project
- One project/dataset per site (as you requested). Use dataset: `production`.
- Add these keys to the app (via Setup page or by editing `siteConfig.integrations.sanity`):
  - projectId
  - dataset
  - apiVersion (e.g. 2023-01-01)
  - useCdn: true

## 2) Schemas
Create files under `schemas/` in your Sanity Studio. Then import them into `schema.ts` and export createSchema.

```ts
// schemas/siteSettings.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "businessName", title: "Business Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "defaultDescription", title: "Default Description", type: "text" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "line1", title: "Line 1", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "postalCode", title: "Postal Code", type: "string" },
      ],
    }),
  ],
});
```

```ts
// schemas/homepage.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroTagline", title: "Hero Tagline", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
  ],
});
```

```ts
// schemas/service.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text" }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
});
```

```ts
// schemas/faq.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text" }),
  ],
});
```

```ts
// schema.ts (example aggregator)
import { type SchemaTypeDefinition } from "sanity";
import siteSettings from "./schemas/siteSettings";
import homepage from "./schemas/homepage";
import service from "./schemas/service";
import faq from "./schemas/faq";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homepage, service, faq],
};
```

## 3) Mapping in the app
- Homepage hero reads `homepage` (first doc).
- Services grid reads all `service` docs.
- FAQ reads all `faq` docs.
- Company info reads `siteSettings` (first doc).
- If Sanity is not configured or a query returns empty, the UI falls back to the Setup data (`siteConfig`).

## 4) Vercel/GitHub
- Commit and push. Add the Sanity keys via the in-app Setup page or directly in `siteConfig` overrides.
- Each new client/site: clone repo, create a new Sanity project, paste keys, publish content.

That’s it! The starter is now CMS-first with safe fallbacks.
