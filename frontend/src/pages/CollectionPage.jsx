import React, { useEffect, useRef, useState } from 'react'
import {FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
function CollectionPage() {
    const {collection} = useParams();
   const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const {products ,loading ,error} = useSelector((state)=>state.products);
    const queryParams = Object.fromEntries([...searchParams]);
    
    const sidebarRef = useRef(null);
    const buttonRef = useRef(null); // ✅ NEW ref for the Filter button
    const [isSideBarOpen ,setIsSideBarOpen] = useState(false);

    useEffect(()=>{
      dispatch(fetchProductsByFilters({collection ,...queryParams}))
    },[dispatch , collection ,searchParams])
    const toggleSidebar =()=>{
        setIsSideBarOpen(!isSideBarOpen);
    };
    const handleClickOutside=(e)=>{
        //close sidebar if click outside
        // if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
        //     setIsSideBarOpen(false);
        // }
        if (
          sidebarRef.current && 
          !sidebarRef.current.contains(e.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(e.target)
      ) {
          setIsSideBarOpen(false);
      }
    }
   
    useEffect(() => {
        //   ADD EventListner for clicks
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // clean EventListner
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    // useEffect(()=>{
    //     setTimeout(() => {
    //         const FeaturedProducts = [
    //             {
    //               _id:1,
    //               name:"Product 1",
    //               price:100,
    //               images:[{
    //                   url:"https://picsum.photos/500/500?random=8"
    //               }]
    //           },
    //           {
    //               _id:2,
    //               name:"Product 2",
    //               price:100,
    //               images:[{
    //                   url:"https://picsum.photos/500/500?random=9"
    //               }]
    //           },
    //           {
    //               _id:3,
    //               name:"Product 3",
    //               price:100,
    //               images:[{
    //                   url:"https://picsum.photos/500/500?random=11"
    //               }]
    //           },{
    //               _id:4,
    //               name:"Product 4",
    //               price:100,
    //               images:[{
    //                   url:"https://picsum.photos/500/500?random=14"
    //               }]
    //           },
    //           {
    //             _id:5,
    //             name:"Product 5",
    //             price:100,
    //             images:[{
    //                 url:"https://picsum.photos/500/500?random=15"
    //             }]
    //           },
    //           {
    //             _id:6,
    //             name:"Product 6",
    //             price:100,
    //             images:[{
    //                 url:"https://picsum.photos/500/500?random=16"
    //             }]
    //           },
    //           {
    //             _id:7,
    //             name:"Product 7",
    //             price:100,
    //             images:[{
    //                 url:"https://picsum.photos/500/500?random=17"
    //             }]
    //           },{
    //             _id:8,
    //             name:"Product 8",
    //             price:100,
    //             images:[{
    //                 url:"https://picsum.photos/500/500?random=18" }
    //         ]
                
    //           }
    //         ];
    //         setProducts(FeaturedProducts)
    //     },1000 );

    // },[])
  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Mobile Filter Button */}
      <button 
        ref={buttonRef} // ✅ Apply new ref here
      onClick={toggleSidebar}
      className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2'/> Filters
      </button>
      {/* Filter Sidebar */}
      <div 
      ref={sidebarRef}
       className={`${isSideBarOpen ? "translate-x-0":"-translate-x-full"}
         fixed inset-y-0 z-50 left-0 w-1/3
    bg-white overflow-y-auto transition-transform 
    duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar/>
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
        {/* Sort Options */}
        <SortOptions/>
        {/* product grid */}
        <ProductGrid products={products} 
         loading={loading} error={error}
        />
      </div>
      
    </div>
  )
}

export default CollectionPage
