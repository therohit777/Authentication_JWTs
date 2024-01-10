const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

require('dotenv').config();

const app = express();
const PORT = 8000;


app.use(express.json());
// app.use("/api/users", userRoutes);

app.use('/.netlify/functions/server', userRoutes); 
app.use('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
   app.listen(PORT,()=>{
      console.log(`server is listening at port ${PORT} `);
   })
})
.catch((err) => {
    console.log("Error Occurred");
});
