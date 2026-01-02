"use client";

import { useEffect, useState, useRef } from "react";

export default function CursorGradient() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    checkTouchDevice();

    // Don't run on touch devices
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth animation loop with easing
    const animate = () => {
      const ease = 0.15;

      currentPosition.current.x +=
        (targetPosition.current.x - currentPosition.current.x) * ease;
      currentPosition.current.y +=
        (targetPosition.current.y - currentPosition.current.y) * ease;

      setPosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isTouchDevice, isVisible]);

  // Don't render on touch devices or when not visible
  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute transition-opacity duration-300"
        style={{
          left: position.x - 350,
          top: position.y - 350,
          width: 700,
          height: 700,
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(34, 211, 238, 0.08) 40%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
