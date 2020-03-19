import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';
import DeleteButton from '../components/DeleteButton';
import QuoteForm from '../components/QuoteForm';

const AuthorDetail = props => {

    const [author, setAuthor] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [badID, setBadID] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/author/" + props.id)
            .then(res => {
                setAuthor(res.data.author)
                setQuotes(res.data.author.authorQuotes)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err);
                setBadID(true)
            });
    }, [props.id])

    const quoteHandler = newQuote => {
        axios.put("http://localhost:8000/api/author/"+props.id+"/update", {
            authorName: author.authorName,
            authorQuotes: [...quotes, newQuote]
        })
            .then(res=> {
                console.log("Response: ", res);
                setQuotes([...quotes, res.data.author.authorQuotes[res.data.author.authorQuotes.length-1]])
            })
            .catch(err=> {
                console.log("Error: ", err);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            });
    }

    const deleteQuote = (e, i) => {
        axios.put("http://localhost:8000/api/author/"+props.id+"/update", {
            authorName: author.authorName,
            authorQuotes: [...quotes.slice(0,i), ...quotes.slice(i+1)]
        })
            .then(res=> {
                console.log("Response: ", res);
                setQuotes(res.data.author.authorQuotes)
            })
            .catch(err=> {
                console.log("Error: ", err);
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
            {!badID &&
            <div>
                <h2>{author.authorName}</h2>
                <Link to={"/author/"+author._id+"/update"}>Update</Link>
                <br />
                <DeleteButton authorID={author._id} successCallback={() => navigate("/")}/>
                <hr />
                <h3>Quotes</h3>
                <QuoteForm initialAuthor={author} errors={errors} quoteHandler={quoteHandler}/>
                {loaded && <ul style={{width: "200px", margin: "auto"}}>
                    {quotes.map((quote, i) => 
                        <li key={i}>
                            "{quote}"
                            <button onClick={(e) => deleteQuote(e, i)}>Delete</button>
                        </li>)}
                </ul>}
                <hr />
                <Link to="/">Back to Home</Link>
            </div>}
        </div>
    )
}

export default AuthorDetail;