import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icons for production
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ resources }) => {
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    // Initialize the map centered on Los Angeles
    mapRef.current = L.map('map').setView([34.0522, -118.2437], 11);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Create a layer group for markers
    markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    // Update markers when resources change
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      resources
      .filter((resource) => resource.lat !== undefined && resource.long !== undefined) // Validate lat and lng
      .forEach((resource) => {
        const marker = L.marker([resource.lat, resource.long]);
        marker.bindPopup(
          `<strong>${resource.name || 'Unknown Name'}</strong><br>${resource.address || 'Unknown Address'}<br><br>${resource.providing || 'Providing Unknown'}`
        );
        markersLayerRef.current.addLayer(marker);
      });
    }
  }, [resources]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;
