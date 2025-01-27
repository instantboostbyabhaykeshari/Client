import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiConnector from "../../Services/apiConnector.js";
import FoodCard from "../core/Food-Card.jsx";
import { useNavigate } from "react-router-dom";
import Bottom from "../bottom.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addFoodItemToCart } from "../../Slices/cartSlice.js";
import Header from "../header.jsx";
import {setLoading} from "../../Slices/authSlice.js";
import "../../Styles/Pages/All-Food-Items.css";

function AllFoodItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.auth);
  const [showAllCategory, setShowAllCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Pizza");
  const [foodItems, setFoodItems] = useState();

  console.log("All food items: ", loading);

  useEffect(() => {
    try{
      const showAllFoodCategories = async(dispatch) => {
        dispatch(setLoading(true));
        try{
          const response = await apiConnector("GET", "https://backend-fygl.onrender.com/api/category/showAllCategories");
          // console.log("Show all categories response: ", response);
          if(response?.data){
            setShowAllCategory(response?.data?.allCategories);
          }else{
            toast.error("Failed to fetch food categories");
          }
        }catch(err){
          console.log(err);
        }
      }
      showAllFoodCategories(dispatch);
    }catch(err){
      console.log(err);
      console.log("Error in fetching show all categories api.");
    }
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/all-food-items?category=${category}`)
  }

  useEffect(() => {
    const categoryPageDetails = async () => {
      try {
        dispatch(setLoading(true)); // Set loading to true before the request starts
        const response = await apiConnector(
          "POST",
          "https://backend-fygl.onrender.com/api/category/details",
          { categoryName: activeCategory }
        );
  
        console.log("CategoryPageDetails: ", response);
  
        if (response?.data?.data) {
          setFoodItems(response?.data?.data?.selectedCategory[0]?.foodItems || []);
          console.log(
            "Category page details response: ",
            response?.data?.data?.selectedCategory[0]?.foodItems
          );
        } else {
          setFoodItems([]); // Handle case where no data is returned
          toast.error("Failed to fetch food items for this category");
        }
      } catch (err) {
        console.log(err);
        console.log("Error in fetching category page details API.");
        toast.error("An error occurred while fetching food items");
      } finally {
        dispatch(setLoading(false)); // Ensure loading is set to false after the request
      }
    };
  
    categoryPageDetails();
  }, [activeCategory, dispatch]);
  
  const addToCart = (foodItemName, foodItemPrice) => {
    const foodItem = {
      foodItemName,
      foodItemPrice,
      quantity: 1
    }
    dispatch(addFoodItemToCart(foodItem));
    toast.success("Items added successfully.");
  }
  
  return (
    <div className="AllFoodItemsPage">
      <Header/>
      <div className="foodListingDiv">
        <div className="foodListing">
          {
            showAllCategory.length > 0 ? (
              showAllCategory.map((item)=> (
                <div key={item.id} className={item.name===activeCategory ? "active": "nonActive"} onClick={()=>handleCategoryClick(item.name)}>{item.name}</div>
              ))
            ) : (<div></div>)
          }
        </div>
      </div>
      {
        loading ? (<div className="allFoodItemsLoaderDiv"><div className="allFoodItemsLoader"></div></div>) : 
        (
          foodItems ? (
            foodItems.map((foodItem)=>(
              <FoodCard amount={foodItem.price} foodItemName={foodItem.foodItemName} foodItemDescription={foodItem.foodItemDescription} foodItemThumbnail={foodItem.thumbnail} addToCart={()=>addToCart(foodItem.foodItemName, foodItem.price)} />
            ))
            ): (<div className="noFoodExistForThisCategory">No food items exist for this category.</div>)
        )
      }
      <Bottom/>
    </div>
  );
}

export default AllFoodItems;
