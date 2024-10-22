var express = require("express");
var router = express.Router();

const { Client } = require('pg');
const connectionString = 'postgres://avnadmin:AVNS_tc7npke7kUPirWOhg-h@firstproject-ophelierouet25-firstproject.i.aivencloud.com:20568/defaultdb?sslmode=require';

const client = new Client({connectionString, ssl: {
  rejectUnauthorized: false,}
});

client.connect();

router.get("/tickets/:departure/:arrival/:date", async (req, res) => {
  const { departure, arrival, date } = req.params; // Récupérer les paramètres depuis la requête

  if (!departure || !arrival || !date) {
    return res.status(400).send("Please provide departure, arrival, and date.");
  }

  try {
    // Requête pour trouver les billets correspondants dans la table "tickets"
    const query = `
      SELECT * FROM tickets
      WHERE LOWER(departure) = LOWER($1)
      AND LOWER(arrival) = LOWER($2)
      AND date::date = $3
    `;
    const values = [departure, arrival, date];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).send("No tickets found.");
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
