import { useEffect, useState } from "react";

export function useImageColor(url: string | null | undefined): string | null {
  const [color, setColor] = useState<string | null>(null);
  useEffect(() => {
    setColor(null);
    if (!url) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      try {
        const c = document.createElement("canvas");
        const size = 32;
        c.width = size;
        c.height = size;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a < 128) continue;
          const rr = data[i], gg = data[i + 1], bb = data[i + 2];
          const mx = Math.max(rr, gg, bb);
          const mn = Math.min(rr, gg, bb);
          if (mx - mn < 25) continue; // skip grays/whites/blacks
          if (mx < 40) continue;
          r += rr; g += gg; b += bb; n++;
        }
        if (n === 0) return;
        setColor(`rgb(${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)})`);
      } catch {}
    };
    img.src = url;
    return () => { cancelled = true; };
  }, [url]);
  return color;
}