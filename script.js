const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


addBtn.addEventListener('click', function() {
    const texto = taskInput.value;
    
    if (texto === "") {
        return;
    }

    const li = document.createElement('li');
    li.innerText = texto;
    taskList.appendChild(li);
    taskInput.value = "";

    li.addEventListener('click', function() {
    li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Remover";
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
    });
});

