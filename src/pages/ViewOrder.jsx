import React, {use, useEffect} from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/Card';

const OrdersPage = () => {   
    const firebase = useFirebase();
    const [books, setBooks] = React.useState([])
    
     useEffect(() => {
        if (firebase.currentUser && firebase.currentUser.uid) {
            firebase.fetchMyBooks()?.then((books) =>setBooks(books.docs));
        } else {
            console.error("User not logged in");
        }
    }, [firebase.currentUser]);

    console.log("my books", books.docs);

    return (    
        <div>
            <h1>Orders Page</h1>
            
            {books.map((book) => (
                <BookCard link={`/book/order/${book.id}`} key={book.id} id={book.id} {...book.data()} />
            ))}

        </div>
    )
}
export default OrdersPage;