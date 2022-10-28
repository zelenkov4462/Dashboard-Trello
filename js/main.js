const button = document.querySelector(".button");
const boards = document.querySelector(".boards");

boards.querySelectorAll(".boards__item").forEach(item=>addTask(item))


function addTask(board){
    const btn = board.querySelector(".add__btn");
    const addBtn = board.querySelector(".add__item-btn");
    const cancelBtn = board.querySelector(".cancel__item-btn");
    const textarea = board.querySelector(".textarea");
    const form = board.querySelector(".form");
    

    let value;

    //Добавить карточку
    btn.addEventListener("click",()=>{
        form.classList.add("active");
        btn.classList.add("hidden");
        addBtn.classList.add("hidden")

        textarea.addEventListener("input",(e)=>{
            value = e.target.value;
            if(value){
                addBtn.classList.remove("hidden");
            }
            else{
                addBtn.classList.add("hidden")
            }
        })
    })

    //Закрыть карточку
    cancelBtn.addEventListener("click",clearForm)


    //Очистить данные
    function clearForm(){
        value = '';
        textarea.value = '';
        form.classList.remove("active");
        btn.classList.remove("hidden")
    }

    //

    
    //Добавляем карточку с текстом
    addBtn.addEventListener("click",addListItem)


    function addListItem(){
        const item = createListItem();
        board.querySelector(".list").append(item)
        dragNdrop()
        clearForm();
        changeTitle();
        operationsTask();
    }


    //Создаем карточку
    function createListItem(){
        const item = document.createElement("div");
        item.classList.add("list__item");
        item.draggable = true;
        item.innerHTML = 
        `
        <span class="list__item-text">${value}</span>
            <span class="change">✎</span>
            <span class="save">✔</span>
            <span class="delete">✖</span>
        </div>`
  
        return item
    }

   //Операции с карточками
    function operationsTask(){
        const listItem = board.querySelectorAll(".list__item");
        listItem.forEach(item=>{
            const text = item.querySelector(".list__item-text");
            item.querySelector(".delete").addEventListener("click",(e)=>{
                e.target.parentElement.remove()
            })
            item.querySelector(".change").addEventListener("click",(e)=>{
                item.classList.add("change");
                text.setAttribute("contenteditable", true);
            })
            item.querySelector(".save").addEventListener("click",(e)=>{
                item.classList.remove("change")
                text.removeAttribute("contenteditable")
            })
        })
    }


    function changeTitle(){
        const titles = board.querySelectorAll(".title");
        titles.forEach(title=>{
            title.addEventListener("click",(e)=>e.target.textContent = '')
        })
    }


 
    //Перетаскивание карточек

let draggedItem = ''

function dragNdrop(){
    const lists = document.querySelectorAll(".list");
    const listItems = document.querySelectorAll(".list__item");
    
    listItems.forEach(item=>{

        item.addEventListener("dragstart",()=>{
            draggedItem = item;
            setTimeout(()=>{
                item.classList.add("hidden")
            },0)
            
          
        })

        item.addEventListener("dragend",()=>{
            draggedItem = '';
            setTimeout(()=>{
                item.classList.remove("hidden")
            },0)
        })



        lists.forEach(list=>{
            list.addEventListener("dragover",e=>e.preventDefault());

            list.addEventListener("dragenter",function(e){
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0,0,0, 0.3)'
            })

            list.addEventListener("dragleave",function(e){
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
         
            })

            list.addEventListener("drop",function(e){
                this.style.backgroundColor = 'rgba(0,0,0,0)';
                this.append(draggedItem)
        
            })

        })

    })

}
    changeTitle();
    operationsTask();
    dragNdrop()
    
}





//Добавляем новую доску

button.addEventListener("click",addBoard);


function addBoard(){
    const board = document.createElement("div");
    board.classList.add("boards__item");
    board.innerHTML =
    `<span contenteditable="true" class="title">Введите название</span>
    <div class="list"></div>
    <div class="form">
        <textarea class="textarea" placeholder="Введите название для этой карточки"></textarea>
        <div class="buttons">
                <button class="add__item-btn">Добавить карточку</button>
                <button class="cancel__item-btn">Отмена</button>
            </div>
        </div>
    <div class="add__btn"><span>+</span>Добавить карточку</div>
    `
    boards.appendChild(board);

    addTask(board)
}











