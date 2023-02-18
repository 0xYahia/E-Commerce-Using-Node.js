const path = require('path');

const express = require('express');
const morgan = require('morgan');

const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const dbConnection = require('./config/database');
const ApiError = require('./utlis/apiError');
const globalError = require('./middlewares/errorMiddleware');
// Routes
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');
const reviewRoute = require('./routes/reviewRoute');
const reviewUser = require('./routes/userRoute');

// Connet with DB
dbConnection();

// express app
const app = express();
// Middlewares
app.use(express.json());

app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routers
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/users', reviewUser);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log('Shutting down...');
    process.exit(1);
  });
});
