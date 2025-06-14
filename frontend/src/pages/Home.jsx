import React, { useState ,useEffect} from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import {useDispatch, useSelector} from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import axios from 'axios'
// const placeholderProducts=[
//   {
//     _id:1,
//     name:"Product 1",
//     price:100,
//     images:[{
//         url:"https://picsum.photos/500/500?random=8"
//     }]
// },
// {
//     _id:2,
//     name:"Product 2",
//     price:100,
//     images:[{
//         url:"https://picsum.photos/500/500?random=9"
//     }]
// },
// {
//     _id:3,
//     name:"Product 3",
//     price:100,
//     images:[{
//         url:"https://picsum.photos/500/500?random=11"
//     }]
// },{
//     _id:4,
//     name:"Product 4",
//     price:100,
//     images:[{
//         url:"https://picsum.photos/500/500?random=14"
//     }]
// },
// {
//   _id:5,
//   name:"Product 5",
//   price:100,
//   images:[{
//       url:"https://picsum.photos/500/500?random=15"
//   }]
// },
// {
//   _id:6,
//   name:"Product 6",
//   price:100,
//   images:[{
//       url:"https://picsum.photos/500/500?random=16"
//   }]
// },
// {
//   _id:7,
//   name:"Product 7",
//   price:100,
//   images:[{
//       url:"https://picsum.photos/500/500?random=17"
//   }]
// },{
//   _id:8,
//   name:"Product 8",
//   price:100,
//   images:[{
//       url:"https://picsum.photos/500/500?random=18"
//   }]
// }
// ]
function Home() {
  const dispatch = useDispatch();
  const {products,loading ,error} = useSelector((state)=>state.products);
  const [bestSellerProduct ,setBestSellerProduct ] = useState(null);
  useEffect(()=>{
    //Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender:"Women",
        category:"Bottom Wear",
        limit:8,
      })
    );
    //Fetch Best seller products
    const fetchBestSeller = async()=>{
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      }catch(error){
        console.error(error);
      }
    }
   fetchBestSeller();
  },[dispatch])
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      {/* Best Seller Section */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      {
        bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>):(
          <p className='text-center'>Loading Best Seller Product ...</p>
        )
      }
      
      <div className='container mx-auto max-w-7xl '>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Tops Wear For Women
        </h2>
        <ProductGrid products={products}  loading={loading} error={error} />
      </div>
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  )
}

export default Home
