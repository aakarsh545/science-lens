import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Atom, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PhotoUploadProps {
  onPhotoUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const PhotoUpload = ({ onPhotoUpload, isAnalyzing }: PhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onPhotoUpload(file);
    }
  }, [onPhotoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-gradient-subtle border-primary/20">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer 
          transition-smooth hover:border-primary hover:bg-primary/5
          ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-border'}
          ${isAnalyzing ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />
        
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
  );
};