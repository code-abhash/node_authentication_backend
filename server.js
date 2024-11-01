const express = require('express')
const signupRoutes=require('./routes/SignupRoutes')
const loginRoutes=require('./routes/LoginRoutes')
const RoleRoutes=require('./routes/RoleRoutes')
const app = express()
const port = 3000
const mongooseConnection =require('./db')

app.use(express.json());
app.use('/api', signupRoutes);
app.use('/api', loginRoutes);
app.use('/api', RoleRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongooseConnection.once('connected',()=>{
  console.log('The database is connected')
})

mongooseConnection.on('error',(err)=>{
  console.log("The error while connecting the database is" ,err)
})