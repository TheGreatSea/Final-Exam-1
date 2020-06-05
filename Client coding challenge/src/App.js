import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      errorMessage = "",
      apiURL = "https://www.googleapis.com/books/v1/volumes",
      books = {}
    }
  }

  findBook = (event) =>{
    event.preventDefault();
    const intitle = event.currentTarget.book_name.vale;

    const url = `${apiURL}?q=intitle:${intitle}`;
    const settings ={
        method : 'GET'
    }
    fetch(url,settings)
      .then(response =>{
        if(response.ok){
          return response.json;
        }
        throw new Error( response.statusText);
      })
      .then(responseJSON =>{
        this.books = responseJSON;
      })
      .catch(err =>{
        console.log(err);
      })
  }
  /* 
    Your code goes here
  */

  render(){
    return(
      <div>
        {
          <BookForm />
        }
      </div>
    )
  }

}

export default App;
