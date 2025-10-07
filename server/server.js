const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: [process.env.LOCAL_FRONTEND_URL, process.env.FRONTEND_URL],
  credentials: true
}));

// Mount routers
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5001;

const server = app.listen(
  PORT,
  // console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    console.log(`Server running on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
