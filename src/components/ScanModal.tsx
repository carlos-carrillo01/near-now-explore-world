
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Camera, QrCode, X } from 'lucide-react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <QrCode className="w-5 h-5 mr-2" />
            Simulador de Escaneo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <Camera className="w-16 h-16 text-blue-600" />
            </div>
            <p className="text-muted-foreground">
              Gracias por escanear la obra. Aquí aparecería una animación o historia explicativa del lugar o arte escaneado.
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Obra detectada: "Mural de la Independencia"</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Este mural fue creado en 1950 por el artista Diego Rivera y representa los momentos clave 
              de la independencia mexicana. La obra combina técnicas tradicionales con elementos modernos.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Historia</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Arte Mexicano</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Siglo XX</span>
            </div>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanModal;
