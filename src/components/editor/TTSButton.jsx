import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import ttsManager from '../../utils/tts';

const TTSButton = ({ text, rate = 0.9, pitch = 1, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (isPlaying) {
      ttsManager.stop();
      setIsPlaying(false);
    } else {
      ttsManager.speak(text, {
        rate,
        pitch,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      });
    }
  };

  if (!text) return null;

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center p-2 rounded-lg transition ${
        isPlaying
          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      title={isPlaying ? 'Stop' : 'Listen'}
    >
      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
};

export default TTSButton;