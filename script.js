const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


addBtn.addEventListener('click', function() {
    const texto = taskInput.value.trim();
    
    if (texto === "") {
        return;
    }

    const li = document.createElement('li');
    li.classList.add('task-item');

    const span = document.createElement("span");
    span.innerText = texto;
    span.classList.add("task-text");

    span.addEventListener('click', function() {
        li.classList.toggle('completed');
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

            li.replaceChild(input, span);
            editBtn.innerText = "Salvar";
        } else {
            const input = li.querySelector(".edit-input");

            span.innerText = input.value;
            li.replaceChild(span, input);
            editBtn.innerText = "Editar";
        }
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);

    taskInput.value = "";
});

