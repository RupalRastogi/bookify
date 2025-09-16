import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


const BookCard = (props) =>{
  
    const navigate = useNavigate();

   return (
     <Card style={{ width: '18rem' , margin : '10px'}}>
    
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name} and
           this book cost is {props.price}
        </Card.Text>
        <Button onClick={(e) =>{ navigate(props.link)}} variant="primary">View</Button>
      </Card.Body>
    </Card>
   )
}

export default BookCard;