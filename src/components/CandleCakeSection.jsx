import React, { useState, useEffect, useRef } from 'react';
import { Cake, Mic, Sparkles, Heart, AlertCircle, Wind, Sliders, Flower2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../data/siteContent';

export default function CandleCakeSection() {
  const { cake } = siteContent;
  const [candlesLit, setCandlesLit] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(null);
  const [blowLevel, setBlowLevel] = useState(0);
  const [blowStatusText, setBlowStatusText] = useState('Listening for a strong blow...');
  const [sensitivity, setSensitivity] = useState('strong'); // 'strong' (default), 'extraStrong', 'gentle'
  const [showBouquet, setShowBouquet] = useState(false);
  const [flowerShowerActive, setFlowerShowerActive] = useState(false);
  const [showerParticles, setShowerParticles] = useState([]);

  const audioCtxRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);

  // Stop mic tracks cleanly
  const stopMicrophone = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsListening(false);
    setBlowLevel(0);
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  const triggerExtinguish = () => {
    setCandlesLit(false);
    setShowBouquet(true);
    stopMicrophone();

    // Puff of celebration confetti when candles blow out
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  // Trigger magical Fullscreen Flower Explosion when bouquet is clicked
  const handleBouquetClick = () => {
    setFlowerShowerActive(true);

    const scalar = 2.4;
    const sunflower = confetti.shapeFromText({ text: '🌻', scalar });
    const rose = confetti.shapeFromText({ text: '🌹', scalar });
    const tulip = confetti.shapeFromText({ text: '🌷', scalar });
    const daisy = confetti.shapeFromText({ text: '🌼', scalar });
    const sakura = confetti.shapeFromText({ text: '🌸', scalar });

    const flowerShapes = [sunflower, rose, tulip, daisy, sakura];

    // Left explosion
    confetti({
      shapes: flowerShapes,
      scalar,
      particleCount: 65,
      spread: 110,
      origin: { x: 0.2, y: 0.5 },
    });

    // Right explosion
    confetti({
      shapes: flowerShapes,
      scalar,
      particleCount: 65,
      spread: 110,
      origin: { x: 0.8, y: 0.5 },
    });

    // Center explosion
    confetti({
      shapes: flowerShapes,
      scalar,
      particleCount: 95,
      spread: 150,
      origin: { x: 0.5, y: 0.4 },
    });

    // Generate full-screen floating flower shower particles
    const flowerEmojis = ['🌻', '🌹', '🌷', '🌼', '🌸', '✨', '💖'];
    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        id: i,
        emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        left: Math.random() * 95,
        size: Math.floor(Math.random() * 20) + 24,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2,
      });
    }
    setShowerParticles(particles);

    setTimeout(() => {
      setFlowerShowerActive(false);
    }, 7000);
  };

  const startMicDetection = async () => {
    setMicError(null);
    setBlowStatusText('Calibrating background noise...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStreamRef.current = stream;
      setIsListening(true);

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3; // Fast responsiveness
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let calibrationFrames = 0;
      let ambientSum = 0;
      let ambientBaseline = 15;
      let sustainedBlowFrames = 0;

      // Sensitivity thresholds & sustained frame requirements (70% higher sensitivity)
      const modeConfig = {
        strong: { minEnergy: 20, requiredFrames: 5, maxMeterScale: 45 },       // High Sensitivity (70% Boosted)
        extraStrong: { minEnergy: 35, requiredFrames: 7, maxMeterScale: 65 },  // Medium Sensitivity
        gentle: { minEnergy: 12, requiredFrames: 3, maxMeterScale: 30 },       // Ultra Sensitive
      };

      const checkVolume = () => {
        if (!micStreamRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        // Low frequency wind turbulence (blowing into mic creates heavy low-end energy < 800Hz, bins 1 to 10)
        let lowFreqSum = 0;
        const lowBins = 10;
        for (let i = 1; i <= lowBins; i++) {
          lowFreqSum += dataArray[i];
        }
        const lowFreqAvg = lowFreqSum / lowBins;

        // Calibrate ambient background noise for first 10 frames (~150ms)
        if (calibrationFrames < 10) {
          ambientSum += lowFreqAvg;
          calibrationFrames++;
          if (calibrationFrames === 10) {
            ambientBaseline = Math.max(8, Math.round(ambientSum / 10));
            setBlowStatusText('Mic ready! Blow into your mic to extinguish 🌬️');
          }
          animFrameRef.current = requestAnimationFrame(checkVolume);
          return;
        }

        // Net wind turbulence above background room noise floor
        const netBlowEnergy = Math.max(0, lowFreqAvg - ambientBaseline);
        const activeConfig = modeConfig[sensitivity] || modeConfig.strong;
        
        // Calculate blow meter % (0 - 100%)
        const meterPercent = Math.min(100, Math.round((netBlowEnergy / activeConfig.maxMeterScale) * 100));
        setBlowLevel(meterPercent);

        // Update real-time feedback label
        if (netBlowEnergy >= activeConfig.minEnergy) {
          setBlowStatusText('STRONG BLOW DETECTED! Keep blowing! 🌬️🔥');
        } else if (netBlowEnergy > activeConfig.minEnergy * 0.5) {
          setBlowStatusText('Blow harder directly into the microphone! 💨');
        } else {
          setBlowStatusText('Listening... Take a deep breath & blow hard! 🌬️');
        }

        // Require sustained strong blowing for continuous frames before extinguishing
        if (netBlowEnergy >= activeConfig.minEnergy) {
          sustainedBlowFrames++;
          if (sustainedBlowFrames >= activeConfig.requiredFrames) { // Requires ~250-350ms of strong continuous blowing
            triggerExtinguish();
            return;
          }
        } else {
          sustainedBlowFrames = Math.max(0, sustainedBlowFrames - 1);
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.error("Microphone access error or denied:", err);
      setMicError("Microphone access denied or not supported. Use the tap button below to blow out candles!");
      setIsListening(false);
    }
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowBouquet(false);
    setFlowerShowerActive(false);
    setMicError(null);
  };

  return (
    <section id="cake" className="py-16 px-4 max-w-4xl mx-auto space-y-10 relative">
      
      {/* Full-Screen Floating Flower Explosion Shower */}
      {flowerShowerActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none" aria-hidden="true">
          {showerParticles.map((p) => (
            <div
              key={p.id}
              style={{
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
              className="absolute -top-12 animate-float-up opacity-90 drop-shadow-lg"
            >
              {p.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <Cake className="w-3.5 h-3.5" />
          Birthday Ritual
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {cake.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {candlesLit ? cake.instructionMic : cake.wishedHeader}
        </p>
      </div>

      {/* Main Stage */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-8 sm:p-12 shadow-xl text-center space-y-8 relative overflow-hidden">
        
        {/* Glow Aura */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full transition-opacity duration-700 pointer-events-none ${
          candlesLit ? 'bg-amber-200/40 blur-3xl opacity-100' : 'bg-pink-200/20 blur-3xl opacity-40'
        }`} />

        {/* Animated Cake */}
        <div className="relative z-10 py-4 flex flex-col items-center justify-center">
          
          {/* Candles Container */}
          <div className="flex gap-4 sm:gap-6 mb-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                
                {/* Flame */}
                {candlesLit ? (
                  <div className="w-4 h-6 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full animate-candle shadow-lg shadow-amber-300/50 mb-0.5 relative">
                    <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xs animate-ping opacity-75" />
                  </div>
                ) : (
                  <div className="w-2 h-4 mb-0.5 flex flex-col items-center opacity-60 animate-fadeOut">
                    <span className="w-1 h-3 bg-gray-400/80 rounded-full blur-xs" />
                  </div>
                )}

                {/* Candle Wick */}
                <div className="w-1 h-2 bg-gray-700" />
                
                {/* Candle Stick */}
                <div className="w-3.5 h-12 bg-gradient-to-b from-pink-300 to-rose-400 rounded-t-sm shadow-xs border-x border-pink-400/40" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="w-48 sm:w-60 h-16 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-t-3xl border-2 border-[#F5D3E0] relative shadow-md flex items-center justify-center">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 flex justify-between px-2">
              <span className="w-6 h-4 bg-white rounded-b-full shadow-xs" />
              <span className="w-8 h-5 bg-white rounded-b-full shadow-xs" />
              <span className="w-6 h-4 bg-white rounded-b-full shadow-xs" />
              <span className="w-8 h-6 bg-white rounded-b-full shadow-xs" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#E86F9A] font-handwriting z-10 pt-2">
              Happy Birthday 💕
            </span>
          </div>

          <div className="w-60 sm:w-72 h-20 bg-gradient-to-r from-[#FCE4ED] via-white to-[#FCE4ED] rounded-b-3xl border-2 border-[#F5D3E0] shadow-xl relative flex items-center justify-center">
            <div className="flex gap-4">
              <Heart className="w-5 h-5 text-[#E86F9A] fill-[#E86F9A]" />
              <Sparkles className="w-5 h-5 text-[#E86F9A]" />
              <Heart className="w-5 h-5 text-[#E86F9A] fill-[#E86F9A]" />
            </div>
          </div>

          {/* Cake Stand Base */}
          <div className="w-72 sm:w-84 h-4 bg-white border-2 border-[#F5D3E0] rounded-full shadow-md mt-1" />
          <div className="w-24 h-6 bg-[#FCE4ED] border-x-2 border-b-2 border-[#F5D3E0] rounded-b-xl" />
        </div>

        {/* Interaction Controls */}
        {candlesLit ? (
          <div className="space-y-4 max-w-md mx-auto relative z-10">
            
            {/* Active Blowing Meter */}
            {isListening && (
              <div className="space-y-3 bg-[#FFF5F8] p-4 rounded-2xl border border-[#F5D3E0] animate-fadeIn text-left shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-[#D84B79]">
                  <span className="flex items-center gap-1.5">
                    <Wind className={`w-4 h-4 text-[#E86F9A] ${blowLevel > 40 ? 'animate-spin' : ''}`} />
                    <span>{blowStatusText}</span>
                  </span>
                  <span className="font-mono text-sm">{blowLevel}%</span>
                </div>

                {/* Progress Bar with Target Marker */}
                <div className="relative w-full bg-white h-4 rounded-full overflow-hidden border border-[#F5D3E0] p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-75 shadow-sm ${
                      blowLevel >= 65 ? 'bg-gradient-to-r from-[#E86F9A] to-rose-600' : 'bg-[#E86F9A]'
                    }`}
                    style={{ width: `${blowLevel}%` }}
                  />
                </div>

                {/* Mic Sensitivity Mode selector */}
                <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-[#8C6A7D] gap-2">
                  <span className="flex items-center gap-1 font-semibold">
                    <Sliders className="w-3 h-3 text-[#E86F9A]" /> Mode:
                  </span>
                  <div className="flex gap-1.5">
                    {[
                      { key: 'strong', label: 'Strong Blow (Default)' },
                      { key: 'extraStrong', label: 'Extra Strong' },
                      { key: 'gentle', label: 'Gentle' },
                    ].map((m) => (
                      <button
                        key={m.key}
                        onClick={() => setSensitivity(m.key)}
                        className={`px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                          sensitivity === m.key
                            ? 'bg-[#E86F9A] text-white shadow-xs'
                            : 'bg-white border border-[#F5D3E0] text-[#493744] hover:bg-[#FCE4ED]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {micError && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{micError}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!isListening && (
                <button
                  onClick={startMicDetection}
                  className="px-6 py-3.5 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>{cake.micButtonText}</span>
                </button>
              )}

              <button
                onClick={triggerExtinguish}
                className="px-6 py-3.5 bg-white hover:bg-[#FFF5F8] text-[#493744] font-bold rounded-2xl border-2 border-[#F5D3E0] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E86F9A]" />
                <span>{cake.fallbackButtonText}</span>
              </button>
            </div>

          </div>
        ) : (
          /* Bouquet & Flower Explosion Section */
          <div className="space-y-6 max-w-lg mx-auto animate-fadeIn relative z-10">
            
            {/* Interactive Flower Bouquet Card */}
            <div
              onClick={handleBouquetClick}
              className="p-6 sm:p-8 bg-gradient-to-br from-[#FFF5F8] via-white to-[#FCE4ED] rounded-3xl border-2 border-[#E86F9A] shadow-xl space-y-4 text-center relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group"
              role="button"
              tabIndex={0}
              aria-label="Tap the bouquet to fill the screen with flowers"
            >
              <div className="absolute top-2 right-3 text-xs font-bold text-[#E86F9A] flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full border border-[#F5D3E0] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E86F9A]" /> Tap Me!
              </div>

              {/* Bouquet Graphic Illustration */}
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center bg-white rounded-full border-2 border-[#F5D3E0] shadow-inner group-hover:rotate-6 transition-transform">
                <span className="text-6xl select-none animate-bounce" style={{ animationDuration: '2s' }}>
                  🌻
                </span>
                <span className="absolute top-2 left-2 text-3xl">🌹</span>
                <span className="absolute top-2 right-2 text-3xl">🌷</span>
                <span className="absolute bottom-2 left-4 text-3xl">🌼</span>
                <span className="absolute bottom-2 right-4 text-3xl">🌸</span>
              </div>

              {/* Bouquet Prompt */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#493744] font-handwriting">
                  Special Sunflower & Rose Bouquet 🌻🌹
                </h3>
                <p className="text-xs sm:text-sm text-[#8C6A7D] font-medium leading-relaxed">
                  {cake.bouquetPrompt}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E86F9A] text-white text-xs font-bold shadow-md group-hover:bg-[#D84B79] transition-colors">
                  <Flower2 className="w-4 h-4 animate-spin" />
                  <span>Bloom Screen with Flowers ✨</span>
                </span>
              </div>
            </div>

            {/* Custom Wish Note Card */}
            <div className="p-6 bg-white rounded-3xl border-2 border-[#F5D3E0] shadow-md space-y-3 text-center">
              <h4 className="text-2xl font-bold text-[#493744] font-handwriting">
                {cake.wishedHeader}
              </h4>
              <p className="text-sm text-[#493744] leading-relaxed font-sans-rounded font-medium">
                {cake.wishedMessage}
              </p>
              {cake.customWishNote && (
                <div className="pt-3 border-t border-[#F5D3E0] text-xs sm:text-sm text-[#D84B79] font-handwriting text-lg bg-[#FFF5F8] p-3 rounded-2xl border border-[#F5D3E0]">
                  {cake.customWishNote}
                </div>
              )}
            </div>

            <button
              onClick={relightCandles}
              className="text-xs font-bold text-[#D84B79] underline hover:text-[#E86F9A] transition-colors cursor-pointer"
            >
              Relight candles 🕯️
            </button>

          </div>
        )}

      </div>

    </section>
  );
}
