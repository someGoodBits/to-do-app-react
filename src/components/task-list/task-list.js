import "./task-list.css";

const TaskList = (props) => {

    // let collection = props.collection ;

    let empty = (props.collection.tasks.length === 0) ;

    return ( 
        <div className="task-list">

            {empty?"No Tasks in the Collection":""}

            {props.collection.tasks.map(t => (
                <div className="task" key={t.id}>
                    <div className="checkbox" onClick={()=>props.toggleTaskStatus(t.id)}>
                        <i className={t.status?"fas fa-check-square":"far fa-square"}></i>
                    </div>
                    <div className="task-description">
                        {t.description}
                    </div>
                    <div className="delete-btn" onClick={()=>props.deleteTask(t.id)}>
                        <i className="fas fa-trash"></i>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default TaskList;