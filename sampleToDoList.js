const todolist = [
    // {
    //     todoname: "make dinner", 
    //     tododate: "2025-02-27"
    // },
    // {
    //     todoname:  "wash dishes",
    //     tododate: "2025-02-27"
    // }

];

displayToDoList();
// Display list to webpage
function displayToDoList(){
    let todolistHTML = "";

    for(let i = 0; i <todolist.length; i++){
        const todoObject = todolist[i];
        const todoName = todoObject.todoname;
        const todoDate = todoObject.tododate;

        const html = `
        <div>${todoName}</div>
        <div>${todoDate}</div>
        <button onclick="todolist.splice(${i}, 1); 
            displayToDoList();" class="delete-btn">Delete
        </button>`;
        todolistHTML += html;
    }
    document.querySelector('.js-todo-list').innerHTML = todolistHTML;
    
}

function addToDO(){
    const inputElementName = document.querySelector(".js-todoName-input");
    const getValueName = inputElementName.value;

    const inputElementDate = document.querySelector(".js-todoDate-input");
    const getValueDate = inputElementDate.value;

    if (getValueName === "" || getValueDate === "") {
        alert("Please enter a task and a date.");
        return;
    }

    todolist.push({todoname: getValueName, tododate: getValueDate});

    inputElementName.value = "";
    inputElementDate.value = "";
    displayToDoList();
}

