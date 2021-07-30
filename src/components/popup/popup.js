import { createRef } from "react";
import "./popup.css";

const Popup = (props) => {

    let collectionName  = createRef();
    // let collectionColor = createRef();
    let collectionIcon  = createRef();

    function createCollection(){

        if(collectionName.current.value === "") return ;
        if(collectionIcon.current.value === "") 
            collectionIcon.current.value = "far fa-file-alt";
        // if(collectionColor.current.value === "") ;
        //     collectionColor.current.value = "#0d59f2";

        props.createCollection(
            collectionName.current.value,
            collectionIcon.current.value
        );

        collectionName.current.value = "" ;
        collectionIcon.current.value = "" ;
    }


    return ( 
        <div className="popup-container">
            <div className="popup">
                <div className="title">Create new Collection</div>
                <div className="field">
                    <label htmlFor="collectionName">Collection name *</label>
                    <input type="text" ref={collectionName} id="collectionName" placeholder="Enter name" />
                </div>
                <div className="field">
                    <label htmlFor="collectionName">Collection icon (FontAwesome icon)</label>
                    <input type="text" ref={collectionIcon} id="collectionIcon" placeholder="eg. 'fas fa-book'" />
                </div>
                {/* <div className="field row">
                    <label htmlFor="collectionName">Collection Color</label>
                    <input type="color" ref={collectionColor} id="collectionColor" />
                </div> */}
                <div className="actions">
                    <div className="btn" onClick={()=>props.setPopupVisible(false)}>
                        Cancel
                    </div>
                    <div className="btn primary" onClick={createCollection}>
                        Create
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Popup;