"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";
import { cn } from "@/lib/utils"; 

const hexToRgbNormalized = (hex: string): [number, number, number] => {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return [0, 0, 0];
  }
  return [r / 255, g / 255, b / 255];
};

const cssVarToRgbNormalized = (varName: string): [number, number, number] => {
  if (typeof window === "undefined") return [0, 0, 0];
  const style = getComputedStyle(document.documentElement);
  const value = style.getPropertyValue(varName).trim();
  
  if (!value) return [0, 0, 0];
  
  // Handle RGB string like "172, 215, 145"
  if (value.includes(",")) {
    const parts = value.split(",").map(p => parseInt(p.trim(), 10) / 255);
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
  }
  
  // Handle hex
  if (value.startsWith("#")) {
    return hexToRgbNormalized(value);
  }
  
  return [0, 0, 0];
};

interface GlobeProps {
  className?: string;
  theta?: number;
  phi?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  autoRotateSpeed?: number;
  markers?: Array<{ location: [number, number]; size: number }>;
  width?: number;
  height?: number;
  opacity?: number;
  offset?: [number, number];
}

const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  phi = 0,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 16000,
  mapBrightness = 6,
  baseColor = "var(--color-bg-page)", 
  markerColor = "var(--color-green)", 
  glowColor = "var(--color-green)", 
  autoRotateSpeed = 0.0012,
  markers = [],
  width = 700,
  height = 700,
  opacity = 1,
  offset = [0, 0],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null); 

  const phiRef = useRef(phi);
  const thetaRef = useRef(theta); 
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBaseColor: [number, number, number] =
      typeof baseColor === "string"
        ? (baseColor.startsWith("var") ? cssVarToRgbNormalized(baseColor.slice(4, -1)) : hexToRgbNormalized(baseColor))
        : baseColor; 

    const resolvedMarkerColor: [number, number, number] =
      typeof markerColor === "string"
        ? (markerColor.startsWith("var") ? cssVarToRgbNormalized(markerColor.slice(4, -1)) : hexToRgbNormalized(markerColor))
        : markerColor; 

    const resolvedGlowColor: [number, number, number] =
      typeof glowColor === "string"
        ? (glowColor.startsWith("var") ? cssVarToRgbNormalized(glowColor.slice(4, -1)) : hexToRgbNormalized(glowColor))
        : glowColor; 

    const initGlobe = () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      const rect = canvas.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Use the provided width/height or fallback to rect
      const internalWidth = (width || rect.width) * devicePixelRatio;
      const internalHeight = (height || rect.height) * devicePixelRatio;

      canvas.width = internalWidth;
      canvas.height = internalHeight;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: devicePixelRatio,
        width: internalWidth,
        height: internalHeight,
        phi: phiRef.current,
        theta: thetaRef.current, 
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: resolvedBaseColor, 
        markerColor: resolvedMarkerColor, 
        glowColor: resolvedGlowColor, 
        opacity: opacity,
        offset: offset,
        markers: markers,
        onRender: (state: Record<string, any>) => {
          if (!isDragging.current) {
            phiRef.current += autoRotateSpeed;
          }
          state.phi = phiRef.current;
          state.theta = thetaRef.current; 
        },
      } as any);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing"; 
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;
        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab"; 
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    initGlobe();

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave); 

    const handleResize = () => {
      initGlobe();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor, 
    markerColor,
    glowColor,
    autoRotateSpeed,
    markers,
    width,
    height,
    opacity,
    offset
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center justify-center z-[10] mx-auto",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1", 
          display: "block", 
          cursor: "grab", 
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </motion.div>
  );
};

export default Globe;
