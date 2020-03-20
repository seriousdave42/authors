import React from 'react';
import axios from 'axios';

const DeleteButton = props => {

    const {authorID, successCallback} = props;

    const deleteAuthor = e => {
        axios.delete("http://localhost:8000/api/author/"+authorID)
            .then(res => successCallback())
            .catch(err => console.log(err));
    }
    
    return (
        <button onClick={deleteAuthor}>Delete</button>
    )
        
}

export default DeleteButton