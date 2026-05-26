require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDb } = require('./db');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so client dev server (running on 5173) can query this server seamlessly
app.use(cors());

// Configure JSON and URL encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    service: 'Rakshobhya Core API Gateway',
    dbConnected: require('./db').getIsConnected()
  });
});

// Register REST API routes
app.use('/api', apiRouter);

// Serve static client assets in production/unified mode
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Catch-all route to serve the React SPA frontend
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send("Client build not found. Please run 'npm run build' first.");
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong on the server side.",
    message: err.message
  });
});

// Initialize database and boot the listener
async function bootServer() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`🚀 Rakshobhya API Server is running on http://localhost:${PORT}`);
    console.log(`🌸 AI Mentor and Public Health platform ready.`);
  });
}

bootServer();
