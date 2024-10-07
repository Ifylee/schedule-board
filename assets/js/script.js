// Retrieves tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// function to generate a unique task id
const generateTaskId = function() {
    // Check if nextId is null, set it to 1
    if(nextId === null) {
    // Set nextId to 1
        nextId = 1;
    } else {
    // Increment nextId if it already has a value
        nextId++;
    }

    // Save nextId to localStorage
    localStorage.setItem("nextId", JSON.stringify(nextId));
    // Rwturn nextId
    return nextId;

}

// function to create a task card
const createTaskCard = function(task) {
    // this code here creates a div element with the class of card, task-card, draggable, my-3 and an attribute of data-task-id
    const taskCard = $("<div>")
    .addClass("card w-75 task-card draggable my-3")
    .attr("data-task-id", task.id)

// this code here creates a card-like structure for displaying task deatils
    const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $("<p>").addClass("card-text").text(task.description);
    const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
    const cardDeleteButton = $("<button>").addClass("btn btn-danger delete").text("Delete").attr("data-task-id", task.id);
    cardDeleteButton.on("click", handleDeleteTask);
    
//  this if statement makes changes to the styling of the card based on due date selected.
    if(task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");

        if(now.isSame(taskDueDate, 'day')) {
            taskCard.addClass("bg-warning text-white");
        } else if(now.isAfter(taskDueDate)) {
            taskCard.addClass("bg-danger text-white");
            cardDeleteButton.addClass("border-light")
        };
    };

    // this code here appends the cardDescription, cardDueDate and cardDeleteButton to the cardBody
        cardBody.append(cardDescription, cardDueDate, cardDeleteButton);
        taskCard.append(cardHeader, cardBody);

        return taskCard;
};

//function to render the task list and make cards draggable
const renderTaskList = function() {
    // Check if taskList is null, set it to an empty array
    if(!taskList) {
        taskList = [];
    }

    // Select the todo-cards element and empty it
    const todoList = $("#todo-cards");
    todoList.empty();

    // Select the in-progress-cards element and empty it
    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();

    // Select the done-cards element and empty it
    const doneList = $("#done-cards");
    doneList.empty();

    // Loop through the taskList array
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].status === "to-do") {
            todoList.append(createTaskCard(taskList[i]));

     // this code here creates a div element with the class of card, task-card, draggable, my-3 and an attribute of data-task-id
        } else if(taskList[i].status === "in-progress") {
            inProgressList.append(createTaskCard(taskList[i]));
        
     // this code here creates a div element with the class of card, task-card, draggable, my-3 and an attribute of data-task-id
        } else if(taskList[i].status === "done") {
            doneList.append(createTaskCard(taskList[i]));
        }
    }


    // Make the cards draggable
    $(".draggable").draggable({
        opacity: 0.7,
        zIndex: 100,

        // this code here creates a helper function that clones the original card and sets the max width to the original card's outer width
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
    });
}  
//function to handle adding a new task
const handleAddTask = function(event){
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a new task object
    const task = {
        id: generateTaskId(),
        title: $("#taskTitle").val(),
        description: $("#taskDescription").val(),
        dueDate: $("#taskDueDate").val(),
        status: "to-do"
    }

    // Add the new task to the taskList array
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

    // Clear the form inputs
    $("#taskTitle").val("");
    $("#taskDescription").val("");
    $("#taskDueDate").val("");
}

//function to handle deleting a task
 function handleDeleteTask(event) {
    event.preventDefault();
    let taskId = $(this).attr("data-task-id");
    // Convert the taskId to an integer
    const filteredTaskList = [];
    const taskIdInt = parseInt(taskId);
    
    // Loop through the taskList array
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id !== taskIdInt) {
            // Add the task to the filteredTaskList array
            filteredTaskList.push(taskList[i]);
        }
    }
    
    // Set the taskList array to the filteredTaskList array
    taskList = filteredTaskList;

    // Save the taskList array to localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

//function to handle dropping a task into a new status lane
const handleDrop = function(event, ui) {
    // Get the task id from the draggable element
    const taskId = ui.draggable.data('task-id');
    const newStatus = event.target.id

    // Loop through the taskList array
    $.each(taskList, function(index, task) {
        // Check if the task id matches the taskId
        if (task.id === parseInt(taskId)) {
            task.status = newStatus;
            // Return false to break out of the loop
            return false;
       }
    })
    // Save the taskList array to localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // Render the task list
    renderTaskList();
}


//This renders the task list when the page loads.
$(document).ready(function () {
    renderTaskList();

//    Event listeners
//   This code here listens for the submit event on the taskForm and calls the handleAddTask function
    $("#taskForm").on("submit", handleAddTask);

    // This code here listens for the click event on the delete button and calls the handleDeleteTask function
    $(".lane").droppable({
        accept: ".draggable",
        drop: handleDrop
    })

    
    // This code here listens for the click event on the delete button and calls the handleDeleteTask function
    $("#taskDueDate").datepicker({
        changeMonth: true,
        changeYear: true
    });
});
