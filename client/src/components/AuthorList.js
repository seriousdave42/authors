import React from 'react';
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';

const AuthorList = props => {

    return (
        <div>
            <h2>Author List</h2>
            <ul style={{width: "200px", margin: "auto"}}>
                {props.authors.map((author, i) => 
                    <li key={i}>
                        <Link to = {`/author/${author._id}`}>{author.authorName}</Link>
                        <DeleteButton authorID={author._id} successCallback={() => props.removeFromDOM(author._id)} />    
                    </li>)}
            </ul>
        </div>
    )

}

export default AuthorList;
