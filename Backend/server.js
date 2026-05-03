const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const Task = require('./src/models/taskModel');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await Task.createTable();
    console.log(' Database table ready');
    
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Failed to start server:', error);
  }
};

startServer();