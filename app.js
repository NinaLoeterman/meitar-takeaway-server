const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const cors = require("cors");

const port = 5050;

app.use(cors());

app.get("/", function (req, res) {
  res.send("hello world!");
  main();
});

app.post("/form", function (req, res) {
  const formData = req.query;
  res.send(formData);
  sendOrderEmail(formData).catch(console.error);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function sendOrderEmail(formData) {
  var transporter = nodemailer.createTransport({
    service: "outlook",
    port: 25,
    auth: {
      user: "meitar.takeaway@outlook.com",
      pass: "takemeaway!!!",
    },
  });

  var mailOptions = {
    from: "meitar.takeaway@outlook.com",
    to: "nina.loeterman@gmail.com",
    subject: "An order was placed!",
    html: `<div>couple: ${formData.couple}</div>
           <div>first course: ${formData.firstCourse}</div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
