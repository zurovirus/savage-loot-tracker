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
      {!isCreating && (
        <button className="btn btn-sm mx-6" onClick={toggleCreate}>
          Add {dataName}
        </button>
      )}
      {isCreating && (
        <div className="flex">
          <label className="mx-6 text-lg">Name:</label>
          <input
            className="px-3 border text-sm rounded-lg text-white border-gray-200 bg-zinc-800 focus:outline-none focus:ring focus:ring-yellow-400 focus:border-none"
            type="text"
            ref={dataRef}
            autoFocus
          />
          {error && <label className="mx-4 text-red-700">{error} </label>}
          <div>
            <button
              className="btn btn-sm mx-5 bg-green-700 hover:bg-green-800 border-none focus:outline-none focus:ring focus:ring-yellow-400 text-white"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button
              className="btn btn-sm bg-red-700 hover:bg-red-800 border-none focus:outline-none focus:ring focus:ring-yellow-400 text-white"
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
