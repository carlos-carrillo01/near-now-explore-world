
import React from 'react';
import { Event } from './EventsSection';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, MapPin, Calendar } from 'lucide-react';

interface EventListProps {
  events: Event[];
  filter: string;
  onFilterChange: (filter: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, filter, onFilterChange }) => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <label htmlFor="eventFilter" className="block text-sm font-medium mb-2">
          Filtrar por fecha:
        </label>
        <select 
          id="eventFilter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="hoy">Hoy</option>
          <option value="mañana">Mañana</option>
          <option value="todos">Todos</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No hay eventos para esta fecha.
          </div>
        ) : (
          events.map(event => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                
                {event.description && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
