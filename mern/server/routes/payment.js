import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// find loans for a specific person and calculate total monthly payments
router.get("/:id", async (req, res) => {
  try {
    const loansCollection = db.collection("Loans");
    const query = { ssn: req.params.id };
    const loans = await loansCollection.find(query).toArray();

    if (!loans || loans.length === 0) {
      return res.status(404).send("No loans found for the specified person");
    }

    const totalMonthlyPayment = loans.reduce((total, loan) => {
      const monthlyPayment = calculateMonthlyPayment(loan);
      return total + monthlyPayment;
    }, 0);

    res.status(200).json(totalMonthlyPayment);
  } catch (error) {
    console.error('Error finding and calculating total monthly payments:', error);
    res.status(500).send("Internal Server Error");
  }
});

const calculateMonthlyPayment = (loan) => {
  const monthlyInterestRate = loan.interest_rate / 12 / 100; // Convert annual interest rate to monthly
  const numberOfPayments = monthsBetweenDates(loan.end_date, loan.start_date);
  const monthlyPayment = (loan.total_amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment;
};

function monthsBetweenDates(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  const months = Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24 * 30.4375); // Average days per month
  return Math.ceil(months);
}

export default router;