"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    // Initialize Clarity with the Project ID
    Clarity.init("wlfzu32jnz");
  }, []);

  return null;
}
