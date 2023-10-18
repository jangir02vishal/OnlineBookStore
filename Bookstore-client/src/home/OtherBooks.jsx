import React, { useEffect, useState }  from "react";
import BookCards from "../components/BookCards";

const OtherBooks = () =>{
    const [books, setbooks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setbooks(data.slice(4,9)))
    }, [])
    return (
        <div> 
            <BookCards books={books} headLine="Other Books"/>
        </div>
    )
}

export default OtherBooks;