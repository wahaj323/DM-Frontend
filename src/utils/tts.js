// Text-to-Speech Utility using Browser's Speech Synthesis API

class TTSManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.germanVoice = null;
    this.isInitialized = false;
    
    this.init();
  }

  init() {
    if (this.synth) {
      // Load voices
      this.loadVoices();
      
      // Chrome loads voices asynchronously
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    
    // Find German voice
    this.germanVoice = this.voices.find(voice => 
      voice.lang.startsWith('de-DE') || voice.lang.startsWith('de')
    );

    if (!this.germanVoice && this.voices.length > 0) {
      // Fallback to first available voice
      this.germanVoice = this.voices[0];
    }

    this.isInitialized = true;
  }

  speak(text, options = {}) {
    if (!this.synth || !text) {
      console.warn('Speech synthesis not available or no text provided');
      return;
    }

    // Stop any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice
    if (this.germanVoice) {
      utterance.voice = this.germanVoice;
    }

    // Set options
    utterance.lang = options.lang || 'de-DE';
    utterance.rate = options.rate !== undefined ? options.rate : 0.9;
    utterance.pitch = options.pitch !== undefined ? options.pitch : 1;
    utterance.volume = options.volume !== undefined ? options.volume : 1;

    // Event handlers
    if (options.onStart) {
      utterance.onstart = options.onStart;
    }
    if (options.onEnd) {
      utterance.onend = options.onEnd;
    }
    if (options.onError) {
      utterance.onerror = options.onError;
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  pause() {
    if (this.synth) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }

  getVoices() {
    return this.voices;
  }

  getGermanVoices() {
    return this.voices.filter(voice => 
      voice.lang.startsWith('de-DE') || voice.lang.startsWith('de')
    );
  }
}

// Create singleton instance
const ttsManager = new TTSManager();

export default ttsManager;