const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener('click', function() {
    const texto = taskInput.value.trim();
    
    if (texto === "") {
        return;
    }

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("task-left");

    const li = document.createElement('li');
    li.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    const span = document.createElement("span");
    span.innerText = texto;
    span.classList.add("task-text");

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
    });

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Remover";
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "Editar";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function(e) {
        e.stopPropagation();

        if (editBtn.innerText === "Editar") {
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.innerText;
            input.classList.add("edit-input");
            
            input.style.padding = "5px";
            input.style.fontSize = "15px";
            input.style.flex = "1";

            leftDiv.replaceChild(input, span);
            editBtn.innerText = "Salvar";
            editBtn.style.backgroundColor = "#15ae2c";
        } else {

            const input = leftDiv.querySelector(".edit-input");

            span.innerText = input.value;
            
            leftDiv.replaceChild(span, input);
            editBtn.innerText = "Editar";
            editBtn.style.backgroundColor = "#f9cd1c"; 
        }
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    
    li.appendChild(leftDiv);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);

    taskInput.value = "";
});