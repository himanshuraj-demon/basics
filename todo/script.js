const input = document.querySelector("#taskInput");
const addButton = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

addButton.addEventListener("click", function () {

    const taskText = input.value;

    if (taskText === "") {
        return;
    }

    const task = document.createElement("li");

    task.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">Delete</button>
    `;

    taskList.appendChild(task);

    input.value = "";

    task.querySelector("span").addEventListener("click", function () {
        this.classList.toggle("completed");
    });

    task.querySelector(".delete").addEventListener("click", function () {
        task.remove();
    });
});