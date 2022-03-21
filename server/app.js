const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema=require('./schema/schema')
const connectDB=require('./db/connect')
const cors=require('cors')
const cookieParser=require('cookie-parser');
require('dotenv').config();
const isAuth =require('./lib/isAuth')
const app=express();
const port=4000;

app.use(cors({credentials: true,origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded( {extended :true} ))
app.use(isAuth);
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))


const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("connected to database");
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();
