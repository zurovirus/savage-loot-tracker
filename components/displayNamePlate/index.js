import Link from "next/link";
import { classColorText } from "../lib/utility";

export default function DisplayNamePlate({ name, classId, id, classes }) {
  return (
    <Link href={`/${name}/${id}`}>
      <div
        className={`font-semibold rounded-md p-2 ${classColorText(classId)}`}
      >
        {classes.map((job) => (
          <div
            key={job.id}
            className="flex items-center text-center justify-around mr-10"
          >
            {job.id === classId && (
              <>
                <img src={`/jobIcons/${job.name}.png`} alt={job.name} />
                <div className="flex flex-col mx-auto">
                  <p>{job.name}</p>
                  <p className="text-lg">{name}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Link>
  );
}
