// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

// Initialize a new pool instance with your PostgreSQL connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

interface ResponseData {
  message: string;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    try {
      // Insert data into the database
      const queryText =
        "INSERT INTO contacts(name, email) VALUES($1, $2) RETURNING *";
      const values = [name, email];
      const response = await pool.query(queryText, values);

      // Send back the inserted Email data
      res
        .status(200)
        .json({
          message: "Email registered successfully",
          data: response.rows[0],
        });
    } catch (error: unknown) {
      console.error("Error inserting data into database:", error);
      res.status(500).json({
        message: "Failed to add Email",
        error: (error as Error).message,
      });
    }
  } else {
    // Handle any methods other than POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
