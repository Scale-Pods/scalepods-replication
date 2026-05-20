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
}

export async function submitLead(data: LeadPayload) {
  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("NEXT_PUBLIC_N8N_WEBHOOK_URL is not defined.");
      // Fallback behavior if webhook is missing could be implemented here
    } else {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Webhook failed: ${response.statusText}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("[Lead Service] Submission failed:", error);
    return { success: false, error: "Submission failed. Please try again." };
  }
}
