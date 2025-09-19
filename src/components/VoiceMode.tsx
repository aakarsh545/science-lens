import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VoiceModeProps {
  text: string;
  isProUser?: boolean;
}

const voices = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral and clear' },
  { id: 'echo', name: 'Echo', description: 'Warm and engaging' },
  { id: 'fable', name: 'Fable', description: 'Expressive storyteller' },
  { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
  { id: 'nova', name: 'Nova', description: 'Bright and energetic' },
  { id: 'shimmer', name: 'Shimmer', description: 'Soft and gentle' },
];

export const VoiceMode: React.FC<VoiceModeProps> = ({ text, isProUser = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const { toast } = useToast();

  const handlePlayPause = async () => {
    if (!isProUser) {
      toast({
        title: "Pro Feature",
        description: "Voice mode is available for Pro users. Upgrade to unlock!",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (currentAudio && !currentAudio.ended) {
      currentAudio.play();
      setIsPlaying(true);
      return;
    }

    try {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please log in to use voice mode');
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text: text.substring(0, 4000), // Limit text length
          voice: selectedVoice 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.audioContent) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          setIsPlaying(false);
          toast({
            title: "Playback Error",
            description: "Failed to play audio. Please try again.",
            variant: "destructive",
          });
        };

        setCurrentAudio(audio);
        audio.play();
      }
    } catch (error: any) {
      console.error('Voice mode error:', error);
      toast({
        title: "Voice Error",
        description: error.message || "Failed to generate speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (!text.trim()) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border"
    >
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayPause}
          disabled={loading}
          className={`h-8 w-8 ${!isProUser ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin border-2 border-primary border-t-transparent rounded-full" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        {isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            onClick={stopAudio}
            className="h-8 w-8"
          >
            <VolumeX className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 flex items-center space-x-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {isProUser ? 'Voice Mode' : 'Voice Mode (Pro Only)'}
        </span>
      </div>

      {isProUser && (
        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.id} value={voice.id} className="text-xs">
                <div>
                  <div className="font-medium">{voice.name}</div>
                  <div className="text-xs text-muted-foreground">{voice.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </motion.div>
  );
};