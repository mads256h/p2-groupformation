document.addEventListener("DOMContentLoaded", () =>{
    let para = document.createElement("details");
    let summary = document.createElement("summary");
    summary.innerText = "Students";
    para.appendChild(summary);
    let p = document.createElement("P");
    p.appendChild(printStudents(arrayNavne));
    para.appendChild(p);
    document.body.appendChild(para);
});


function printStudents(group){
    const list = document.createElement("ul");
    for(let student of group.students){
        const listItem = document.createElement("li");
        listItem.innerText = student.name;
        list.appendChild(listItem);
    }
    return list;
}

