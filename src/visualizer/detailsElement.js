(function(){
    const {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    } = window.statisticsMath;
    const {
        getStudentIdxInGroupByStudentName
    } = window.svg;

    window.detailsElement = {createGroupInfoElement, createAverageValueTable};

    /**
     * @summary Creates the html code for the information in the groups
     * @param {object} group The class with all the groups
     * @returns {HTMLElement} return a html element with info about the groups
     */
    function createGroupInfoElement(group) {
        const masterDivElement = document.createElement("div");
        masterDivElement.className = "groupsize";
        let maxMinSum = 0;
        let sumSum = 0;
        let linearDistributionSum = 0;
        const table = document.createElement("table");
        const tableHeader = createTableHeader("Name", "MaxMin", "Sum", "LinearDistribution");
        table.appendChild(tableHeader);
        for (const lSName in group.students[0].criteria.learningStyles) {
            let lSarray = [];
            lSarray = getLSValuesOfGroup(group, lSName);
            const lSTableRow = createTableRow(lSName, distanceBetweenExtremes(lSarray), sumOfArray(lSarray), distribution(lSarray).toFixed(0));
            table.appendChild(lSTableRow);
            // Add to the sums
            maxMinSum += Math.abs(distanceBetweenExtremes(lSarray));
            sumSum += Math.abs(sumOfArray(lSarray));
            linearDistributionSum += Math.abs(distribution(lSarray));
        }
        const lSSumTableRow = createTableRow("Sum", maxMinSum, sumSum, linearDistributionSum.toFixed(0));
        table.appendChild(lSSumTableRow);
        masterDivElement.appendChild(table);
        // Display the groupsize
        const displayGroupSize = document.createElement("span");
        displayGroupSize.innerText = "Group-size: " + group.students.length;
        masterDivElement.appendChild(displayGroupSize);

        masterDivElement.appendChild(createGroupElement(group));
        return masterDivElement;
    }
    /**
     * @summary Creates a html table with the average values of all the groups
     * @param {object} content Object with all the groups
     * @returns {HTMLTableElement} returns a html table element with info about all the groups
     */
    function createAverageValueTable(content){
        let maxMinSum = 0;
        let sumSum = 0;
        let linearDistributionSum = 0;
        let groups = content.length;
        let numbereOfStudents = 0;
        for (const group of content) {
            numbereOfStudents += group.students.length;
            for (const lSName in group.students[0].criteria.learningStyles) {
                let lSarray = [];
                lSarray = getLSValuesOfGroup(group, lSName);
                maxMinSum += Math.abs(distanceBetweenExtremes(lSarray));
                sumSum += Math.abs(sumOfArray(lSarray));
                linearDistributionSum += Math.abs(distribution(lSarray));
            }
        }
        const table = document.createElement("table");
        const th = createTableHeader("Gennemsnit", "MaxMin", "Sum", "LinearDistribution", "GroupSize");
        table.appendChild(th);
        // Calculate the average to be displayed in the table
        const maxMinAverage = (maxMinSum / groups).toFixed(2);
        const sumAverage = (sumSum / groups).toFixed(2);
        const linearDistributionAverage = (linearDistributionSum / groups).toFixed(2);
        const averageStudentsPrGroup = (numbereOfStudents / groups).toFixed(2);
        const tr = createTableRow("Values:", maxMinAverage, sumAverage, linearDistributionAverage, averageStudentsPrGroup);
        table.appendChild(tr);
        return table;
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
     * @summary Creates the html table header, only the first parameter is used in calls
     * @param {string[]} row The innertext of the headers
     * @returns {HTMLTableRowElement} return a html row element with the table header
     */
    function createTableRow(...row){
        const tr = document.createElement("tr");
        for (const cell of row) {
            tr.appendChild(createTableTd(cell));
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
     * @returns {HTMLTableCellElement} returns a html table cell
     */
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
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        const details = createDetailsElement("Groupname: " + group.name, "Group");
        const studentList = document.createElement("ul");
        for (const student of group.students) {
            const studentColor = colorArr[getStudentIdxInGroupByStudentName(group, student.name)];
            studentList.appendChild(createStudentElement(student, studentColor));
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
            const detailsSubject = createDetailsElement(subjects.name, "Subject name", 1);
            const subjectScore = document.createElement("span");
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
    /**
     * @summary Creates and returns a new array with the learningstyle values(-11 to 11)
     * of the learningstyle with the learningstyle(e.g. active, visual, sensing..) name provided in the learnStyleName argument
     * @param {object} group the group from which to get the data
     * @param {string} learnStyleName the name of the learningstyle e.g. "activeReflective"
     * @returns {Array} returns an array with the students of the groups values in the given learningstyle
     */
    function getLSValuesOfGroup(group, learnStyleName){
        const resArray = new Array();
        for (const student of group.students) {
            resArray.push(student.criteria.learningStyles[learnStyleName]);
        }
        return resArray;
    }
}());