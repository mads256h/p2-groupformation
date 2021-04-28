(function() {
    const {leavegroup} = window.commjs;
    document.addEventListener("DOMContentLoaded", () => {
        leavegroupButton();
    });

    /**
     * @summary Reruns the webpage foreach change happening
     */
    function updateMyInfo(meRes, mygroupRes){
        showNameOnSite(meRes);
        showWorkEnvironment(meRes);
        showSubject(meRes);
        showLearningstyles(meRes);

        showGroup(mygroupRes, meRes.name);
    }

    /**
     * @summary Sets the title to the name of the logged in user
     * @param {object} content the object with the logged in users informations
     */
    function showNameOnSite(content) {
        const username = document.getElementById("username");
        username.innerText = "Welcome, " + content.name;
    }

    /**
     * @summary Prints the information about work enviroment from the user
     * @param {object} content the object with the logged in users informations
     */
    function showWorkEnvironment(content) {
      const workingEnvironmentDiv = document.getElementById("workFromHome");
      const work = content.criteria.workingAtHome;
      const workingEnvironment = document.createElement("p");
      const paragraph = document.createElement("h3");
      paragraph.innerText = "Your prefered place to work:";

      clearChilds(workingEnvironmentDiv);

      workingEnvironmentDiv.appendChild(paragraph);
      workingEnvironmentDiv.appendChild(workingEnvironment);
      workingEnvironment.innerText = workEnvironmentStringMaker(work);
    }

    /**
     * @summary Converts a number to a string
     * @param {number} work the number the user has sat about working environment
     * @returns {string} Returns a string
     */
    function workEnvironmentStringMaker(work) {
        let place;
        switch (work) {
        case 0:
            place = "Work from home";
            break;

        case 1:
            place = "Don't care";
            break;

        case 2:
            place = "Work in office";
            break;
        }
        return place;
    }

    /**
     * @summary Creates the elements shown on the site about subjects the user have chossen
     * @param {object} content the object with the logged in users informations
     */
    function showSubject(content) {
        let subjectArray = content.criteria.subjectPreference.subjects.slice();
        const subjectList = document.createElement("ul");
        const subjectDiv = document.getElementById("subjectPreference");
        const paragraph = document.createElement("h3");
        paragraph.innerText = "Your subject preferences:";

        subjectArray.sort((a, b) => b.score - a.score);
        clearChilds(subjectDiv);
        subjectDiv.appendChild(paragraph);

        for (const subject of subjectArray) {
            const subjectPart = createListItem(subject.name + ": " + (subject.score * 10).toFixed(2));
            subjectList.appendChild(subjectPart);
            subjectDiv.appendChild(subjectList);
        }
    }

    /**
     * @summary Creates a button for each file in the data folder
     * @param {string} innerText A string
     * @returns {HTMLElement} Returns a html li element with the string sat as innerText
     */
    function createListItem(innerText) {
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        return listItem;
    }

    /**
     * @summary Creates a html list element with alle the groupmembers
     * @param {object} group One group as a object
     * @param {string} myName Name of the logged in user
     */
    function showGroup(group, myName) {
      const groupMemberDiv = document.getElementById("currentGroup");
      const button = document.getElementById("leaveButton");
      const groupMembersList = document.createElement("ul");
      const paragraph = document.createElement("h3");
      clearChilds(groupMemberDiv);
      for (const member of group.students) {
          if (member.name !== myName){
              const memberName = createListItem(member.name);
              groupMembersList.appendChild(memberName);
          }
      }
      if (group.students.length === 1){
          const notInGroup = document.createElement("h3");
          notInGroup.innerText = "Not in a group yet";
          groupMemberDiv.appendChild(notInGroup);
          button.style.display = "none";
      }
      else {
          paragraph.innerText = "Your group " + group.name + ":";
          button.style.display = "block";
      }
      groupMemberDiv.appendChild(paragraph);
      groupMemberDiv.appendChild(groupMembersList);
      if(group.students.length > 1){
        groupMemberDiv.appendChild(createGroupSubjectsElement(group));
      }
    }

    function createGroupSubjectsElement(group){
        let counter = 0;
        const paragraph = document.createElement("h3");
        const groupSubjectList = document.createElement("ul");
        const subjectArray = addSubjectScore(group);

        subjectArray.sort((a, b) => b.score - a.score);

        paragraph.innerText = "Your group prefered 3 subjects:";
        
        for (const subject of subjectArray) {
            if (counter >= 3){
                break;
            }
            const groupSubjectPart = document.createElement("li");
            groupSubjectPart.innerText = subject.name + ": " + (subject.score * 10).toFixed(2);
            groupSubjectList.appendChild(groupSubjectPart);
            counter++;
        }
        paragraph.appendChild(groupSubjectList);
        return paragraph;
    }

    /**
     * @summary Remove all children of a element
     * @param {HTMLDivElement} element The div element where the children shold be removed
     */
    function clearChilds(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    /**
     * @summary Removes the logged in user from the group when clicking the button with the id "leaveButton"
     */
    function leavegroupButton(){
        const button = document.getElementById("leaveButton");
        button.addEventListener("click", ()=> {
            leavegroup().catch((e)=>{
                console.log(e);
            });
        });
    }

    function addSubjectScore(group){
        let masterSubject = [];
        for (let i = 0; i < group.students[0].criteria.subjectPreference.subjects.length; i++){
            const subjectObject = {
                name: group.students[0].criteria.subjectPreference.subjects[i].name,
                score: 0
            };
            masterSubject[i] = subjectObject;
        }

        for (const students of group.students) {
            for (let i = 0; i < students.criteria.subjectPreference.subjects.length; i++){
                masterSubject[i].score += students.criteria.subjectPreference.subjects[i].score;
            }
        }
        return masterSubject;
    }

    function showLearningstyles(data){
      const learningstylesDiv = document.getElementById("learningstyles");
      const learningstyleList = document.createElement("ul");
      const cases = data.criteria.learningStyles
      for (const learningstyle in cases) {
        if(cases[learningstyle] < 0){
          cases[learningstyle] *= -1;
        }
        const learningstylePart = document.createElement("li");
        const learningStyleName = switchCase(learningstyle, cases[learningstyle]);
        learningstylePart.innerText = learningStyleName + ": " + cases[learningstyle];
        learningstyleList.appendChild(learningstylePart);
      }
      learningstylesDiv.appendChild(learningstyleList);
    }

    function switchCase(learningstyleName, value){
      let string;
      switch (learningstyleName) {
        case "activeReflective":
          if(value > 0){
            string = "Reflective";
          }
          string = "Active";
          break;
        case "visualVerbal":
          if(value > 0){
            string = "Verbal";
          }
          string = "Visual";
          break;
        case "sensingIntuitive":
          if(value > 0){
            string = "Intuitive";
          }
          string = "Sensing";
          break;
        case "sequentialGlobal":
          if(value > 0){
            string = "Global";
          }
          string = "Sequential";
          break;
        default:
          break;
      }
      return string;
    }
    window.myInfo = {updateMyInfo};

}());
