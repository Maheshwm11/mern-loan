import express from "express";
import cors from "cors";
import loans from "./routes/loan.js";
import loanees from "./routes/loanee.js"; // Import loanee routes
import loanTypes from "./routes/loanTypes.js"; // Import loan type routes
import payment from "./routes/payment.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/loan", loans);
app.use("/api/loanee", loanees); // Use loanee routes
app.use("/api/loan-type", loanTypes); // Use loan type routes
app.use("/api/payment", payment);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
