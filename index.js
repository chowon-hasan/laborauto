const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Contact form API endpoint
app.post("/api/sendContact", async (req, res) => {
  try {
    const { email, phone, name, message, category } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILFROM,
        pass: process.env.PASSWORDMAIL,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: "contact@laboiteautomatique.com",
      subject: "New Contact Form Submission",
      text: `
        Email: ${email}
        Phone: ${phone}
        Name: ${name}
        Category: ${category}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Installation form API endpoint
app.post("/api/sendContact/sendInstallation", async (req, res) => {
  try {
    const {
      vehicle,
      year,
      fuel,
      service,
      region,
      name,
      phone,
      email,
      message,
    } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILFROM,
        pass: process.env.PASSWORDMAIL,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: "contact@laboiteautomatique.com",
      subject: "New Installation Form Submission",
      text: `
          Vehicle: ${vehicle}
          Year: ${year}
          Fuel: ${fuel}
          Service: ${service}
          Region: ${region}
          Name: ${name}
          Phone: ${phone}
          Email: ${email}
          Message: ${message}
        `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/", (req, res) => {
  res.send("server on");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});