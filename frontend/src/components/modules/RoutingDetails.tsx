import { useContext } from "react";
import { JobContext } from "../../context/JobContext";

export function RoutingDetails() {
  const { selectedJob } = useContext(JobContext);

  if (!selectedJob) return null;

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Callout Bar */}
      <div className="w-full bg-blue-100 p-4 rounded-lg">
        <p className="text-blue-800">
          Route details for delivery from {selectedJob.pickupName} to{" "}
          {selectedJob.dropoffName}
        </p>
      </div>

      {/* Map and Stops Container */}
      <div className="flex gap-4 h-[600px]">
        {/* Map Section */}
        <div className="flex-1 bg-gray-100 rounded-lg">
          {/* Add your map component here */}
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Map will be displayed here</p>
          </div>
        </div>

        {/* Stops List */}
        <div className="w-96 bg-white rounded-lg shadow overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Route Stops</h3>
            <div className="space-y-4">
              {/* Sample stops - replace with actual data */}
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500">Current Location</div>
                <div className="font-medium">{selectedJob.pickupName}</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500">Pickup</div>
                <div className="font-medium">{selectedJob.pickupName}</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-gray-500">Dropoff</div>
                <div className="font-medium">{selectedJob.dropoffName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
