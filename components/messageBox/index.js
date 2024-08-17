// Component to handle the success and error messages from CRUD operations
export default function MessageBox({
  errorMessage,
  successMessage,
  messageHandler,
}) {
  return (
    <>
      {successMessage && (
        <>
          <div className="flex justify-between font-semibold mb-4 items-center bg-green-600 rounded-lg">
            <p className="mx-auto">{successMessage}</p>
            <button
              onClick={messageHandler}
              className="mx-3 font-bold -mt-1 text-center hover:text-black hover:font-bold"
            >
              x
            </button>
          </div>
        </>
      )}
      {errorMessage && (
        <>
          <div className="flex justify-between font-semibold mb-4 items-center bg-red-600 rounded-lg">
            <p className="mx-auto">{errorMessage}</p>
            <button
              onClick={messageHandler}
              className="mx-3 font-bold -mt-1 text-center hover:text-black hover:font-bold"
            >
              x
            </button>
          </div>
        </>
      )}
    </>
  );
}
