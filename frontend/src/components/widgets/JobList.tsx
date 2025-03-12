import { useContext } from "react";
import { JobCard } from "./JobCard";
import { JobContext } from "../../context/JobContext";

export function JobList() {
  const { selectedJob, selectJob, jobs } = useContext(JobContext);

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSelected={selectedJob?.id === job.id}
          onClick={() => selectJob(job)}
        />
      ))}
    </div>
  );
}
