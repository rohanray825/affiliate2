import fallbackDataJson from "@/data/fallback-data.json";
import type {HomeData} from "./types";

export const fallbackData = fallbackDataJson satisfies HomeData;
export const {settings, categories, apps} = fallbackData;
