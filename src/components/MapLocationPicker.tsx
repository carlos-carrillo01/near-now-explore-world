
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin, Search } from 'lucide-react';

interface MapLocationPickerProps {
  onLocationSelect: (location: string, coordinates: [number, number]) => void;
}

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
      initializeMap();
    }
  };

  const initializeMap = async () => {
    try {
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      
      if (!mapRef.current) return;

      mapboxgl.default.accessToken = apiKey;
      
      const mapInstance = new mapboxgl.default.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-99.1332, 19.4326], // Mexico City
        zoom: 10
      });

      // Add click handler
      mapInstance.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        
        try {
          // Reverse geocoding to get address
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`
          );
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            const place = data.features[0];
            const locationName = place.place_name;
            setSelectedLocation(locationName);
            onLocationSelect(locationName, [lat, lng]);
            
            // Add marker
            new mapboxgl.default.Marker()
              .setLngLat([lng, lat])
              .addTo(mapInstance);
          }
        } catch (error) {
          console.error('Error getting location name:', error);
          const locationName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setSelectedLocation(locationName);
          onLocationSelect(locationName, [lat, lng]);
        }
      });

      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !apiKey) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${apiKey}&limit=1`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [lng, lat] = feature.center;
        const locationName = feature.place_name;
        
        setSelectedLocation(locationName);
        onLocationSelect(locationName, [lat, lng]);
        
        if (map) {
          map.flyTo({ center: [lng, lat], zoom: 14 });
          
          // Clear existing markers and add new one
          const markers = document.querySelectorAll('.mapboxgl-marker');
          markers.forEach(marker => marker.remove());
          
          const mapboxgl = await import('mapbox-gl');
          new mapboxgl.default.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <MapPin className="w-5 h-5 mr-2" />
          Seleccionar Ubicación en Mapa
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showApiInput ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Para usar el mapa, necesitas una clave API de Mapbox. Puedes obtenerla gratis en{' '}
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
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Buscar ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            <div 
              ref={mapRef} 
              className="w-full h-64 rounded-lg border border-border"
              style={{ minHeight: '250px' }}
            />
            
            {selectedLocation && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Ubicación seleccionada:</p>
                <p className="text-sm text-muted-foreground">{selectedLocation}</p>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              Haz clic en el mapa para seleccionar una ubicación o busca una dirección específica.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapLocationPicker;
