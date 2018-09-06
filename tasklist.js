
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

for(var listIndex=0;listIndex<todoList.length;listIndex++){

  todoList[listIndex].onclick = function(){

    var todoDiv = this.parentElement;
    var valueofDiv=todoDiv.innerHTML;
    localStorage.setItem("val"+listIndex,valueofDiv);

    var localValofDiv=localStorage.getItem("val"+listIndex);
    console.log(localValofDiv);
    var res=localValofDiv.split("<");
    var text=res[0];
    var li = document.createElement("li");
    var t = document.createTextNode(text);
    li.appendChild(t);
    document.getElementById("ul").appendChild(li);
  }
}
