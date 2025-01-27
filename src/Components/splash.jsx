import "../Styles/splash.css";
import logo from "../assets/images/logo-png.png";

const Splash = () => {
    return(
        <div className="splash">
            <img src={logo} alt="Abhay" />
            <h1>Food Fun</h1>
        </div>
    )
}

export default Splash;