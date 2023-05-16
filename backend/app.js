const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./.swagger_output.json');
const specs = require('./swagger');


const taskRouter = require('./routes/TaskRoutes');
const usersRouter = require('./routes/UserRoutes');
const todolistRouter = require('./routes/ToDoListRoutes');
const dashboardRouter = require('./routes/DashboardRoutes');

const app = express();
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/tasks-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));

app.use('/api', todolistRouter);
app.use('/api', taskRouter);
app.use('/api', usersRouter);
app.use('/api', dashboardRouter );
app.use(cors());

