import { createRef } from "react";
import "./search-bar.css"; 

const SearchBar = (props) => {

    let searchInput = createRef();

    function search(){
        props.setSearchStr(searchInput.current.value);
    }

    return ( 
        <div className="search-bar">
            <input ref={searchInput} type="text" className="search-input" onInput={search} placeholder={props.placeholder} />
            <div className="search-icon">
                <i className="fas fa-search"></i>
            </div>
        </div>
     );
}
 
export default SearchBar;