(function(){
    const { leavegroup } = window.commjs;
    document.addEventListener("DOMContentLoaded", () => {
        const button = document.getElementById("leaveButton");
        button.addEventListener("click", () => {
            leavegroup().catch((e) => {
                alert(e);
            });
        });
    });

    /**
     * @summary Returns the webpage foreach change happening
     * @param {object} meRes Obejct with the data from the logged in user
     * @param {object} mygroupRes Object with the groupdata from the logged in user
     */
    function updateMyInfo(meRes, mygroupRes) {
        showNameOnSite(meRes);
        showWorkEnvironment(meRes);
        showSubject(meRes);
        showLearningstyles(meRes);
        showGroup(mygroupRes, meRes.name);
    }

    /**
     * @summary Sets the title to the name of the logged in user
     * @param {object} content The object with the logged in users informations
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

        clearChildren(workingEnvironmentDiv);

        workingEnvironmentDiv.appendChild(paragraph);
        workingEnvironmentDiv.appendChild(workingEnvironment);
        workingEnvironment.innerText = workEnvironmentToString(work);
    }

    /**
     * @summary Converts a number to a string
     * @param {number} work the number the user has sat about working environment
     * @returns {string} Returns a string
     */
    function workEnvironmentToString(work) {
        switch (work) {
        case 0:
            return "Work from home";
        case 1:
            return "Don't care";
        case 2:
            return "Work in office";
        default:
            return "ERROR";
        }
    }

    /**
     * @summary Creates the elements shown on the site about subjects the user have chossen
     * @param {object} content the object with the logged in users informations
     */
    function showSubject(content) {
        const subjectArray = content.criteria.subjectPreference.subjects.slice();
        const subjectList = document.createElement("ul");
        const subjectDiv = document.getElementById("subjectPreference");
        const paragraph = document.createElement("h3");
        paragraph.innerText = "Your subject preferences:";

        subjectArray.sort((a, b) => b.score - a.score);
        clearChildren(subjectDiv);
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
     * @summary Creates a html list element with all the group members
     * @param {object} group One group as a object
     * @param {string} userName Name of the logged in user
     */
    function showGroup(group, userName) {
        const groupMemberDiv = document.getElementById("currentGroup");
        const button = document.getElementById("leaveButton");
        const groupMembersList = document.createElement("ul");
        const paragraph = document.createElement("h3");

        clearChildren(groupMemberDiv);

        for (const member of group.students) {
            if (member.name !== userName) {
                const memberName = createListItem(member.name);
                groupMembersList.appendChild(memberName);
            }
        }
        if (group.students.length === 1) {
            const notInGroup = document.createElement("h3");
            notInGroup.innerText = "Not in a group yet";
            groupMemberDiv.appendChild(notInGroup);
            button.style.display = "none";
        }
        if (group.students.length > 1) {
            paragraph.innerText = "Your group " + group.name + ":";
            button.style.display = "block";
        }
        groupMemberDiv.appendChild(paragraph);
        groupMemberDiv.appendChild(groupMembersList);
        if (group.students.length > 1) {
            groupMemberDiv.appendChild(createGroupSubjectsElement(group));
        }
    }
    /**
     * @summary Creates a html list element with all the group members subjects added together
     * @param {object} group One group as a object
     * @returns {HTMLElement} Returns a H3 Element with a ul child element with the subjects from the group
     */
    function createGroupSubjectsElement(group) {
        const paragraph = document.createElement("h3");
        const groupSubjectList = document.createElement("ul");
        const subjectArray = addSubjectScore(group);
        /* Sorting the array, the bigest score will be in the first index of the array */
        subjectArray.sort((a, b) => b.score - a.score);

        paragraph.innerText = "Your group prefered 3 subjects:";
        for (const subject of subjectArray.slice(0, 3)) {
            groupSubjectList.appendChild(createListItem(subject.name + ": " + (subject.score * 10).toFixed(2)));
        }
        paragraph.appendChild(groupSubjectList);
        return paragraph;
    }

    /**
     * @summary Remove all children of a element
     * @param {HTMLDivElement} element The element where the children will be removed
     */
    function clearChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * @summary Adds subjects together from each student in the group
     * @param {object} group One group as a object
     * @returns {Array} Returns a array with the subjects
     */
    function addSubjectScore(group) {
        let groupSubjectPreferences = [];
        /* Initialize the masterSubject array with all the subjects as objects and their score sat to 0 */
        const initializeSubject = group.students[0].criteria.subjectPreference.subjects;
        for (const i in initializeSubject) {
            const subjectObject = {
                name: initializeSubject[i].name,
                score: 0
            };
            groupSubjectPreferences[i] = subjectObject;
        }
        for (const students of group.students) {
            const subjects = students.criteria.subjectPreference.subjects;
            for (const i in subjects) {
                groupSubjectPreferences[i].score += subjects[i].score;
            }
        }
        return groupSubjectPreferences;
    }
    /**
     * @summary Prints the learningstyle on the server as a ul element from the logged in user
     * @param {object} data Data about the logged in user
     */
    function showLearningstyles(data) {
        const learningstylesDivElement = document.getElementById("learningstyles");
        clearChildren(learningstylesDivElement);
        const learningstyleList = document.createElement("ul");
        const title = document.createElement("h3");
        title.innerText = "Your learningstyle data:";
        learningstylesDivElement.appendChild(title);
        const learningstyles = data.criteria.learningStyles;
        for (const learningstyle in learningstyles) {
            const absLearningstyleValue = Math.abs(learningstyles[learningstyle]);
            const learningstylePart = document.createElement("li");
            const learningStyleName = switchCase(learningstyle, learningstyles[learningstyle]);
            learningstylePart.innerText = learningStyleName + ": " + absLearningstyleValue;
            learningstyleList.appendChild(learningstylePart);
        }
        learningstylesDivElement.appendChild(learningstyleList);
    }

    /**
     * @summary Creates a html list element with alle the groupmembers
     * @param {string} learningstyleName Name of the learningstyle from the 4 dimensions in FS-learningstyles
     * @param {number} value Value of the dimension looking at
     * @returns {string} Returns a string with the specific learningstyle we are looking at from the value in the 4 dimensions
     */
    function switchCase(learningstyleName, value) {
        switch (learningstyleName) {
        case "activeReflective":
            if (value > 0) {
                return "Reflective";
            }
            return "Active";
        case "visualVerbal":
            if (value > 0) {
                return "Verbal";
            }
            return "Visual";
        case "sensingIntuitive":
            if (value > 0) {
                return "Intuitive";
            }
            return "Sensing";
        case "sequentialGlobal":
            if (value > 0) {
                return "Global";
            }
            return "Sequential";
        default:
            return "ERROR";
        }
    }
    window.myInfo = { updateMyInfo };
}());
