import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";


const ViewOrderDetail = () => {

    const params = useParams();
    console.log(params);
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        if(params.bookId){
            firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
        }
    },[]);

   return (
     <div className="container mt-5">          
        <h1><b>View Order Detail Page</b></h1>
      {
        orders.map(order =>{
            const data =  order.data();
            console.log(data);

            return (
             <div className="mt-5 mb-5 p-3 border" key={order.id}> 
            
                <h4>Order by : {data.userEmail} </h4>
                <p> Order Id : {data.userId}  </p>
                <h6>Quantity : {data.quantity} </h6> 
                
            </div>
    
            )
        })
      }

    </div>

    )       
}

export default ViewOrderDetail;