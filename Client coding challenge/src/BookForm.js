import React from 'react';

function BookForm( props ){
    return(
        <div>
            {
            <form onSubmit={() => props.findBook()}>
                <label for="book_name">Give me the name of the book</label>
                <input type="text" id="book_name" name="book_name"></input>
                <button type="submit">
                    Search book
                </button>
            </form> 
            }
        </div>
    );
}

export default BookForm;