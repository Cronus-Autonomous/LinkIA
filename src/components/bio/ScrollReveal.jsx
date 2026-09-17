import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children and fades/slides them in when they enter the viewport.
 * Also triggers a one-shot gold border pulse (GoldBorderPulse) on reveal.
 */
export default function ScrollReveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal gold-pulse ${visible ? 'is-visible pulse-active' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}