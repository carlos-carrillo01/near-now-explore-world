
import React from 'react';
import { Button } from './ui/button';
import { QrCode, Camera } from 'lucide-react';

interface ArtScanSectionProps {
  onOpenScan: () => void;
}

const ArtScanSection: React.FC<ArtScanSectionProps> = ({ onOpenScan }) => {
  return (
    <section id="escaneo" className="container mx-auto px-4 py-16 reveal">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Escaneo de Arte y Códigos QR
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Escanea arte o códigos QR para descubrir historias animadas e información detrás del lugar o la obra.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
            <QrCode className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Códigos QR</h3>
            <p className="text-muted-foreground">
              Encuentra códigos QR en lugares históricos y eventos para acceder a contenido exclusivo.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
            <Camera className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Reconocimiento de Arte</h3>
            <p className="text-muted-foreground">
              Usa la cámara para identificar obras de arte y descubrir su historia y contexto.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={onOpenScan}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          <Camera className="w-5 h-5 mr-2" />
          Escanear ahora
        </Button>
      </div>
    </section>
  );
};

export default ArtScanSection;
