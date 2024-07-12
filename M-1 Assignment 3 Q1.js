// Get stored items or initialize an empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Event listeners for entering tasks and filtering tasks
document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item");
    const priority = document.querySelector("#priority").value;
    createItem(item, priority);
});

document.querySelector("#item").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const item = document.querySelector("#item");
        const priority = document.querySelector("#priority").value;
        createItem(item, priority);
    }
});

document.querySelector("#all").addEventListener("click", () => filterItems("all"));
document.querySelector("#completed").addEventListener("click", () => filterItems("completed"));
document.querySelector("#incomplete").addEventListener("click", () => filterItems("incomplete"));

// Display current date
function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    date = `${date[1]} ${date[2]} ${date[3]}`;
    document.querySelector("#date").innerHTML = date;
}

// Display items based on filter
function displayItems(filter = "all") {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
        const itemClass = itemsArray[i].completed ? "completed" : "";
        const priorityClass = `priority-${itemsArray[i].priority}`;
        if (filter === "all" || (filter === "completed" && itemsArray[i].completed) || (filter === "incomplete" && !itemsArray[i].completed)) {
            items += `<div class="item ${priorityClass}">
                        <div class="input-controller">
                            <textarea disabled class="${itemClass}">${itemsArray[i].task}</textarea>
                            <div class="edit-controller">
                                <input type="checkbox" class="completeBtn" ${itemsArray[i].completed ? "checked" : ""}>
                                <i class="fa-solid fa-trash deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`;
        }
    }
    document.querySelector(".to-do-list").innerHTML = items;
    activateCompleteListeners();
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

// Activate listeners for various actions
function activateCompleteListeners() {
    const completeBtn = document.querySelectorAll(".completeBtn");
    completeBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => { toggleComplete(i) });
    });
}

function activateDeleteListeners() {
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteItem(i) });
    });
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => { 
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        });
    });
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        });
    });
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cB, i) => {
        cB.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
        });
    });
}

// Create a new item
function createItem(item, priority) {
    itemsArray.push({ task: item.value, completed: false, priority: priority });
    localStorage.setItem('items', JSON.stringify(itemsArray));
    item.value = "";
    displayItems();
}

// Toggle completion status of an item
function toggleComplete(i) {
    itemsArray[i].completed = !itemsArray[i].completed;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    displayItems();
}

// Delete an item
function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    displayItems();
}

// Update an item
function updateItem(text, i) {
    itemsArray[i].task = text;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    displayItems();
}

// Filter items based on completion status
function filterItems(status) {
    displayItems(status);
}

// On window load, display date and items
window.onload = function() {
    displayDate();
    displayItems();
};
