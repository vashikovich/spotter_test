import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapBox } from "mapbox-gl";
import { Coordinate } from "../../types/Location";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface MapProps {
  currentLoc: Coordinate;
  pickupLoc?: Coordinate;
  dropoffLoc?: Coordinate;
}

export function Map({ currentLoc, pickupLoc, dropoffLoc }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapBox | null>(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283], // Geographical center of the USA (approximate)
      zoom: 3,
    });

    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers.length > 0) {
      markers[0].remove();
    }

    const bounds = new mapboxgl.LngLatBounds();

    if (currentLoc) {
        new mapboxgl.Marker({ color: "blue" })
          .setLngLat([currentLoc.long, currentLoc.lat])
          .addTo(mapRef.current);
        bounds.extend([currentLoc.long, currentLoc.lat]);
      }

    if (pickupLoc) {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat([pickupLoc.long, pickupLoc.lat])
        .addTo(mapRef.current);
      bounds.extend([pickupLoc.long, pickupLoc.lat]);
    }

    if (dropoffLoc) {
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([dropoffLoc.long, dropoffLoc.lat])
        .addTo(mapRef.current);
      bounds.extend([dropoffLoc.long, dropoffLoc.lat]);
    }

    // Only fit bounds if we have at least one marker
    if (pickupLoc || dropoffLoc) {
      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }
  }, [pickupLoc, dropoffLoc, currentLoc]);

  return <div ref={mapContainerRef} className="w-full h-full overflow-hidden" />;
}
