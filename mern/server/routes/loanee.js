import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

const router = express.Router();

// Create a new loanee
router.post("/", async (req, res) => {
  try {
    const loaneeData = req.body;
    const collection = await db.collection("Loanee");
    const result = await collection.insertOne(loaneeData);
    if (!result.insertedId) {
      throw new Error("Insert operation failed: No documents inserted");
    }
    console.log("Successfully added loanee:", loaneeData);
    res.status(201).json(loaneeData);
  } catch (error) {
    console.error("Error adding loanee:", error);
    res.status(500).send("Failed to add loanee: " + error.message);
  }
});

// Get all loanee records
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("Loanee");
    const loanees = await collection.find({}).toArray();
    res.status(200).json(loanees);
  } catch (error) {
    console.error("Error fetching loanee records:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single loanee by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("Loanee");
    const loanee = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!loanee) {
      res.status(404).send("Loanee not found");
    } else {
      res.status(200).json(loanee);
    }
  } catch (error) {
    console.error("Error fetching loanee:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
