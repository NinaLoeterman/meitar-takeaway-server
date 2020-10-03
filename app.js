const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");

const port = 5050;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("hello world!");
  main();
});

app.post("/data", (req, res) => {
  const formData = req.body.data;
  console.log(formData);
  res.send(formData);
  sendOrderEmail(formData).catch(console.error);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function sendOrderEmail(formData) {
  console.log('inside send order', formData)
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
    html: `<div>Full Name: ${formData.fullName}</div>
           <div>Phone Number: ${formData.mobileNumber}</div>
           <div>First Course: ${formData.firstCourse}</div>
           <div>Second Course: ${formData.secondCourse}</div>
           <div>Third Course: ${formData.thirdCourse}</div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
