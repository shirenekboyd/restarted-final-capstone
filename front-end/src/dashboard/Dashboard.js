import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
//import {formatTime} from "../utils/format-reservation-time";
//import formatAsDate from "../utils/format-reservation-date";
import {previous, next, today, formatAsTime} from "../utils/date-time";


/* Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const query = useQuery();
  const getDate = query.get("date");

  if (getDate) {
    date = getDate;
  } else {
    date = today()
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


  const history = useHistory();
 

  function pushDate(dateToMove) {
    history.push(`/dashboard?date=${dateToMove}`);
  }

  function handleClick(nextOrPrev){
    pushDate(nextOrPrev)
  }

  const resTable = reservations.map((reservation) => {
    return (
      <table className="table-fixed border-separate border border-indigo-500" key={reservation.reservation_id}>
      <tr >
        <td>{`reservation id: ${reservation.reservation_id}`}</td>
        <td>{reservation.first_name}</td>
        </tr>
        <tr >
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        </tr>
        <tr >
        <td>{formatAsTime(reservation.reservation_time)}</td>
        <td>{reservation.people}</td>
      </tr>
      </table>
    );
  });

  return (
    <main className="min-h-screen m-12">
      <h1 className="p-10">Dashboard</h1>
      <div className="p-10 d-md-flex mb-3">
        <h4 className="mb-4">{`Reservations for ${date}`}</h4>
        <div className="p-2 bg-emerald-500">{resTable}</div>
        <div className="p-5 inline-flex">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="button" onClick={(e) => handleClick(previous(date))}>
            Previous
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="button" onClick={(e) => handleClick(next(date))}>
            Next
          </button>
        </div>
      
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { listReservations } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";
// // import useQuery from "../utils/useQuery";
// import { useHistory } from "react-router-dom";
// import { previous, next } from "../utils/date-time";
// /**
//  * Defines the dashboard page.
//  * @param date
//  *  the date for which the user wants to view reservations.
//  * @returns {JSX.Element}
//  */
// function Dashboard({ date }) {
//   const history = useHistory();
//   // const query = useQuery();
//   // const getDate = query.get("date");
//   // if (getDate) {
//   //   date = getDate;
//   // }
//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);

//   useEffect(loadDashboard, [date]);

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);
//       console.log("TESTING")
//     return () => abortController.abort();
//   }
//   console.log("TESTING")
  
//   return (
//     <main>
//       <h1>Dashboard</h1>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">Reservations for date</h4>
//       </div>
//       <div className="btn-group" role="group" aria-label="Basic example">
//         <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)} type="button" className="btn btn-dark">
//           Previous
//         </button>
//         <button onClick={() => history.push(`/dashboard`)} type="button" className="btn btn-dark">
//           Today
//         </button>
//         <button onClick={() => history.push(`/dashboard?date=${next(date)}`)} type="button" className="btn btn-dark">
//           Next
//         </button>
//       </div>
//       <ErrorAlert error={reservationsError} />
//       {reservations.length && JSON.stringify(reservations)}
//     </main>
//   );
// }

// export default Dashboard;