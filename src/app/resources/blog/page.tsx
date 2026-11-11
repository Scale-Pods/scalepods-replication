import type { Metadata } from "next";
import React from "react";
import { getAllResources } from "@/lib/resources";
import ResourcesClient from "../ResourcesClient";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog & Articles | AI Automation & Workflows | ScalePods",
  description:
    "Latest articles, architecture guides, and practical playbooks from ScalePods on AI automation, digital workforces, and enterprise workflows.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/blog",
  },
  openGraph: {
    title: "Blog & Articles | AI Automation & Workflows | ScalePods",
    description:
      "Latest articles, architecture guides, and practical playbooks from ScalePods on AI automation, digital workforces, and enterprise workflows.",
    url: "https://www.scalepods.co/resources/blog",
    siteName: "ScalePods",
    type: "website",
  },
};

export default async function ResourcesBlogPage() {
  const allItems = await getAllResources();
  return <ResourcesClient items={allItems} activeFormat="blog" />;
}

