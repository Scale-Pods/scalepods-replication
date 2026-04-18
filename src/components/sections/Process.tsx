"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Understand",
    description: "We dive deep into your business processes to identify automation opportunities.",
  },
  {
    number: "2",
    title: "Build",
    description: "Design and develop custom AI automation workflows tailored to your needs.",
  },
  {
    number: "3",
    title: "Scale",
    description: "Deploy, optimize, and expand your automation as your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden bg-bg-[radial-gradient(ellipse_at_center,_rgba(109,182,255,0.05)_0%,_transparent_70%)]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-24 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue text-xs uppercase font-bold tracking-[0.2em] mb-4 block"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans font-medium text-white"
          >
            Simple. Smart. Scalable.
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[30px] left-0 w-full h-[2px] bg-border-subtle">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-accent-blue to-accent-bright origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-accent-blue to-accent-bright flex items-center justify-center shadow-[0_0_30px_rgba(109,182,255,0.4)] mb-8">
                  <span className="text-3xl font-bold text-white tracking-tighter">{step.number}</span>
                </div>
                {/* Connecting Line (Mobile) */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden w-[2px] h-12 bg-gradient-to-b from-accent-blue to-transparent my-4" />
                )}
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-text-light max-w-[320px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
