export type WorkflowType = 
  | "marketing_workflow"
  | "sales_workflow"
  | "hr_workflow"
  | "operations_workflow"
  | "customer_support_workflow"
  | null;

export interface LeadPayload {
  formType: "contact_sales" | "global_inquiry" | "guide_download";
  workflowType?: WorkflowType;
  sourcePage: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  metadata?: Record<string, any>;
  website?: string;
}

export async function submitLead(data: LeadPayload) {
  // Silent Honeypot Reject
  if (data.website && data.website.trim() !== "") {
    console.warn("[Spam Protection] Honeypot field filled. Silently rejecting request.");
    return { success: true };
  }

  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("NEXT_PUBLIC_N8N_WEBHOOK_URL is not defined.");
    } else {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || `Webhook failed: ${response.statusText}`);
      }
    }

    // Sync lead to HubSpot via n8n
    const hubspotWebhook = process.env.NEXT_PUBLIC_N8N_HUBSPOT_WEBHOOK_URL;
    if (hubspotWebhook) {
      fetch(hubspotWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    return { success: true };
  } catch (error: any) {
    console.error("[Lead Service] Submission failed:", error);
    return { success: false, error: error.message || "Submission failed. Please try again." };
  }
}
