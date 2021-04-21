const {invitegroup, rankedgroups} = window.commjs;

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

function createButtons(group) {
    const button = document.createElement("button");
    button.setAttribute("id", group.id);
    button.innerText = "Invite";
    button.addEventListener("pointerdown",() =>invitegroup(group).then(button.style.background = "lightgreen"));
    //button.onclick;
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

function createCandidateRow(candidate){
    let tableRow = document.createElement("TR");
    tableRow.appendChild(createGroupColumn(candidate.group));
    tableRow.appendChild(createScoreColumn(candidate.value));
    tableRow.appendChild(createInvColumn(candidate.group.id));
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

function createInvColumn(id){
    let invColumn = document.createElement("TD");
    invColumn.appendChild(createButtons(id));
    return invColumn;
}

function updateCandidateTable(table, candidateList){
    clearTable(table);
    table.appendChild(createCandidateTableHeader());
    for (const candidate of candidateList) {
        table.appendChild(createCandidateRow(candidate));
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

let table = document.getElementById("candidatesTable");

rankedgroups().then((group)=>{
    const sortedGroup = group.response.sort((a, b)=>b.value - a.value);
    console.log(sortedGroup);
    updateCandidateTable(table, sortedGroup);
    return sortedGroup;
    });
