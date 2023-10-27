
//#region LocalStorage
const key = "Tasks";

function SetLocalStorage(list) {
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(list));
}

function GetLocalStorage() {
    let list = JSON.parse(localStorage.getItem(key));

    if(list == null) { list = []; }

    return list;
}
//#endregion

// Lista principal que contiene las listas de tareas
let allList = [];
allList = GetLocalStorage();

//#region List
const superList = document.querySelector(".List_list");
const tempList = document.getElementById("TempList").content;
const formList = document.getElementById("Form_superList");

/* CLASS
    Clase lista la cual guarda un nombre y una lista de tareas
 */
class List {
    constructor(name, taskList) {
        this.id = `00-${name}-00`;
        this.name = name;
        this.taskList = taskList;
    }

    GetList() {
        return this.taskList;
    }

    SetList(newList) {
        this.taskList = newList;
    }

    AddTask(task) {
        this.taskList.push(task);
    }
}

/* ADDEVENT
    Crea una lista o carpeta de tareas, y la agrega al HTML y a la lista padre
    */
formList.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("Form_superList--name").value;
    let list = new List(name, []);
    let create = true;

    if(allList.length > 0) {
        allList.forEach(obj => {
            (obj.id === list.id) ? create = false : create = true;
        });
    } else {
        create = true;
    }

    if(create) { 
        allList.push(list);

        const clone = tempList.cloneNode(true);
        clone.querySelector("button").textContent = list.name;
        clone.querySelector("button").dataset.id = list.id;
        clone.querySelector(".Delete").dataset.id = list.id;
        superList.appendChild(clone);
    }
});


/* ADDEVENT
    Mostrara todas las tareas de una lista correspondiente en el HTML
    Activando los objetos para mostrar
*/
document.addEventListener("click", (e) => {
    e.stopPropagation();  

    const mainTitle = document.getElementById("Main_title");
    const mainButtonDelete = document.getElementById("Main_delete");

    if(e.target.classList.contains("Button_list")) {

        const elementId = e.target.dataset.id;
        let showList = null;

        allList.forEach(list => {
            if(list.id === elementId) { 
                showList = list.taskList; 

                mainTitle.classList.remove("d-none");
                mainTitle.textContent = list.name;
                mainButtonDelete.classList.remove("d-none");
                buttonAddTask.classList.remove("d-none");
            }
        });

        if(showList !== null) {
            taskList.innerHTML = "";
            if(showList.length > 0) {

                showList.forEach(task => {
                    const clone = tempTask.cloneNode(true);
                    clone.querySelector("h3").textContent = task.name;
                    const p = clone.querySelectorAll("p");
                    p[0].textContent = task.des;
                    p[1].textContent = task.date;
                    clone.querySelector("button").dataset.id = task.id;

                    if(task.opt =="🟢Low") { clone.querySelector("div").classList.add("Low"); }
                    else if(task.opt== "🟡Medium") { clone.querySelector("div").classList.add("Medium"); }
                    else if (task.opt == "🔴High") { clone.querySelector("div").classList.add("High"); }

                    taskList.appendChild(clone);
                });
            }
        }

        buttonAddTask.dataset.id = elementId;
    }
});
//#endregion

//#region Task
const taskList = document.querySelector(".Task_list");
const tempTask = document.getElementById("TempTask").content;
const formTask = document.getElementById("Form_task");

const buttonAddTask = document.getElementById("AddTask");

/* CLASS
    CLase tarea la cual guarda los datos de la misma
 */
class Task {
    constructor(name, des, date, opt) {
        this.id = `00-${name}-${opt}-00`;
        this.name = name;
        this.des = des;
        this.date = date;
        this.opt = opt;
    }
}

let listId = ""; // Id de la lista seleccionada

/* ADDEVENT 
    Guarda en el boton el id, para poder crear una tarea en la carpeta correspondiente.
    Ademas de que activa el formulario para crear la tarea.
*/
buttonAddTask.addEventListener("click", () => {
    formTask.classList.remove("d-none");

    if(buttonAddTask.dataset.id !== "") {
        listId = buttonAddTask.dataset.id;
    }
});

/* ADDEVENT
    Crea una nueva tarea del formulario, y la agrega a la lista correspondiente si existe
    */
formTask.addEventListener("submit", (e) => {
    e.preventDefault();
    let actuallyList = [];

    let name = document.getElementById("Form_task--name").value;
    let des = document.getElementById("Form_task--des").value;
    let date = document.getElementById("Form_task--date").value;
    let opt = document.getElementById("Form_task--priority").value;
    
    let task = new Task(name, des, date, opt);
    let exist = false;

    allList.forEach(list => {
        if(list.id === listId) { 
            actuallyList = list;
            exist = true;
        } 
    });

    let create = true;
    if(actuallyList.length > 0 && exist === true) {
        actuallyList.forEach(obj => {
            (obj.id == task.id) ? create = false : create = true;
        });
    } else {
        create = true;
    }
    
    if(create == true && exist == true) {
        actuallyList.AddTask(task);
        

        const clone = tempTask.cloneNode(true);
        
        if(task.opt =="🟢Low") { clone.querySelector("div").classList.add("Low"); }
        else if(task.opt== "🟡Medium") { clone.querySelector("div").classList.add("Medium"); }
        else if (task.opt == "🔴High") { clone.querySelector("div").classList.add("High"); }

        clone.querySelector("h3").textContent = task.name;
        const p = clone.querySelectorAll("p");
        p[0].textContent = task.des;
        p[1].textContent = task.date;
        clone.querySelector("button").dataset.id = task.id;
        taskList.appendChild(clone);
    }

    formTask.classList.add("d-none");
});
//#endregion

/* ADDEVENT
    Actividad de borrar, o una lista, o una tarea o todas las tareas.
 */
document.addEventListener("click", (e) => {
    
    const dadObj = e.target.parentElement;

    if(dadObj.classList.contains("List") && e.target.classList.contains("Delete")) {
        
        for (let i = 0; i < allList.length; i++) {
            if(allList[i].id === e.target.dataset.id) {
                allList.splice(i, 1);
                dadObj.remove();
            }
            
        }
    }else if(dadObj.classList.contains("Task") && e.target.classList.contains("Delete")) {

        allList.forEach(list => {

            const actuallyList = list.GetList();
            for (let i = 0; i < actuallyList.length; i++) {
                
                if(actuallyList[i].id === e.target.dataset.id) {
                    actuallyList.splice(i, 1);
                    dadObj.remove();
                }
            }
        });
    }else if(dadObj.classList.contains("Main") && e.target.classList.contains("Delete")) {
        
        const id = document.getElementById("AddTask").dataset.id;

        allList.forEach(list => {
            
            if(list.id === id) {
                list.SetList([]);
                taskList.innerHTML = "";
            }
        });
    }
});

function window_mouseout( obj, evt, fn ) {

    if ( obj.addEventListener ) {
        obj.addEventListener( evt, fn, false );
    }
    else if ( obj.attachEvent ) {
        obj.attachEvent( 'on' + evt, fn );
    }
}

window_mouseout( document, 'mouseout', event => {

    event = event ? event : window;

    SetLocalStorage(allList);
} );
