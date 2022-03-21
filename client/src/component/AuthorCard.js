import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const AuthorCard = ({authors,key}) => {
  return (
    <Link to={`/authors/${authors.id}`}>
      <div className='a-card'>
        
      {console.log(authors,key)}
        <img src={authors.photo} alt="" />
        <p className='aname'>{authors.name}</p>
    </div>
    </Link>
  )
}

export default AuthorCard