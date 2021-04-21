const {invitegroup, rankedgroups, mygroup, registerUpdateHandler} = window.commjs;

function createGroupStudentList(group){
    
    const groupElement = document.createElement("details");
    const summary = document.createElement("summary");
    const nameList = document.createElement("ul");
    summary.innerText = group.name;
    
    groupElement.appendChild(summary);
    groupElement.appendChild(nameList);
    
    for (const student of group.students) {
    nameList.appendChild(createListItem(student.name));   
    }

    return groupElement;
}

function createListItem(innerText){
    const listItem = document.createElement("li");
    listItem.innerText = innerText;
    return listItem;
}

function createButton(group, thisGroup) {
    const button = document.createElement("button");
    button.setAttribute("id", group.id);
    button.innerText = "Invite";
    if (group.isInvited){
        console.log("meme");
        button.style.backgroundColor = "lightgreen";
    }
    else if (thisGroup.invitations.includes(group.id)){
        button.style.backgroundColor = "yellow";
    }
    mygroup().then((response) => console.log(response));
    button.addEventListener("click", () => 
        invitegroup(group)
            .then((response) => console.log(response))
            .catch((e)=>console.log(e)));
    //button.onclick;0
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

function createCandidateRow(candidate, thisGroup){
    let tableRow = document.createElement("TR");
    tableRow.appendChild(createGroupColumn(candidate.group));
    tableRow.appendChild(createScoreColumn(candidate.value));
    tableRow.appendChild(createInvColumn(candidate.group, thisGroup));
    return tableRow;
}

function createGroupColumn(group){
    let groupColumn = document.createElement("TD");
    groupColumn.appendChild(createGroupStudentList(group));

    return groupColumn;
}

function createScoreColumn(score){
    let scoreColumn = document.createElement("TD");
    scoreColumn.textContent = score;
    return scoreColumn;
}

function createInvColumn(group, thisGroup){
    let invColumn = document.createElement("TD");
    invColumn.appendChild(createButton(group, thisGroup));
    return invColumn;
}

function updateCandidateTable(table, candidateList, thisGroup){
    clearTable(table);
    table.appendChild(createCandidateTableHeader());
    for (const candidate of candidateList) {
        table.appendChild(createCandidateRow(candidate, thisGroup));
    }
}

function clearTable(table){
    while (table.lastChild){
        table.removeChild(table.lastChild);
    }
}

function createCandidateTableHeader(){
    let tableRow = document.createElement("TR");
    tableRow.appendChild(document.createElement("TH")).textContent = "Group Name";
    tableRow.appendChild(document.createElement("TH")).textContent = "Score";
    tableRow.appendChild(document.createElement("TH")).textContent = "Invitation status";
    return tableRow;
}

function updateAll(){
    mygroup().then((thisGroup)=>{
        console.log(thisGroup);
        updateCandidates(thisGroup.response);

    })
}
function updateCandidates(thisGroup){
    rankedgroups().then((group)=>{
        const sortedGroup = group.response.sort((a, b)=>b.value - a.value);
        updateCandidateTable(table, sortedGroup, thisGroup);
        return sortedGroup;
        });
}

registerUpdateHandler(updateAll);
updateAll();
let table = document.getElementById("candidatesTable");


