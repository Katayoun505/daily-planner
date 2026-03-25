let tasks = [];

const form = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");
const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");
const percentage = document.getElementById("percentage");
const welcomeBtn = document.getElementById("welcomeBtn");
const clearBtn = document.getElementById("clearBtn");

if (welcomeBtn) {
    welcomeBtn.onclick = function () {
        alert("Welcome! You can start adding your tasks and manage your day.");
    };
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("taskName").value.trim();
        const time = document.getElementById("taskTime").value;
        const priority = document.getElementById("taskPriority").value;
        const status = document.getElementById("taskStatus").value;

        if (name === "" || time === "") {
            alert("Please fill in all fields.");
            return;
        }

        const task = {
            name: name,
            time: time,
            priority: priority,
            status: status
        };

        tasks.push(task);
        showTasks();
        form.reset();
    });
}

function showTasks() {
    taskTable.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let row = "<tr>";
        row += "<td>" + (i + 1) + "</td>";
        row += "<td>" + tasks[i].name + "</td>";
        row += "<td>" + tasks[i].time + "</td>";
        row += "<td>" + tasks[i].priority + "</td>";

        if (tasks[i].status === "Completed") {
            row += "<td class='completed'>Completed</td>";
        } else {
            row += "<td class='pending'>Pending</td>";
        }

        row += "<td><button onclick='toggleTask(" + i + ")'>Done</button></td>";
        row += "</tr>";

        taskTable.innerHTML += row;
    }

    updateSummary();
}

function toggleTask(index) {
    if (tasks[index].status === "Pending") {
        tasks[index].status = "Completed";
    } else {
        tasks[index].status = "Pending";
    }

    showTasks();
}

function updateSummary() {
    let totalTasks = tasks.length;
    let completedTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === "Completed") {
            completedTasks++;
        }
    }

    let pendingTasks = totalTasks - completedTasks;
    let completionRate = 0;

    if (totalTasks > 0) {
        completionRate = (completedTasks / totalTasks) * 100;
    }

    total.innerText = totalTasks;
    completed.innerText = completedTasks;
    pending.innerText = pendingTasks;
    percentage.innerText = completionRate.toFixed(0) + "%";
}

if (clearBtn) {
    clearBtn.onclick = function () {
        let remainingTasks = [];

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status !== "Completed") {
                remainingTasks.push(tasks[i]);
            }
        }

        tasks = remainingTasks;
        showTasks();
    };
}