import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

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

// Schemas and Models
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hCaptchaToken: { type: String, required: true },
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Comment = mongoose.model('Comment', commentSchema);

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

    res.status(201).json({ message: 'Message received!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Blog post routes
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/blog', async (req, res) => {
  const { title, summary, content } = req.body;
  try {
    const newPost = new BlogPost({ title, summary, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/blog/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/blog/:id', async (req, res) => {
  const { title, summary, content } = req.body;
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, summary, content }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Comment routes
app.get('/api/blog/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/blog/:id/comments', async (req, res) => {
  const { author, text } = req.body;
  try {
    const newComment = new Comment({ postId: req.params.id, author, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
