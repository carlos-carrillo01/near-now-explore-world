
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contacto" className="container mx-auto px-4 py-16 reveal">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Contacto
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿Quieres más información, sugerir algo o necesitas ayuda? Estamos aquí para escucharte.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Email</h3>
            <a 
              href="mailto:contacto@nearnow.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              contacto@nearnow.com
            </a>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Teléfono</h3>
            <a 
              href="tel:+525555123456" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              +52 (55) 5512-3456
            </a>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Chat en vivo</h3>
            <p className="text-muted-foreground">
              Lun - Vie, 9:00 - 18:00
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Oficina</h3>
            <p className="text-muted-foreground">
              Ciudad de México, México
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 max-w-2xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold mb-4 text-center">¿Tienes una sugerencia?</h3>
          <p className="text-muted-foreground text-center mb-6">
            Nos encanta escuchar ideas de nuestra comunidad. Tu feedback nos ayuda a mejorar NearNow para todos.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-blue-800 mb-2">Nuevas funciones</h4>
                <p className="text-sm text-blue-600">
                  Sugiere características que te gustaría ver en NearNow
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-green-800 mb-2">Lugares únicos</h4>
                <p className="text-sm text-green-600">
                  Recomienda sitios especiales que deberíamos incluir
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactSection;
