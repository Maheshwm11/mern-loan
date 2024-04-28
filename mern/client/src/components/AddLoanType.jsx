import React, { useState } from "react";

const AddLoanType = () => {
  const [loanTypeData, setLoanTypeData] = useState({
    _id: "",
    description: "",
    maximum_amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanTypeData({ ...loanTypeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/loan-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanTypeData),
      });
      if (!response.ok) {
        throw new Error("Failed to add loan type");
      }
      alert("Loan type added successfully");
      setLoanTypeData({ _id: "", description: "", maximum_amount: "" });
    } catch (error) {
      console.error("Error adding loan type:", error);
      alert("Failed to add loan type. Please try again.");
    }
  };

  return (
    <div>
      <h3>Add New Loan Type</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type_name">Type Name:</label>
          <input
            type="text"
            id="type_name"
            name="_id"
            value={loanTypeData._id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={loanTypeData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="maximum_amount">Maximum Amount:</label>
          <input
            type="number"
            id="maximum_amount"
            name="maximum_amount"
            value={loanTypeData.maximum_amount}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Add Loan Type"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
};

export default AddLoanType;
