import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase";

const ListingPage = () =>{

    const firebase = useFirebase();
    
    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [success, setSuccess] = useState(false); 

   const handleSubmit = async(e) =>{
     e.preventDefault();
      await firebase.handleCreateNewListing(name,isbnNumber,price);
      setSuccess(true); 
   }

  return (

      <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control onChange={e => setName(e.target.value)} 
        value={name} type="text" placeholder="Enter book name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control onChange={e => setIsbnNumber(e.target.value)} 
        value={isbnNumber} type="text" placeholder="enter ISBN" />
      </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control onChange={e => setPrice(e.target.value)} 
        value={price} type="text" placeholder="Enter price" />
      </Form.Group>

     
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
     {success && (
          <div className="alert alert-success mt-3">
            Successfully listed!
          </div>
        )}
        </div>
  )
}

export default ListingPage; 