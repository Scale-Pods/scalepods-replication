"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate, useTransform } from "framer-motion";
import Image from "next/image";

interface ImageRingProps {
  images: string[];
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
}

export const ImageRing: React.FC<ImageRingProps> = ({
  images,
  radius = 340,
  itemWidth = 280,
  itemHeight = 170,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const rotateY = useMotionValue(0);
  
  // Highly responsive spring settings
  const springRotateY = useSpring(rotateY, {
    stiffness: 150,
    damping: 30,
    mass: 0.2, 
  });

  const lastX = useRef(0);
  const velocity = useRef(0);
  const autoRotateRef = useRef<number | null>(null);

  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = window.setInterval(() => {
      if (!isDragging) {
        rotateY.set(rotateY.get() + 0.25); 
      }
    }, 16);
  };

  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, [isDragging]);

  const onDragStart = (e: any) => {
    setIsDragging(true);
    stopAutoRotate();
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    lastX.current = x;
    velocity.current = 0;
  };

  const onDrag = (e: any) => {
    if (!isDragging) return;
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const deltaX = x - lastX.current;
    
    // Increased sensitivity for lighter feel
    const sensitivity = 1.5;
    velocity.current = deltaX * sensitivity;
    rotateY.set(rotateY.get() + deltaX * sensitivity);
    lastX.current = x;
  };

  const onDragEnd = () => {
    setIsDragging(false);
    // Balanced inertia
    const currentRotateY = rotateY.get();
    animate(rotateY, currentRotateY + velocity.current * 24, {
      type: "spring",
      stiffness: 35,
      damping: 20,
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "380px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      onMouseDown={onDragStart}
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDrag}
      onTouchEnd={onDragEnd}
    >
      <motion.div
        style={{
          position: "relative",
          width: "0px",
          height: "0px",
          transformStyle: "preserve-3d",
          rotateY: springRotateY,
        }}
      >
        {images.map((src, index) => {
          const angle = (index / images.length) * 360;
          
          return (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                left: `-${itemWidth / 2}px`,
                top: `-${itemHeight / 2}px`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 10 }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(141, 199, 99, 0.2)",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.7), 0 0 40px rgba(141, 199, 99, 0.05)",
                  position: "relative",
                  background: "rgba(8, 10, 14, 0.95)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                }}
              >
                <Image
                  src={src}
                  alt={`Workflow Dashboard ${index}`}
                  fill
                  style={{ objectFit: "cover" }}
                  draggable={false}
                  sizes="400px"
                  priority={index < 3}
                />
                {/* Visual Depth Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Centered Ambient Light */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "120%",
          background: "radial-gradient(circle, rgba(141, 199, 99, 0.02) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
};
