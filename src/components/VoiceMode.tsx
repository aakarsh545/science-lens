import React, { useEffect, useState, useRef } from 'react';
import { Mic, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceModeProps {
  text?: string;
  isProUser?: boolean;
  onTranscribe?: (text: string) => void;
}

const VOICE_PREF_KEY = 'science_voice_enabled';

export function VoiceMode({ text = '', isProUser = false, onTranscribe }: VoiceModeProps) {
  const [listening, setListening] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem(VOICE_PREF_KEY) || 'true'); } catch { return true; }
  });
  type Recognition = { start: () => void; stop: () => void };
  const recognitionRef = useRef<Recognition | null>(null);

  useEffect(() => {
    localStorage.setItem(VOICE_PREF_KEY, JSON.stringify(enabled));
  }, [enabled]);

  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return;
    try {
      const instance: any = new SpeechRec();
      instance.lang = 'en-US';
      instance.interimResults = false;
      instance.maxAlternatives = 1;
      instance.onresult = (ev: any) => {
        const results = ev?.results;
        const transcript = results?.[0]?.[0]?.transcript ?? '';
        if (onTranscribe && transcript) onTranscribe(String(transcript));
      };
      instance.onend = () => setListening(false);
      recognitionRef.current = instance;
    } catch (err) {
      // ignore unavailable or unsafe constructor
      recognitionRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleListen = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (e) {
        setListening(false);
      }
    }
  };

  const speak = (t?: string) => {
    const textToSpeak = t || text || 'Science Lens ready.';
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    utter.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant={enabled ? 'default' : 'ghost'} size="sm" onClick={() => setEnabled(!enabled)}>
        <Volume2 className="mr-2 h-4 w-4" />
        {enabled ? 'Voice On' : 'Voice Off'}
      </Button>
      <Button size="sm" onClick={toggleListen} className={listening ? 'bg-red-500 text-white' : ''}>
        <Mic className="mr-2 h-4 w-4" />
        {listening ? 'Listening...' : 'Mic'}
      </Button>
      <Button size="sm" onClick={() => speak()}>
        <X className="mr-2 h-4 w-4" />
        Speak
      </Button>
    </div>
  );
}

export default VoiceMode;

