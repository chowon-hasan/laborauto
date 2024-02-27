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
app.post("/contactForm", async (req, res) => {
  try {
    const { email, phone, name, message, category } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "mail.laboiteautomatique.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@laboiteautomatique.com",
        pass: "Brice007//",
      },
    });

    // Email content
    const mailOptions = {
      from: email ? email : "mail@laboiteautomatique.com",
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
app.post("/installForm", async (req, res) => {
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
      host: "mail.laboiteautomatique.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@laboiteautomatique.com",
        pass: "Brice007//",
      },
    });

    // Email content
    const mailOptions = {
      from: email ? email : "mail@laboiteautomatique.com",
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

app.get("/", async (req, res) => {
  res.send("server is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
