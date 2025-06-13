
import React, { useState } from 'react';
import { Event } from './EventsSection';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import MapLocationPicker from './MapLocationPicker';

interface EventFormProps {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    coordinates: undefined as [number, number] | undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.category) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    onAddEvent({
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      description: formData.description,
      coordinates: formData.coordinates
    });

    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      category: '',
      description: '',
      coordinates: undefined
    });

    toast.success('Evento publicado con éxito. Gracias por contribuir.');
  };

  const handleLocationSelect = (location: string, coordinates: [number, number]) => {
    setFormData(prev => ({
      ...prev,
      location,
      coordinates
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto mb-12">
      <CardHeader>
        <CardTitle className="text-2xl">Publica tu Evento</CardTitle>
        <p className="text-muted-foreground">
          ¿Eres anfitrión? Llena el formulario para publicar tu evento.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Nombre del evento"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Hora *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Ubicación *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Ciudad, lugar..."
              required
            />
            <p className="text-sm text-muted-foreground mt-1">
              Puedes seleccionar la ubicación en el mapa a continuación
            </p>
          </div>

          <MapLocationPicker onLocationSelect={handleLocationSelect} />

          <div>
            <Label htmlFor="category">Categoría *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Selecciona categoría</option>
              <option value="Cultural">Cultural</option>
              <option value="Música">Música</option>
              <option value="Arte">Arte</option>
              <option value="Mercado">Mercado</option>
              <option value="Deportes">Deportes</option>
              <option value="Gastronomía">Gastronomía</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción breve del evento"
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Publicar Evento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
