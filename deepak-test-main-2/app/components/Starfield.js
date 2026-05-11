"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W0 = canvas.width;
    const H0 = canvas.height;

    // Color palettes
    const smallTints = [
      [160, 190, 255], [180, 210, 255], [200, 220, 255], [170, 200, 240],
    ];
    const medTints = [
      [220, 235, 255], [200, 230, 255], [255, 230, 200], [210, 240, 255],
    ];
    const largeTints = [
      [100, 180, 255], // bright blue
      [255, 180, 100], // warm amber
      [140, 255, 220], // cyan-green
      [255, 140, 140], // soft red
      [200, 140, 255], // purple
    ];

    function makeStar(type) {
      const tints = type === 'small' ? smallTints : type === 'medium' ? medTints : largeTints;
      const tint = tints[Math.floor(Math.random() * tints.length)];
      return {
        x: (Math.random() - 0.5) * W0 * 2,
        y: (Math.random() - 0.5) * H0 * 2,
        z: Math.random() * W0,
        pz: W0,
        type,
        tint,
        // Each star has its own speed variation
        speed: type === 'small' ? 1.5 + Math.random() * 1.5
             : type === 'medium' ? 2.0 + Math.random() * 2.0
             : 2.5 + Math.random() * 2.5,
        // Base max size
        maxSize: type === 'small' ? 0.6 + Math.random() * 0.8
               : type === 'medium' ? 1.8 + Math.random() * 1.5
               : 4.0 + Math.random() * 3.0,
      };
    }
    const stars = [
      ...Array.from({ length: 550 }, () => makeStar('small')),
      ...Array.from({ length: 100 }, () => makeStar('medium')),
      ...Array.from({ length: 30 }, () => makeStar('large')),
    ];

    // Asteroid system — one at a time, spawns every ~18s
    let asteroid = null;
    let asteroidCooldown = Math.random() * 600 + 900; // frames until next spawn (~15-25s at 60fps)

    function spawnAsteroid(W, H) {
      const side = Math.random(); // which edge to enter from
      let ax, ay, vx, vy;
      if (side < 0.25) { ax = -80; ay = Math.random() * H; vx = 0.7 + Math.random() * 0.4; vy = (Math.random() - 0.5) * 0.5; }
      else if (side < 0.5) { ax = W + 80; ay = Math.random() * H; vx = -(0.7 + Math.random() * 0.4); vy = (Math.random() - 0.5) * 0.5; }
      else if (side < 0.75) { ax = Math.random() * W; ay = -80; vx = (Math.random() - 0.5) * 0.5; vy = 0.7 + Math.random() * 0.4; }
      else { ax = Math.random() * W; ay = H + 80; vx = (Math.random() - 0.5) * 0.5; vy = -(0.7 + Math.random() * 0.4); }
      asteroid = {
        x: ax, y: ay, vx, vy,
        size: 18 + Math.random() * 22,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0,
        phase: 'in', // 'in' → 'full' → 'out'
        life: 0,
        maxLife: 300 + Math.random() * 180,
        hue: 25 + Math.random() * 20, // brownish-amber
      };
    }

    function drawAsteroid(W, H) {
      if (!asteroid) return;
      const a = asteroid;
      a.x += a.vx;
      a.y += a.vy;
      a.rotation += a.rotSpeed;
      a.life++;

      // Fade in / out
      if (a.phase === 'in') {
        a.opacity = Math.min(1, a.opacity + 0.012);
        if (a.opacity >= 1) a.phase = 'full';
      }
      if (a.life > a.maxLife - 80) {
        a.phase = 'out';
        a.opacity = Math.max(0, a.opacity - 0.013);
      }
      // Kill if offscreen or faded
      if (a.opacity <= 0 && a.phase === 'out' ||
          a.x < -150 || a.x > W + 150 || a.y < -150 || a.y > H + 150) {
        asteroid = null;
        asteroidCooldown = Math.random() * 600 + 900;
        return;
      }

      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rotation);
      ctx.globalAlpha = a.opacity * 0.55;

      // Irregular rock shape
      const pts = 8;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const jitter = 0.6 + ((Math.sin(angle * 3.7 + 1.3) * 0.5 + 0.5) * 0.55);
        const r = a.size * jitter;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = `hsla(${a.hue}, 30%, 18%, 1)`;
      ctx.fill();
      ctx.strokeStyle = `hsla(${a.hue}, 25%, 30%, 0.7)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Craters
      for (let c = 0; c < 3; c++) {
        const cx = (Math.sin(c * 2.5 + 0.8) * a.size * 0.35);
        const cy = (Math.cos(c * 3.1 + 0.4) * a.size * 0.3);
        ctx.beginPath();
        ctx.arc(cx, cy, a.size * (0.08 + c * 0.04), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${a.hue}, 20%, 12%, 0.6)`;
        ctx.fill();
      }

      ctx.restore();
    }

    function tick() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = "rgba(5,5,15,0.75)";
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= s.speed;
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * W * 2;
          s.y = (Math.random() - 0.5) * H * 2;
          s.z = W;
          s.pz = W;
        }
        const sx = (s.x / s.z) * W + W / 2;
        const sy = (s.y / s.z) * H + H / 2;
        const px = (s.x / s.pz) * W + W / 2;
        const py = (s.y / s.pz) * H + H / 2;
        const brightness = Math.max(0, 1 - s.z / W);
        const t = s.tint;

        if (s.type === 'small') {
          const size = Math.max(0.15, brightness * s.maxSize);
          ctx.strokeStyle = `rgba(${t[0]},${t[1]},${t[2]},${brightness * 0.5})`;
          ctx.lineWidth = size;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
        } else if (s.type === 'medium') {
          const size = Math.max(0.4, brightness * s.maxSize);
          const alpha = Math.min(1, brightness * 1.2);
          ctx.strokeStyle = `rgba(${t[0]},${t[1]},${t[2]},${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
          // Subtle point glow when close
          if (brightness > 0.6) {
            ctx.beginPath();
            ctx.arc(sx, sy, size * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${t[0]},${t[1]},${t[2]},${brightness * 0.08})`;
            ctx.fill();
          }
        } else {
          // Large stars — very visible, colored, with prominent glow
          const size = Math.max(1.5, brightness * s.maxSize);
          const alpha = Math.min(1, brightness * 1.6);
          // Thicker streak
          ctx.strokeStyle = `rgba(${t[0]},${t[1]},${t[2]},${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
          // Inner bright core
          if (brightness > 0.15) {
            ctx.beginPath();
            ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${t[0]},${t[1]},${t[2]},${Math.min(1, brightness * 0.9)})`;
            ctx.fill();
          }
          // Large outer glow halo
          if (brightness > 0.35) {
            ctx.beginPath();
            ctx.arc(sx, sy, size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${t[0]},${t[1]},${t[2]},${brightness * 0.04})`;
            ctx.fill();
          }
        }
      }

      // Asteroid logic
      if (!asteroid) {
        asteroidCooldown--;
        if (asteroidCooldown <= 0) spawnAsteroid(W, H);
      }
      drawAsteroid(W, H);

      animId = requestAnimationFrame(tick);
    }

    ctx.fillStyle = "#05050f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
