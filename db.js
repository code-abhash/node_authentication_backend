const mongoose = require ('mongoose');
const mongoUrl='mongodb://localhost:27017/authentication';

mongoose.connect(mongoUrl)

mongoose.connection.on('connected',()=>{
    console.log('mongoose database is connected')
})

mongoose.connection.on('disconnected',()=>{
    console.log('Database is disconnected')
})

mongoose.connection.on('error',(err)=>{
    console.log('Eroor is',err)
})

module.exports=mongoose.connection;