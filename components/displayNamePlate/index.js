import Link from "next/link";
import { classColorText } from "../lib/utility";

// A reusable component that displays the user's name plate, class image, and class color.
export default function DisplayNamePlate({
  name,
  classId,
  id,
  classes,
  deleteHandler,
  isDeleting,
}) {
  return (
    <div
      className={`relative font-semibold rounded-md p-2 ${classColorText(
        classId
      )}`}
    >
      {/* Delete button with absolute positioning */}
      {isDeleting && (
        <button
          onClick={deleteHandler}
          className="absolute top-0 right-0 mx-3 text-lg font-semibold hover:text-black"
          style={{ zIndex: 1 }} // Ensure the button is above other content if needed
        >
          x
        </button>
      )}
      {classes.map((job) => (
        <div
          key={job.id}
          className="flex items-center text-center justify-around mr-12"
        >
          {job.id === classId && (
            <>
              <img
                src={`/jobIcons/${job.name}.png`}
                alt={job.name}
                className="-ml-4"
              />
              <Link href={`/${name}/${id}`}>
                <div className="flex flex-col mx-auto hover:text-yellow-500">
                  <p>{job.name}</p>

                  <p className="text-lg">{name}</p>
                </div>
              </Link>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
