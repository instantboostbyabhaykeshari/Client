import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import "../Styles/bottom.css";

const Bottom = () => {
    const route = useLocation();
    const {signUpData} = useSelector((state)=>state.auth);
    // console.log("signUpData: ", signUpData.email);

    // console.log("Abhay", import.meta.env);
    
    const matchRoute = (path) => {
        return route.pathname === path;
    }

    return (
        <>
            {
                signUpData.email !== "sudhanshumodan7890@gmail.com" ?
                (
                    <div className="bottom">
                        <Link to={"/home"} className={matchRoute("/home")?"bottomLinkActive": "bottomLinkInactive"} >
                            <div className="home">
                                <FontAwesomeIcon className="iconColorSize" icon={faHouse} />
                                <p>Home</p>
                            </div>
                        </Link>
                        <Link to={"/order"} className={matchRoute("/order")?"bottomLinkActive": "bottomLinkInactive"}>
                            <div className="order">
                                <FontAwesomeIcon className="iconColorSize" icon={faReceipt} />
                                <p>Orders</p>
                            </div>
                        </Link>
                        <Link to={"/bookmark"} className={matchRoute("/bookmark")?"bottomLinkActive": "bottomLinkInactive"}>
                            <div className="bookmark">
                                <FontAwesomeIcon className="iconColorSize" icon={faBookmark} />
                                <p>Bookmark</p>
                            </div>
                        </Link>
                        <Link to={"/profile"} className={matchRoute("/profile")?"bottomLinkActive": "bottomLinkInactive"}>
                            <div className="profile">
                                <FontAwesomeIcon className="iconColorSize" icon={faCircleUser} />
                                <p>Profile</p>
                            </div>
                        </Link>
                    </div>
                ):
                (
                    <div className="bottom">
                        <Link to={"/order-list"} className={matchRoute("/order-list")?"bottomLinkActive": "bottomLinkInactive"}>
                            <div className="orderList">
                                <RiAdminFill size={22} />
                                <p>Order list</p>
                            </div>
                        </Link>
                        <Link to={"/profile"} className={matchRoute("/profile")?"bottomLinkActive": "bottomLinkInactive"}>
                            <div className="profile">
                                <FontAwesomeIcon className="iconColorSize" icon={faCircleUser} />
                                <p>Profile</p>
                            </div>
                        </Link>
                    </div>
                )
            }
        </>
    )
}

export default Bottom;