"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";

function Knob({ name, angle, indicatorColor, label, sublabel, size = 40, onRotate }) {
  const [pressing, setPressing] = useState(false);
  return (
    <div className="flex flex-col items-center cursor-pointer select-none"
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => { setPressing(false); onRotate(name); }}
      onMouseLeave={() => setPressing(false)}
    >
      {label && (
        <p className="text-[8px] tracking-widest uppercase font-mono mb-2 text-center"
          style={{ color: indicatorColor, opacity: 0.7 }}>{label}</p>
      )}
      <div className="rounded-full relative" style={{
        width: size, height: size,
        background: pressing
          ? 'radial-gradient(circle at 35% 30%, #252528, #111113)'
          : 'radial-gradient(circle at 35% 30%, #3a3a3e, #1a1a1c)',
        border: '1px solid #3a3a3e',
        boxShadow: pressing
          ? '0 1px 2px rgba(0,0,0,0.9)'
          : '0 2px 6px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'all 0.08s',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 3, height: Math.round(size * 0.35),
          marginLeft: -1.5, marginTop: -Math.round(size * 0.35),
          background: indicatorColor, borderRadius: 2,
          transformOrigin: '50% 100%',
          transform: `rotate(${angle}deg)`,
          transition: 'transform 0.15s ease-out',
          opacity: 0.85,
        }} />
      </div>
      {sublabel && (
        <p className="text-[7px] text-zinc-600 tracking-widest uppercase font-mono text-center mt-1">{sublabel}</p>
      )}
    </div>
  );
}

function PanelBtn({ label, textColor, active, activeColor, pressed, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full rounded font-mono tracking-widest text-[7px] py-1 select-none"
      style={{
        color: textColor,
        background: active ? `${activeColor}14` : '#1e1e20',
        border: active ? `1px solid ${activeColor}55` : '1px solid #303033',
        boxShadow: pressed
          ? '0 0 1px rgba(0,0,0,0.9)'
          : active ? `0 0 6px ${activeColor}33` : '0 1px 3px rgba(0,0,0,0.6)',
        transform: pressed ? 'translateY(1px)' : 'translateY(0)',
        transition: 'all 0.08s',
      }}>
      {label}
    </button>
  );
}

export default function OscilloscopeMonitor() {
  const [knobs, setKnobs] = useState({ ch1: 45, trig: -30, time: 120, pos: 80 });
  const [glitching, setGlitching] = useState(false);
  const [glitchFx, setGlitchFx] = useState({ lines: [], shift: 0, filter: '', transform: '', overlay: null });
  const [pressedBtn, setPressedBtn] = useState(null);
  const [activeMode, setActiveMode] = useState('AUTO');
  const [activeRight, setActiveRight] = useState('RUN');
  const [crashed, setCrashed] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const [crtOn, setCrtOn] = useState(false);
  const [crtProgress, setCrtProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const crtAnimRef = useRef(null);
  const glitchTimer = useRef(null);
  const clickLog = useRef([]);
  const crashingRef = useRef(false);
  const crashedRef = useRef(false);
  const bootingRef = useRef(false);

  const BOOT_LINES = [
    'POST... OK',
    'MEM CHECK: 2048K ......... OK',
    'DSO-2049 BIOS v3.1.7',
    'Initializing waveform engine...',
    'Loading CH1 calibration data... OK',
    'TRIGGER SUBSYSTEM ONLINE',
    'DISPLAY BUFFER ALLOCATED',
    '>> SYSTEM READY',
  ];

  const triggerGlitch = useCallback(() => {
    if (crashedRef.current || bootingRef.current) return;
    if (glitchTimer.current) clearTimeout(glitchTimer.current);

    // Pick random glitch type
    const type = Math.floor(Math.random() * 8);
    const lines = Array.from({ length: Math.floor(Math.random() * 6) + 2 }, () => ({
      top: Math.random() * 100,
      height: Math.random() * 5 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      offset: (Math.random() - 0.5) * 30,
      color: ['rgba(59,130,246,0.55)', 'rgba(255,40,40,0.4)', 'rgba(168,85,247,0.45)',
              'rgba(34,197,94,0.4)', 'rgba(255,255,255,0.3)'][Math.floor(Math.random() * 5)],
    }));

    let filter = '', transform = '', overlay = null;
    const shift = (Math.random() - 0.5) * 8;

    switch (type) {
      case 0: // tear lines only
        break;
      case 1: // hue rotation
        filter = `hue-rotate(${Math.random() * 120 - 60}deg) brightness(1.15) saturate(1.8)`;
        break;
      case 2: // inversion flash
        filter = 'invert(1) brightness(1.3)';
        break;
      case 3: // white flash
        overlay = 'rgba(255,255,255,0.15)';
        break;
      case 4: // brief blackout
        overlay = 'rgba(0,0,0,0.85)';
        break;
      case 5: // vertical roll
        transform = `translateY(${(Math.random() - 0.5) * 18}px)`;
        filter = `hue-rotate(${Math.random() * 40}deg)`;
        break;
      case 6: // skew
        transform = `skewX(${(Math.random() - 0.5) * 6}deg) translateX(${shift}px)`;
        break;
      case 7: // scale glitch
        transform = `scaleY(${0.97 + Math.random() * 0.06}) translateX(${shift}px)`;
        filter = `saturate(${1.5 + Math.random()})`;
        break;
    }

    setGlitchFx({ lines, shift, filter, transform, overlay });
    setGlitching(true);
    glitchTimer.current = setTimeout(() => {
      setGlitching(false);
      setGlitchFx({ lines: [], shift: 0, filter: '', transform: '', overlay: null });
    }, 120 + Math.random() * 200);
  }, []);

  const checkSpam = useCallback(() => {
    if (crashingRef.current) return;
    const now = Date.now();
    clickLog.current.push(now);
    // Keep only clicks within last 2.5 seconds
    clickLog.current = clickLog.current.filter(t => now - t < 2500);
    if (clickLog.current.length >= 5) {
      clickLog.current = [];
      crashingRef.current = true;
      crashedRef.current = true;
      // CRASH!
      setCrashed(true);
      setGlitching(false);
      setTimeout(() => {
        crashedRef.current = false;
        setCrashed(false);
        bootingRef.current = true;
        setBooting(true);
        setBootLine(0);
        // Animate boot lines
        let line = 0;
        const bootInterval = setInterval(() => {
          line++;
          setBootLine(line);
          if (line >= 8) {
            clearInterval(bootInterval);
            setTimeout(() => {
              bootingRef.current = false;
              setBooting(false);
              // Start CRT power-on animation
              setCrtOn(true);
              setCrtProgress(0);
              let progress = 0;
              const startTime = performance.now();
              const duration = 2000; // 2s CRT animation
              function animateCrt(now) {
                progress = Math.min(1, (now - startTime) / duration);
                setCrtProgress(progress);
                if (progress < 1) {
                  crtAnimRef.current = requestAnimationFrame(animateCrt);
                } else {
                  setCrtOn(false);
                  // Start slow fade-in
                  setFadeIn(true);
                  setFadeOpacity(0);
                  let fadeP = 0;
                  const fadeStart = performance.now();
                  const fadeDuration = 1500;
                  function animateFade(t) {
                    fadeP = Math.min(1, (t - fadeStart) / fadeDuration);
                    // ease-out curve
                    setFadeOpacity(1 - Math.pow(1 - fadeP, 2.5));
                    if (fadeP < 1) {
                      requestAnimationFrame(animateFade);
                    } else {
                      setFadeIn(false);
                      setFadeOpacity(1);
                      crashingRef.current = false;
                    }
                  }
                  requestAnimationFrame(animateFade);
                }
              }
              crtAnimRef.current = requestAnimationFrame(animateCrt);
            }, 800);
          }
        }, 350);
      }, 1800);
    }
  }, []);

  const rotateKnob = useCallback((name) => {
    setKnobs(k => ({ ...k, [name]: (k[name] + 36) % 360 }));
    triggerGlitch();
    checkSpam();
  }, [triggerGlitch, checkSpam]);

  const handleBtnClick = useCallback((label, cb) => {
    setPressedBtn(label);
    triggerGlitch();
    checkSpam();
    if (cb) cb();
    setTimeout(() => setPressedBtn(null), 150);
  }, [triggerGlitch, checkSpam]);

  const leftModeBtns = [
    { label: 'AUTO', color: '#22c55e' },
    { label: 'NORM', color: '#71717a' },
    { label: 'SING', color: '#71717a' },
  ];
  const rightCtrlBtns = [
    { label: 'RUN',  color: '#22c55e' },
    { label: 'STOP', color: '#71717a' },
    { label: 'MENU', color: '#3b82f6' },
    { label: 'HELP', color: '#52525b' },
  ];

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-8 lg:px-12">

      {/* ── OSCILLOSCOPE BODY ── */}
      <div className="w-full max-w-5xl relative z-10">
        <div className="rounded-xl relative" style={{
          background: 'linear-gradient(160deg, #1c1c1e 0%, #141416 60%, #0f0f11 100%)',
          boxShadow: '0 0 0 1px #2a2a2e, 0 0 60px rgba(59,130,246,0.12), 0 40px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)',
          padding: '18px',
        }}>

          {/* Top label bar */}
          <div className="flex items-center justify-between px-2 mb-2 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[7px] sm:text-[9px] tracking-[0.5em] uppercase text-zinc-500 font-mono">DEEPAK SYSTEMS</span>
              <span className="hidden sm:inline text-[9px] tracking-[0.3em] uppercase text-blue-500/50 font-mono">MODEL DSO-2049</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-zinc-600 font-mono tracking-widest">PWR</span>
              <div className="w-2 h-2 rounded-full bg-blue-400"
                style={{ boxShadow: '0 0 6px rgba(59,130,246,1), 0 0 12px rgba(59,130,246,0.6)' }} />
            </div>
          </div>

          {/* 3-column layout */}
          <div className="flex gap-2 sm:gap-4">

            {/* LEFT PANEL */}
            <div className="hidden md:flex flex-col gap-4 px-3 py-4 rounded-lg" style={{
              width: '90px', flexShrink: 0,
              background: 'linear-gradient(180deg, #191919 0%, #131313 100%)',
              border: '1px solid #2a2a2e',
            }}>
              <Knob name="ch1" angle={knobs.ch1} indicatorColor="rgba(59,130,246,0.8)"
                label="CH 1" sublabel="V/DIV" onRotate={rotateKnob} />
              <div className="w-full h-px bg-zinc-800" />
              <Knob name="trig" angle={knobs.trig} indicatorColor="rgba(249,115,22,0.8)"
                label="TRIG" sublabel="LEVEL" onRotate={rotateKnob} />
              <div className="w-full h-px bg-zinc-800" />
              <div className="flex flex-col gap-2">
                {leftModeBtns.map(b => (
                  <PanelBtn key={b.label} label={b.label} textColor={b.color}
                    active={activeMode === b.label} activeColor="#22c55e"
                    pressed={pressedBtn === b.label}
                    onClick={() => handleBtnClick(b.label, () => setActiveMode(b.label))} />
                ))}
              </div>
            </div>

            {/* SCREEN */}
            <div className="flex-1">
              <div className="rounded-lg overflow-hidden relative" style={{
                background: '#020208',
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.95), inset 0 0 30px rgba(59,130,246,0.04), 0 0 20px rgba(59,130,246,0.08)',
                border: '2px solid #0d0d12',
                outline: '4px solid #1a1a1e',
              }}>
                {/* Grid */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{
                  backgroundImage: 'linear-gradient(rgba(59,130,246,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.045) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }} />
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
                }} />
                {/* Glare */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 45%)',
                }} />
                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{
                  background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)',
                }} />

                {/* Glitch overlays */}
                {glitching && (
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    {glitchFx.overlay && (
                      <div style={{ position: 'absolute', inset: 0, background: glitchFx.overlay }} />
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(255,20,20,0.02)',
                      transform: `translateX(${glitchFx.shift}px)`,
                    }} />
                    {glitchFx.lines.map((line, i) => (
                      <div key={i} style={{
                        position: 'absolute', left: 0, right: 0,
                        top: `${line.top}%`,
                        height: `${line.height}px`,
                        background: line.color,
                        transform: `translateX(${line.offset}px)`,
                        opacity: line.opacity,
                      }} />
                    ))}
                  </div>
                )}

                {/* CRASH: BSOD screen */}
                {crashed && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center"
                    style={{ background: '#0a0a2e' }}>
                    <div className="text-center font-mono">
                      <p className="text-red-500 text-2xl font-bold tracking-widest mb-4" style={{ textShadow: '0 0 20px rgba(255,0,0,0.6)' }}>
                        ⚠ SYSTEM FAULT ⚠
                      </p>
                      <p className="text-red-400/80 text-xs tracking-wider mb-2">EXCEPTION_CODE: 0xDEAD2049</p>
                      <p className="text-red-400/50 text-[10px] tracking-wider">CRITICAL PROCESS TERMINATED</p>
                      <p className="text-red-400/30 text-[10px] mt-4 tracking-wider animate-pulse">Rebooting...</p>
                    </div>
                  </div>
                )}

                {/* BOOT sequence screen */}
                {booting && (
                  <div className="absolute inset-0 z-30 flex flex-col justify-start p-8"
                    style={{ background: '#020208' }}>
                    {BOOT_LINES.slice(0, bootLine).map((ln, i) => (
                      <p key={i} className="font-mono text-xs mb-1" style={{
                        color: i === BOOT_LINES.length - 1 && bootLine >= BOOT_LINES.length
                          ? '#22c55e' : '#22c55e99',
                        textShadow: '0 0 8px rgba(34,197,94,0.3)',
                      }}>
                        {ln}
                      </p>
                    ))}
                    {bootLine < BOOT_LINES.length && (
                      <span className="inline-block w-2 h-4 bg-green-500/70 animate-pulse" />
                    )}
                  </div>
                )}

                {/* CRT Power-on spark effect */}
                {crtOn && (
                  <div className="absolute inset-0 z-30 pointer-events-none" style={{ background: '#020208' }}>
                    {/* Horizontal neon green spark line */}
                    <div style={{
                      position: 'absolute',
                      left: 0, right: 0,
                      top: '50%',
                      height: crtProgress < 0.25
                        ? `${2 + crtProgress * 12}px`
                        : `${Math.min(100, ((crtProgress - 0.25) / 0.75) * 110)}%`,
                      transform: 'translateY(-50%)',
                      background: crtProgress < 0.25
                        ? `linear-gradient(0deg, transparent, rgba(34,197,94,${0.9 - crtProgress * 2}) 35%, rgba(180,255,200,${1 - crtProgress * 2}) 50%, rgba(34,197,94,${0.9 - crtProgress * 2}) 65%, transparent)`
                        : 'transparent',
                      boxShadow: crtProgress < 0.25
                        ? `0 0 ${30 + crtProgress * 80}px rgba(34,197,94,${0.9 - crtProgress * 2}), 0 0 ${60 + crtProgress * 120}px rgba(34,197,94,${0.5 - crtProgress})`
                        : 'none',
                      transition: 'none',
                    }} />
                    {/* Expanding reveal — black bars shrinking from top/bottom */}
                    {crtProgress >= 0.25 && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(0deg, 
                          #020208 ${Math.max(0, 50 - ((crtProgress - 0.25) / 0.75) * 55)}%, 
                          transparent ${Math.max(0, 50 - ((crtProgress - 0.25) / 0.75) * 52)}%, 
                          transparent ${Math.min(100, 50 + ((crtProgress - 0.25) / 0.75) * 52)}%, 
                          #020208 ${Math.min(100, 50 + ((crtProgress - 0.25) / 0.75) * 55)}%)`,
                      }} />
                    )}
                    {/* Neon green flash at spark moment */}
                    {crtProgress < 0.06 && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(ellipse 80% 3px at 50% 50%, rgba(34,197,94,${0.8 * (1 - crtProgress / 0.06)}), transparent 70%)`,
                      }} />
                    )}
                  </div>
                )}

                {/* Slow fade-in overlay after CRT */}
                {fadeIn && (
                  <div className="absolute inset-0 z-30 pointer-events-none" style={{
                    background: '#020208',
                    opacity: 1 - fadeOpacity,
                  }} />
                )}

                {/* Content */}
                <div className="relative z-0 px-4 sm:px-8 md:px-12 py-8 sm:py-14 text-center" style={{
                  filter: glitching ? (glitchFx.filter || `hue-rotate(18deg) brightness(1.12) saturate(1.6)`) : 'none',
                  transform: glitching ? (glitchFx.transform || `translateX(${glitchFx.shift * 0.3}px)`) : 'translateX(0)',
                  transition: glitching ? 'none' : 'filter 0.15s, transform 0.15s',
                  opacity: (crashed || booting) ? 0 : 1,
                }}>
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight glow-blue text-blue-400">
                    Deepak Prabaharan
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-500 mb-6 sm:mb-12 leading-relaxed tracking-wide font-mono">
                    Developer. Builder. Problem solver.<br />
                    Explore my work and get in touch.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    <Link href="/about"
                      className="px-5 sm:px-10 py-3 sm:py-4 border border-orange-500 text-orange-400 text-sm sm:text-base font-medium tracking-widest uppercase rounded hover:bg-orange-500/10 transition-all"
                      style={{ boxShadow: '0 0 12px rgba(249,115,22,0.3)' }}>
                      About Me
                    </Link>
                    <Link href="/portfolio"
                      className="px-5 sm:px-10 py-3 sm:py-4 border border-purple-500 text-purple-400 text-sm sm:text-base font-medium tracking-widest uppercase rounded hover:bg-purple-500/10 transition-all"
                      style={{ boxShadow: '0 0 12px rgba(168,85,247,0.3)' }}>
                      View Portfolio
                    </Link>
                    <Link href="/contact"
                      className="px-5 sm:px-10 py-3 sm:py-4 border border-green-500 text-green-400 text-sm sm:text-base font-medium tracking-widest uppercase rounded hover:bg-green-500/10 transition-all"
                      style={{ boxShadow: '0 0 12px rgba(34,197,94,0.3)' }}>
                      Contact
                    </Link>
                  </div>
                  <div className="flex justify-center mt-4 sm:mt-6">
                    <a href="/DeepakPrabaharanResume.pdf" target="_blank" rel="noopener noreferrer"
                      className="px-10 sm:px-20 py-4 sm:py-5 border border-red-500 text-red-400 text-sm sm:text-base font-medium tracking-widest uppercase rounded hover:bg-red-500/10 transition-all"
                      style={{ boxShadow: '0 0 18px rgba(239,68,68,0.35)' }}>
                      Resume
                    </a>
                  </div>
                </div>
              </div>

              {/* Readout bar */}
              <div className="hidden sm:flex justify-between px-2 mt-2">
                {['CH1  1V', 'TIME  2ms', 'TRIG  EDGE', 'SAMP  1GS/s'].map(t => (
                  <span key={t} className="text-[8px] font-mono text-zinc-600 tracking-wider">{t}</span>
                ))}
              </div>

              {/* Mobile-only glitch buttons */}
              <div className="flex md:hidden justify-center gap-3 mt-3 px-2">
                {[
                  { label: 'AUTO', color: '#22c55e' },
                  { label: 'TRIG', color: '#f97316' },
                  { label: 'RUN',  color: '#3b82f6' },
                  { label: 'MENU', color: '#a855f7' },
                ].map(b => (
                  <button
                    key={b.label}
                    onClick={() => handleBtnClick(b.label)}
                    className="flex-1 rounded font-mono tracking-widest text-[9px] py-2 select-none active:scale-95 transition-transform"
                    style={{
                      color: b.color,
                      background: pressedBtn === b.label ? `${b.color}18` : '#1e1e20',
                      border: `1px solid ${b.color}44`,
                      boxShadow: pressedBtn === b.label ? 'none' : `0 0 6px ${b.color}22`,
                      transform: pressedBtn === b.label ? 'translateY(1px)' : 'translateY(0)',
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="hidden md:flex flex-col gap-4 px-3 py-4 rounded-lg" style={{
              width: '90px', flexShrink: 0,
              background: 'linear-gradient(180deg, #191919 0%, #131313 100%)',
              border: '1px solid #2a2a2e',
            }}>
              <Knob name="time" angle={knobs.time} indicatorColor="rgba(168,85,247,0.8)"
                label="TIME" sublabel="T/DIV" onRotate={rotateKnob} />
              <div className="w-full h-px bg-zinc-800" />
              <Knob name="pos" angle={knobs.pos} indicatorColor="rgba(161,161,170,0.6)"
                label="POS" size={32} onRotate={rotateKnob} />
              <div className="w-full h-px bg-zinc-800" />
              <div className="flex flex-col gap-2">
                {rightCtrlBtns.map(b => (
                  <PanelBtn key={b.label} label={b.label} textColor={b.color}
                    active={b.label === 'RUN' ? activeRight === 'RUN' : b.label === 'STOP' ? activeRight === 'STOP' : false}
                    activeColor="#22c55e"
                    pressed={pressedBtn === b.label}
                    onClick={() => handleBtnClick(b.label, () => {
                      if (b.label === 'RUN' || b.label === 'STOP') setActiveRight(b.label);
                    })} />
                ))}
              </div>
              <div className="w-full h-px bg-zinc-800" />
              <div className="flex flex-col gap-2">
                <p className="text-[7px] text-zinc-600 tracking-widest uppercase font-mono text-center">INPUT</p>
                {['CH1', 'EXT', 'GND'].map((jack, i) => (
                  <div key={jack} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{
                      background: '#111',
                      border: `1px solid ${i === 0 ? 'rgba(59,130,246,0.5)' : '#333'}`,
                      boxShadow: i === 0 ? '0 0 4px rgba(59,130,246,0.4)' : 'none',
                    }} />
                    <span className={`text-[7px] font-mono ${i === 0 ? 'text-blue-400/60' : 'text-zinc-600'}`}>{jack}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom F-buttons */}
          <div className="hidden sm:flex items-center justify-between mt-4 px-1">
            <div className="flex gap-2">
              {['F1', 'F2', 'F3', 'F4', 'F5'].map(f => (
                <button key={f} onClick={() => handleBtnClick(f)}
                  className="text-[8px] font-mono tracking-widest px-3 py-1.5 rounded select-none"
                  style={{
                    color: pressedBtn === f ? '#a1a1aa' : '#52525b',
                    background: '#1a1a1c',
                    border: '1px solid #2e2e32',
                    boxShadow: pressedBtn === f ? '0 0 1px rgba(0,0,0,0.9)' : '0 2px 4px rgba(0,0,0,0.5)',
                    transform: pressedBtn === f ? 'translateY(1px)' : 'translateY(0)',
                    transition: 'all 0.08s',
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['#3b82f6', '#a855f7', '#f97316'].map(c => (
                  <div key={c} className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
                ))}
              </div>
              <span className="text-[8px] font-mono text-zinc-700 tracking-widest">DSO-2049 REV 3.1</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── SPACESHIP ── */}
      <div className="relative w-full hidden sm:flex justify-center" style={{ marginTop: '-2px' }}>
        <svg
          viewBox="0 0 1200 340"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: '1200px', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="hullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c2c36" />
              <stop offset="35%" stopColor="#18181f" />
              <stop offset="100%" stopColor="#0a0a0e" />
            </linearGradient>
            <linearGradient id="wingGradL" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1e26" />
              <stop offset="100%" stopColor="#07070a" />
            </linearGradient>
            <linearGradient id="wingGradR" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1e26" />
              <stop offset="100%" stopColor="#07070a" />
            </linearGradient>
            <linearGradient id="hullBevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#40404e" />
              <stop offset="100%" stopColor="#1e1e28" />
            </linearGradient>
            <linearGradient id="cockpitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a2a3a" />
              <stop offset="50%" stopColor="#0d1a28" />
              <stop offset="100%" stopColor="#060e16" />
            </linearGradient>
            <radialGradient id="cockpitSheen" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="rgba(100,180,255,0.25)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <radialGradient id="haloL" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(100,170,255,0.45)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.18)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
            <radialGradient id="haloR" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(100,170,255,0.45)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.18)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.16)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
            <radialGradient id="navRed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239,68,68,0.95)" />
              <stop offset="40%" stopColor="rgba(239,68,68,0.4)" />
              <stop offset="100%" stopColor="rgba(239,68,68,0)" />
            </radialGradient>
            <radialGradient id="navGreen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34,197,94,0.95)" />
              <stop offset="40%" stopColor="rgba(34,197,94,0.4)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0)" />
            </radialGradient>
            <linearGradient id="stripeL" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.55)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
            <linearGradient id="stripeR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.55)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
            {/* Exhaust flame gradient — hot white core to deep blue fade */}
            <linearGradient id="flameCore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(220,240,255,0.95)" />
              <stop offset="25%" stopColor="rgba(100,180,255,0.85)" />
              <stop offset="65%" stopColor="rgba(50,110,240,0.45)" />
              <stop offset="100%" stopColor="rgba(20,60,200,0)" />
            </linearGradient>
            <linearGradient id="flameMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(130,200,255,0.7)" />
              <stop offset="50%" stopColor="rgba(60,130,255,0.3)" />
              <stop offset="100%" stopColor="rgba(30,80,220,0)" />
            </linearGradient>
            <linearGradient id="flameOuter" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(80,140,255,0.35)" />
              <stop offset="100%" stopColor="rgba(30,60,180,0)" />
            </linearGradient>
          </defs>

          {/* ── EXHAUST PLUMES — ANIMATED ── */}
          {/* Outer diffuse plume L */}
          <ellipse cx="548" cy="200" rx="30" ry="80" fill="url(#flameOuter)" opacity="0.5">
            <animate attributeName="ry" values="80;95;75;88;80" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.35;0.55;0.4;0.5" dur="1.8s" repeatCount="indefinite" />
          </ellipse>
          {/* Mid plume L */}
          <ellipse cx="548" cy="195" rx="16" ry="62" fill="url(#flameMid)" opacity="0.7">
            <animate attributeName="ry" values="62;72;58;68;62" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="rx" values="16;18;14;17;16" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.55;0.75;0.6;0.7" dur="1.3s" repeatCount="indefinite" />
          </ellipse>
          {/* Core plume L */}
          <ellipse cx="548" cy="185" rx="7" ry="44" fill="url(#flameCore)" opacity="0.9">
            <animate attributeName="ry" values="44;52;40;50;44" dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="rx" values="7;9;6;8;7" dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.75;0.95;0.8;0.9" dur="0.9s" repeatCount="indefinite" />
          </ellipse>

          {/* Outer diffuse plume R */}
          <ellipse cx="652" cy="200" rx="30" ry="80" fill="url(#flameOuter)" opacity="0.5">
            <animate attributeName="ry" values="80;90;78;93;80" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.4;0.52;0.38;0.5" dur="1.6s" repeatCount="indefinite" />
          </ellipse>
          {/* Mid plume R */}
          <ellipse cx="652" cy="195" rx="16" ry="62" fill="url(#flameMid)" opacity="0.7">
            <animate attributeName="ry" values="62;68;60;72;62" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="rx" values="16;14;18;15;16" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.6;0.72;0.58;0.7" dur="1.1s" repeatCount="indefinite" />
          </ellipse>
          {/* Core plume R */}
          <ellipse cx="652" cy="185" rx="7" ry="44" fill="url(#flameCore)" opacity="0.9">
            <animate attributeName="ry" values="44;48;42;54;44" dur="0.75s" repeatCount="indefinite" />
            <animate attributeName="rx" values="7;8;6;9;7" dur="0.75s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.8;0.92;0.78;0.9" dur="0.75s" repeatCount="indefinite" />
          </ellipse>

          {/* ── AMBIENT UNDER-GLOW ── */}
          <ellipse cx="600" cy="195" rx="210" ry="75" fill="url(#ambientGlow)" />

          {/* ── NECK / MOUNT ── */}
          <polygon points="578,0 622,0 638,38 562,38" fill="url(#hullGrad)" stroke="#303040" strokeWidth="1" />
          <line x1="578" y1="0" x2="562" y2="38" stroke="#3a3a52" strokeWidth="0.8" />
          <line x1="622" y1="0" x2="638" y2="38" stroke="#3a3a52" strokeWidth="0.8" />
          <rect x="528" y="36" width="144" height="10" rx="3" fill="url(#hullBevel)" stroke="#40405a" strokeWidth="1" />

          {/* ── LEFT WING ── */}
          <polygon points="554,48 488,160 44,242 10,207" fill="#050508" />
          <polygon points="550,46 484,156 40,238 14,204" fill="url(#wingGradL)" stroke="#222232" strokeWidth="1" />
          {/* Wing leading edge bevel */}
          <polygon points="550,46 554,48 488,160 484,156" fill="#22222e" />
          <line x1="14" y1="204" x2="40" y2="238" stroke="#1a283a" strokeWidth="2.5" />
          {/* Structural ribs */}
          <line x1="430" y1="202" x2="536" y2="68" stroke="#20202e" strokeWidth="0.9" />
          <line x1="300" y1="220" x2="516" y2="110" stroke="#20202e" strokeWidth="0.9" />
          <line x1="170" y1="230" x2="500" y2="132" stroke="#20202e" strokeWidth="0.8" />
          <line x1="80" y1="236" x2="486" y2="157" stroke="#20202e" strokeWidth="0.6" />
          {/* Wing surface heat tiles — subtle rectangles */}
          <rect x="370" y="178" width="40" height="14" rx="1" fill="none" stroke="#1c1c2c" strokeWidth="0.6" transform="rotate(-22,390,185)" />
          <rect x="240" y="196" width="40" height="14" rx="1" fill="none" stroke="#1c1c2c" strokeWidth="0.6" transform="rotate(-18,260,203)" />
          <rect x="130" y="210" width="36" height="12" rx="1" fill="none" stroke="#1a1a28" strokeWidth="0.5" transform="rotate(-14,148,216)" />
          {/* Blue accent stripe */}
          <line x1="490" y1="156" x2="42" y2="238" stroke="url(#stripeL)" strokeWidth="2" opacity="0.5" />

          {/* ── RIGHT WING ── */}
          <polygon points="646,48 712,160 1156,242 1190,207" fill="#050508" />
          <polygon points="650,46 716,156 1160,238 1186,204" fill="url(#wingGradR)" stroke="#222232" strokeWidth="1" />
          <polygon points="650,46 646,48 712,160 716,156" fill="#22222e" />
          <line x1="1186" y1="204" x2="1160" y2="238" stroke="#1a283a" strokeWidth="2.5" />
          <line x1="770" y1="202" x2="664" y2="68" stroke="#20202e" strokeWidth="0.9" />
          <line x1="900" y1="220" x2="684" y2="110" stroke="#20202e" strokeWidth="0.9" />
          <line x1="1030" y1="230" x2="700" y2="132" stroke="#20202e" strokeWidth="0.8" />
          <line x1="1120" y1="236" x2="714" y2="157" stroke="#20202e" strokeWidth="0.6" />
          <rect x="790" y="178" width="40" height="14" rx="1" fill="none" stroke="#1c1c2c" strokeWidth="0.6" transform="rotate(22,810,185)" />
          <rect x="920" y="196" width="40" height="14" rx="1" fill="none" stroke="#1c1c2c" strokeWidth="0.6" transform="rotate(18,940,203)" />
          <rect x="1030" y="210" width="36" height="12" rx="1" fill="none" stroke="#1a1a28" strokeWidth="0.5" transform="rotate(14,1048,216)" />
          <line x1="710" y1="156" x2="1158" y2="238" stroke="url(#stripeR)" strokeWidth="2" opacity="0.5" />

          {/* ── HULL ── */}
          <polygon points="534,42 666,42 704,166 496,166" fill="#06060a" />
          <polygon points="528,40 672,40 698,162 502,162" fill="url(#hullGrad)" stroke="#38383f" strokeWidth="1.5" />
          {/* Bevel top strip */}
          <polygon points="528,40 672,40 664,54 536,54" fill="url(#hullBevel)" opacity="0.55" />
          {/* Center spine ridge */}
          <polygon points="593,40 607,40 603,162 597,162" fill="#22222e" stroke="#30303e" strokeWidth="0.5" />
          <line x1="600" y1="40" x2="600" y2="162" stroke="#2c2c3c" strokeWidth="0.8" />
          {/* Panel lines */}
          <line x1="554" y1="56" x2="542" y2="156" stroke="#2c2c3a" strokeWidth="0.8" />
          <line x1="646" y1="56" x2="658" y2="156" stroke="#2c2c3a" strokeWidth="0.8" />
          <line x1="570" y1="54" x2="562" y2="156" stroke="#232332" strokeWidth="0.5" />
          <line x1="630" y1="54" x2="638" y2="156" stroke="#232332" strokeWidth="0.5" />
          <line x1="546" y1="88" x2="654" y2="88" stroke="#2c2c3a" strokeWidth="0.7" />
          <line x1="542" y1="120" x2="658" y2="120" stroke="#2c2c3a" strokeWidth="0.7" />
          <line x1="528" y1="40" x2="672" y2="40" stroke="#4a4a5e" strokeWidth="1.5" />

          {/* ── COCKPIT WINDOW ── */}
          <ellipse cx="600" cy="72" rx="28" ry="18" fill="url(#cockpitGrad)" stroke="#1e3040" strokeWidth="1.5" />
          <ellipse cx="600" cy="72" rx="28" ry="18" fill="url(#cockpitSheen)" />
          {/* Cockpit frame dividers */}
          <line x1="600" y1="54" x2="600" y2="90" stroke="#182430" strokeWidth="0.8" opacity="0.7" />
          <line x1="572" y1="72" x2="628" y2="72" stroke="#182430" strokeWidth="0.8" opacity="0.7" />
          {/* Cockpit subtle glow dot */}
          <circle cx="590" cy="65" r="3" fill="rgba(80,160,255,0.3)" />

          {/* ── HULL VENTS ── */}
          <rect x="563" y="98" width="22" height="5" rx="1" fill="#0e0e18" stroke="#2a2a38" strokeWidth="0.8" />
          <rect x="615" y="98" width="22" height="5" rx="1" fill="#0e0e18" stroke="#2a2a38" strokeWidth="0.8" />
          <rect x="563" y="127" width="22" height="5" rx="1" fill="#0e0e18" stroke="#2a2a38" strokeWidth="0.8" />
          <rect x="615" y="127" width="22" height="5" rx="1" fill="#0e0e18" stroke="#2a2a38" strokeWidth="0.8" />
          {/* Vent slats */}
          <line x1="566" y1="100" x2="566" y2="102" stroke="#1e1e2e" strokeWidth="0.8" />
          <line x1="570" y1="100" x2="570" y2="102" stroke="#1e1e2e" strokeWidth="0.8" />
          <line x1="574" y1="100" x2="574" y2="102" stroke="#1e1e2e" strokeWidth="0.8" />
          <line x1="618" y1="100" x2="618" y2="102" stroke="#1e1e2e" strokeWidth="0.8" />
          <line x1="622" y1="100" x2="622" y2="102" stroke="#1e1e2e" strokeWidth="0.8" />
          <line x1="626" y1="100" x2="626" y2="102" stroke="#1e1e2e" strokeWidth="0.8" />

          {/* ── SENSOR / ANTENNA ARRAY (top of hull) ── */}
          {/* Left sensor bump */}
          <ellipse cx="566" cy="48" rx="8" ry="4" fill="#1c1c28" stroke="#303040" strokeWidth="0.8" />
          <circle cx="566" cy="46" r="2" fill="rgba(59,130,246,0.5)" />
          {/* Right sensor bump */}
          <ellipse cx="634" cy="48" rx="8" ry="4" fill="#1c1c28" stroke="#303040" strokeWidth="0.8" />
          <circle cx="634" cy="46" r="2" fill="rgba(59,130,246,0.5)" />
          {/* Centre antenna nub */}
          <rect x="597" y="35" width="6" height="8" rx="1" fill="#20202c" stroke="#303040" strokeWidth="0.7" />
          <circle cx="600" cy="34" r="2.5" fill="rgba(168,85,247,0.6)" />
          <circle cx="600" cy="34" r="1.2" fill="rgba(200,150,255,0.9)">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.2s" repeatCount="indefinite" />
          </circle>

          {/* ── WING-HULL FAIRINGS ── */}
          <polygon points="550,46 528,40 502,162 484,156" fill="#1e1e2a" stroke="#2c2c3c" strokeWidth="0.8" />
          <polygon points="650,46 672,40 698,162 716,156" fill="#1e1e2a" stroke="#2c2c3c" strokeWidth="0.8" />
          <line x1="528" y1="40" x2="502" y2="162" stroke="#30303e" strokeWidth="1" />
          <line x1="672" y1="40" x2="698" y2="162" stroke="#30303e" strokeWidth="1" />

          {/* ── ENGINE PODS ── */}
          {/* Outer pod ring */}
          <ellipse cx="548" cy="162" rx="40" ry="15" fill="#0c0c14" stroke="#2a2a3c" strokeWidth="2" />
          <ellipse cx="652" cy="162" rx="40" ry="15" fill="#0c0c14" stroke="#2a2a3c" strokeWidth="2" />
          {/* Pod side detail stripes */}
          <line x1="510" y1="162" x2="517" y2="162" stroke="#1e2e48" strokeWidth="1.5" />
          <line x1="579" y1="162" x2="586" y2="162" stroke="#1e2e48" strokeWidth="1.5" />
          <line x1="614" y1="162" x2="621" y2="162" stroke="#1e2e48" strokeWidth="1.5" />
          <line x1="683" y1="162" x2="690" y2="162" stroke="#1e2e48" strokeWidth="1.5" />
          {/* Inner nozzle ring */}
          <ellipse cx="548" cy="162" rx="28" ry="10" fill="#080812" stroke="#1c1c2e" strokeWidth="1" />
          <ellipse cx="652" cy="162" rx="28" ry="10" fill="#080812" stroke="#1c1c2e" strokeWidth="1" />
          {/* Pod highlight rim */}
          <path d="M510,157 A40,15 0 0 1 586,157" fill="none" stroke="#30304a" strokeWidth="1" />
          <path d="M614,157 A40,15 0 0 1 690,157" fill="none" stroke="#30304a" strokeWidth="1" />

          {/* Engine halo glow */}
          <circle cx="548" cy="162" r="65" fill="url(#haloL)" />
          <circle cx="652" cy="162" r="65" fill="url(#haloR)" />
          {/* Mid glow ring */}
          <ellipse cx="548" cy="162" rx="20" ry="7" fill="rgba(100,180,255,0.6)" />
          <ellipse cx="652" cy="162" rx="20" ry="7" fill="rgba(100,180,255,0.6)" />
          <ellipse cx="548" cy="162" rx="28" ry="10" fill="rgba(60,140,255,0.22)" />
          <ellipse cx="652" cy="162" rx="28" ry="10" fill="rgba(60,140,255,0.22)" />
          {/* Core bright */}
          <ellipse cx="548" cy="162" rx="11" ry="4" fill="rgba(200,230,255,0.9)" />
          <ellipse cx="652" cy="162" rx="11" ry="4" fill="rgba(200,230,255,0.9)" />
          <ellipse cx="548" cy="161" rx="5" ry="2" fill="rgba(240,248,255,1)" />
          <ellipse cx="652" cy="161" rx="5" ry="2" fill="rgba(240,248,255,1)" />

          {/* ── WING-TIP NAV LIGHTS ── */}
          <circle cx="27" cy="206" r="20" fill="url(#navRed)" />
          <circle cx="27" cy="206" r="4.5" fill="#fecaca" />
          <circle cx="27" cy="206" r="2" fill="white" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="1173" cy="206" r="20" fill="url(#navGreen)" />
          <circle cx="1173" cy="206" r="4.5" fill="#bbf7d0" />
          <circle cx="1173" cy="206" r="2" fill="white" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.6s" repeatCount="indefinite" begin="0.8s" />
          </circle>
        </svg>
      </div>
    </div>
  );
}
