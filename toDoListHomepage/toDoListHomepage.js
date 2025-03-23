document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});


// Task Lists
const todolist = [];
const weeklyList = [];
const upcomingList = [];

// Current task type for popup
let currentTaskType = 'today';

// Display Functions
function displayToDoList(){
    let todolistHTML = "";
    for(let i = 0; i < todolist.length; i++){
        const todoObject = todolist[i];
        const todoName = todoObject.todoname;
        const todoDate = todoObject.tododate;
        const html = `
            <div>${todoName}</div>
            <div>${todoDate}</div>
            <button onclick="todolist.splice(${i}, 1); displayToDoList(); updateAllContents();" class="delete-btn">❌</button>`;
        todolistHTML += html;
    }
    document.querySelector('.js-todo-list').innerHTML = todolistHTML;
    updateAllContents();
}

function displayWeeklyList(){
    let weeklyHTML = "";
    for(let i = 0; i < weeklyList.length; i++){
        const todoObject = weeklyList[i];
        const todoName = todoObject.todoname;
        const todoDate = todoObject.tododate;
        const html = `
            <div>${todoName}</div>
            <div>${todoDate}</div>
            <button onclick="weeklyList.splice(${i}, 1); displayWeeklyList(); updateAllContents();" class="delete-btn">❌</button>`;
        weeklyHTML += html;
    }
    document.querySelector('.js-weekly-list').innerHTML = weeklyHTML;
    updateAllContents();
}

function displayUpcomingList(){
    let upcomingHTML = "";
    for(let i = 0; i < upcomingList.length; i++){
        const todoObject = upcomingList[i];
        const todoName = todoObject.todoname;
        const todoDate = todoObject.tododate;
        const html = `
            <div>${todoName}</div>
            <div>${todoDate}</div>
            <button onclick="upcomingList.splice(${i}, 1); displayUpcomingList(); updateAllContents();" class="delete-btn">❌</button>`;
        upcomingHTML += html;
    }
    document.querySelector('.js-upcoming-list').innerHTML = upcomingHTML;
    updateAllContents();
}

// Update All Contents View
function updateAllContents() {
    // Update Plan Today in All Contents
    let allTodayHTML = "";
    for(let i = 0; i < todolist.length; i++){
        allTodayHTML += `<li>
            <span>${todolist[i].todoname}</span>
            <span>${todolist[i].tododate}</span>
        </li>`;
    }
    document.getElementById('all-today-tasks').innerHTML = allTodayHTML || "<li>No tasks</li>";
    
    // Update Weekly Priority in All Contents
    let allWeeklyHTML = "";
    for(let i = 0; i < weeklyList.length; i++){
        allWeeklyHTML += `<li>
            <span>${weeklyList[i].todoname}</span>
            <span>${weeklyList[i].tododate}</span>
        </li>`;
    }
    document.getElementById('all-weekly-tasks').innerHTML = allWeeklyHTML || "<li>No tasks</li>";
    
    // Update Upcoming Tasks in All Contents
    let allUpcomingHTML = "";
    for(let i = 0; i < upcomingList.length; i++){
        allUpcomingHTML += `<li>
            <span>${upcomingList[i].todoname}</span>
            <span>${upcomingList[i].tododate}</span>
        </li>`;
    }
    document.getElementById('all-upcoming-tasks').innerHTML = allUpcomingHTML || "<li>No tasks</li>";
}

// Task Operations
function addToDO(){
    const inputElementName = document.querySelector(".js-todoName-input");
    const getValueName = inputElementName.value;
    const inputElementDate = document.querySelector(".js-todoDate-input");
    const getValueDate = inputElementDate.value;

    if (getValueName === "" || getValueDate === "") {
        alert("Please enter a task and a date.");
        return;
    }
    
    const newTask = {todoname: getValueName, tododate: getValueDate};
    
    if (currentTaskType === 'today') {
        todolist.push(newTask);
        displayToDoList();
    } else if (currentTaskType === 'weekly') {
        weeklyList.push(newTask);
        displayWeeklyList();
    } else if (currentTaskType === 'upcoming') {
        upcomingList.push(newTask);
        displayUpcomingList();
    }
    
    inputElementName.value = "";
    inputElementDate.value = "";
    closeTaskPopup();
}

// Search Tasks
function searchTasks() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const allTaskElements = document.querySelectorAll('.task-list li');
    
    allTaskElements.forEach(li => {
        const taskText = li.textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
            li.style.display = 'flex';
        } else {
            li.style.display = 'none';
        }
    });
}

// View Controls
function showView(viewName) {
    // Hide all views
    document.getElementById('plan-today-view').style.display = 'none';
    document.getElementById('weekly-priority-view').style.display = 'none';
    document.getElementById('upcoming-task-view').style.display = 'none';
    document.getElementById('all-contents-view').style.display = 'none';
    
    // Show selected view
    if (viewName === 'plan-today') {
        document.getElementById('plan-today-view').style.display = 'block';
    } else if (viewName === 'weekly-priority') {
        document.getElementById('weekly-priority-view').style.display = 'block';
    } else if (viewName === 'upcoming-task') {
        document.getElementById('upcoming-task-view').style.display = 'block';
    } else if (viewName === 'all-contents') {
        document.getElementById('all-contents-view').style.display = 'block';
        updateAllContents();
    }
    
    // Update sidebar active class
    const sidebarLinks = document.querySelectorAll('.sidebar-links li');
    sidebarLinks.forEach(link => {
        link.classList.remove('sidebar-active');
    });
    
    const currentLink = Array.from(sidebarLinks).find(link => {
        return link.textContent.toLowerCase().includes(viewName.replace('-', ' '));
    });
    
    if (currentLink) {
        currentLink.classList.add('sidebar-active');
    }
    
    // Close sidebar after selection on mobile
    if (window.innerWidth < 768) {
        toggleSidebar();
    }
}

function changeView(viewType) {
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    
    // Implement view change logic (grid vs list)
    if (viewType === 'grid') {
        document.querySelectorAll('.task-category').forEach(category => {
            category.style.display = 'block';
        });
    } else {
        // List view implementation would go here
        // For now we'll just keep the same display
    }
}

// Popup Controls
function openTaskPopup(taskType = 'today') {
    currentTaskType = taskType;
    
    // Update popup title based on task type
    const popupTitle = document.getElementById('popup-title');
    if (taskType === 'today') {
        popupTitle.textContent = 'Plan Today';
    } else if (taskType === 'weekly') {
        popupTitle.textContent = 'Weekly Priority';
    } else if (taskType === 'upcoming') {
        popupTitle.textContent = 'Upcoming Task';
    }
    
    document.querySelector(".popup-overlay").style.display = "block";
    document.querySelector(".popup-container").style.display = "block";
    document.querySelector(".container").classList.add("blurred");
    if (document.getElementById('all-contents-view').style.display === 'block') {
        document.getElementById('all-contents-view').classList.add("blurred");
    }
}

function closeTaskPopup(){
    document.querySelector(".popup-overlay").style.display = "none";
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector(".container").classList.remove("blurred");
    document.getElementById('all-contents-view').classList.remove("blurred");
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addToDO();
    }
}

// Add sample data
window.onload = function() {
    // Add sample tasks
    todolist.push({todoname: "Plan Today", tododate: "2025-03-22"});
    weeklyList.push({todoname: "Week's Priority", tododate: "2025-03-25"});
    upcomingList.push({todoname: "Upcoming Task", tododate: "2025-03-28"});
    
    // Display all lists
    displayToDoList();
    displayWeeklyList();
    displayUpcomingList();
}