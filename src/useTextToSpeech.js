import { useState, useEffect } from 'react';

const useTextToSpeech = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        setVoices(voices);
      }
    };

    loadVoices(); // Initial load

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices; // Update voices when available voices change
    }
  }, []);

  const speak = (state, voice) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(state.text);
    utterance.voice = voice;
    synth.speak(utterance);
  };

  return {
    voices,
    speak,
    pause: () => window.speechSynthesis.pause(),
    resume: () => window.speechSynthesis.resume(),
    cancel: () => window.speechSynthesis.cancel(),
  };
};

export default useTextToSpeech;
