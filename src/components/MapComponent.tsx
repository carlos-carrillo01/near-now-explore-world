import React, { useEffect, useRef, useState } from 'react';
import { Event } from './EventsSection';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  events: Event[];
}

const MapComponent: React.FC<MapComponentProps> = ({ events }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
      initializeMap();
    }
  };

  const initializeMap = async () => {
    try {
      const mapboxgl = await import('mapbox-gl');
      
      if (!mapRef.current) return;

      mapboxgl.default.accessToken = apiKey;
      
      const mapInstance = new mapboxgl.default.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-99.1332, 19.4326], // Mexico City default
        zoom: 5
      });

      mapInstance.on('load', () => {
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
              
              // Center map on user location
              mapInstance.flyTo({
                center: [longitude, latitude],
                zoom: 12
              });

              // Add user location marker
              new mapboxgl.default.Marker({ color: 'red' })
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.default.Popup().setHTML('<strong>Tu ubicación</strong>'))
                .addTo(mapInstance);
            },
            (error) => {
              console.warn('Error getting user location:', error);
            }
          );
        }

        // Add event markers
        events.forEach((event) => {
          if (event.coordinates) {
            const [lat, lng] = event.coordinates;
            
            const popup = new mapboxgl.default.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-sm">${event.title}</h3>
                <p class="text-xs text-gray-600">${event.category} | ${event.date} ${event.time}</p>
                <p class="text-xs text-gray-600">${event.location}</p>
                ${event.description ? `<p class="text-xs mt-1">${event.description}</p>` : ''}
              </div>
            `);

            new mapboxgl.default.Marker({ color: 'blue' })
              .setLngLat([lng, lat])
              .setPopup(popup)
              .addTo(mapInstance);
          }
        });
      });

      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  // Update markers when events change
  useEffect(() => {
    if (map && !showApiInput) {
      // Clear existing event markers (keep user marker)
      const markers = document.querySelectorAll('.mapboxgl-marker[style*="blue"]');
      markers.forEach(marker => marker.remove());
      
      // Add new event markers
      events.forEach((event) => {
        if (event.coordinates) {
          const [lat, lng] = event.coordinates;
          
          import('mapbox-gl').then(mapboxgl => {
            const popup = new mapboxgl.default.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-sm">${event.title}</h3>
                <p class="text-xs text-gray-600">${event.category} | ${event.date} ${event.time}</p>
                <p class="text-xs text-gray-600">${event.location}</p>
                ${event.description ? `<p class="text-xs mt-1">${event.description}</p>` : ''}
              </div>
            `);

            new mapboxgl.default.Marker({ color: 'blue' })
              .setLngLat([lng, lat])
              .setPopup(popup)
              .addTo(map);
          });
        }
      });
    }
  }, [map, events, showApiInput]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Mapa de Eventos en Tiempo Real
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showApiInput ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Para mostrar el mapa en tiempo real, necesitas una clave API de Mapbox. Puedes obtenerla gratis en{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Ingresa tu Mapbox API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button onClick={handleApiKeySubmit}>
                Activar Mapa
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div 
              ref={mapRef} 
              className="w-full h-96 rounded-lg border border-border"
            />
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Tu ubicación</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Eventos</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapComponent;
