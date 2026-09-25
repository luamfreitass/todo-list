const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput =document.getElementById('deadline');
const $columnInput =document.getElementById('column');

const $idInput = document.getElementById('idInput');

//const $todoColumnBody = document.querySelector('#todoColumn .body');



const $creationModeBtn = document.getElementById('creationModeBtn');
const $editingModeBtn = document.getElementById('editingModeBtn');

const $creationModeTitle = document.getElementById('creationModeTitle');
const $editingModeTitle = document.getElementById('editingModeTitle');

var taskList = [];

function openModal(id){
    $modal.style.display = "flex";

    if (id){

        $creationModeTitle.style.display ="none";
        $editingModeTitle.style.display ="block";

        $creationModeBtn.style.display ="none";
        $editingModeBtn.style.display ="block"


        const index = taskList.findIndex(function(task){
            return task.id == id;
        });
    
        const task = taskList[index];

        $idInput.value = task.id;
        $descriptionInput.value = task.description;
        $priorityInput.value = task.priority;
        $deadLineInput.value = task.deadline;
        $columnInput.value = task.column;

    } else{
        $creationModeTitle.style.display ="block";
        $editingModeTitle.style.display ="none";
        
        $creationModeBtn.style.display ="block";
        $editingModeBtn.style.display ="none";
    }
}

function closeModal(){
    $modal.style.display = "none";
    $idInput.value = "";
    $descriptionInput.value = "";
    $priorityInput.value = "";
    $deadLineInput.value = ""; 
    $columnInput.value ="";
}

function generateCards(){

    document.querySelectorAll('.column .body').forEach(col => col.innerHTML = '');

    taskList.forEach(function(task){
        const formattedDate = moment(task.deadline).format('DD/MM/YYYY');
        
        const columnBody = document.querySelector(`[data-column="${task.column}"] .body`);
        
        const card = `
        
        <div class="card" ondblclick="openModal(${task.id})">
            <div class="info">
            <b>Descrição:</b>
            <span>${task.description}</span>
            </div>

            <div class="info">
            <b>Prioridades:</b>
            <span>${task.priority}</span>
            </div>

            <div class="info">
            <b>Prazo:</b>
            <span>${formattedDate}</span>
            </div>
            
        </div>

        `;

        columnBody.innerHTML += card;

    });

    //$todoColumnBody.innerHTML = taskListHtml.join('');
}

function createTask(){

    const newTask = {
        id: Math.floor(Math.random() * 999999999),
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadline: $deadLineInput.value, 
        column: $columnInput.value,
    }
    taskList.push(newTask);


closeModal();
generateCards();

}

function updateTask(){

    const task = {
    id: $idInput.value,
    description: $descriptionInput.value,
    priority: $priorityInput.value,
    deadline: $deadLineInput.value, 
    column: $columnInput.value,
    }

    const index = taskList.findIndex(function(task){
     return task.id == $idInput.value;
        });

    taskList[index] = task;

    closeModal();
    generateCards();
    
}

