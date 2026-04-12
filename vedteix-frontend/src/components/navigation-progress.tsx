"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 320);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key={pathname}
          className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-0.5 bg-gradient-to-r from-primary via-primary/70 to-primary"
          initial={{ scaleX: 0, opacity: 0.9, transformOrigin: "0% 50%" }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      ) : null}
    </AnimatePresence>
  );
}
