import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

const router = express.Router();

// Get all loan records
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("Loans");
    const loans = await collection.find({}).toArray();
    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loan records:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single loan record by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("Loans");
    const loan = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!loan) {
      res.status(404).send("Loan not found");
    } else {
      res.status(200).json(loan);
    }
  } catch (error) {
    console.error("Error fetching loan record:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new loan record
router.post("/", async (req, res) => {
  try {
    const loanData = req.body;
    const collection = await db.collection("Loans");
    const result = await collection.insertOne(loanData);
    if (!result.insertedId) {
      throw new Error("Insert operation failed: No documents inserted");
    }
    console.log("Successfully added loan:", loanData);
    res.status(201).json(loanData);
  } catch (error) {
    console.error("Error adding loan:", error);
    res.status(500).send("Failed to add loan: " + error.message);
  }
});

// Update a loan record by ID
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loanData = req.body;
    const collection = await db.collection("Loans");
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: loanData });
    if (result.modifiedCount === 0) {
      res.status(404).send("Loan not found");
    } else {
      res.status(200).send("Loan updated successfully");
    }
  } catch (error) {
    console.error("Error updating loan record:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a loan record by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await db.collection("Loans");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).send("Loan not found");
    } else {
      res.status(200).send("Loan deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting loan record:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
