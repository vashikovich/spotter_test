import { useContext, useEffect, useMemo, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { fetchRoutingDetails } from "../../services/routingService";
import { Marker, Routing, Stop } from "../../types";
import { latlong } from "../../lib/utils";
import { Map } from "../widgets/Map";
import { StopList } from "../widgets/StopList";
import { ELDEstimate } from "../widgets/ELDEstimate";

const getStopColor = (stop: Stop) => {
  switch (stop.type) {
    case "current":
      return "blue";
    case "pickup":
      return "red";
    case "dropoff":
      return "green";
    case "fueling":
      return "yellow";
    default:
      return "gray";
  }
};

export function RoutingDetails() {
  const { routingQuery } = useContext(MainContext).state;
  const [loading, setLoading] = useState(true);
  const [routingDetails, setRoutingDetails] = useState<Routing | null>(null);
  const [hovered, setHovered] = useState("");

  const markers: Marker[] = useMemo(
    () =>
      routingDetails?.stops.map((stop) => ({
        lat: stop.lat,
        long: stop.long,
        color: getStopColor(stop),
        isLarge: latlong(stop) === hovered,
      })) ?? [],
    [routingDetails?.stops, hovered]
  );

  useEffect(() => {
    if (!routingQuery) return;

    const loadRoutingDetails = async () => {
      try {
        const data = await fetchRoutingDetails(routingQuery);
        setRoutingDetails(data);
      } catch (error) {
        console.error("Error loading routing details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRoutingDetails();
  }, [routingQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!routingDetails) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Callout Bar */}
      <div className="w-full bg-blue-100 p-4 rounded-lg">
        <p className="text-blue-800">
          Route details for delivery from {latlong(routingDetails.stops[0])} to{" "}
          {latlong(routingDetails.stops[routingDetails.stops.length - 1])}
        </p>
      </div>

      {/* Map and Stops Container */}
      <div className="flex gap-4 h-[450px]">
        {/* Map Section */}
        <div className="flex-1 bg-gray-100 rounded-lg">
          <Map markers={markers} route={routingDetails.route} />
        </div>

        {/* Stops List */}
        <StopList stops={routingDetails.stops} setHovered={setHovered} />
      </div>

      {/* ELD */}
      <div>
        <ELDEstimate timeline={routingDetails.timeline} />
      </div>
    </div>
  );
}
