import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapBox } from "mapbox-gl";
import { Marker, Coordinate } from "../../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface MapProps {
  markers?: Marker[];
  route?: Coordinate[]; // Add route prop
}

export function Map({ markers, route }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapBox | null>(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283], // Geographical center of the USA (approximate)
      zoom: 3,
    });
    mapRef.current.on("load", handleLoad);

    return () => {
      mapRef.current?.off("load", handleLoad);
      mapRef.current?.remove();
    };
  }, [handleLoad]);

  useEffect(() => {
    if (!mapRef.current || !loaded) return;

    // Remove existing markers
    const existingMarkers = document.getElementsByClassName("mapboxgl-marker");
    while (existingMarkers.length > 0) {
      existingMarkers[0].remove();
    }

    if (!markers?.length) return;

    const bounds = new mapboxgl.LngLatBounds();

    for (const marker of markers) {
      new mapboxgl.Marker({
        color: marker.color,
        scale: marker.isLarge ? 1.5 : 1,
      })
        .setLngLat([marker.long, marker.lat])
        .addTo(mapRef.current);
      bounds.extend([marker.long, marker.lat]);
    }

    // Only fit bounds if we have at least two marker
    if (existingMarkers.length > 1) {
      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }
  }, [markers, loaded]);

  useEffect(() => {
    if (!mapRef.current || !loaded || !route?.length) return;

    const routeCoordinates = route.map((coord) => [coord.long, coord.lat]);
    const routeGeoJSON: GeoJSON.GeoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: routeCoordinates,
      },
      properties: {},
    };

    if (mapRef.current.getSource("route")) {
      (mapRef.current.getSource("route") as mapboxgl.GeoJSONSource).setData(
        routeGeoJSON
      );
    } else {
      mapRef.current.addSource("route", {
        type: "geojson",
        data: routeGeoJSON,
      });

      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "blue",
          "line-width": 6,
        },
      });
    }
  }, [loaded, route]);

  return (
    <div ref={mapContainerRef} className="w-full h-full overflow-hidden" />
  );
}
