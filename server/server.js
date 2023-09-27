const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const taskRouter = require('./router/TaskRouter');
const AuthRouter = require('./router/AuthRouter')
const cors = require('cors')
const errorMiddleware = require('./middleware/errorMiddleware');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(cookieParser())
const PORT = process.env.PORT 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB Connetion Successfull")
  }).catch((err) => console.log(err))

  app.use(cors())
// app.use(cors({
//     credentials: true,
//     origin: [process.env.CLIENT_URL],
// }));

app.use(errorMiddleware)
app.use('/auth', AuthRouter)
app.use('/api', taskRouter)


app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`)
})
