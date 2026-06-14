import {defineArrayMember, defineField, defineType} from "sanity";

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
    defineField({name: "iconUrl", title: "Cloudinary Image URL", type: "url", validation: r => r.required()}),
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
    defineField({name: "logoUrl", title: "Cloudinary Logo URL", type: "url"}),
    defineField({name: "telegramUrl", type: "url"}),
    defineField({name: "heroTitle", type: "string"}),
    defineField({name: "heroText", type: "text"}),
    defineField({name: "collectionTitle", type: "string"}),
    defineField({name: "seoTitle", type: "string"}),
    defineField({name: "seoDescription", type: "text"}),
  ],
});

const page = defineType({
  name: "page", title: "Pages", type: "document",
  fields: [
    defineField({name: "title", type: "string"}),
    defineField({name: "slug", type: "slug", options: {source: "title"}}),
    defineField({name: "body", type: "array", of: [defineArrayMember({type: "block"})]}),
  ],
});

const clickEvent = defineType({
  name: "clickEvent", title: "Click Events", type: "document",
  fields: [
    defineField({name: "app", type: "reference", to: [{type: "app"}]}),
    defineField({name: "clickedAt", type: "datetime"}),
  ],
});

export const schemaTypes = [category, app, siteSettings, page, clickEvent];
