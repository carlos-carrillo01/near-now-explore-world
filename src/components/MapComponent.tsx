
import React, { useEffect, useRef, useState } from 'react';
import { Event } from './EventsSection';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  events: Event[];
}

declare global {
  interface Window {
    google: any;
    initGoogleMap: () => void;
  }
}

const MapComponent: React.FC<MapComponentProps> = ({ events }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [eventMarkers, setEventMarkers] = useState<any[]>([]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
      loadGoogleMapsScript();
    }
  };

  const loadGoogleMapsScript = () => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    window.initGoogleMap = initializeMap;
    script.onload = initializeMap;
    
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 19.4326, lng: -99.1332 }, // Mexico City default
      zoom: 5,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });

    setMap(mapInstance);

    // Get user location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newUserLocation: [number, number] = [latitude, longitude];
          setUserLocation(newUserLocation);
          
          // Center map on user location
          mapInstance.setCenter({ lat: latitude, lng: longitude });
          mapInstance.setZoom(12);

          // Update or create user location marker
          if (userMarker) {
            userMarker.setPosition({ lat: latitude, lng: longitude });
          } else {
            const marker = new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: mapInstance,
              title: 'Tu ubicación',
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(32, 32),
              },
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: '<strong>Tu ubicación actual</strong>',
            });

            marker.addListener('click', () => {
              infoWindow.open(mapInstance, marker);
            });

            setUserMarker(marker);
          }
        },
        (error) => {
          console.warn('Error getting user location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Store watchId to clear it later if needed
      return () => navigator.geolocation.clearWatch(watchId);
    }
  };

  // Update event markers when events change
  useEffect(() => {
    if (map && window.google) {
      // Clear existing event markers
      eventMarkers.forEach(marker => marker.setMap(null));
      const newMarkers: any[] = [];

      // Add new event markers
      events.forEach((event) => {
        if (event.coordinates) {
          const [lat, lng] = event.coordinates;
          
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: event.title,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(32, 32),
            },
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${event.title}</h3>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${event.category} | ${event.date} ${event.time}</p>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${event.location}</p>
                ${event.description ? `<p style="margin: 0; font-size: 12px;">${event.description}</p>` : ''}
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          newMarkers.push(marker);
        }
      });

      setEventMarkers(newMarkers);
    }
  }, [map, events]);

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
              Para mostrar el mapa en tiempo real, necesitas una clave API de Google Maps. Puedes obtenerla en{' '}
              <a href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Cloud Console
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Ingresa tu Google Maps API Key"
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
                <span>Tu ubicación (tiempo real)</span>
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
