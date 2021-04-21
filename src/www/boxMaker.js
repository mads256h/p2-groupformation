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

//im so sorry
let testCandidates = JSON.parse(`
[
{
    "group": {
    "name": "61295840",
    "id": 82,
    "students": [
        {
        "name": "6",
        "criteria": {
            "ambitions": 4,
            "workingAtHome": 0,
            "learningStyles": {
            "activeReflective": -9,
            "visualVerbal": -9,
            "sensingIntuitive": -9,
            "sequentialGlobal": -3
            },
            "subjectPreference": {
            "subjects": [
                {
                "name": "0",
                "score": 0.2071574057326322
                }
            ]
            }
        }
        },
        {
        "name": "12",
        "criteria": {
            "ambitions": 6,
            "workingAtHome": 2,
            "learningStyles": {
            "activeReflective": 3,
            "visualVerbal": 3,
            "sensingIntuitive": -1,
            "sequentialGlobal": 3
            },
            "subjectPreference": {
            "subjects": [
                {
                "name": "0",
                "score": 0.9879906399154927
                }
            ]
            }
        }
        },
        {
        "name": "9",
        "criteria": {
            "ambitions": 2,
            "workingAtHome": 0,
            "learningStyles": {
            "activeReflective": 9,
            "visualVerbal": 9,
            "sensingIntuitive": -9,
            "sequentialGlobal": 3
            },
            "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.3796532061896154
                  }
                ]
              }
            }
          },
          {
            "name": "5",
            "criteria": {
              "ambitions": 4,
              "workingAtHome": 0,
              "learningStyles": {
                "activeReflective": -9,
                "visualVerbal": -9,
                "sensingIntuitive": 7,
                "sequentialGlobal": -5
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.5459420682855225
                  }
                ]
              }
            }
          },
          {
            "name": "8",
            "criteria": {
              "ambitions": 7,
              "workingAtHome": 0,
              "learningStyles": {
                "activeReflective": -11,
                "visualVerbal": -5,
                "sensingIntuitive": 3,
                "sequentialGlobal": 3
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.997774573604814
                  }
                ]
              }
            }
          },
          {
            "name": "4",
            "criteria": {
              "ambitions": 5,
              "workingAtHome": 2,
              "learningStyles": {
                "activeReflective": 9,
                "visualVerbal": 7,
                "sensingIntuitive": 3,
                "sequentialGlobal": -1
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.49837060392615173
                  }
                ]
              }
            }
          },
          {
            "name": "0",
            "criteria": {
              "ambitions": 9,
              "workingAtHome": 0,
              "learningStyles": {
                "activeReflective": 1,
                "visualVerbal": 1,
                "sensingIntuitive": -5,
                "sequentialGlobal": 5
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.2011458637309924
                  }
                ]
              }
            }
          }
        ]
      },
      "value": 42
    },
    {
      "group":   {
        "name": "1321311710",
        "id": 109,
        "students": [
          {
            "name": "1",
            "criteria": {
              "ambitions": 6,
              "workingAtHome": 1,
              "learningStyles": {
                "activeReflective": -5,
                "visualVerbal": 9,
                "sensingIntuitive": 7,
                "sequentialGlobal": 7
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.6163335555712368
                  }
                ]
              }
            }
          },
          {
            "name": "3",
            "criteria": {
              "ambitions": 4,
              "workingAtHome": 2,
              "learningStyles": {
                "activeReflective": -3,
                "visualVerbal": 7,
                "sensingIntuitive": -11,
                "sequentialGlobal": 11
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.8613761855010973
                  }
                ]
              }
            }
          },
          {
            "name": "2",
            "criteria": {
              "ambitions": 5,
              "workingAtHome": 1,
              "learningStyles": {
                "activeReflective": -1,
                "visualVerbal": -5,
                "sensingIntuitive": 9,
                "sequentialGlobal": 7
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.45665387633402754
                  }
                ]
              }
            }
          },
          {
            "name": "13",
            "criteria": {
              "ambitions": 4,
              "workingAtHome": 2,
              "learningStyles": {
                "activeReflective": -3,
                "visualVerbal": 7,
                "sensingIntuitive": 1,
                "sequentialGlobal": 9
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.6827534168039107
                  }
                ]
              }
            }
          },
          {
            "name": "11",
            "criteria": {
              "ambitions": 10,
              "workingAtHome": 1,
              "learningStyles": {
                "activeReflective": -7,
                "visualVerbal": -1,
                "sensingIntuitive": -1,
                "sequentialGlobal": 9
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.12898942784370515
                  }
                ]
              }
            }
          },
          {
            "name": "7",
            "criteria": {
              "ambitions": 6,
              "workingAtHome": 0,
              "learningStyles": {
                "activeReflective": 5,
                "visualVerbal": 11,
                "sensingIntuitive": -5,
                "sequentialGlobal": -9
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.9761743091789417
                  }
                ]
              }
            }
          },
          {
            "name": "10",
            "criteria": {
              "ambitions": 8,
              "workingAtHome": 0,
              "learningStyles": {
                "activeReflective": -5,
                "visualVerbal": -7,
                "sensingIntuitive": 11,
                "sequentialGlobal": 7
              },
              "subjectPreference": {
                "subjects": [
                  {
                    "name": "0",
                    "score": 0.6791165560300916
                  }
                ]
              }
            }
          }
        ]
      },
      "value": 2
    }
  ]`);

  updateCandidateTable(table, testCandidates);

console.log(testCandidates);
