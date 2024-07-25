const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/task', taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});