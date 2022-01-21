import React, { useState, useParams } from "react";
import { useHistory } from "react-router-dom";
//import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { updateTable } from "../utils/api";

function Seat({ tables }) {
  const [error, setError] = useState(null);
  const [table, setTable] = useState([]);
  const { reservationId } = useParams();
  const [select, setSelect] = useState(); //come back to
  const [selectTable, setSelectTable] = useState([]);
  const history = useHistory();

  function changeHandler({ target: { name, value } }) {
    setSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function submitHandler(e) {
    e.preventDefault();
    let abortController = new AbortController();
    async function assignTable() {
      try {
        await updateTable(reservationId, selectTable, abortController.signal);

        history.push(`/dashboard`);
      } catch (error) {
        setError(error);
      }
    }
    assignTable();
    return () => {
      abortController.abort();
    };
  }

  const tableOptions = tables.map((table) => {
    return (
      <option value={table.table_name} key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={(e) => submitHandler(e)}>
        <lable htmlFor="tables">Assign Table:</lable>
        <select name="table_id" onChange={changeHandler} required>
          <option value="">--Please select a table--</option>
          {tableOptions}
        </select>
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

export default Seat;
