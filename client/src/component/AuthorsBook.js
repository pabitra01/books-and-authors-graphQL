import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery ,gql} from '@apollo/client'
import BooksCard from './BooksCard'
// import { ifError } from 'assert'


const AuthorsBook = () => {
    const {id}=useParams()
    const QUERY_AUTHOR=gql`
{
    author(id:"${id}"){
      name
      age
      photo
      books{
        photo
        name
        author{
          name
        }
      }
    }
  }
`
const {data,loading} = useQuery(QUERY_AUTHOR);
if(data){
    console.log(data);
}
  return (
    <div className='author-book'>
        <div className="ab-main">
            <div className="profile">
                <img src={data &&data.author.photo} alt="" />
            </div>
            <div className="abname">
                {data &&data.author.name}
            </div>
        </div>
        <hr />
       <div className="grid-div">
       {
            data&& data.author.books.map((book)=>(
                <BooksCard book={book} key={book.id}/>
            ))
        }
       </div>
    
    </div>
  )
}

export default AuthorsBook