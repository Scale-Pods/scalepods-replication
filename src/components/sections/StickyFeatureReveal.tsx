"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, Download } from "lucide-react";
import { HRDashboardMockup, SalesDashboardMockup, OpsDashboardMockup } from "./DashboardMockups";
import { cn } from "@/lib/utils";

const F = {
    inter: "Inter, sans-serif",
    serif: "'Instrument Serif', serif",
};

const C = {
    green: "var(--color-green)",
    blue: "var(--color-blue-mid)",
    txtBright: "var(--color-text-bright)",
    txtBody: "var(--color-text-body)",
    bgCard: "var(--color-bg-card)",
    border: "var(--color-border)",
};

interface Feature {
    title: string;
    description: string;
    mockup: React.ReactNode;
}

const hrFeatures: Feature[] = [
    {
        title: "Automated Screening & Shortlisting",
        description: "AI screens applications, filters top candidates, and builds a qualified shortlist instantly.",
        mockup: <HRDashboardMockup />,
    },
    {
        title: "Instant Scheduling & Follow-Ups",
        description: "Automated WhatsApp/Voice agents schedule interviews, send reminders, and handle coordination.",
        mockup: <SalesDashboardMockup />, // Using different mockups for variety in prototype
    },
    {
        title: "Streamlined Onboarding Workflow",
        description: "Digital documents, task checklists, and approvals handled through fully automated workflows.",
        mockup: <OpsDashboardMockup />,
    },
];

export const StickyFeatureReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // We map scroll progress (0 to 1) to feature indices (0, 1, 2)
    // We use steps: 0-0.33, 0.33-0.66, 0.66-1.0
    const activeIndex = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0, 0, 1, 2]);

    return (
        <section ref={containerRef} data-framer-scroll-target className="relative" style={{ height: "300vh", position: "relative" }}>
            <div className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden">
                <div className="max-w-[1400px] mx-auto w-full px-8">
                    
                    {/* Centered Pod Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 style={{
                            fontFamily: F.serif,
                            fontStyle: "italic",
                            fontSize: "clamp(32px, 4vw, 56px)",
                            fontWeight: 400,
                            color: C.green,
                            lineHeight: 1.1,
                            marginBottom: "12px",
                        }}>
                            HR Workflow Automation Pod
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ACD791] to-transparent mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        
                        {/* Left Side: All Features Stacked */}
                        <div className="flex flex-col gap-12 py-12">
                            {hrFeatures.map((feature, index) => (
                                <FeatureItem 
                                    key={index}
                                    feature={feature}
                                    index={index}
                                    activeIndex={activeIndex}
                                />
                            ))}

                            {/* Centered CTA Button inside the left column flow */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-8"
                            >
                                <button
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        fontFamily: F.inter,
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        color: "#000",
                                        background: "#ACD791",
                                        border: "none",

                                        borderRadius: "12px",
                                        padding: "14px 32px",
                                        cursor: "pointer",
                                        backdropFilter: "blur(8px)",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                                    }}
                                >
                                    <Download size={18} className="text-black" />

                                    <span>Download the Free Feature Guide</span>
                                </button>
                            </motion.div>
                        </div>

                        {/* Right Side: Sticky Mockup Visual */}
                        <div className="sticky top-1/4 h-fit">
                            <div className="relative aspect-[16/10] w-full max-w-[750px] mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl blur-[120px] -z-10" />
                                
                                <div className="relative w-full h-full rounded-2xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-page)] shadow-2xl">
                                    {hrFeatures.map((feature, index) => (
                                        <MockupWrapper 
                                            key={index}
                                            index={index}
                                            activeIndex={activeIndex}
                                        >
                                            {feature.mockup}
                                        </MockupWrapper>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureItem = ({ feature, index, activeIndex }: { feature: Feature, index: number, activeIndex: any }) => {
    // We calculate opacity based on proximity to activeIndex
    // This creates a focus effect where the current one is bright and others are faded
    const opacity = useTransform(
        activeIndex,
        [index - 0.5, index, index + 0.5],
        [0.3, 1, 0.3]
    );
    
    const x = useTransform(
        activeIndex,
        [index - 0.5, index, index + 0.5],
        [0, 15, 0]
    );

    return (
        <motion.div
            style={{ 
                opacity, 
                x,
            }}
            className="relative"
        >
            <div className="flex gap-5 items-start mb-4">
                <div className="mt-1.5 w-7 h-7 rounded-full bg-[#ACD791]/10 flex items-center justify-center shrink-0 border border-[#ACD791]/20">
                    <ChevronRight className="text-[#ACD791]" size={16} />
                </div>
                <div>
                    <h3 style={{
                        fontFamily: F.inter,
                        fontSize: "clamp(20px, 2.2vw, 26px)",
                        fontWeight: 700,
                        color: C.txtBright,
                        lineHeight: 1.2,
                        marginBottom: "12px",
                    }}>
                        {feature.title}
                    </h3>
                    <p style={{
                        fontFamily: F.inter,
                        fontSize: "16px",
                        color: C.txtBody,
                        lineHeight: 1.6,
                        maxWidth: "520px",
                    }}>
                        {feature.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const MockupWrapper = ({ children, index, activeIndex }: { children: React.ReactNode, index: number, activeIndex: any }) => {
    // Show only the mockup corresponding to the index
    const opacity = useTransform(
        activeIndex,
        [index - 0.5, index, index + 0.5],
        [0, 1, 0]
    );

    return (
        <motion.div
            style={{ 
                opacity,
                position: "absolute",
                inset: 0,
            }}
        >
            {children}
        </motion.div>
    );
};
