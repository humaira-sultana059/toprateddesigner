import nodemailer from "nodemailer";
import twilio from "twilio";

export async function POST(req) {
  try {
    const { name, email, projectType, message } = await req.json();

    // 📩 Send Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL, // Your email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType.join(
        ", "
      )}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    // 📲 Send WhatsApp Message (Using Twilio)
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const messageResponse = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`,
      body: `New Contact Inquiry:\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType.join(
        ", "
      )}\nMessage: ${message}`,
    });

    // console.log("Twilio Message Response:", messageResponse);

    return Response.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return Response.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
