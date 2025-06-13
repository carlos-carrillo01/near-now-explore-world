
import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToEvents = () => {
    const element = document.getElementById('eventos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Explora tu mundo,<br />
          <span className="text-blue-200">un escaneo a la vez.</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
          Descubre eventos, arte y experiencias en tiempo real al alcance de tu mano.
        </p>
        <Button 
          onClick={scrollToEvents}
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Comienza a explorar
        </Button>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;
