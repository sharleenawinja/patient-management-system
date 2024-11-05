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

router.get("/patients", (req, res) => {
  const sql = `
    SELECT 
        p.first_name AS firstName,
        p.last_name AS lastName,
        v.bmi,
        v.entry_date AS entryDate,
        CASE 
            WHEN TIMESTAMPDIFF(YEAR, p.date_of_birth, CURDATE()) = 0 
                THEN CONCAT(TIMESTAMPDIFF(MONTH, p.date_of_birth, CURDATE()), ' months')
            ELSE CONCAT(TIMESTAMPDIFF(YEAR, p.date_of_birth, CURDATE()), ' years')
        END AS age
    FROM Patients p
    JOIN Visits v ON p.id = v.patient_id;
`;

  con.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      results,
    });
  });
});
export { router as patientRouter };
