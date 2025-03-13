import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { Job } from "../types";
import { RandomizeCoord } from "../lib/utils";

const generateRandomJobs = (): Job => ({
  id: Math.random().toString(36).substr(2, 9),
  pickupLoc: RandomizeCoord(),
  dropoffLoc: RandomizeCoord(),
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
    const generatedJobs = Array.from({ length: 10 }, generateRandomJobs);
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
