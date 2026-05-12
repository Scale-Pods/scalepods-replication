// @ts-nocheck
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const DEFAULT_DATA = [
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/7640898/pexels-photo-7640898.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
];

interface Slider3DProps {
  images?: string[];
  duration?: number;
  cardWidth?: string;
  cardAspectRatio?: string;
  perspective?: string;
  containerClassName?: string;
  imageClassName?: string;
  rotationDirection?: "left" | "right";
  withMask?: boolean;
}

export default function ImageSlider3D({
  images = DEFAULT_DATA,
  duration = 48,
  cardWidth = "30rem",
  cardAspectRatio = "16/10",
  perspective = "40em",
  containerClassName = "",
  imageClassName = "",
  rotationDirection = "left",
  withMask = true,
}: Slider3DProps) {
  const n = images.length;
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;

  const rotationValues = rotationDirection === "left" ? [0, 360] : [360, 0];

  const maskStyles = withMask
    ? {
      WebkitMask:
        "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
      mask: "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
    }
    : {};

  return (
    <div
      className={`grid w-full h-[600px] overflow-hidden place-items-center ${containerClassName}`}
      style={{
        perspective: perspective,
        ...maskStyles,
      }}
    >
      <motion.div
        className="grid place-self-center pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: rotationValues,
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="col-start-1 row-start-1"
            style={{
              width: cardWidth,
              aspectRatio: cardAspectRatio,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 4em) / tan(0.5 * (1turn / ${n}))))`,
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(172, 215, 145, 0.08)",
            }}
          >
            <Image
              src={src}
              alt={`Slide ${i}`}
              fill
              className={`object-cover ${imageClassName}`}
              sizes="1000px"
              priority={i < 3}
            />
            {/* Rich Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
