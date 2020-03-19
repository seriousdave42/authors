import React, { useState } from 'react';

const AuthorForm = (props) => {

    const { initialAuthor, authorHandler, errors } = props;
    const [authorName, setAuthorName] = useState(initialAuthor.authorName);

    const onSubmitHandler = e => {
        e.preventDefault();
        authorHandler({
            authorName: authorName
        });
        setAuthorName("");
    };

    return (
        <div>
            <form onSubmit = {onSubmitHandler}>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
                <p>
                    <label>Name </label>
                    <input type="text" value={authorName} onChange={e=>setAuthorName(e.target.value)}></input>
                </p>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AuthorForm;