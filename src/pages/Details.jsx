import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const BookDetailPage = () =>{

    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false); 
    console.log(data);
   
    const params = useParams();
    const firebase = useFirebase();

    useEffect(() =>{
        if(params.bookId){
            firebase.getBookById(params.bookId).then((book) => setData(book.data()));
        }
    },[params.bookId, firebase]);

    if(!data){
        return <h1>Loading...</h1>
    }

    const placeOrder = async () => {
        if (!firebase.currentUser || !firebase.currentUser.uid) {
            console.error("User not logged in");    
            alert("Please log in to place an order.");
            return;
        }   
        const result = await firebase.placeOrder(params.bookId, quantity);
        console.log("order placed" + result);
        setOrderSuccess(true); // Show success message
    }

    return (        
        <div className="container mt-5">           
           <h1><b>{data.name}</b></h1>
           <h2>Details:</h2>
           <h4>Price: Rs {data.price}</h4>
           <p>Email: {data.userEmail}</p>
            <p>ISBN: {data.isbnNumber}</p>
             
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control onChange={e => setQuantity(e.target.value)} 
        value={quantity} 
        type="number" 
        placeholder="Enter Quantity" />
      </Form.Group>

            <Button onClick={placeOrder} variant="success">Buy Now</Button>
        {orderSuccess && (
                <div className="alert alert-success mt-3">
                    Order submitted successfully!
                </div>
    )}
        </div>
    )
}

export default BookDetailPage;