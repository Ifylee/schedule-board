// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
const generateTaskId = function() {

}

// Todo: create a function to create a task card
const createTaskCard = function(task) {

}

// Todo: create a function to render the task list and make cards draggable
const renderTaskList = function() {
    if(!taskList) {
        taskList = [];
    }

    const todoList = $("#todo-cards");
    todoList.empty();

    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();

    const doneList = $("#done-cards");
    doneList.empty();
}

// Todo: create a function to handle adding a new task
const handleAddTask = function(event){

}

// Todo: create a function to handle deleting a task
 const handleDeleteTask = function(event){

}

// Todo: create a function to handle dropping a task into a new status lane
const handleDrop = function(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
});
