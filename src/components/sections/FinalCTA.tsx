"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section id="book" className="relative py-40 px-6 bg-gradient-to-br from-bg-secondary to-bg-primary overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-sans font-medium text-white leading-[1.2] mb-6"
        >
          Ready to Automate Your Growth?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-text-light mb-12"
        >
          Book a free consultation and discover how AI can transform your workflow
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-gradient-to-br from-accent-blue to-accent-bright text-white px-12 py-5 rounded-[14px] font-semibold text-lg shadow-[0_8px_32px_rgba(109,182,255,0.4)] transition-all"
          >
            Book A Free Call
          </motion.button>
          <p className="text-sm text-text-muted mt-4">No commitment. Just insights.</p>
        </motion.div>
      </div>
    </section>
  );
}
