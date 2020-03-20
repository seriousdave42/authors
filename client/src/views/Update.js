import React, { useState, useEffect } from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import AuthorForm from '../components/AuthorForm';

const Update = (props) => {
    const { id } = props;
    const [author, setAuthor] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const [badID, setBadID] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/author/" + id)
            .then(res => {
                setAuthor({...res.data.author});
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setBadID(true)
            });
    }, [id])

    const updateAuthor = author => {
        axios.put("http://localhost:8000/api/author/"+id, author)
            .then(res=> {
                console.log("Response: ", res);
                navigate("/author/"+id);
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

    return (
        <div>
            {badID &&
                <div>
                    <h3>We're sorry, this author page doesn't exist</h3>
                    <Link to="/">Home</Link>
                </div>
            }
            {loaded && 
                <AuthorForm initialAuthor={author} authorHandler={updateAuthor} errors={errors}/>
            }
        </div>
    )
}

export default Update;
