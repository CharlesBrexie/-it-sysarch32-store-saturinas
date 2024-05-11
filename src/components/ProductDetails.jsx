import { useEffect, useState } from 'react';
import { db } from "../../config/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PF6Il00NRENbNMsCUIP7K3kQEn0XgSUDqvVKYgZRuOta4rF4pFCZU89TbmpnZ3O6LnGwTxxtPIYTVB6VWgoEnBG00LScgQs7N'); // Replace with your publishable key

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const handleClick = async (productName, price) => {
        const stripe = await stripePromise;
    
        // Send a request to the backend to create a checkout session
        const response = await fetch('http://localhost:4000/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productName, price:123 }), // Send product name and price to the backend
        });
    
        if (response.ok) {
          // If the request is successful, retrieve the session ID from the response
          const session = await response.json();
    
          // Redirect the user to the Stripe Checkout page using the session ID
          const result = await stripe.redirectToCheckout({ sessionId: session.id });
    
          if (result.error) {
            // If there is an error during the redirect, display the error message
            setError(result.error.message);
          }
        } else {
          // If there is an error creating the checkout session, display an error message
          setError('Error creating checkout session');
        }
      };
    

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const productDocRef = doc(db, "products", id);
                const productDocSnapshot = await getDoc(productDocRef);
                if (productDocSnapshot.exists()) {
                    setProduct({ id: productDocSnapshot.id, ...productDocSnapshot.data() });
                } else {
                    console.log("No such product exists!");
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        getProductDetails();
    }, [id]);

    return (
        <div className='item'>
            <Link to= '/'><button className='button'>Back</button></Link>
            {product ? (
                <div>
                    <img src={product.Image} style={{ width: 300 }} alt={product.Name} />
                    <h1>Name: {product.Name}</h1>
                    <h2>Price: {product.Price}</h2>
                    <h2>Sorcerer: {product.Sorcerer}</h2>
                    <button onClick={()=>handleClick(product.Name, product.Price)}>Checkout</button>
                </div>
                
            ) : (
                <p>Routing to Product Details...</p>
            )}
             <Link to='/'><button className='button'>Home</button></Link>
             <button onClick={()=>handleClick(product.Name, product.Price*100)}></button>
        </div>
    );
}

export default ProductDetails;