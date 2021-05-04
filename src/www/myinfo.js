(function(){
    const paragrafElement = document.createElement("p");
    const classString = "titles";
    let userNameId;
    let workFromHomeId;
    let subjectPreferenceId;
    let groupTitleId;
    let currentGroupId;
    let leaveButtonId;
    let learningstyleId;

    const { clearChildren, createListItem } = window.utiljs;
    const { leavegroup } = window.commjs;
    document.addEventListener("DOMContentLoaded", () => {
        userNameId = document.getElementById("username");
        workFromHomeId = document.getElementById("workFromHome");
        subjectPreferenceId = document.getElementById("subjectPreference");
        groupTitleId = document.getElementById("groupTitle");
        currentGroupId = document.getElementById("currentGroup");
        leaveButtonId = document.getElementById("leaveButton");
        learningstyleId = document.getElementById("learningstyles");
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
     * @param {object} student The object with the logged in users informations
     */
    function showNameOnSite(student) {
        const username = userNameId;
        username.innerText = "Welcome, " + student.name;
    }

    /**
     * @summary Prints the information about work enviroment from the user
     * @param {object} content the object with the logged in users informations
     */
    function showWorkEnvironment(content) {
        const workingEnvironmentDiv = workFromHomeId;
        const work = content.criteria.workingAtHome;
        const workingEnvironment = paragrafElement;
        clearChildren(workingEnvironmentDiv);
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
            return RangeError;
        }
    }

    /**
     * @summary Creates the elements shown on the site about subjects the user have chossen
     * @param {object} content the object with the logged in users informations
     */
    function showSubject(content) {
        const subjectArray = content.criteria.subjectPreference.subjects.slice();
        const subjectList = document.createElement("ul");
        const subjectDiv = subjectPreferenceId;
        subjectArray.sort((a, b) => b.score - a.score);
        clearChildren(subjectDiv);

        for (const subject of subjectArray) {
            const subjectPart = createListItem(subject.name + ": " + (subject.score * 10).toFixed(2));
            subjectList.appendChild(subjectPart);
            subjectDiv.appendChild(subjectList);
        }
    }

    /**
     * @summary Creates a html list element with all the group members
     * @param {object} group One group as a object
     * @param {string} userName Name of the logged in user
     */
    function showGroup(group, userName) {
        const groupMemberDiv = currentGroupId;
        const button = leaveButtonId;
        const groupMembersList = document.createElement("ul");
        const groupTitle = groupTitleId;

        clearChildren(groupMemberDiv);

        for (const member of group.students) {
            if (member.name !== userName) {
                const memberName = createListItem(member.name);
                groupMembersList.appendChild(memberName);
            }
        }
        if (group.students.length === 1) {
            groupTitle.innerText = "Not in a group yet";
            button.style.display = "none";
        }
        if (group.students.length > 1) {
            groupTitle.innerText = "Your group " + group.name + ":";
            button.style.display = "block";
            groupMemberDiv.appendChild(groupMembersList);
            const groupSubjectTitle = createTitleElement("Your group prefered 3 subjects:", classString);
            groupMemberDiv.appendChild(groupSubjectTitle);
            groupMemberDiv.appendChild(createGroupSubjectsElement(group));
        }
    }
    /**
     * @summary Creates a html list element with all the group members subjects added together
     * @param {object} group One group as a object
     * @returns {HTMLElement} Returns a H3 Element with a ul child element with the subjects from the group
     */
    function createGroupSubjectsElement(group) {
        const groupSubjectList = document.createElement("ul");
        const subjectArray = addSubjectScore(group);
        /* Sorting the array, the bigest score will be in the first index of the array */
        subjectArray.sort((a, b) => b.score - a.score);

        for (const subject of subjectArray.slice(0, 3)) {
            groupSubjectList.appendChild(createListItem(subject.name + ": " + (subject.score * 10).toFixed(2)));
        }
        return groupSubjectList;
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
     * @summary Prints the learningstyle on the group site as a ul element from the logged in user
     * @param {object} student Data about the logged in user
     */
    function showLearningstyles(student) {
        const learningstylesDivElement = learningstyleId;
        clearChildren(learningstylesDivElement);
        const learningstyleList = document.createElement("ul");
        const learningstyles = student.criteria.learningStyles;
        for (const learningstyle in learningstyles) {
            const absLearningstyleValue = Math.abs(learningstyles[learningstyle]);
            const learningStyleName = switchCase(learningstyle, learningstyles[learningstyle]);
            const learningstylePart = createListItem(learningStyleName + ": " + absLearningstyleValue);
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
            return value > 0 ? "Reflective" : "Active";
        case "visualVerbal":
            return value > 0 ? "Verbal" : "Visual";
        case "sensingIntuitive":
            return value > 0 ? "Intuitive" : "Sensing";
        case "sequentialGlobal":
            return value > 0 ? "Global" : "Sequential";
        default:
            return "ERROR";
        }
    }
    /**
     * @summary Creates a html p element with a class and innerText
     * @param {string} innerText The string of the inneText
     * @param {string} className String of the class the element should be in
     * @returns {HTMLElement} Returns a p element with a classname sat and inneText
     */
    function createTitleElement(innerText, className){
        const element = document.createElement("p");
        element.className = className;
        element.innerText = innerText;
        return element;
    }
    window.myInfo = { updateMyInfo };
}());