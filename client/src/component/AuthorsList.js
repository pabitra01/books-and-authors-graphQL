import React from 'react'
import { useQuery ,gql} from '@apollo/client'
import AuthorCard from './AuthorCard'

const QUERY_ALL_AUTHORS=gql`
{
    authors{
      id
      name
      age
      photo
      books{
        name
        genre
      }
    }
  }
`

const AuthorsList = () => {
    const {data:authorsData,loading} = useQuery(QUERY_ALL_AUTHORS);
  return (
    <div className='author-main'>
        {authorsData && authorsData.authors.map((author)=>(
            <AuthorCard authors={author} key={author.id}/>
        ))}

    </div>
  )
}

export default AuthorsList