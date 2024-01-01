const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const nodemailer = require("nodemailer");

dotenv.config();

connectDB();

const app = express();

export async function notifyAdmin() {
  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: "ajaytod2002@gmail.com",
      pass: process.env.PASSWORD,
    },
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  });

  const info = await transporter.sendMail({
    from: "ajaytod2002@gmail.com",
    to: "vgaminged@gmail.com",
    subject: "New user registered",
    text: "A new user has registered on your website",
  });
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (process.env.ORIGIN.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);

app.use(express.json());

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port  ${PORT}`.yellow.bold));
