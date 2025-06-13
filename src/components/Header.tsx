
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary cursor-pointer">
            NearNow
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <button 
                onClick={() => scrollToSection('inicio')}
                className="font-semibold hover:text-primary transition-colors"
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('eventos')}
                className="font-semibold hover:text-primary transition-colors"
              >
                Eventos
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('escaneo')}
                className="font-semibold hover:text-primary transition-colors"
              >
                Escaneo
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('logros')}
                className="font-semibold hover:text-primary transition-colors"
              >
                Logros
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('comunidad')}
                className="font-semibold hover:text-primary transition-colors"
              >
                Comunidad
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="font-semibold hover:text-primary transition-colors"
              >
                Contacto
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="block w-full text-left py-2 font-semibold hover:text-primary transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('eventos')}
                  className="block w-full text-left py-2 font-semibold hover:text-primary transition-colors"
                >
                  Eventos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('escaneo')}
                  className="block w-full text-left py-2 font-semibold hover:text-primary transition-colors"
                >
                  Escaneo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('logros')}
                  className="block w-full text-left py-2 font-semibold hover:text-primary transition-colors"
                >
                  Logros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('comunidad')}
                  className="block w-full text-left py-2 font-semibold hover:text-primary transition-colors"
                >
                  Comunidad
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="block w-full text-left py-2 font-semibold hover:text-primary transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
