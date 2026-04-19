"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main style={{ background: "#04070D", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <section style={{ paddingTop: "120px", paddingBottom: "100px", px: "32px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 style={{ fontSize: "40px", fontWeight: 700, color: "#E4E9F2", marginBottom: "16px" }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "48px" }}>
              Last updated on 23 Jan 2025
            </p>

            <p style={{ fontSize: "15px", color: "#B8C7D9", lineHeight: 1.7, marginBottom: "40px" }}>
              Welcome to ScalePods ("we" or "us"). This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you use our website and related services.
            </p>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "40px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "32px", color: "#B8C7D9", fontSize: "15px", lineHeight: 1.7 }}>
              
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>1. Information We Collect</h2>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#E4E9F2", marginBottom: "8px", marginTop: "16px" }}>1.1 Personal Information</h3>
                <p>We may collect personal information, such as your name, email address, and other contact details when you voluntarily provide it to us, such as when you register for an account, subscribe to newsletters, or contact us through the website.</p>
                
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#E4E9F2", marginBottom: "8px", marginTop: "16px" }}>1.2 Usage Information</h3>
                <p>We may collect information about your use of the website, including your IP address, browser type, device information, and pages visited. This information helps us analyze trends, administer the site, and improve user experience.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>2. How We Use Your Information</h2>
                <p style={{ marginBottom: "12px" }}>We use the collected information for various purposes, including:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li>Providing and maintaining the website</li>
                  <li>Communicating with you about your account and our services</li>
                  <li>Sending newsletters, promotional materials, and other information you request</li>
                  <li>Analyzing website usage and improving our services</li>
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>3. Sharing Your Information</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share information with trusted third-party service providers who assist us in operating our website or conducting our business.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>4. Cookies and Similar Technologies</h2>
                <p>We use cookies and similar technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling them may affect your ability to use certain features of the site.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>5. Your Choices</h2>
                <p>You can manage your communication preferences by unsubscribing from newsletters or adjusting your account settings. You may also contact us to update or delete your personal information.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>6. Security</h2>
                <p>We take reasonable measures to protect the security of your personal information. However, no method of transmission over the internet or electronic storage is completely secure. Therefore, we cannot guarantee absolute security.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>7. Children's Privacy</h2>
                <p>Our website is not directed to individuals under the age of 18. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to remove such information.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>8. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of the website after such modifications will constitute your acknowledgment of the modified Privacy Policy.</p>
              </div>

              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#E4E9F2", marginBottom: "12px" }}>9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@scalepods.co" style={{ color: "#6DB6FF", textDecoration: "none" }}>info@scalepods.co</a></p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
