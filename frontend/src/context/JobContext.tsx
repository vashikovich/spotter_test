import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { Job } from "../types/Location";

const generateRandomJobs = (): Job => ({
  id: Math.random().toString(36).substr(2, 9),
  pickupName: `Pickup ${Math.floor(Math.random() * 100)}`,
  dropoffName: `Dropoff ${Math.floor(Math.random() * 100)}`,
  pickupLoc: {
    lat: 38 + (Math.random() * 10 - 5), // US lat range ~33-43
    long: -98 + (Math.random() * 40 - 20), // US long range ~-118 to -78
  },
  dropoffLoc: {
    lat: 38 + (Math.random() * 10 - 5),
    long: -98 + (Math.random() * 40 - 20),
  },
});

export const JobContext = createContext<{
  jobs: Job[];
  selectedJob: Job | null;
  selectJob: (job: Job | null) => void;
  usedHrs: number;
  setUsedHrs: (usedHrs: number) => void;
}>({
  jobs: [],
  selectedJob: null,
  selectJob: () => {},
  usedHrs: 0,
  setUsedHrs: () => {},
});

export const JobProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, selectJob] = useState<Job | null>(null);
  const [usedHrs, setUsedHrs] = useState<number>(0);

  useEffect(() => {
    const generatedJobs = Array.from({ length: 5 }, generateRandomJobs);
    setJobs(generatedJobs);
  }, []);

  return (
    <JobContext.Provider
      value={{ selectedJob, selectJob, jobs, usedHrs, setUsedHrs }}
    >
      {children}
    </JobContext.Provider>
  );
};
