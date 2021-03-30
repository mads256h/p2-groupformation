document.addEventListener("DOMContentLoaded", () =>{
    let para = document.createElement("details");
    let summary = document.createElement("summary");
    summary.innerText = "Students";
    para.appendChild(summary);
    let p = document.createElement("P");
    p.appendChild(printStudents(groupTest));
    para.appendChild(p);
    document.body.appendChild(para);

    //The div element that are placed to the right in the svg div
    let divElement = document.createElement("div");
    const rightToSvg  = document.querySelector("div > svg");
    divElement.className = "groupsize";
    rightToSvg.after(divElement);

    //The maxMine functions output inserted in the groupsize class
    let maxMine = document.createElement("P");
    maxMine.innerText = "MaxMine:";
    divElement.appendChild(maxMine);

    //The sum functions output inserted in the groupsize class under maxMine
    let sum = document.createElement("P");
    sum.innerText = "The sum:";
    divElement.appendChild(sum);

    //The linearDist function output inserted in the groupsize class under sum
    let linearDist = document.createElement("P");
    linearDist.innerText = "Linear distribution:";
    divElement.appendChild(linearDist);
});

let groupTest = {
    name: "Group 1",
    id: 1,
    students: [
        {
            name: "Morten"
        },
        {
            name: "Mads"
        },
        {
            name: "Sven"
        }
    ]
};

function printStudents(group){
    const list = document.createElement("ul");
    for(let student of group.students){
        const listItem = document.createElement("li");
        listItem.innerText = student.name;
        list.appendChild(listItem);
    }
    return list;
};





