import React from "react";
import { getAllResources } from "@/lib/resources";
import ResourcesClient from "./ResourcesClient";

export const revalidate = 0;

export default async function ResourcesPage() {
  const allItems = await getAllResources();
  return <ResourcesClient items={allItems} activeFormat="all" />;
}
