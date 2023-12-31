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
    host: "smtp.office365.com",
    port: 587,
    secureConnection: false,
    secure: false,
    requireTLS: true,
    auth: {
      user: user,
      pass: process.env.PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: user,
      to: "job@employheroes.com",
      replyTo: data.email,
      subject: `Job application - ${data.firstName}`,
      html: `
      <div style="margin: auto; display: block; max-width: 32rem;">
      <h1 style="margin: auto; text-align: center;">Job Application for ${data.firstName} ${data.lastName}</h1>
      <p style=" text-align: center;">${data.reasonForApplying}</p>
      <ul style="list-style: none; padding: 10px; margin: auto; max-width: 32rem; ">
      <li>Date of Birth: ${data.dob}</li>
      <li>Phone Number: ${data.phoneNumber}</li>
      <li>Email: ${data.email}</li>
      <li>Residential Address: ${data.residentialAddress}</li>
      <li>State: ${data.state}</li>
      <li>City: ${data.city}</li>
      <li>Zip Code: ${data.zipCode}</li>
      <li>Preffered work type: ${data.typeOfWork}</li>
      </div>
      <div style="display: flex; flex-direction: column; row-gap: 1rem; max-width: 32rem; margin: auto; padding-bottom: 1rem">
      <image src=${data.backIdUpload.secure_url} alt=${data.backIdUpload.name} style="width:100%; height:auto; border-radius: 0.5rem; margin: auto; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); padding-bottom: 1rem" /> 
      <image src=${data.frontIdUpload.secure_url} alt=${data.frontIdUpload.name}  style="width:100%; height:auto; border-radius: 0.5rem; margin: auto; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);" /> 
      </div>
      `,
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Could not send email. Your message was not sent." });
  }
}
