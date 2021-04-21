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
    for (let group = 0; group < groupArray.length; group++){
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

function createCandidateRow(candidate){
    let tableRow = document.createElement("TR");
    tableRow.appendChild(createGroupColumn());
    tableRow.appendChild(createScoreColumn());
    tableRow.appendChild(createInvColumn());
    return tableRow;
}

function createGroupColumn(){
    let groupColumn = document.createElement("TD");
    groupColumn.textContent = "Grupppe1";
    return groupColumn;
}

function createScoreColumn(){
    let scoreColumn = document.createElement("TD");
    scoreColumn.textContent = "69 nice";
    return scoreColumn;
}

function createInvColumn(){
    let invColumn = document.createElement("TD");
    invColumn.textContent = "Jeg er en fake knap";
    return invColumn;
}

function updateCandidateTable(table, candidateList){
    clearTable(table);
    table.appendChild(createCandidateTableHeader());
    for (const candidate of candidateList) {
        table.appendChild(createCandidateRow(candidate));
    }
}

function clearTable(){
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

//delete when not needed
const {Student, Criteria, Group, LearningStyles, Subject, SubjectPreference} = require("../group");
let testCandidates = [
    {group: new Group("group1", 420, [
        new Student("bob", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([]))),
        new Student("gwegei", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([]))),
        new Student("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([])))

    ]), value: 230},
    {group: new Group("group2", 420, [
        new Student("ahdsgæjkah", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([]))),
        new Student("jogsiohæasg", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([]))),
        new Student("afuhewhhfw", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([])))
    ]), value: 42},
    {group: new Group("group0", 420, [
        new Student("kage", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([]))),
        new Student("smager", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([]))),
        new Student("godt", new Criteria(1, 1, new LearningStyles(1, 1, 1, 1), new SubjectPreference([])))
    ]), value: 2}

];

let table = document.getElementById("candidatesTable");
table.appendChild(createCandidateRow());
updateCandidateTable(table, [null, null, null, null]);