import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
// import twilio from 'twilio';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact schema and model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hCaptchaToken: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

// // Twilio client
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  const { name, email, message, hCaptchaToken } = req.body;
  try {
    const newContact = new Contact({ name, email, message, hCaptchaToken });
    await newContact.save();

    // Telegram notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const telegramText = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: telegramText,
    });

    // // WhatsApp notification
    // const whatsappText = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // await client.messages.create({
    //   from: process.env.TWILIO_WHATSAPP_FROM,
    //   to: process.env.WHATSAPP_TO,
    //   body: whatsappText,
    // });

    res.status(201).json({ message: 'Message received!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
