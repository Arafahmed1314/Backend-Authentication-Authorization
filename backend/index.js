require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connection'); // keep the same casing you exported
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const app = express();
const PORT = process.env.PORT || 3000;
// 2️⃣  Connect to Mongo **after** env vars are ready
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/user', userRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Authentication and Authorization API');
});

app.listen(PORT, () =>
    console.log(`🚀  Server is running on port ${PORT}`)
);
