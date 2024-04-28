import React, { useState, useEffect } from "react";

const LoaneeDropdown = () => {
  const [loaneeList, setLoaneeList] = useState([]);
  const [selectedLoanee, setSelectedLoanee] = useState("");

  const fetchLoaneeList = async () => {
    try {
      const response = await fetch("http://localhost:5050/loanee");
      if (!response.ok) {
        throw new Error("Failed to fetch loanee list");
      }
      const data = await response.json();
      setLoaneeList(data);
    } catch (error) {
      console.error("Error fetching loanee list:", error);
    }
  };

  useEffect(() => {
    fetchLoaneeList();
  }, []);

  const handleLoaneeSelect = (e) => {
    setSelectedLoanee(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/payment/${selectedLoanee}`, {
        method: "GET",
      });
      const totalMonthlyPayments = await response.json();
      alert(`Total monthly payment: ${Math.ceil(totalMonthlyPayments)}`);
      setSelectedLoanee("");
    } catch (error) {
      console.error("Error calculating total monthly payments:", error);
      alert("Failed to calculate total monthly payments. Please try again.");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="loanee">Calculate total monthly payments:</label>
        <select
          id="loanee"
          name="loanee"
          value={selectedLoanee}
          onChange={handleLoaneeSelect}
        >
          <option value="">Select Loanee</option>
          {loaneeList.map((loanee) => (
            <option key={loanee._id} value={loanee._id}>
              {loanee._id}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="Submit"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
};

export default LoaneeDropdown;
