
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-muted py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground">
          © 2024 NearNow. Todos los derechos reservados.
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Términos de uso
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Privacidad
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
