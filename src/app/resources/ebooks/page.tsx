import type { Metadata } from "next";
import React from "react";
import { getAllResources } from "@/lib/resources";
import ResourcesClient from "../ResourcesClient";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Executive eBooks & AI Playbooks | ScalePods Resources",
  description:
    "Download free executive eBooks, AI workforce playbooks, maturity models, and 90-day implementation blueprints by ScalePods.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/ebooks",
  },
  openGraph: {
    title: "Executive eBooks & AI Playbooks | ScalePods Resources",
    description:
      "Download free executive eBooks, AI workforce playbooks, maturity models, and 90-day implementation blueprints by ScalePods.",
    url: "https://www.scalepods.co/resources/ebooks",
    siteName: "ScalePods",
    type: "website",
  },
};

export default async function ResourcesEbooksPage() {
  const allItems = await getAllResources();
  return <ResourcesClient items={allItems} activeFormat="ebook" />;
}
