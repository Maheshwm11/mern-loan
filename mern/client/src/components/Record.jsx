import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Record() {
  const navigate = useNavigate();
  const[prevID, setprevID] = useState("");
  const [form, setForm] = useState({
    ssn: "",
    loan_type_name: "",
    start_date: "",
    end_date: "",
    total_amount: "",
    interest_rate: "",
    status: "",
  });
  const [loaneeList, setLoaneeList] = useState([]);
  const [loanTypeList, setLoanTypeList] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("record")) {
      let R = JSON.parse(sessionStorage.getItem("record"));
      setForm({
        ssn: R.ssn,
        loan_type_name: R.loan_type_name,
        start_date: R.start_date,
        end_date: R.end_date,
        total_amount: R.total_amount,
        interest_rate: R.interest_rate,
        status: R.status
      });
      setprevID(R._id);
      sessionStorage.removeItem("record");
    }
  }, []);
  

  useEffect(() => {
    async function fetchLoaneeList() {
      const response = await fetch("http://localhost:5050/loanee");
      if (!response.ok) {
        console.error("Failed to fetch loanee list");
        return;
      }
      const data = await response.json();
      setLoaneeList(data);
    }

    async function fetchLoanTypeList() {
      const response = await fetch("http://localhost:5050/loan-type");
      if (!response.ok) {
        console.error("Failed to fetch loan type list");
        return;
      }
      const data = await response.json();
      setLoanTypeList(data);
    }

    fetchLoaneeList();
    fetchLoanTypeList();
  }, []);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    try {
      let method = "POST"; // Default to POST for creating new record
      let url = "http://localhost:5050/loan"; // Default API endpoint for creating new record

      // Check if prevID exists, if so, it's an edit case
      if (prevID != "") {
        method = "PATCH"; // Use PATCH for updating existing record
        url = `http://localhost:5050/loan/${prevID}`; // API endpoint for updating existing record
      }
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/");
    } catch (error) {
      console.error("A problem occurred updating the loan record: ", error);
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create New Loan</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="ssn"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Select Loanee
              </label>
              <div className="mt-2">
                <select
                  id="ssn"
                  name="ssn"
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={form.ssn}
                  onChange={(e) => updateForm({ ssn: e.target.value })}
                >
                  <option value="">Select Loanee</option>
                  {loaneeList.map((loanee) => (
                    <option key={loanee._id} value={loanee._id}>
                      {loanee._id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="loan_type_name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Select Loan Type
              </label>
              <div className="mt-2">
                <select
                  id="loan_type_name"
                  name="loan_type_name"
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={form.loan_type_name}
                  onChange={(e) => updateForm({ loan_type_name: e.target.value })}
                >
                  <option value="">Select Loan Type</option>
                  {loanTypeList.map((loanType) => (
                    <option
                      key={loanType._id}
                      value={loanType._id}
                    >
                      {loanType._id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="start_date"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                className="form-input mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={form.start_date}
                onChange={(e) => updateForm({ start_date: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="end_date"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                End Date
              </label>
              <input
                id="end_date"
                type="date"
                className="form-input mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={form.end_date}
                onChange={(e) => updateForm({ end_date: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="total_amount"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Total Amount
              </label>
              <input
                id="total_amount"
                type="number"
                className="form-input mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={form.total_amount}
                onChange={(e) => updateForm({ total_amount: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="interest_rate"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Interest Rate
              </label>
              <input
                id="interest_rate"
                type="number"
                className="form-input mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={form.interest_rate}
                onChange={(e) => updateForm({ interest_rate: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Status
              </label>
              <input
                id="status"
                type="text"
                className="form-input mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={form.status}
                onChange={(e) => updateForm({ status: e.target.value })}
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Loan"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
