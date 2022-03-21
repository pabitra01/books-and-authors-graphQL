const graphql=require('graphql');
const _=require('lodash')
const Book=require('../model/book')
const Author=require('../model/author')
const User=require('../model/user');
const {  createToken } = require('../lib/token');
const { isAuth } = require('../lib/isAuth');
const signInRules=require('../validation/rules')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} =graphql;

 const BookType=new GraphQLObjectType({
     name:'Book',
     fields: ()=>({
         id:{
             type:GraphQLID
         },
         name:{
             type:GraphQLString
         },
         photo:{
             type:GraphQLString
         },
         genre:{
             type:GraphQLString
         },
         author:{
             type:AuthorType,
             resolve(parent,args){
                return Author.findById(parent.authorID)
             }
         }
     })
 })
 const AuthorType=new GraphQLObjectType({
     name:"Author",
     fields:()=>({
         name:{
             type:GraphQLString
         },
         age:{
             type:GraphQLInt
         },
         id:{
             type:GraphQLID
         },
         photo:{
             type:GraphQLString
         },
        
         books:{
             type:new GraphQLList(BookType),
             resolve(parent,args){
                return Book.find({authorID:parent.id})
             }
         }
     })
 })
 const UserType=new GraphQLObjectType({
     name:"user",
     fields:()=>({
         name:{
             type:GraphQLString
         },
         username:{
             type:GraphQLString
         },
         email:{
             type:GraphQLString
         },
         password:{
             type:GraphQLInt
         },
         refreshToken:{
             type:GraphQLString
         }
     })
 })
 const Mutation=new GraphQLObjectType({
     name:"Mutation",
     fields:{
         addAuthor:{
             type:AuthorType,
             args:{
                 name:{
                     type:new GraphQLNonNull(GraphQLString)
                 },
                 age:{
                     type:GraphQLInt
                 },
                 photo:{
                     type: new GraphQLNonNull(GraphQLString)
                 }
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age,
                    photo:args.photo
                })
                return author.save();
            }
         },
         addBook:{
             type:BookType,
             args:{
                 name:{
                     type:new GraphQLNonNull(GraphQLString)
                 },
                 genre:{
                     type:GraphQLString
                 },
                 photo:{
                    type: new GraphQLNonNull(GraphQLString)
                 },
                 authorID:{
                     type:new GraphQLNonNull(GraphQLID)
                 }
             },
             resolve(parent,args){
                 let book=new Book({
                     name:args.name,
                     genre:args.genre,
                     authorID:args.authorID,
                     photo:args.photo
                 });
                 return book.save()
             }
         },
         signUp:{
             type:UserType,
             args:{
                 name:{
                     type:GraphQLString
                 },
                 email:{
                     type:GraphQLString
                 },
                 username:{
                     type:GraphQLString
                 },
                 password:{
                     type:GraphQLInt
                 }
             },
             resolve(parent,args){
                 let user=new User({
                     name:args.name,
                     email:args.email,
                     username:args.username,
                     password:args.password
                 })
                 return user.save();
             }
         },
         signIn:{
             type:UserType,
             args:{
                 email:{
                     type:new GraphQLNonNull(GraphQLString)
                 },
                 password:{
                     type:new GraphQLNonNull(GraphQLInt)
                 },
             },
             async resolve (parent,args,{user}){
             
                const {email,password}=args;
                console.log(args);
                const {error,value}=signInRules.validate(args);
                if(error){
                    return error
                }

                 const userData=await User.findOne({email:args.email});
                 if(!userData || userData.password!==args.password){
                     return {message:"wrong credential"}
                 }
              
                 const token=createToken(userData._id);
             console.log(token);
                 const userData_refreshToken=await User.findByIdAndUpdate({_id:userData._id},{refreshToken:token},{new:true})
               
                 return userData_refreshToken;
               


             }
         }
     }
 })
 const rootQuery=new GraphQLObjectType({
     name:'RootQueryType',
     fields:{
         book:{
             type:BookType,
             args:{id:{
                 type:GraphQLID
             }},
             resolve(parent,args){
                 return Book.findById(args.id)
             }
         },
         author:{
             type:AuthorType,
             args:{id:{
                 type:GraphQLID
             }},
             resolve(parent,args){
                return Author.findById(args.id)
             }
         },
         books:{
             type:new GraphQLList(BookType),
             resolve(parent,args){
                
                // const tokenHeader=process.env.REFRESH_TOKEN_SECRET;
                // // const userId=isAuth(args);
                // console.log(userId);
                 return Book.find({})
             }
         },
         authors:{
             type:new GraphQLList(AuthorType),
             resolve(parent,args){
                return Author.find({})
             }
         },
         user:{
             type:UserType,
             args:{id:{
                 type:GraphQLID
             }},
             resolve(parent,args){
                return User.findById(args.id)
             }
         }
     }
 })
 module.exports=new GraphQLSchema({
     query:rootQuery,
     mutation:Mutation
 })



































 // const books=[
//     {
//         name:"name of the wind",
//         genre:'fantasy',
//         id:'1',
//         authorID:'1'
//     },
//     {
//         name:"the final empire",
//         genre:'fantasy',
//         id:'2',
//         authorID:'3'
//     },
//     {
//         name:"the long earth",
//         genre:'sci-fi',
//         id:'3',
//         authorID:'3'
//     },
//     {
//         name:"the hero of ages",
//         genre:'fantasy',
//         id:'4',
//         authorID:'2'
//     },
//     {
//         name:"the color of magic",
//         genre:'fantasy',
//         id:'5',
//         authorID:'3'
//     },
//     {
//         name:"the light fantastic",
//         genre:'fantasy',
//         id:'6',
//         authorID:'3'
//     }


// ];
// let authors=[
//     {
//         name:'Patrik rothfuss',
//         age:44,
//         id:'1'
//     },
//     {
//         name:'Brandon Sanderson',
//         age:42,
//         id:'2'
//     },
//     {
//         name:'Terry Pratchett',
//         age:66,
//         id:'3'
//     }
// ]