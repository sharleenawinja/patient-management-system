import express from "express";
import con from "../utils/db.js";

const router = express.Router();

router.post("/visit", (req, res) => {
  const {
    patientId,
    date,
    height,
    weight,
    bmi,
    generalHealth,
    dietedBefore,
    takingDrugs,
    comments,
  } = req.body;

  const sql =
    "INSERT INTO Visits (patient_id, entry_date, height, weight, bmi, general_health, currently_taking_any_drugs, ever_been_on_weight_loss_diet, comments) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

  con.query(
    sql,
    [
      patientId,
      date,
      height,
      weight,
      bmi,
      generalHealth || null,
      takingDrugs || null,
      dietedBefore || null,
      comments || null,
    ],
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
        message: "Visit successfully recorded.",
      });
    }
  );
});

export { router as visitRouter };
