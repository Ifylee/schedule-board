// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
const generateTaskId = function() {
    if(nextId === null) {
        nextId = 1;
    } else {
        nextId++;
    }

    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId;

}

// Todo: create a function to create a task card
const createTaskCard = function(task) {
    const taskCard = $("<div>")
    .addClass("card w-75 task-card draggable my-3")
    .attr("data-task-id", task.id)

    const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $("<p>").addClass("card-text").text(task.description);
    const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
    const cardDeleteButton = $("<button>").addClass("btn btn-danger delete").text("Delete").attr("data-task-id", task.id);
    cardDeleteButton.on("click", handleDeleteTask);

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

        cardBody.append(cardDescription, cardDueDate, cardDeleteButton);
        taskCard.append(cardHeader, cardBody);

        return taskCard;
};

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

        } else if(taskList[i].status === "in-progress") {
            inProgressList.append(createTaskCard(taskList[i]));
        
        } else if(taskList[i].status === "done") {
            doneList.append(createTaskCard(taskList[i]));
        }
    }


    $(".draggable").draggable({
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
    });
}  
// Todo: create a function to handle adding a new task
const handleAddTask = function(event){
    event.preventDefault();

    const task = {
        id: generateTaskId(),
        title: $("#taskTitle").val(),
        description: $("#taskDescription").val(),
        dueDate: $("#taskDueDate").val(),
        status: "to-do"
    }

    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

    $("#taskTitle").val("");
    $("#taskDescription").val("");
    $("#taskDueDate").val("");
}

// Todo: create a function to handle deleting a task
 function handleDeleteTask(event) {
    event.preventDefault();
    let taskId = $(this).attr("data-task-id");
    taskList = taskList.filter(task => task.id !== parseInt(taskId));

    // const filteredTaskList = [];
    // const taskIdInt = parseInt(taskId);
    
    // for (let i = 0; i < taskList.length; i++) {
    //     if (taskList[i].id !== taskIdInt) {
    //         filteredTaskList.push(taskList[i]);
    //     }
    // }
    
    // taskList = filteredTaskList;

    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
const handleDrop = function(event, ui) {
    const taskId = ui.draggable.data('task-id');
    const newStatus = event.target.id

    $.each(taskList, function(index, task) {
        if (task.id === parseInt(taskId)) {
            task.status = newStatus;
            return false;
       }
    })
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#taskForm").on("submit", handleAddTask);

    $(".lane").droppable({
        accept: ".draggable",
        drop: handleDrop
    })

    
    $("#taskDueDate").datepicker({
        changeMonth: true,
        changeYear: true
    });
});
