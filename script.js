const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", carregarTarefas);

addBtn.addEventListener('click', function() {
    const texto = taskInput.value.trim();
    if (texto === "") return;

    criarElementoTarefa(texto, false); 
    salvarTarefas();
    taskInput.value = "";
    taskInput.focus();
});

function criarElementoTarefa(texto, concluida) {
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("task-left");

    const li = document.createElement('li');
    li.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = concluida; 

    const span = document.createElement("span");
    span.innerText = texto;
    span.classList.add("task-text");

    if (concluida) {
        span.classList.add('completed');
    }

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
        salvarTarefas(); 
    });

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Remover";
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        salvarTarefas();
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
            
            input.style.flex = "1"; 
            input.style.fontSize = "15px";

            leftDiv.replaceChild(input, span);
            editBtn.innerText = "Salvar";
            editBtn.style.backgroundColor = "#15ae2c";
        } else {
            const input = leftDiv.querySelector(".edit-input");
            span.innerText = input.value;
            
            leftDiv.replaceChild(span, input);
            editBtn.innerText = "Editar";
            editBtn.style.backgroundColor = "#f9cd1c";
            
            salvarTarefas();
        }
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    
    li.appendChild(leftDiv);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
}

function salvarTarefas() {
    const tarefas = [];
    const listaDeTarefas = document.querySelectorAll(".task-item");

    listaDeTarefas.forEach((li) => {
        let textoTarefa;
        const inputEdit = li.querySelector(".edit-input");
        const spanText = li.querySelector(".task-text");

        if (inputEdit) {
            textoTarefa = inputEdit.value;
        } else {
            textoTarefa = spanText.innerText;
        }

        const estaConcluida = li.querySelector(".task-checkbox").checked;

        tarefas.push({
            texto: textoTarefa,
            concluida: estaConcluida
        });
    });

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("minhasTarefas");

    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);
        
        tarefas.forEach((tarefa) => {
            criarElementoTarefa(tarefa.texto, tarefa.concluida);
        });
    }
}