import Link from "next/link";
import { classColorText } from "../lib/utility";
import Swal from "sweetalert2";

// A reusable component that displays the user's name plate, class image, and class color.
export default function DisplayNamePlate({
  name,
  classId,
  id,
  classes,
  isDeleting,
  setPlayers,
}) {
  async function deleteHandler() {
    const result = await Swal.fire({
      title: `Delete player ${name}?`,
      background: "#0c0a09",
      color: "#FFFFFF",
      text: "All associated data will be deleted",
      icon: "warning",
      iconColor: "#991b1b",
      showCancelButton: true,
      cancelButtonColor: "#991b1b",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      confirmButtonColor: "#15803d",
      theme: "dark",
    });

    if (result.isConfirmed) {
      const res = await fetch("/api/player/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (res.ok) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player.id != id)
        );

        Swal.fire({
          title: "Deleted!",
          background: "#0c0a09",
          color: "#FFFFFF",
          text: `The player ${name} has been deleted.`,
          icon: "success",
          iconColor: "#15803d",
          confirmButtonColor: "#ca8a04",
        });
      } else {
        Swal.fire({
          title: "Error!",
          background: "#0c0a09",
          color: "#FFFFFF",
          text: "There was a problem deleting the player.",
          icon: "error",
          iconColor: "#991b1b",
          confirmButtonColor: "#ca8a04",
        });
      }
    }
  }

  return (
    <div
      className={`border-yellow-600 border-2 relative font-semibold rounded-md p-2 ${classColorText(
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
