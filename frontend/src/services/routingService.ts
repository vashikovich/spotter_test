import axios from "axios";
import qs from "querystring";
import { RoutingQuery } from "../context/MainContext";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function fetchRoutingDetails(routingQuery: RoutingQuery) {
  const { job, usedHrs, currentLoc } = routingQuery;
  const query = qs.stringify({
    current: `${currentLoc.lat},${currentLoc.long}`,
    pickup: `${job.pickupLoc.lat},${job.pickupLoc.long}`,
    dropoff: `${job.dropoffLoc.lat},${job.dropoffLoc.long}`,
    usedHrs,
  });

  try {
    const response = await axios.get(`${baseUrl}/api/routing/?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching routing details:", error);
    throw error;
  }
}
