


var progressList=[];

// appending a span to each item in the list
//clicking on it add the item to todo list
function appendAddtoTodoButton(){
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("=>");
    span.className = "ToDo";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}
appendAddtoTodoButton();

var assignedPersons=["Tony","Bruce","Peter","Wade"];
// assigning every item to a person.
// names of the persons are read from an array.

function assigningTaskToPerson(){
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("to :" + " " + assignedPersons[i]);
    span.className = "assignedPersons";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}

assigningTaskToPerson();

// onclicking the todo button, the list is stored to localstorage.
// also the task can be retrived from the list


var todoList=document.getElementsByClassName("ToDo");

for(let listIndex=0;listIndex<todoList.length;listIndex++){

  todoList[listIndex].onclick = function(){
    var todoDiv = this.parentElement;
    var valueofDiv=todoDiv.innerHTML;
    localStorage.setItem("todo"+listIndex,valueofDiv);

    addtoToDo("todo"+listIndex,listIndex);
    todoDiv.style.display="none";
  }
}

// adding the liist from localStorage to todolist
var todoAdded=[];
function addtoToDo(item,index){
      var isAdded=false;
      var localValofDiv=localStorage.getItem(item);
      var res=localValofDiv.split("<");
      var text=res[0];

      for(let i=0;i<todoAdded.length;i++){
        if(todoAdded[i]===text){
          isAdded=true;
        }
      }

      if(!isAdded){
        todoAdded.push(text);
        var li = document.createElement("li");
        var t = document.createTextNode(text);
        li.appendChild(t);

        //displaying the person the task assigned to
        var spanAssigned = document.createElement("SPAN");
        var txtAssigned = document.createTextNode("to :" + " " + assignedPersons[index]);
        spanAssigned.className = "assignedPersons";
        spanAssigned.appendChild(txtAssigned);
        li.appendChild(spanAssigned);

        var spanAddToProgress = document.createElement("SPAN");
        var sign = document.createTextNode("=>");
        spanAddToProgress.className = "InProgress";
        spanAddToProgress.appendChild(sign);
        li.appendChild(spanAddToProgress);

        // var incPriority= document.createElement("input");
        // incPriority.className="increase_priority";
        // incPriority.type="button";
        // incPriority.value="˄";
        // spanAddToProgress.appendChild(incPriority);

        var incPriority = document.createElement("SPAN");
        var signIncPriority = document.createTextNode("\u02C4");
        incPriority.className = "increase_priority";
        incPriority.appendChild(signIncPriority);
        li.appendChild(incPriority);


        var decPriority = document.createElement("SPAN");
        var signDecPriority = document.createTextNode("\u02C5");
        decPriority.className = "decrease_priority";
        decPriority.appendChild(signDecPriority);
        li.appendChild(decPriority);

        progressList=document.getElementsByClassName("InProgress");
        // addtoInProgress is running a little early.
        // as it does not get the latest value of progressList.
        // so it is called a 10 ms delayed
        setTimeout(addtoInProgress,10,progressList);
        document.getElementById("todoul").appendChild(li);

        var list=document.getElementById("todoul");

        incPriority.onclick = function() {
          //alert("blabla");
          var previous = findPrevious(incPriority.parentNode);
          if (previous) {
            list.insertBefore(incPriority.parentNode,previous);
          }
        };

        decPriority.onclick = function() {
          //alert("blublu");
          var next = findNext(decPriority.parentNode);
          if (next) {
            list.insertBefore(decPriority.parentNode,next);
          }
          if(next===null){
            list.appendChild(decPriority.parentNode);
          }
        };
      }

      function findPrevious(elm){
        do {
           elm = elm.previousSibling;
       } while (elm && elm.nodeType != 1);
       return elm;
      }

      function findNext(elm){
        do {
           elm = elm.nextSibling;
           if(elm!=null){
             elm=elm.nextSibling;
           }
       } while (elm && elm.nodeType != 1);
       return elm;
      }

  }


  // this loop contain a onclick function
  // in which it store clicked item to local localStorage
  // and call addtoProgress function which add the list item
  // in progress list.
function addtoInProgress(progressList){

  for(let listIndex=0;listIndex<progressList.length;listIndex++){
    progressList[listIndex].onclick = function(){
      var divProgress = this.parentElement;
      var valueofDivProgress=divProgress.innerHTML;
      localStorage.setItem("progress"+listIndex,valueofDivProgress);
      addtoProgress("progress"+listIndex,listIndex);
      divProgress.style.display="none";
    }
  }

  //adding the list from localStorage to progressList
  var progressAdded=[];
  var isAddedtoProgress;
  function addtoProgress(item,index){
      isAddedtoProgress=false;
      var localValofDiv=localStorage.getItem(item);
      var res=localValofDiv.split("<");
      var text=res[0];
      for(let i=0;i<progressAdded.length;i++){
        if(progressAdded[i]===text){
          isAddedtoProgress=true;
        }
  }
  if(!isAddedtoProgress){
      progressAdded.push(text);
      var li = document.createElement("li");
      li.className="todo";
      var t = document.createTextNode(text);
      li.appendChild(t);

      //displaying the person the task assigned to
      var spanAssigned = document.createElement("SPAN");
      var txtAssigned = document.createTextNode("by :" + " " + assignedPersons[index]);
      spanAssigned.className = "assignedPersons";
      spanAssigned.appendChild(txtAssigned);
      li.appendChild(spanAssigned);

      var spanAddToProgress = document.createElement("SPAN");
      var sign = document.createTextNode("=>");
      spanAddToProgress.className = "Done";

      doneList=document.getElementsByClassName("Done");
      setTimeout(addtoDone,10,doneList);

      spanAddToProgress.appendChild(sign);
      li.appendChild(spanAddToProgress);
      document.getElementById("ulInprogress").appendChild(li);
    }

  }
}

// TODO: addtoToDo

function addtoDone(doneList){
  console.log(doneList);
  console.log(doneList.length);
  for(let listIndex=0;listIndex<doneList.length;listIndex++){
    doneList[listIndex].onclick = function(){
      var divDone = this.parentElement;
      var valueofDivDone=divDone.innerHTML;
      console.log(divDone.innerHTML);
      localStorage.setItem("done"+listIndex,valueofDivDone);
      addtoProgress("done"+listIndex,listIndex);
      divDone.style.display = "none";
    }
  }



  //adding the list from localStorage to progressList
  var doneAdded=[];
  var isAddedtoDone;
  function addtoProgress(item,index){
      isAddedtoDone=false;
      var localValofDiv=localStorage.getItem(item);
      var res=localValofDiv.split("<");
      var text=res[0];
      console.log(text);
      for(let i=0;i<doneAdded.length;i++){
        if(doneAdded[i]===text){
          isAddedtoDone=true;
        }
  }
  if(!isAddedtoDone){
      doneAdded.push(text);
      var li = document.createElement("li");
      var t = document.createTextNode(text);
      li.appendChild(t);

      //displaying the person the task assigned to
      var spanAssigned = document.createElement("SPAN");
      var txtAssigned = document.createTextNode("by :" + " " + assignedPersons[index]);
      spanAssigned.className = "assignedPersons";
      spanAssigned.appendChild(txtAssigned);
      li.appendChild(spanAssigned);

      // var spanAddToProgress = document.createElement("SPAN");
      // var sign = document.createTextNode("=>");
      // spanAddToProgress.className = "Done";
      // spanAddToProgress.appendChild(sign);
      // li.appendChild(spanAddToProgress);
      document.getElementById("ulDone").appendChild(li);
    }
  }
}
