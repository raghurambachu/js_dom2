let todoInput_DOM = document.querySelector(".initial-input");
let toggleCheckboxes_DOM = document.querySelector(".toggle-all-checkboxes");
let ul_DOM = document.querySelector("ul")

let todoArr = [];
let isChecked = true;

function printAllTodos(){
    ul_DOM.innerHTML = "";
    todoArr.forEach(todoItem => {
        ul_DOM.innerHTML += `
        <li class="todo-item" id="${todoItem.id}">
            <span class="todo-item-checkbox-span">
                <input type="checkbox" class="todo-item-checkbox" ${todoItem.checked ? "checked" : ""}>
            </span>
            <span class="todo-item-content-span">
            ${todoItem.todo}
            </span>
            <span class="todo-item-close">
            &times;
            </span>
        </li>
    `
    })
    const todoCheckboxes_DOM = document.querySelectorAll(".todo-item-checkbox");
    todoCheckboxes_DOM.forEach(todoCheckbox => {
        todoCheckbox.addEventListener("click",handleIndividualTodoCheckbox);
    })

    const todoRemove_DOM = document.querySelectorAll(".todo-item-close");
    todoRemove_DOM.forEach(todoClose => {
        todoClose.addEventListener("click",handleIndividualCloseTodo);
    })
    
}




function insertInfoAtEnd(){
    
    let liEndHtml = `
    <li class="last-li-one">
        <div class="items-left">
            ${todoArr.reduce((todosLeft,todo) => {
                if(!todo.checked) todosLeft++
                return todosLeft;
            },0)} items left
        </div>
        <div>
            <button class="all-tasks">All</button>
            <button class="active-tasks">Active</button>
            <button class="completed-tasks">Completed</button>
        </div>
        <button class="clear-completed-tasks">
            Clear completed
        </button>
    </li>
        <li class="last-li-two">
    </li>
    `
    return liEndHtml;
}


function handleIndividualCloseTodo(event){
    const getId = event.target.parentElement.getAttribute("id");
    todoArr = todoArr.filter(todoItem => todoItem.id !== getId);
    printAllTodos();
    if(todoArr.length) {
        ul_DOM.insertAdjacentHTML("beforeend",insertInfoAtEnd());
        
    }
    if(!todoArr.length) toggleCheckboxes_DOM.style.visibility = "hidden";
}

function handleIndividualTodoCheckbox(event){
   const getId = event.target.parentElement.parentElement.getAttribute("id");
   const index = todoArr.findIndex(todoItem => todoItem.id === getId);
   
   const todoItemObj = todoArr[index];
   todoItemObj.checked = !todoItemObj.checked;
   todoArr[index] = todoItemObj;
   printAllTodos();
   if(todoArr.length) {
       ul_DOM.insertAdjacentHTML("beforeend",insertInfoAtEnd());
       
    }
}




function handleTodoAdd(event){
    if(event.keyCode !== 13)return;
    let todoValue = todoInput_DOM.value;

    todoArr.push({
        todo:todoValue,
        checked: false,
        id:uuidv4()
    })

    printAllTodos();
    if(todoArr.length) {
        ul_DOM.insertAdjacentHTML("beforeend",insertInfoAtEnd());
        ;
    }


    todoInput_DOM.value = "";
    toggleCheckboxes_DOM.style.visibility = "visible";
}

function handleClickOnToggleCheckboxes(event){
    if(!event.target.closest(".toggle-all-checkboxes")) return;
    todoArr = todoArr.map(todoItem => ({id:todoItem.id,todo:todoItem.todo,checked:isChecked}) );
    printAllTodos();
    if(todoArr.length) {
        ul_DOM.insertAdjacentHTML("beforeend",insertInfoAtEnd());
        
    }
    isChecked = !isChecked;
}

// function handleClickOnActiveTasks(event){
//     if(!event.target.closest(".active-tasks"))return;
//     let activeTasks = 
// }

todoInput_DOM.addEventListener("keyup",handleTodoAdd);

document.body.addEventListener("click",function(event){
    handleClickOnToggleCheckboxes(event);

    //handle click on clicking activeTasks;
    //handleClickOnActiveTasks(event);
})





// if(todoArr.length){
//     console.log("entered")
//     ul_DOM.innerHTML += `
//     <li class="last-li-one">
//         <div class="items-left">
//             ${todoArr.reduce((todosLeft,todo) => {
//                 if(!todo.checked) todosLeft++
//                 return todosLeft;
//             },0)} items left
//         </div>
//         <div>
//         <button>All</button>
//         <button>Active</button>
//         <button>Completed</button>
//         </div>
//         <button>
//         Clear completed
//         </button>
//     </li>
//         <li class="last-li-two">
//     </li>
// `
// }