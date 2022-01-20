import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

function CreateTables() {
    const initialState = {
        "table_name": "",
        "capacity": 0,
      };
      const history = useHistory();
      const [error, setError] = useState(null);
      const [table, setTable] = useState(initialState);

      function changeHandler({ target: { name, value } }) {
        setTable((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      function submitHandler(e) {
        //console.log(reservation)
        table.capacity = Number(table.capacity)
        e.preventDefault();
        let abortController = new AbortController();
        async function newTable() {
          try {
            await createReservation(table, abortController.signal)
            //let date = reservation.reservation_date
            setTable(initialState)
            history.push(`/dashboard`)
          } catch (error) {
            setError(error);
          }
        }
        newTable();
        return () => {
          abortController.abort();
        };
      }
  
    return (
    <div>
      <ErrorAlert error={error} />
      <form className="form w-full max-w-lg" onSubmit={(e) => submitHandler(e)}>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Table Name
            </label>
            <input
              name="table_name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="table_name-"
              type="text"
              value={table.table_name}
              placeholder="Table Name"
              onChange={(e) => changeHandler(e)}
              required
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Capacity
            </label>
            <input
              name="capacity"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="last-name"
              type="number"
              min="1"
              value={table.capacity}
              placeholder="1"
              onChange={(e) => changeHandler(e)}
              required
            />
          </div>
        </div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          type="submit"
        >
          Submit
        </button>
        <button type="button" onClick={(e) => history.goBack()}>
          Cancel
        </button>
      </form>
    </div>
  );
}
export default CreateTables;
