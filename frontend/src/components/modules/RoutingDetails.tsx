import { useContext, useMemo, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { Marker, Stop } from "../../types";
import { latlong } from "../../lib/utils";
import { Map } from "../widgets/Map";
import { StopList } from "../widgets/StopList";
import { ELDEstimate } from "../widgets/ELDEstimate";
import { useRoutingDetails } from "../../services/routingService";
import { Error } from "../widgets/Error";
import { Loading } from "../widgets/Loading";

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
  const {
    state: { routingQuery },
    dispatch,
  } = useContext(MainContext);
  const [hovered, setHovered] = useState("");

  const {
    data: routing,
    error,
    isLoading,
    refetch,
  } = useRoutingDetails(routingQuery!);

  const markers: Marker[] = useMemo(
    () =>
      routing?.stops.map((stop) => ({
        lat: stop.lat,
        long: stop.long,
        color: getStopColor(stop),
        isLarge: latlong(stop) === hovered,
      })) ?? [],
    [routing?.stops, hovered]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error || !routing) {
    return (
      <Error
        error={error}
        retry={refetch}
        goBack={() => dispatch({ type: "GO_TO_JOB_SELECTION" })}
      />
    );
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Callout Bar */}
      {routing.limitWarning && (
        <div className="w-full bg-yellow-100 p-4 rounded-lg">
          <p>
            Total on-duty duration for this trip may exceed 70 hours/8 days
            limit. Please check your past logs to avoid violation.
          </p>
        </div>
      )}

      {/* Map and Stops Container */}
      <div className="flex gap-4 h-[450px]">
        {/* Map Section */}
        <div className="flex-1 bg-gray-100 rounded-lg">
          <Map markers={markers} route={routing.route} />
        </div>

        {/* Stops List */}
        <StopList stops={routing.stops} setHovered={setHovered} />
      </div>

      {/* ELD */}
      <div>
        <ELDEstimate timeline={routing.timeline} />
      </div>
    </div>
  );
}
