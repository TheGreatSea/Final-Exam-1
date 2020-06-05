import React from 'react';

function Book( props ){
    return(
        <div>
                <p>{props.Title}</p>
                <p>{props.author}</p>
                <img src={props.Thumbnail} alt={props.Title}></img>
                <p>{props.text}</p>
        </div>
    );
}

export default Book;