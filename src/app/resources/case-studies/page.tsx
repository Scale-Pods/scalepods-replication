import type { Metadata } from "next";
import React from "react";
import { getAllResources } from "@/lib/resources";
import ResourcesClient from "../ResourcesClient";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Enterprise Case Studies | AI Automation in Action | ScalePods",
  description:
    "Explore real-world case studies of enterprise AI workflows, recruitment automation, procurement reconciliation, and sales pipelines engineered by ScalePods.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/case-studies",
  },
  openGraph: {
    title: "Enterprise Case Studies | AI Automation in Action | ScalePods",
    description:
      "Explore real-world case studies of enterprise AI workflows, recruitment automation, procurement reconciliation, and sales pipelines engineered by ScalePods.",
    url: "https://www.scalepods.co/resources/case-studies",
    siteName: "ScalePods",
    type: "website",
  },
};

export default async function ResourcesCaseStudiesPage() {
  const allItems = await getAllResources();
  return <ResourcesClient items={allItems} activeFormat="case-study" />;
}

