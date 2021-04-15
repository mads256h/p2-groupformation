(function(){
    const {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    } = window.visualjs;

    const {
        arrayBySecondIndex
    } = window.svg;

    window.detailsElement = {createGroupInfoElement, createAverageValueTable};
    document.addEventListener("DOMContentLoaded", () => {
    });

    /**
     * @summary Creates the html code for the information in the groups
     * @param {object} group The class with all the groups
     * @param {number[]} array Array of the students learningstyles
     * @returns {HTMLElement} return a html element with info about the groups
     */
    function createGroupInfoElement(group, array) {
        console.log(group);
        /* const masterDivElement = document.createElement("div");
        masterDivElement.className = "groupsize";
        let maxMinSum = 0;
        let sumSum = 0;
        let linearDistributionSum = 0;
        const table = document.createElement("table");
        const tableHeader = createTableHeader("Name", "MaxMin", "Sum", "LinearDistribution");
        table.appendChild(tableHeader);
        const learningStyleNames = [];
        for (const LS in group.students[0].criteria.learningStyles) {
            learningStyleNames.push(LS);
        }
        for (let i = 0; i < array[0].length; i++) {
            let lSarray = [];
            lSarray = arrayBySecondIndex(array, i);

            const tr = document.createElement("tr");
            tr.appendChild(createTableTd(learningStyleNames[i]));
            tr.appendChild(createTableTd(distanceBetweenExtremes(lSarray).toString()));
            tr.appendChild(createTableTd(sumOfArray(lSarray).toString()));
            tr.appendChild(createTableTd(distribution(lSarray).toFixed(2).toString()));
            table.appendChild(tr);

            maxMinSum += Number(Math.abs(distanceBetweenExtremes(lSarray)));
            sumSum += Number(Math.abs(sumOfArray(lSarray)));
            linearDistributionSum += Number(Math.abs(distribution(lSarray)));
        }
        const tr = document.createElement("tr");
        tr.appendChild(createTableTd("Sum:"));
        tr.appendChild(createTableTd(maxMinSum, "MaxMin"));
        tr.appendChild(createTableTd(sumSum, "Sum"));
        tr.appendChild(createTableTd(linearDistributionSum.toFixed(2), "LinearDistribution"));
        table.appendChild(tr);
        masterDivElement.appendChild(table);
        const displayGroupSize = document.createElement("span");
        displayGroupSize.setAttribute("class", "GroupSizeSpan");
        displayGroupSize.innerText = "Group-size: " + group.students.length;
        masterDivElement.appendChild(displayGroupSize);
        masterDivElement.appendChild(createGroupElement(group));
        return masterDivElement; */
    }
    /**
     * @summary Creates a html table with the average values of all the groups
     * @returns {HTMLElement} returns a html table element with info about all the groups
     */
    function createAverageValueTable(){
        const table = document.createElement("table");
        const th = createTableHeader("Gennemsnit", "MaxMin", "Sum", "LinearDistribution", "GroupSize");
        table.appendChild(th);
        const tr = document.createElement("tr");
        tr.appendChild(createTableTd("Værdier:"));
        tr.appendChild(createTableTd(sumByTableCellClassName("MaxMin")));
        tr.appendChild(createTableTd(sumByTableCellClassName("Sum")));
        tr.appendChild(createTableTd(sumByTableCellClassName("LinearDistribution")));
        tr.appendChild(createTableTd(sumByTableCellClassName("GroupSizeSpan")));
        table.appendChild(tr);
        return table;
    }
    /**
     * @summary Creates the html code for the information in the groups
     * @param {string} className The classname of the cells from which to take the average
     * @returns {number} returns the average value of the innertext of the cells with the classname
     */
    function sumByTableCellClassName(className){
        const cells = document.querySelectorAll("." + className);
        let sum = 0;
        let groupcounter = 0;
        for (const cell of cells) {
            if (cell.innerText.toString().includes("Group-size")){
                sum += parseInt(cell.innerText.replace("Group-size: ", ""));
            }
            else {
                sum += parseInt(cell.innerText);
            }
            groupcounter++;
        }
        return (sum / groupcounter).toFixed(2);
    }
    /**
     * @summary Creates the html table header, only the first parameter is used in calls
     * @param {string[]} header The innertext of the headers
     * @returns {HTMLTableRowElement} return a html row element with the table header
     */
    function createTableHeader(...header){
        const tr = document.createElement("tr");
        for (const headCell of header) {
            tr.appendChild(createTableTh(headCell));
        }
        return tr;
    }
    /**
     * @summary Creates a html table headercell element
     * @param {string} text the name of the headercell
     * @returns {HTMLTableHeaderCellElement} returns a html table header cell element
     */
    function createTableTh(text){
        const th = document.createElement("th");
        th.innerText = text;
        return th;
    }
    /**
     * @summary Makes a table cell
     * @param {string} value The innertext of the cell
     * @param {string} className The name of the class to be assigned to the cell
     * @returns {HTMLTableCellElement} returns a html table cell
     */
    function createTableTd(value, className){
        const td = document.createElement("td");
        if (className !== undefined){
            td.setAttribute("class", className);
        }
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
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        const details = createDetailsElement("Groupname: " + group.name, "Group");
        const studentList = document.createElement("ul");
        for (let i = 0; i < group.students.length; i++) {
            studentList.appendChild(createStudentElement(group.students[i], colorArr[i]));
        }
        details.appendChild(studentList);
        return details;
    }
    /**
     * @summary Creates the html details element with a list element
     * @param {object} student The student from the group
     * @param {string} color The color of the student in the svg
     * @returns {HTMLElement} return a html element with info about the student
     */
    function createStudentElement(student, color) {
        const details = createDetailsElement(student.name, "Student", 0, "color:" + color + ";", "studentClass");
        const criteriaList = document.createElement("ul");
        for (let criterias in student.criteria) {
            if (typeof student.criteria[criterias] === "object"){
                criteriaList.appendChild(createCriteriaElement(student.criteria[criterias], criterias));
            }
            else {
                const listItem = createListItem(criterias + ": " + student.criteria[criterias]);
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
                const listItem = createListItem(criterias + ": " + criteria[criterias]);
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
     * @param {string} className The classname of the summary element
     * @returns {HTMLElement} return a html details element with a summary element
     */
    function createDetailsElement(summary, detailsName, open, summaryStyle, className){
        const detailsElement = document.createElement("details");
        const summaryElement = document.createElement("summary");
        summaryElement.innerText = summary;
        if (open !== undefined && open === 1){
            detailsElement.setAttribute("open", 1);
        }
        else if (summaryStyle !== undefined){
            summaryElement.setAttribute("style", summaryStyle);
        }
        if (className !== undefined){
            summaryElement.setAttribute("class", className);
        }
        detailsElement.appendChild(summaryElement);
        detailsElement.setAttribute("name", detailsName);
        return detailsElement;
    }
    /**
     * @summary Creates a html listItem
     * @param {string} innerText The innertext of the list item element
     * @returns {HTMLElement} returns a html list item element
     */
    function createListItem(innerText){
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        return listItem;
    }
}());