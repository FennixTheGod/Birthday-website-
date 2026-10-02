/**
 * Web Audio API Romantic Melody Synthesizer
 * Fallback audio generator that plays soft, dreamy ambient piano/chords
 * when a physical background-music.mp3 file is not provided.
 */

class RomanticAudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.currentStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentStep = 0;

    // Romantic Pentatonic Chord Progression (F major / D minor soft ambient notes)
    const notes = [
      261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
      220.00, 261.63, 329.63, 440.00, // A3, C4, E4, A4
      174.61, 220.00, 261.63, 349.23, // F3, A3, C4, F4
      196.00, 246.94, 293.66, 392.00, // G3, B3, D4, G4
    ];

    const playNote = () => {
      if (!this.isPlaying || !this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft sine wave for dreamy music box / rhodes sound
      osc.type = 'sine';
      
      const freq = notes[this.currentStep % notes.length];
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft attack & long decay
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.6);

      this.currentStep++;
      
      // Schedule next note randomly between 400ms and 800ms for organic gentle rhythm
      const delay = 500 + Math.random() * 300;
      this.timer = setTimeout(playNote, delay);
    };

    playNote();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const romanticSynth = new RomanticAudioSynth();
