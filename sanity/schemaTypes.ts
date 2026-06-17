import {defineField, defineType} from "sanity";

const category = defineType({
  name: "category", title: "Categories", type: "document",
  fields: [
    defineField({name: "title", type: "string", validation: r => r.required()}),
    defineField({name: "slug", type: "slug", options: {source: "title"}, validation: r => r.required()}),
    defineField({name: "order", type: "number", initialValue: 0}),
  ],
});

const app = defineType({
  name: "app", title: "Apps", type: "document",
  fields: [
    defineField({name: "name", type: "string", validation: r => r.required()}),
    defineField({name: "slug", type: "slug", options: {source: "name"}, validation: r => r.required()}),
    defineField({
      name: "icon",
      title: "App Icon",
      type: "image",
      options: {hotspot: true},
      validation: r =>
        r.custom((value, context) =>
          value || context.document?.iconUrl ? true : "Upload an app icon or provide an external icon URL",
        ),
    }),
    defineField({
      name: "iconUrl",
      title: "External Icon URL",
      type: "url",
      description: "Used by seeded sample data. Prefer uploading an App Icon for real apps.",
    }),
    defineField({name: "offer", type: "string", validation: r => r.required()}),
    defineField({name: "affiliateUrl", type: "url", validation: r => r.required()}),
    defineField({name: "category", type: "reference", to: [{type: "category"}], validation: r => r.required()}),
    defineField({name: "order", type: "number", initialValue: 0}),
    defineField({name: "active", type: "boolean", initialValue: true}),
  ],
});

const siteSettings = defineType({
  name: "siteSettings", title: "Site Settings", type: "document",
  fields: [
    defineField({name: "siteName", type: "string"}),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({
      name: "logoUrl",
      title: "External Logo URL",
      type: "url",
      description: "Used by seeded sample data. Prefer uploading a Site Logo for production.",
    }),
    defineField({name: "telegramUrl", type: "url"}),
    defineField({name: "heroTitle", type: "string"}),
    defineField({name: "heroText", type: "text"}),
    defineField({name: "collectionTitle", type: "string"}),
    defineField({name: "seoTitle", type: "string"}),
    defineField({name: "seoDescription", type: "text"}),
  ],
});

const clickEvent = defineType({
  name: "clickEvent", title: "Click Events", type: "document",
  fields: [
    defineField({name: "app", type: "reference", to: [{type: "app"}]}),
    defineField({name: "clickedAt", type: "datetime"}),
  ],
});

export const schemaTypes = [category, app, siteSettings, clickEvent];
