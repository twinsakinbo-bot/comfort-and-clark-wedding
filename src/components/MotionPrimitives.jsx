import { m, useScroll, useSpring } from 'framer-motion';
import { APPLE_EASE } from '../constants/motion';

export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      className="fixed top-[72px] left-0 right-0 h-[2px] bg-gradient-to-r from-brand-sky via-brand-gold-light to-brand-gold origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}

export function ScrollReveal({ children, className = '', delay = 0, y = 24 }) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: APPLE_EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerGroup({ children, className = '', stagger = 0.08 }) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: APPLE_EASE },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
