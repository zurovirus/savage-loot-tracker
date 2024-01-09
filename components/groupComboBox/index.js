import useFetch from "@/hooks/useFetch";
import Link from "next/link";

export default function GroupComboBox({ onSelectChange }) {
  const { data, isLoading } = useFetch("/api/group");

  const handleSelectChange = (e) => {
    onSelectChange(e.target.value);
  };

  if (isLoading) {
    return <p className="text-center mb-2">Loading groups...</p>;
  } else {
    return (
      <>
        {data.length === 0 ? (
          <div className="mb-2">
            <Link href="/groups">
              <p className="w-fit mx-auto p-3 rounded-lg font-semibold text-blue-500 hover:text-blue-400">
                No groups found, click here to add a group
              </p>
            </Link>
          </div>
        ) : (
          <div className="text-center mb-2">
            <select
              onChange={handleSelectChange}
              className="select select-bordered rounded-md w-auto select-sm text-black"
            >
              <option hidden value="">
                Select a group
              </option>
              {data.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
      </>
    );
  }
}
