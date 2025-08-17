import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Atom, Microscope, MessageCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface PhotoUploadProps {
  onPhotoUpload: (file: File, question: string) => void;
  isAnalyzing: boolean;
}

export const PhotoUpload = ({ onPhotoUpload, isAnalyzing }: PhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadedFile(file);
    }
  }, []);

  const handleAnalyze = () => {
    if (uploadedFile) {
      onPhotoUpload(uploadedFile, question);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setUploadedFile(null);
    setQuestion('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-8 bg-gradient-subtle border-primary/20">
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer 
            transition-smooth hover:border-primary hover:bg-primary/5
            ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-border'}
            ${isAnalyzing ? 'pointer-events-none opacity-70' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isAnalyzing} />
          
          {previewUrl ? (
            <div className="space-y-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-64 mx-auto rounded-lg shadow-science"
              />
              {!isAnalyzing && (
                <p className="text-muted-foreground">
                  Great! Click here or drag another photo to try something new! 🔬
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <Atom className="w-8 h-8 text-primary animate-float" />
                <Upload className="w-12 h-12 text-primary" />
                <Microscope className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {isDragActive ? "Drop your photo here! 🚀" : "Upload a Photo to Explore! 📸"}
                </h3>
                <p className="text-muted-foreground">
                  Drag and drop any image, or click to browse your files
                </p>
                <p className="text-sm text-muted-foreground">
                  Try photos of: plants 🌱, experiments 🧪, objects 🔍, or anything curious!
                </p>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-foreground font-medium">Analyzing your photo... 🔬</p>
              </div>
            </div>
          )}
        </div>

        {!previewUrl && (
          <div className="mt-6 text-center">
            <Button variant="hero" size="lg">
              <Image className="w-5 h-5" />
              Choose Photo
            </Button>
          </div>
        )}
      </Card>

      {/* Question Input */}
      {previewUrl && (
        <Card className="bg-gradient-subtle border-primary/20 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                What would you like to know? 💭
              </h3>
            </div>
            <Textarea
              placeholder="Ask anything about your photo! For example: 'What type of plant is this?', 'How does this work?', 'What's happening here scientifically?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] resize-none border-primary/20 focus:border-primary/40"
              disabled={isAnalyzing}
            />
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {previewUrl && (
        <div className="flex justify-center space-x-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="font-semibold"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Analyzing Magic... ✨
              </>
            ) : (
              <>
                <Microscope className="w-5 h-5" />
                Discover the Science! 🔬
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleReset}
            disabled={isAnalyzing}
          >
            <RotateCcw className="w-5 h-5" />
            Try Different Photo
          </Button>
        </div>
      )}
    </div>
  );
};