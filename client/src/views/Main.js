import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorForm from '../components/AuthorForm';
import AuthorList from '../components/AuthorList';

const Main = () => {

    const [authors, setAuthors] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then(res => {
                setAuthors(res.data.authors);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [])

    const newAuthor = author => {
        axios.post("http://localhost:8000/api/author", author)
            .then(res => {
                setAuthors([...authors, res.data.author].sort((author1, author2) => author1.authorName > author2.authorName ? 1 : -1));
                setErrors([])
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            });
    }

    const removeFromDOM = authorID => {
        setAuthors(authors.filter(author => author._id !== authorID));
    }

    return(
        <div>
            <h1>Favorite Authors</h1>
            <AuthorForm initialAuthor={{
                authorName: ""
            }} authorHandler={newAuthor} errors={errors} />
            <hr />
            {loaded && <AuthorList authors={authors} removeFromDOM={removeFromDOM}/>}
        </div>
    )
}

export default Main;