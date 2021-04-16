window.addEventListener('DOMContentLoaded', (event) => {
  const divBox = makeDivElement("Hej");
  document.body.appendChild(divBox);
  const innerBox = makeDivElement("InnerBox");
  innerBox.innerText = "Hej";
  divBox.appendChild(innerBox);
  const buttonInvite  = createButtons("invite");
  
  divBox.appendChild(buttonInvite);
  const id = "invite";
  divBox.appendChild(makeList(testArray));
  document.getElementById(id).addEventListener("click", changeButtonColor(id));
});


function makeDivElement(name){
  const div = document.createElement("div");
  div.className = name;
  return div;
}

function makeList(groupArray){
  const fullList = document.createElement("ul");
  for(let group = 0; group < groupArray.length; group++){
    const listPart = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerText = groupArray[group];
    console.log(groupArray[group]);
    console.log(summary);
    listPart.appendChild(summary);
    fullList.appendChild(listPart);
  }
  return fullList;
}


function createListItem(innerText){
  const listItem = document.createElement("li");
  listItem.innerText = innerText;
  return listItem;
}

function createButtons(id) {
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.innerText = "Invite";
  return button;
}

function changeButtonColor(id){
  if(document.getElementById(id).style.backgroundColor === "white"){
    document.getElementById(id).style.backgroundColor = "blue";
  }
  else{
    document.getElementById(id).style.backgroundColor = "white";
  }
}

const testArray = ["Hej", "med", "dig"];
