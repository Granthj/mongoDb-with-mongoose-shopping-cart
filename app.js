const express = require('express');
const app = express();
const connectDb = require('./Config/db');

const userRoutes = require('./Route/userRoute');
const productRoutes = require('./Route/productRoute');
const cartRoutes = require('./Route/cartRoute');
const orderRoutes = require('./Route/orderRoute');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const start = async()=>{

  try{
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  }
  catch(err){
    console.log(err);
  }
}
start();