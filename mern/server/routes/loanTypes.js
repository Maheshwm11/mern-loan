import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

const router = express.Router();

// Create a new loan type
router.post("/", async (req, res) => {
  try {
    const loanTypeData = req.body;
    const collection = await db.collection("LoanTypes");
    const result = await collection.insertOne(loanTypeData);
    if (!result.insertedId) {
      throw new Error("Insert operation failed: No documents inserted");
    }
    console.log("Successfully added loan type:", loanTypeData);
    res.status(201).json(loanTypeData);
  } catch (error) {
    console.error("Error adding loan type:", error);
    res.status(500).send("Failed to add loan type: " + error.message);
  }
});

// Get all loan types
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("LoanTypes");
    const loanTypes = await collection.find({}).toArray();
    res.status(200).json(loanTypes);
  } catch (error) {
    console.error("Error fetching loan types:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single loan type by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("LoanTypes");
    const loanType = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!loanType) {
      res.status(404).send("Loan type not found");
    } else {
      res.status(200).json(loanType);
    }
  } catch (error) {
    console.error("Error fetching loan type:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
