import { Link } from "react-router-dom";
import { useEffect } from "react";
import apiConnector from "../Services/apiConnector";
import "../Styles/categories.css";

const Categories = () => {

    useEffect(() => {
        const getCategory = async() => {
            try{        
                const response = await apiConnector("GET", "http://localhost:4000/api/category/showAllCategories");
                console.log("Get all categories response in category component: ", response);
            }catch(err){
                console.log(err);
                console.log("Error in getting category details in category component.");
            }
        }
        getCategory();
    }, []);

    return (
        <div className="mid">
            <div className="topCategories">
                <h2>Top Categories</h2>
                <Link to={"/all-food-items"} style={{textDecoration: "none", color: "#C2C2C2"}}><p>See All</p></Link>
            </div>
            <div className="top">
                <Link to={"/all-food-items?category=Pizza"} className="CategoriesLinkClassName">
                    <div className="pizza">
                        <div className="showCategories first"></div>
                        <p>Pizza</p>
                    </div>
                </Link>
                <Link to={"/all-food-items?category=Burger"} className="CategoriesLinkClassName">
                    <div className="burger">
                        <div className="showCategories second"></div>
                        <p>Burger</p>
                    </div>
                </Link>
                <Link to={"/all-food-items?category=South-Indian"} className="CategoriesLinkClassName">
                    <div className="momos">
                        <div className="showCategories third"></div>
                        <p>Dosa</p>
                    </div>
                </Link>
                <Link to={"/all-food-items?category=Chinese"} className="CategoriesLinkClassName">
                    <div className="chow">
                        <div className="showCategories fourth"></div>
                        <p>Chowmein</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Categories;