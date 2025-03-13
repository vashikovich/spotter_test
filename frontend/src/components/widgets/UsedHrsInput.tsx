import { useContext } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { JobContext } from "../../context/JobContext";

export function UsedHrsInput() {
  const { usedHrs, setUsedHrs } = useContext(JobContext);

  return (
    <div className="flex">
      <Label className="text-xl flex-1" htmlFor="used-hours">
        Used Hours
      </Label>
      <Input
        id="used-hours"
        type="number"
        value={usedHrs}
        onChange={(e) => setUsedHrs(Number(e.target.value))}
        className="text-xl w-1/3 text-right"
      />
    </div>
  );
}
