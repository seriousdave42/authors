import React, { useState } from 'react';

const QuoteForm = (props) => {

    const {quoteHandler, errors} = props;
    const [newQuote, setNewQuote] = useState("");

    const onSubmitHandler = e => {
        e.preventDefault();
        quoteHandler(newQuote);
        setNewQuote("");
    };

    return (
        <div>
            <form onSubmit = {onSubmitHandler}>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
                <p>
                    <label>Add a Quote: </label>
                    <input type="text" value={newQuote} onChange={e=>setNewQuote(e.target.value)}></input>
                    <input type="submit" value="Submit" />
                </p>
            </form>
        </div>
    )
}

export default QuoteForm;