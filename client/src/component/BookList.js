import React from 'react'
import { useQuery ,gql} from '@apollo/client'
import BooksCard from './BooksCard'
import { setContext } from '@apollo/client/link/context';
const QUERY_ALL_BOOKS=gql`
{
    books{
        name
        genre
        id
        photo
        author{
            name
            age
        }
    }
}
`
// setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('graph_token');
//     // return the headers to the context so httpLink can read them
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       }
//     }
//   });

const BookList = () => {
    const {data:booksData,loading} = useQuery(QUERY_ALL_BOOKS);
 

   
    if(booksData){
        console.log(booksData);
    }
  return (
    <div className='book-main'>
        {booksData && booksData.books.map((book)=>(
            <>
            {console.log(book)}
            <BooksCard book={book} key={book.id}/></>
            
        ))}
    </div>
  )
}

export default BookList