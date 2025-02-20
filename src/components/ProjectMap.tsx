import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your actual Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUta2V5LTEyMzQ1Njc4OTAifQ.example-signature';

const ProjectMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();
  const { projects } = useProjectStore();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 3
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    projects.forEach(project => {
      const marker = new mapboxgl.Marker({
        color: project.status === 'completed' ? '#10B981' : 
               project.status === 'in-progress' ? '#F59E0B' : '#6366F1'
      })
        .setLngLat([project.location.lng, project.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-4">
                <h3 class="text-lg font-bold mb-2">${project.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${project.location.address}</p>
                <p class="text-sm mb-3">
                  <span class="inline-block px-2 py-1 rounded-full text-xs ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }">
                    ${project.status}
                  </span>
                </p>
                <button
                  onclick="window.location.href='/project/${project.id}'"
                  class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors w-full"
                >
                  View Details
                </button>
              </div>
            `)
        )
        .addTo(map.current);

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers if there are any
    if (projects.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      projects.forEach(project => {
        bounds.extend([project.location.lng, project.location.lat]);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    }
  }, [projects, mapLoaded]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Map</h1>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-sm text-gray-600">Planning</span>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg overflow-hidden">
        <div ref={mapContainer} className="h-full w-full" />
      </div>
    </div>
  );
};

export default ProjectMap;