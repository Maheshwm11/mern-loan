import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoanRecord = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.ssn}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.loan_type_name}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.start_date}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.end_date}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.total_amount}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.interest_rate}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.status}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          onClick={() => props.editRecord(props.record)}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          style={{ color: "red" }}
          type="button"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function LoanRecordList() {
  const [loanRecords, setLoanRecords] = useState([]);
  const navigate = useNavigate();

  // This method fetches the loan records from the database.
  useEffect(() => {
    async function getLoanRecords() {
      try {
        const response = await fetch("http://localhost:5050/loan/");
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const loanRecordsData = await response.json();
        setLoanRecords(loanRecordsData);
      } catch (error) {
        console.error("Error fetching loan records:", error);
      }
    }
    getLoanRecords();
  }, []);

  // This method will edit a loan record
  async function editLoanRecord(record) {
    try {
      if (record) {
        sessionStorage.setItem("record", JSON.stringify(record));
        navigate('/create');
      }
    } catch (error) {
      console.error("Error editing loan record:", error);
    }
  }

  // This method will delete a loan record
  async function deleteLoanRecord(id) {
    try {
      await fetch(`http://localhost:5050/loan/${id}`, {
        method: "DELETE",
      });
      setLoanRecords(loanRecords.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting loan record:", error);
    }
  }

  // This method will map out the loan records on the table
  function renderLoanRecords() {
    return loanRecords.map((record) => (
      <LoanRecord
        key={record._id}
        record={record}
        editRecord={editLoanRecord}
        deleteRecord={deleteLoanRecord}
      />
    ));
  }

  // This following section will display the table with the loan records.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Loan Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  SSN
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Loan Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Start Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  End Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Total Amount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Interest Rate
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {renderLoanRecords()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
