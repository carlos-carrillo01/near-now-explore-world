
import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import EventCalendar from './EventCalendar';
import MapComponent from './MapComponent';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description?: string;
  coordinates?: [number, number];
}

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Festival de Danza en Oaxaca',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      location: 'Oaxaca',
      category: 'Cultural',
      description: 'Festival anual de danza tradicional',
      coordinates: [17.0732, -96.7266]
    },
    {
      id: 2,
      title: 'Concierto de Música Tradicional',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '20:30',
      location: 'Ciudad de México',
      category: 'Música',
      description: 'Concierto de grupos locales',
      coordinates: [19.4326, -99.1332]
    },
    {
      id: 3,
      title: 'Exposición de Arte Moderno',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      location: 'Guadalajara',
      category: 'Arte',
      description: 'Galería abierta con artistas emergentes',
      coordinates: [20.6597, -103.3496]
    }
  ]);

  const [filter, setFilter] = useState('hoy');

  const addEvent = (newEvent: Omit<Event, 'id'>) => {
    const event: Event = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id), 0) + 1
    };
    setEvents(prev => [...prev, event]);
  };

  const getFilteredEvents = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    switch (filter) {
      case 'hoy':
        return events.filter(event => event.date === todayStr);
      case 'mañana':
        return events.filter(event => event.date === tomorrowStr);
      default:
        return events;
    }
  };

  return (
    <section id="eventos" className="container mx-auto px-4 py-16 reveal">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explorar Eventos Cercanos
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Filtra los eventos que suceden hoy o mañana cerca de ti y descubre nuevas experiencias.
        </p>
      </div>

      <EventList 
        events={getFilteredEvents()} 
        filter={filter}
        onFilterChange={setFilter}
      />

      <EventForm onAddEvent={addEvent} />

      <EventCalendar events={events} />

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Mapa de ubicación en tiempo real
        </h3>
        <p className="text-center text-muted-foreground mb-6">
          Tu ubicación actual y eventos publicados aparecerán en este mapa.
        </p>
        <MapComponent events={events} />
      </div>
    </section>
  );
};

export default EventsSection;
