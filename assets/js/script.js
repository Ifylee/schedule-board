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

    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].status === "to-do") {
            todoList.append(createTaskCard(taskList[i]));
        }
    }
}

    $(".draggable".draggable({
        opacity: 0.7,
        zIndex: 100,

        helper: function(event) {
            let original;
            if($(event.target).hasClass("ui-draggable")) {
                original = $(event.target);
            } else {
                original = $(event.target).closest(".ui-draggable");
            }
                return original.clone().css({
                    maxWidth: original.outerWidth(),
                });
         }
    }));
    
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

    $("#taskForm").on("submit", handleAddTask);


});
