import SearchBar from "../search-bar/search-bar";
import "./navbar.css" ;

const Navbar = (props) => {

    return ( 
        <div className="app-navbar">
            <div className="site-icon square">
                <i className="fas fa-tasks"></i>
            </div>
            <div className="site-name">
                TO DO APP
            </div>
            <div className="search-bar-container">
                <SearchBar setSearchStr={props.setSearchStr} placeholder="Search Tasks"/>
            </div>
            <div className="dark-mode-switch square" onClick={props.toggleAppTheme}>
                <i className={props.appState.theme === "light" ? "fas fa-sun" : "fas fa-moon"}></i>
            </div>
            <div className="user-avatar square">
                <i className="fas fa-user"></i>
            </div>
        </div>
     );
}
 
export default Navbar;