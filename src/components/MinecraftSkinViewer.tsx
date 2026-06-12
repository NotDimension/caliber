import { useEffect, useRef, useState } from "react";

const USERNAME = "Caliber113";

export default function MinecraftSkinViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
      if (gl) setWebglReady(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted || !webglReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let viewer: { dispose: () => void } | null = null;
    (async () => {
      try {
        const sv = await import("skinview3d");
        if (disposed) return;
        const v = new sv.SkinViewer({
          canvas,
          width: 240,
          height: 360,
          skin: `https://mc-heads.net/skin/${USERNAME}`,
        });
        v.animation = new sv.WalkingAnimation();
        v.controls.enableRotate = true;
        v.controls.enableZoom = false;
        v.controls.autoRotate = true;
        v.controls.autoRotateSpeed = 0.6;
        v.zoom = 0.85;
        viewer = v;
      } catch (e) {
        console.error("skinview3d failed", e);
        setImgError(true);
      }
    })();
    return () => {
      disposed = true;
      try { viewer?.dispose(); } catch {}
    };
  }, [mounted, webglReady]);

  const fallback = `https://mc-heads.net/body/${USERNAME}/right`;
  const useFallback = !mounted || !webglReady || imgError;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        style={{
          width: 240,
          height: 360,
          borderRadius: 16,
          background: `radial-gradient(circle at 50% 30%, var(--color-accent-22), rgba(13,10,24,0.9) 70%)`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: useFallback ? "default" : "grab",
          border: "1px solid var(--color-border-subtle)",
        }}
        title={useFallback ? "" : "Drag to rotate"}
      >
        {useFallback ? (
          <img
            src={fallback}
            alt={`${USERNAME} Minecraft skin`}
            crossOrigin="anonymous"
            style={{ maxHeight: 340, imageRendering: "pixelated" }}
          />
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>

      {!useFallback && (
        <p className="text-xs" style={{ color: "var(--color-text-muted)", opacity: 0.55 }}>Drag to rotate</p>
      )}

      <a
        href={`https://namemc.com/profile/${USERNAME}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
        style={{
          background: "var(--color-surface-glass)",
          border: "1px solid var(--color-border-hover)",
          color: "var(--color-accent)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--color-accent-12)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--color-surface-glass)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-hover)";
        }}
      >
        View on NameMC
      </a>
    </div>
  );
}
