"use client";
import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {dataset, projectId} from "./lib/sanity";
import {schemaTypes} from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Affiliate App Admin",
  basePath: "/studio",
  projectId: projectId || "demo",
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes},
});
