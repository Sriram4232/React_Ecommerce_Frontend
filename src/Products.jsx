import {useState,useEffect} from "react"
import Card from "./Card";
function Products({searchquery}) {
    const [products, setproducts] = useState([])
   //fetch the product dat from the fakestore Api
    useEffect(() => {
      
      fetch('https://react-ecommerce-backend-vlnk.onrender.com/products')
    .then(response => response.json())
    .then(data => setproducts(data));
    
     
    }, [])
    


 let filteredproducts= products.filter((p)=>{
return p.title.toLowerCase().includes(searchquery.toLowerCase())
  })

  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",gap:'20px'}}   >

    {
        filteredproducts.map((p)=>{
       return <Card image={p.image} title={p.title}  price={p.price}  />
        })
    }

    </div>
    </>
  )
}

export default Products
