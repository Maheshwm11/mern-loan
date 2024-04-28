import React, { useState } from "react";

const AddLoanee = () => {
  const [loaneeData, setLoaneeData] = useState({
    _id: "",
    contact_number: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoaneeData({ ...loaneeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/loanee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loaneeData),
      });
      if (!response.ok) {
        throw new Error("Failed to add loanee");
      }
      alert("Loanee added successfully");
      setLoaneeData({ _id: "", contact_number: "", address: "" });
    } catch (error) {
      console.error("Error adding loanee:", error);
      alert("Failed to add loanee. Please try again.");
    }
  };

  return (
    <div>
      <h3>Add New Loanee</h3>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="ssn">SSN:</label>
          <input
            type="number"
            id="ssn"
            name="_id"
            value={loaneeData._id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contact_number">Contact Number:</label>
          <input
            type="number"
            id="contact_number"
            name="contact_number"
            value={loaneeData.contact_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={loaneeData.address}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Add Loanee"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
};

export default AddLoanee;
