import React,{useState} from 'react'
import { gql, useMutation } from '@apollo/client';
const LOGIN_MUTATION=gql`

mutation login($email: String!, $password: Int!){
    signIn(email: $email, password: $password) {
      name
      email
      password,
      refreshToken
    }
  }`
const Login = () => {
    const [email,setemail]=useState('');
    
    const [password,setpassword]=useState('');
  
const [loginUser,data]=useMutation(LOGIN_MUTATION);
if(data){
  console.log(data);
  window.localStorage.setItem('graph_token', data && data.data && data.data.signIn && data.data.signIn.refreshToken);
}


if(data!==null){
    const token=data && data.data && data.data.signIn && data.data.signIn.refreshToken;
    console.log(token);
    document.cookie='newgraphtoken='+token
}
  return (
    <div className='login'>
        <input type="text" placeholder='email' onChange={(event)=>{setemail(event.target.value)}}/>
        <input type="text" placeholder='password'onChange={(event)=>{setpassword(Number(event.target.value))}}/>
        <button onClick={()=>{loginUser({variables:{
            email:email,
            password:password
        }})}}>login</button>
    </div>
  )
}

export default Login