const express = require('express');
const app = express();
const tasksRouter = require('./routes/TaskRoutes');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const specs = require('./swagger');

const itemRouter = require('./routes/ItemsRoutes');


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

app.use('/api', tasksRouter);
app.use('/api', itemRouter);


