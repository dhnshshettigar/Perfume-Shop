const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const productRoutes = require('../backend/routes/productRoutes');


const app = express();
app.use(express.json());
app.use(cors());

//connect to mongoDb
connectDb();

//routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send("Perfume shop backend running!"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
