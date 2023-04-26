document.querySelector;
document.querySelector("#push").onclick=function(){
    if(document.querySelector("#new_task input").value.length==0){
        alert("Please enter the task");
    }
    else{
        document.querySelector(".tasks").innerHTML 
        +=`
        <div class="task">
            <span id="taskName">${document.querySelector("#new_task input").value}</span>
            <button class="delete">
            <i class="fa-solid fa-trash"></i>
            </button>
            </div>
            
        `;

        var current_tasks=document.querySelectorAll(".delete");
        for(var i=0;i<current_tasks.length;i++){
            current_tasks[i].onclick=function(){
                this.parentNode.remove();
            }
        }
        var tasks=document.querySelectorAll(".task");
        for(var i=0;i<tasks.length;i++){
            tasks[i].onclick=function(){
                this.classList.toggle('completed');
            }
        }
        document.querySelector("#new_task input").value="";
    }
}