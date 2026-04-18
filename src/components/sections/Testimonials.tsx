"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const testimonials = [
  {
    quote: "ScalePods transformed our operations. What used to take our team 40 hours weekly now runs automatically. The ROI was immediate.",
    name: "Sarah Chen",
    title: "Head of Operations at TechFlow",
    avatar: "SC"
  },
  {
    quote: "Working with them was seamless. They built a custom AI triage system that reduced our customer response time from 12 hours to 5 minutes.",
    name: "Michael Rodriguez",
    title: "Support Director at Nexus",
    avatar: "MR"
  },
  {
    quote: "The workflow automation solutions they provided allowed us to scale our agency onboarding by 300% without adding new hires.",
    name: "Emma Davis",
    title: "Founder at GrowthGen",
    avatar: "ED"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-bg-secondary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue text-xs uppercase font-bold tracking-[0.2em] mb-4 block"
          >
            Client Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans font-medium text-white"
          >
            Trusted by Forward-Thinking Teams
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -4, borderColor: "rgba(109,182,255,0.15)" }}
              className="bg-bg-tertiary border border-border-subtle rounded-3xl p-10 md:p-12 flex flex-col justify-between min-h-[300px] transition-all duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-xl text-white leading-[1.7] mb-8 font-sans font-light">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex flex-col gap-6 w-full">
                <div className="w-full h-px bg-border-subtle" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-text-light">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
