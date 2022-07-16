const form = document.getElementById('task-form');
const taskList = document.getElementById('tasks');
var inc = 1; //base para numeração do id das tasks
var checkArray = []; // array Base das id das checkbox para facilitar a manipulação do DOM

form.onsubmit = function (e) {
	e.preventDefault();
	const inputField = document.getElementById('task-input');
    if (inputField.value == ""){
        //do nothing - prevent include void field
    } else {
		if (existsTrust(inputField.value)){ //validação garantindo unicidade de id
			addTask(inputField.value);
	    	form.reset();
		} else {
			alert('Essa tarefa já existe! Cadastre uma tarefa com um nome diferente! Se for a mesma tarefa sugerimos numerar: Ex.:atv1, atv2,...');
		}
        
    }
	
};

// como as tarefas são base para id o código busca a existência prévia e impede adicionar emitindo alerta.
function existsTrust(nameTask){
	if (checkArray.length>0){
		for (i=0;i<checkArray.length;i++){
			if (checkArray[i] != null) {
				let chkCont = document.getElementById(checkArray[i]);
				let description = chkCont.getAttribute('name');
				if (description==nameTask)
				{
					return false;
				}
			}
		}
	}
	return true;
}

//função base do projeto para adicionar elementos das tarefas
function addTask(description) {
	const taskContainer = document.createElement('div');
	const newTask = document.createElement('input');
	const taskLabel = document.createElement('label');
	const taskDescriptionNode = document.createTextNode(description);

	newTask.setAttribute('type', 'checkbox');
	newTask.setAttribute('name', description);
	newTask.setAttribute('id', 'check'+inc); //concatenação de unicidade com índice global de controle das checkbox - principal elemento de controle das tasks
	checkArray.push('check'+inc); //push no array de controle
	inc++;
	

	taskLabel.setAttribute('for', description);
	taskLabel.setAttribute('id', description+'label'); //concatenei string para ter unicidade de id
	taskLabel.appendChild(taskDescriptionNode);

	taskContainer.classList.add('task-item');
	taskContainer.setAttribute('id',description+'task-item'); //concatenação de unicidade
	taskContainer.appendChild(newTask);
	taskContainer.appendChild(taskLabel);

	taskList.appendChild(taskContainer);
}

//função de remoção de tasks específicas marcadas como concluídas (checked) baseada na adição de tasks
document.getElementById('btn-rmspecifictask').onclick = function(e) {
	e.preventDefault();
	const inputField = document.getElementById('task-input');
    if (inputField.value == ""){
        //do nothing - prevent include void field
    } else {
        rmSpecifcTask(inputField.value);
	    form.reset();
    }	
}

//continuação da remoção específica
function rmSpecifcTask(description){
	let chkTaskItem = document.getElementById(description+'task-item');
	for (i=0;i<checkArray.length;i++){
		if (checkArray[i] != null) {
			let chkCont = document.getElementById(checkArray[i]);
			let descriptionName = chkCont.getAttribute('name');
			if (chkCont.checked) {
				if (description == descriptionName){
					let chkTaskItem = document.getElementById(description+'task-item');
					chkTaskItem.remove();
					checkArray[i]=null;
				}
			}
			
		}
	}
	updatecheckArray();
}

//função para remoção de todas as tarefas e reset do checkArray (array de controle)
document.getElementById('btn-rmalltasks').onclick = function() {
	while (taskList.firstChild) {
  		taskList.removeChild(taskList.firstChild);
	}
	checkArray = [];
}

//principal função de eliminação
//função para remover todas as tarefas marcadas como concluídas (checked) 
document.getElementById('btn-rmalldonetasks').onclick = function() {
	for (i=0;i<checkArray.length;i++){
		if (checkArray[i] != null) {
			let chkCont = document.getElementById(checkArray[i]);
			let description = chkCont.getAttribute('name');
			if (chkCont.checked) {
				let chkTaskItem = document.getElementById(description+'task-item');
				chkTaskItem.remove();
				checkArray[i]=null;
			}
		}
	}
	updatecheckArray();
}

//função para update do array de controle das tasks
function updatecheckArray() {
	let nullArray = 0;
	for (i=0;i<checkArray.length;i++){
		if (checkArray[i] == null) {
			nullArray++;
		}
	}
	if (nullArray>0){
		for (s=0;s<nullArray;s++){
			for (i=0;i<checkArray.length;i++){
				if (checkArray[i] == null) {
					checkArray.splice(i,1);
					break;
				}
			}
		}
	}	
}