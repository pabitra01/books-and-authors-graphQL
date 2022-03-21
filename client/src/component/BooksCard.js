import React from 'react'

const BooksCard = ({book}) => {
  return (
    <div className='card'>
      {console.log(book.photo)}
        <img src={book.photo} alt="" />
        <p className='bname'>{book.name}</p>
        <p className='baname'>by {book.author.name} </p>
        {/* <p className='bgenre'>genre : {book.genre}</p> */}
    </div>
  )
}

export default BooksCard