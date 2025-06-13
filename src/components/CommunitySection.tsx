
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Button } from './ui/button';

const CommunitySection = () => {
  const testimonials = [
    {
      name: 'Juan P.',
      avatar: 'JP',
      rating: 5,
      comment: 'Gracias a NearNow descubrí eventos que jamás imaginé visitar. La geolocalización es perfecta y me ha ayudado a conocer mi ciudad de una manera completamente nueva. ¡Muy útil!',
      location: 'Ciudad de México',
      likes: 24
    },
    {
      name: 'Ana M.',
      avatar: 'AM',
      rating: 5,
      comment: 'El sistema de logros me motivó a explorar más lugares. Es increíble cómo cada visita se convierte en una pequeña aventura. ¡Muy divertido y motivante!',
      location: 'Guadalajara',
      likes: 18
    },
    {
      name: 'Carlos R.',
      avatar: 'CR',
      rating: 4,
      comment: 'La función de escaneo de arte es genial. Aprendí tanto sobre murales y esculturas que veía a diario pero nunca conocía su historia. Recomendado 100%.',
      location: 'Puebla',
      likes: 31
    },
    {
      name: 'María L.',
      avatar: 'ML',
      rating: 5,
      comment: 'Como organizadora de eventos, publicar en NearNow me ha ayudado a llegar a más personas locales. La interfaz es súper intuitiva.',
      location: 'Oaxaca',
      likes: 27
    }
  ];

  const communityStats = [
    { label: 'Usuarios activos', value: '15,847' },
    { label: 'Eventos publicados', value: '3,291' },
    { label: 'Obras escaneadas', value: '8,567' },
    { label: 'Ciudades cubiertas', value: '47' }
  ];

  return (
    <section id="comunidad" className="container mx-auto px-4 py-16 reveal">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comunidad y Experiencias
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comparte tus viajes, lee reseñas de otros viajeros y sugiere nuevos lugares para explorar.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {communityStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      {testimonial.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Responder
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¡Únete a la comunidad!</h3>
          <p className="mb-6 opacity-90">
            Comparte tus experiencias, conecta con otros exploradores y descubre los secretos mejor guardados de tu ciudad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Escribir reseña
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              Sugerir lugar
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CommunitySection;
