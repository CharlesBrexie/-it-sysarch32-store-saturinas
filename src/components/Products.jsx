import { useEffect, useState } from 'react';
import { db } from "../../config/firebase";
import { getDocs, collection, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Products() {
  
    const [productList, setProductList] = useState([]);

    const productsCollectionRef = collection(db, "products")

    useEffect(() => {
        const getProductList = async () => {

            try {
            const data = await getDocs(productsCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id,}));
            setProductList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };

        getProductList();
    }, []);

    return (
      
      <div>
          {productList.map((product) => (
                
              <div key={product.id} className='items'>
                
                  <div >
                  <img className='image' src={product.Image} alt={product.Name} />
                  <h1 className='Name'>{product.Name}</h1>
                  <p className='price'>{product.Price}</p>
                  <Link to={`/product/${product.id}`}>
                      <button>Details</button>
                  </Link>
                  </div>
                  </div>
                   
          ))}
      </div>
      
  )
}

export default Products