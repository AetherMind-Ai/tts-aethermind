import React, { useState, useEffect } from 'react';
import './style.css';
import useTextToSpeech from './useTextToSpeech';

export default function App() {
  const [text, setText] = useState("Type Any Thing.");
  const [voice, setVoice] = useState(null);
  const { voices, speak, pause, resume, cancel } = useTextToSpeech();

  useEffect(() => {
    if (voices.length > 0) {
      setVoice(voices[0]);
    }
  }, [voices]);

  const onClick = () => {
    if (voice) {
      speak({ text }, voice);
    }
  };

  const onVoiceChange = (e) => {
    const selectedVoice = voices.find((v) => v.name === e.target.value);
    setVoice(selectedVoice);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <main>
      <h1>Text To Speech</h1>
      <textarea rows="8" cols="72" value={text} onChange={onTextChange} />
      <select value={voice?.name} onChange={onVoiceChange}>
        <option value="">Select Voice</option>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <section>
        <button onClick={onClick}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button onClick={cancel}>Cancel</button>
      </section>
    </main>
  );
}
