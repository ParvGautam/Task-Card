const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoute');

const app = express();


app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

module.exports = app;
