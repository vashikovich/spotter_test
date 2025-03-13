import axios from "axios";
import qs from "querystring";
import { useQuery } from "@tanstack/react-query";
import { RoutingQuery } from "../context/MainContext";
import { Routing } from "../types";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const fetchRoutingDetails = async (
  routingQuery: RoutingQuery
): Promise<Routing> => {
  const { job, usedHrs, currentLoc } = routingQuery;
  const query = qs.stringify({
    current: `${currentLoc.lat},${currentLoc.long}`,
    pickup: `${job.pickupLoc.lat},${job.pickupLoc.long}`,
    dropoff: `${job.dropoffLoc.lat},${job.dropoffLoc.long}`,
    usedHrs,
  });

  const response = await axios.get(`${baseUrl}/api/routing/?${query}`);
  return response.data;
};

export const useRoutingDetails = (routingQuery: RoutingQuery) => {
  return useQuery({
    queryKey: ["routingDetails", routingQuery],
    queryFn: () => fetchRoutingDetails(routingQuery),
  });
};
