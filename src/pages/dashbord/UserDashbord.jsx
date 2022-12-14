import { useEffect, useState } from "react";
import buku from "../../img/book.webp";

export default function UserDashboard() {
    const [books, setBooks] = useState([])

    async function getBooks() {
        const res = await fetch("https://be-library-mini-system.herokuapp.com/book/books",
            { method: "GET" })
        const data = await res.json();
        setBooks(data);
    }

    useEffect(() => {
        getBooks()
    }, [])
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card-deck">
                        {books.map(book =>
                            <div className="card">
                                <img className="card-img-top" src={buku} alt="" />
                                <div className="card-body" key={book.bookId}>
                                    <h5 className="card-title">{book.bookTitle}</h5>
                                    <p className="card-text">{book.bookStatus === true ? "Tersedia" : "Dipinjam"}</p>
                                    <p className="card-text"><small class="text-muted">{book.bookYear}</small></p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}