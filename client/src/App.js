import logo from './logo.svg';
import './App.css';
import {ApolloClient,InMemoryCache,createHttpLink,ApolloProvider} from '@apollo/client'
import BookList from './component/BookList';
import { setContext } from '@apollo/client/link/context';
import Nav from './component/Nav';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthorsList from './component/AuthorsList';
import AuthorsBook from './component/AuthorsBook';
import AddAuthor from './component/AddAuthor';
import Login from './component/Login';
import Profile from './component/Profile';
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('graph_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

function App() {
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  // const client=new ApolloClient({
  //   cache:new InMemoryCache(),
  //   uri:'http://localhost:4000/graphql'
  // })
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <Nav/> */}
      <Routes>
      <Route path="/" element={<Login />}>
          
      </Route>
      <Route path="/books" element={<BookList />}>

      </Route>
      <Route path="/authors" element={<AuthorsList />}>
      
      </Route>
      <Route path="/authors/:id" element={<AuthorsBook />}>
      
      </Route>
      <Route path="/new-author" element={<AddAuthor/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
