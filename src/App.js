import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Popup from './components/popup/popup';
import SideBar from './components/sidebar/sidebar';
import TaskList from './components/task-list/task-list';
import DB from "./database" ;

function IDGenerator(init){
    let id = init ;
    return {
        next : function(){
            console.log(id,"=>",id+1);
            id +=1 ;
            return id ;
        }
    };
}

let collectionIDGenerator = new IDGenerator(DB.data.length);

function App() {

    let [TaskCollections,setTaskCollections] = useState(DB.data) ;
    let [selectedCollectionIndex, setSelectedCollectionIndex] = useState(0);

    let [appTheme, setAppTheme] = useState("light");
    let [popupVisible,setPopupVisible] = useState(false);
    let [searchStr,setSearchStr] = useState("") ;

    let filteredList = TaskCollections[selectedCollectionIndex].tasks.filter(t => t.description.toLowerCase().includes(searchStr.toLowerCase())) ;
    
    function toggleAppTheme() {
        if (appTheme === "dark")
            setAppTheme("light");
        else
            setAppTheme("dark");
    }

    function setSelectedCollection(id){
        let collection = TaskCollections.findIndex((c) => c.id === id) ;
        if(collection!==null){
            setSelectedCollectionIndex(collection);
        }
    }

    function toggleTaskStatus(id){
        let taskIndex = TaskCollections[selectedCollectionIndex].tasks.findIndex((t) => t.id === id) ;
        // update task and collections
        if(taskIndex !== -1){
            let collections = [...TaskCollections] ;
            let taskList = [...collections[selectedCollectionIndex].tasks];
            let task = {...taskList[taskIndex]} ;
            task.status = !task.status ;
            taskList[taskIndex] = task ;
            collections[selectedCollectionIndex].tasks = taskList ;
            setTaskCollections(collections);
        }
    }

    function deleteTask(id){
        let taskIndex = TaskCollections[selectedCollectionIndex].tasks.findIndex((t) => t.id === id) ;
        // update task and collections
        if(taskIndex !== -1){
            let collections = [...TaskCollections] ;
            let taskList = [...collections[selectedCollectionIndex].tasks];
            taskList = taskList.filter(task => task.id !== id);
            collections[selectedCollectionIndex].tasks = taskList ;
            setTaskCollections(collections);
        }
    }

    function addTask(taskDescription){
        let taskId = TaskCollections[selectedCollectionIndex].lastId + 1;
        let newTask = {
            id : taskId ,
            status : false,
            description : taskDescription
        }

        let collections = [...TaskCollections] ;
        let taskList = [...collections[selectedCollectionIndex].tasks];
        taskList.push(newTask)
        collections[selectedCollectionIndex].tasks = taskList ;
        collections[selectedCollectionIndex].lastId = taskId ;

        setTaskCollections(collections);
    }

    let appState = {
        theme: appTheme,
        selectedCollection : TaskCollections[selectedCollectionIndex] ,
    }

    function handleKeyDown(event){
        if(event.key === "Enter") {
            if(event.target.value !== "") {
                addTask(event.target.value);
                event.target.value = "" ;
            }
        }
    }

    function createCollection(collectionName,collectionIcon){
        let collectionList = [...TaskCollections];

        let collectionId = collectionIDGenerator.next() ;
        
        let newCollection = {  
            id : collectionId ,
            name  : collectionName ,
            icon  : collectionIcon ,
            lastId: 0,
            tasks : []
        };

        collectionList.push(newCollection);

        setTaskCollections(collectionList);
        setPopupVisible(false);
    }

    return (
        <div className="App" data-theme={appTheme} >
            <div className="navbar-container">
                <Navbar setSearchStr={setSearchStr} appState={appState} toggleAppTheme={toggleAppTheme} />
            </div>
            <main>
                <div className="sidebar-container">
                    <SideBar setPopupVisible={setPopupVisible} appState={appState} collections={TaskCollections} setCollection={setSelectedCollection}/>
                </div>
                <div className="main">
                    <div className="content">
                        <div className="collection-header">
                            <div className="collection-icon">
                                <i className={TaskCollections[selectedCollectionIndex].icon}></i>
                            </div>
                            <div className="collection-title">
                                {TaskCollections[selectedCollectionIndex].name}
                            </div>
                        </div>
                        <div className="collection-body">
                            <div className="section-header">
                                All Tasks
                            </div>
                            <div className="task-list-container">
                                <TaskList deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus} collection={{tasks:filteredList}}/>
                            </div>
                        </div>
                        <div className="collection-footer">
                            <div className="add-task-input">
                                <div className="icon">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <input type="text" placeholder="Add New Task" onKeyDown={handleKeyDown}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {(popupVisible?<Popup setPopupVisible={setPopupVisible} createCollection={createCollection}/>:"")}
        </div>
    );
}

export default App;
