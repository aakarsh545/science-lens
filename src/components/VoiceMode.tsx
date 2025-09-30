import React, { useEffect, useState, useRef } from 'react';
import { Mic, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceModeProps {
  onTranscribe?: (text: string) => void;
}

const VOICE_PREF_KEY = 'science_voice_enabled';

export default function VoiceMode({ onTranscribe }: VoiceModeProps) {
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
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    type SpeechRecConstructor = new () => { lang?: string; interimResults?: boolean; maxAlternatives?: number; onresult?: (ev: Event) => void; onend?: () => void; start: () => void; stop: () => void };
    const Rec = ((window as unknown) as Record<string, unknown>).SpeechRecognition as unknown as SpeechRecConstructor
      || ((window as unknown) as Record<string, unknown>).webkitSpeechRecognition as unknown as SpeechRecConstructor;
    const r = new Rec();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 1;
    type SR = { results?: Array<Array<{ transcript?: string }>> };
    r.onresult = (ev: Event) => {
      const results = (ev as unknown as SR).results;
      const text = results?.[0]?.[0]?.transcript ?? '';
      if (onTranscribe) onTranscribe(text);
    };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
  }, [onTranscribe]);

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

  const speak = (text?: string) => {
    const t = text || 'Science Lens ready.';
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(t);
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

