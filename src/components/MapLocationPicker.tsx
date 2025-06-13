
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin, Search } from 'lucide-react';

interface MapLocationPickerProps {
  onLocationSelect: (location: string, coordinates: [number, number]) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [placesService, setPlacesService] = useState<any>(null);

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
    script.onload = initializeMap;
    
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 19.4326, lng: -99.1332 }, // Mexico City
      zoom: 10,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });

    const geocoderInstance = new window.google.maps.Geocoder();
    const placesServiceInstance = new window.google.maps.places.PlacesService(mapInstance);

    setMap(mapInstance);
    setGeocoder(geocoderInstance);
    setPlacesService(placesServiceInstance);

    // Add click handler
    mapInstance.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      // Reverse geocoding to get address
      geocoderInstance.geocode(
        { location: { lat, lng } },
        (results: any[], status: string) => {
          if (status === 'OK' && results[0]) {
            const locationName = results[0].formatted_address;
            setSelectedLocation(locationName);
            onLocationSelect(locationName, [lat, lng]);
            updateMarker(lat, lng, locationName);
          } else {
            const locationName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            setSelectedLocation(locationName);
            onLocationSelect(locationName, [lat, lng]);
            updateMarker(lat, lng, locationName);
          }
        }
      );
    });
  };

  const updateMarker = (lat: number, lng: number, title: string) => {
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: title,
      draggable: true,
    });

    // Add drag listener to marker
    newMarker.addListener('dragend', (event: any) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      
      geocoder.geocode(
        { location: { lat: newLat, lng: newLng } },
        (results: any[], status: string) => {
          if (status === 'OK' && results[0]) {
            const locationName = results[0].formatted_address;
            setSelectedLocation(locationName);
            onLocationSelect(locationName, [newLat, newLng]);
          }
        }
      );
    });

    setMarker(newMarker);
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || !geocoder) return;

    geocoder.geocode(
      { address: searchQuery },
      (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const locationName = results[0].formatted_address;
          
          setSelectedLocation(locationName);
          onLocationSelect(locationName, [lat, lng]);
          
          map.setCenter({ lat, lng });
          map.setZoom(14);
          updateMarker(lat, lng, locationName);
        } else {
          console.error('Geocoding failed:', status);
        }
      }
    );
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
                Para usar el mapa, necesitas una clave API de Google Maps. Puedes obtenerla en{' '}
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
              Haz clic en el mapa para seleccionar una ubicación, busca una dirección específica, o arrastra el marcador para ajustar la posición.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapLocationPicker;
