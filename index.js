import express from 'express';
import connectDB from './src/config/db.js'; // Ensure the correct relative path
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
import authRoutes from './src/routes/auth.js';
import contactRoutes from './src/routes/contact.js';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
