"use client";

import { motion } from "framer-motion";
import { Settings, Cpu, Bot } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const features = [
  {
    icon: Settings,
    title: "Workflow Automation",
    description: "Connect your disjointed applications and automate repetitive daily tasks to save hours every week.",
  },
  {
    icon: Cpu,
    title: "Custom AI Solutions",
    description: "Proprietary AI systems built specifically for your unique business operations and data structures.",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description: "Intelligent internal and customer-facing agents that handle inquiries, triage, and support 24/7.",
  },
];

export default function Features() {
  return (
    <section id="services" className="bg-bg-primary py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue text-xs uppercase font-bold tracking-[0.2em] mb-4 block"
          >
            Our Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans font-medium text-white"
          >
            AI-Powered Solutions
          </motion.h2>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 12px 40px rgba(109,182,255,0.15)",
                borderColor: "rgba(109,182,255,0.3)" 
              }}
              className="bg-bg-secondary border border-border-subtle rounded-2xl p-8 md:p-10 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <feature.icon className="w-6 h-6 text-accent-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-text-light leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
