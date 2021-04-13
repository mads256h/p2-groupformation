(function(){
    const {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    } = window.visualjs;

    const {
        arrayBySecondIndex
    } = window.svg;

    window.detailsElement = {createGroupInfoElement};
    document.addEventListener("DOMContentLoaded", () => {
        // createVisualInfo(groupTest, exsampleBad);
    });

    /**
     * @summary Creates the html code for the information in the groups
     * @param {object} group The class with all the groups
     * @param {number[]} array Array of the students learningstyles
     * @returns {HTMLElement} return a html element with info about the groups
     */
    function createGroupInfoElement(group, array) {
        const masterDivElement = document.createElement("div");
        masterDivElement.className = "groupsize";
        let superSum = 0;
        const table = document.createElement("table");
        table.className = "Table";
        // start
        const tableHeader = createTableHeader();
        table.appendChild(tableHeader);
        const learningStyleNames = [];
        for (const LS in group.students[0].criteria.learningStyles) {
            learningStyleNames.push(LS);
        }
        console.log(learningStyleNames);
        for (let i = 0; i < array[0].length; i++) {
            let lSarray = [];
            lSarray = arrayBySecondIndex(array, i);

            const tr = document.createElement("tr");
            console.log(group.students[0].criteria.learningStyles);
            tr.appendChild(createTableTd(learningStyleNames[i]));
            tr.appendChild(createTableTd(distanceBetweenExtremes(lSarray).toString()));
            tr.appendChild(createTableTd(sumOfArray(lSarray).toString()));
            tr.appendChild(createTableTd(distribution(lSarray).toString()));
            table.appendChild(tr);


            // The div element that are placed to the right in the svg div
            const divElement = document.createElement("div");
            divElement.className = "groupsize";

/*             // The maxMine functions output inserted in the groupsize class
            const maxMin = document.createElement("span");
            maxMin.innerText = "MaxMin: " + distanceBetweenExtremes(lSarray).toString() + " ";
            divElement.appendChild(maxMin);

            // The sum functions output inserted in the groupsize class under maxMine
            const sum = document.createElement("span");
            sum.innerText = "The sum: " + sumOfArray(lSarray).toString() + " ";
            divElement.appendChild(sum);

            // The linearDist function output inserted in the groupsize class under sum
            const linearDist = document.createElement("span");
            linearDist.innerText = "Linear distribution: " + distribution(lSarray).toString() + " ";
            divElement.appendChild(linearDist); */

            // Returns the div element in which all info is stored
            masterDivElement.appendChild(divElement);
            const lineBreak = document.createElement("br");
            masterDivElement.appendChild(lineBreak);
            superSum += Number(Math.abs(sumOfArray(lSarray)));
        }

        const superSumElement = document.createElement("span");
        superSumElement.innerText = "The total sum: " + superSum.toString();
        masterDivElement.appendChild(superSumElement);
        // Rest
        masterDivElement.appendChild(table);
        masterDivElement.appendChild(createGroupElement(group));
        return masterDivElement;
    }
    function createTableHeader(){
        const tr = document.createElement("tr");
        tr.appendChild(createTableTh("Name"));
        tr.appendChild(createTableTh("MaxMin"));
        tr.appendChild(createTableTh("Sum"));
        tr.appendChild(createTableTh("LinearDistribution"));
        return tr;
    }
    function createTableTh(text){
        const th = document.createElement("th");
        th.innerText = text;
        return th;
    }
    function createTableTd(value){
        const td = document.createElement("td");
        td.innerText = value;
        return td;
    }
    // --------------------------------------Details stuff----------------------------------
    /**
     * @summary Creates a list as a html element
     * @param {object} group Takes a class of groups with all the students in the class
     * @returns {HTMLElement} Returns a list as a html element
     */
    function createGroupElement(group) {
        const details = createDetailsElement("Groupname: " + group.name, "Group");
        const studentList = document.createElement("ul");
        for (let i = 0; i < group.students.length; i++) {
            studentList.appendChild(createStudentElement(group.students[i], i));
        }
        details.appendChild(studentList);
        return details;
    }
    /**
     * @summary Creates the html details element with a list element
     * @param {object} student The student from the group
     * @param {number} i The position of the student in the group array (used to chose the color)
     * @returns {HTMLElement} return a html element with info about the student
     */
    function createStudentElement(student, i) {
        const details = createDetailsElement(student.name, "Student", 0, "font-size: 150% ;color:" + colorArr[i] + "; background-color:lightgrey");
        const criteriaList = document.createElement("ul");
        for (let criterias in student.criteria) {
            if (typeof student.criteria[criterias] === "object"){
                criteriaList.appendChild(createCriteriaElement(student.criteria[criterias], criterias));
            }
            else {
                const listItem = createListItem(criterias + ": " + student.criteria[criterias], "CriteriaItem");
                criteriaList.appendChild(listItem);
            }
        }
        details.appendChild(criteriaList);
        return details;
    }

    /**
     * @summary Creates the html details element with a list element
     * @param {object} criteria The criteria from the student object (ambitions, working at home, learningstyles, etc.)
     * @param {string} criteriaName The string name of the criteria e.g.:ambitions, working at home, learningstyles, etc.
     * @returns {HTMLElement} return a html element with info about the criterias
     */
    function createCriteriaElement(criteria, criteriaName) {
        const details = createDetailsElement(criteriaName, "CriteriaObect", 1);
        const criteriaList = document.createElement("ul");
        for (let criterias in criteria) {
            if (typeof criteria[criterias] === "object"){
                criteriaList.appendChild(createSubjectElement(criteria[criterias], criterias));
            }
            else {
                const listItem = createListItem(criterias + ": " + criteria[criterias], "LearningStyleItems");
                criteriaList.appendChild(listItem);
            }
        }
        details.appendChild(criteriaList);
        return details;
    }

    /**
     * @summary Creates the html details element with a list element
     * @param {object} subject The subject criteria
     * @param {string} subjectName The string name "subjects"
     * @returns {HTMLElement} return a html element with info about the subjects
     */
    function createSubjectElement(subject, subjectName) {
        const details = createDetailsElement(subjectName, "Subject", 1);
        const subjectList = document.createElement("ul");
        for (const subjects of subject){
            const subjectScore = document.createElement("span");
            subjectScore.setAttribute("name", "SubjectScore");
            const detailsSubject = createDetailsElement(subjects.name, "Subject name", 1);
            subjectScore.innerText = subjects.score;
            detailsSubject.appendChild(subjectScore);
            subjectList.appendChild(detailsSubject);
        }
        details.appendChild(subjectList);
        return details;
    }

    /**
     * @summary Creates a html details element from the parameters
     * @param {string} summary The innertext of the summary of the details element
     * @param {string} detailsName The name of the details element (only visible in developer tool)
     * @param {boolean} open If the details element shoud be open by default
     * @param {string} summaryStyle The style of the summary innertext (used to color the names of the students)
     * @returns {HTMLElement} return a html details element with a summary element
     */
    function createDetailsElement(summary, detailsName, open, summaryStyle){
        const detailsElement = document.createElement("details");
        const summaryElement = document.createElement("summary");
        summaryElement.innerText = summary;
        if (open !== undefined && open === 1){
            detailsElement.setAttribute("open", 1);
        }
        else if (summaryStyle !== undefined){
            summaryElement.setAttribute("style", summaryStyle);
        }
        detailsElement.appendChild(summaryElement);
        detailsElement.setAttribute("name", detailsName);
        return detailsElement;
    }
    /**
     * @summary Creates a html listItem
     * @param {string} innerText The innertext of the list item element
     * @param {string} listItemName The name of the list item element (only visible in developer tool)
     * @returns {HTMLElement} returns a html list item element
     */
    function createListItem(innerText, listItemName){
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        listItem.setAttribute("name", listItemName);
        return listItem;
    }

    const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
}());

