// Reusable component that allows you to add items.
export default function AddItem({
  submitHandler,
  dataRef,
  dataName,
  error,
  toggleCreate,
  isCreating,
}) {
  return (
    <>
      {!isCreating ? (
        <button
          className="btn btn-sm mx-6 text-white bg-yellow-600 hover:bg-yellow-700 border-none font-bold"
          onClick={toggleCreate}
        >
          Add {dataName}
        </button>
      ) : (
        <div className="flex">
          <label className="mx-6 text-lg">Name:</label>
          <input
            className="px-3 border text-sm rounded-lg text-white border-gray-200 bg-zinc-800 focus:outline-none focus:ring-white focus:ring-1"
            type="text"
            ref={dataRef}
            autoFocus
          />
          {error && <label className="mx-4 text-red-700">{error} </label>}
          <div>
            <button
              className="btn btn-sm mx-5 bg-green-700 hover:bg-green-800 border-none focus:outline-none focus:ring-white focus:ring-1 text-white"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button
              className="btn btn-sm bg-red-700 hover:bg-red-800 border-none focus:outline-none focus:ring-white focus:ring-1 text-white"
              onClick={toggleCreate}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
