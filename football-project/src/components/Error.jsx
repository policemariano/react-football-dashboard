import { useRouteError } from "react-router";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="alert alert-danger">
        <h2>An Error Occurred!</h2>
        <p>
          <strong>Error:</strong>{" "}
          {error?.statusText || error?.message || "An unknown error occurred"}
        </p>
        {error?.status && (
          <p>
            <strong>Status Code:</strong> {error.status}
          </p>
        )}
      </div>
    </div>
  );
}
