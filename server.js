const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const sprintRoutes = require('./routes/sprintRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/sprints', sprintRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});