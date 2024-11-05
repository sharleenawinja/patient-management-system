import express from "express";
import con from "../utils/db.js";

const router = express.Router();

router.post("/patient", (req, res) => {
  const { firstName, lastName, dateOfBirth, gender } = req.body;
  const registration_date = new Date();

  const sql =
    "INSERT INTO Patients (first_name, last_name, date_of_birth, gender, registration_date) VALUES(?, ?, ?, ?, ?)";

  con.query(
    sql,
    [firstName, lastName, dateOfBirth, gender, registration_date],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: err,
        });
      }

      const { insertId } = result;

      return res.status(201).json({
        success: true,
        message: "Patient successfully registered.",
        patientId: insertId,
      });
    }
  );
});

export { router as patientRouter };
