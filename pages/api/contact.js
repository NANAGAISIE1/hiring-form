import nodemailer from "nodemailer";

export default async function ContactAPI(req, res) {
  const {
    firstName,
    lastName,
    dob,
    phoneNumber,
    email,
    residentialAddress,
    state,
    city,
    zipCode,
    typeOfWork,
    frontIdUpload,
    backIdUpload,
    reasonForApplying,
  } = req.body;

  const data = {
    firstName,
    lastName,
    dob,
    phoneNumber,
    email,
    residentialAddress,
    state,
    city,
    zipCode,
    typeOfWork,
    frontIdUpload,
    backIdUpload,
    reasonForApplying,
  };

  const user = process.env.USER;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: process.env.PASSWORD,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: user,
      to: "nabgaisie@gmail.com",
      replyTo: data.email,
      subject: `Job application - ${data.firstName}`,
      html: `
      <h1>Job Application for ${data.firstName} ${data.lastName}</h1>
      <p>${data.reasonForApplying}</p>
      <ul>
      <li>Date of Birth: ${data.dob}</li>
      <li>Phone Number: ${data.phoneNumber}</li>
      <li>Email: ${data.email}</li>
      <li>Residential Address: ${data.residentialAddress}</li>
      <li>State: ${data.state}</li>
      <li>City: ${data.city}</li>
      <li>Zip Code: ${data.zipCode}</li>
      <li>Preffered work type: ${data.typeOfWork}</li>
      <li>
      <img src=${data.frontIdUpload.secure_url}/>
      </li>
      <li>
      <img src=${data.backIdUpload.secure_url}/>
      `,
    });

    console.log("Message sent:", mail.messageId);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Could not send email. Your message was not sent." });
  }
}
