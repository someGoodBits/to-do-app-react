
import "./sidebar.css" ;

const SideBar = (props) => {

    return ( 
        <div className="side-bar">
            <div className="section-header">
                Collections
            </div>

            <div className="item-container">

                { props.collections.map((c)=>(
                    <div className="item" data-state={props.appState.selectedCollection.id === c.id ? "selected" : ""} key={c.id} onClick={()=>props.setCollection(c.id)}>
                        <div className="icon">
                            <i className={c.icon}></i>
                        </div>
                        <div className="title">
                            {c.name}
                        </div>
                        {(()=>{
                                let tasks = c.tasks.filter(t => t.status === false).length ;
                                if(tasks !== 0) {
                                    return (
                                        <div className="tasks">
                                            {tasks}
                                        </div>
                                    );
                                } else {
                                    return "";
                                }
                        })()}
                        
                    </div>
                ))}
            </div>
            
            <div className="add-btn" onClick={() => props.setPopupVisible(true)}>
                Create Collection
                <i className="fas fa-plus"></i>
            </div>
        </div>
    );
}
 
export default SideBar;