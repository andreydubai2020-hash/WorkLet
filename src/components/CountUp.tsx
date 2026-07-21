import { useEffect, useRef } from "react";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  separator = " ",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const getDecimalPlaces = (num: number) => {
      const str = num.toString();
      if (str.includes(".")) {
        const decimals = str.split(".")[1];
        if (parseInt(decimals) !== 0) return decimals.length;
      }
      return 0;
    };
    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    const formatValue = (latest: number) => {
      const hasDecimals = maxDecimals > 0;
      const formatted = new Intl.NumberFormat("en-US", {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      }).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    };

    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const t = Math.min(Math.max(elapsed / Math.max(duration, 0.01), 0), 1);
      const value = from + (to - from) * easeOutExpo(t);
      if (ref.current) ref.current.textContent = formatValue(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [to, from, duration, separator]);

  return <span className={className} ref={ref} />;
}
