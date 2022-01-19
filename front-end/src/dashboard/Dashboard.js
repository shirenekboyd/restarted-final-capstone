import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const getDate = query.get("date");
  if (getDate) {
    date = getDate;
  }
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)} type="button" className="btn btn-dark">
          Previous
        </button>
        <button onClick={() => history.push(`/dashboard`)} type="button" className="btn btn-dark">
          Today
        </button>
        <button onClick={() => history.push(`/dashboard?date=${next(date)}`)} type="button" className="btn btn-dark">
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.length && JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
