
const DB = {
    lastId : 1,
    data : [
        {  
            id : 0,
            name  : "Shopping List" ,
            icon  : "fas fa-shopping-bag",
            lastId: 2,
            tasks : [
                {id:0,status : false , description : "Buy 4 packets Bread"},
                {id:1,status : true  , description : "Buy Vegetables"},
                {id:2,status : false , description : "Buy 2kg Fruits"}
            ]
        },
        {
            id : 1 ,
            name  : "Work" ,
            icon  : "fas fa-briefcase",
            lastId: 2,
            tasks : [
                {id:0,status : false , description : "Attend meeting at 4"},
                {id:1,status : true  , description : "Compete work report"},
                {id:2,status : false , description : "Review project files"}
            ]
        }
    ]
};

export default DB ;