
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,ref,set,child,update,remove, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
    apiKey: "AIzaSyAB22_XrbxHTCFjxGN0jkzJFnbSeCk6WMQ",
    authDomain: "todo-app-minimal.firebaseapp.com",
    databaseURL: "https://todo-app-minimal-default-rtdb.firebaseio.com",
    projectId: "todo-app-minimal",
    storageBucket: "todo-app-minimal.appspot.com",
    messagingSenderId: "1065014720151",
    appId: "1:1065014720151:web:144f5e96467e1f6183dbd2"
};


const app = initializeApp(firebaseConfig);
const DATABASE = getDatabase(app);

///////////////////////////////////////////////////////////////


var todos = [];

const dbRef = ref(getDatabase());
get(child(dbRef,"todos")).then((snapshot) => {
    if (snapshot.exists()) {
        let temp =  snapshot.val();
        todos = temp;
        console.log(temp);
      } else {
        console.log("No data available");
      }
      readTodo();
    }).catch((error) => {
      console.error(error);
    });









var input = document.getElementById("input");
var renderTodo = document.getElementById("renderTodo");
var mainDiv = document.getElementById("mainDiv");
var editDiv = document.getElementById("editDiv");
var editInput;


window.addTodo = function (){
    // preventDefault();
if(!input.value) return ;


todos.push(input.value);
// console.log(todos);
input.value = '';


set(ref(DATABASE,),{
    todos : todos
})



readTodo();
}

window.readTodo= function (isDeleteAll){
    // get(
    //     child(ref(getDatabase()))
    //     ,"todos/todos")
    //     .then((snapshot) =>{
    //     if(snapshot.exists()){
    //       console.log(snapshot.val())
    //     }
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    renderTodo.innerHTML = ``;
    if(isDeleteAll) return;


    // console.log(todos)
    for(var i = 0 ; i < todos.length ; i++){

        renderTodo.innerHTML += `<li><span class="added-todo">${todos[i]}</span >
        <span><button onclick="editTodo(${i})"><i class="fa-solid fa-pen-to-square btn-bg-color"></i></button><button onclick="deleteTodo(${i})"><i class="fa-solid fa-trash btn-bg-color"></i></button></span></li>`;
    }
}


window.editTodo= function (indexNumber){

    mainDiv.className = "mainDivChange";
    editDiv.className = "editDivChange";
    
    
    editDiv.innerHTML = `<div class="bg-image" style =""></div><div class = "editInput "><div class="input"><input type ="text" class = "editInputBox" id = "editInput" placeholder = "Edit"/><button class="btn-bg-color btn-add" onclick = "editInputSave(${indexNumber})"> Edit</button> </div><div class = "editTextOne">${todos[indexNumber]}</div></div>`
    
    
    
    
    

    // todos[indexNumber] = prompt("write updated value");
    readTodo();
}

window.deleteTodo= function (indexNumber){
    
    todos.splice(indexNumber,1);
    set(ref(DATABASE,),{
        todos : todos
    })
    readTodo();
}


window.deleteAllTodo= function (){
    todos = [];
    set(ref(DATABASE,),{
        todos : todos
    })
    readTodo(true);
    addTodo();
}





window.editInputSave= function (i)  {
    editInput = document.getElementById('editInput');
    todos[i] = editInput.value;
    mainDiv.className = "mainDiv";
    editDiv.className = "editDiv";
    if(!todos[i]) return;
    set(ref(DATABASE,),{
        todos : todos
    })
  
    readTodo();
}

