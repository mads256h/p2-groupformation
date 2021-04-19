(function(){
    /**
     * @description This file contains functions that show info about the group with help from functions from other files
     */
    const {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    } = window.statisticsMath;
    const {
        getLSValuesOfGroup
    } = window.objectFunctions;
    const {
        createTableHeader,
        createTableRow,
        createDetailsElement,
        createListItem
    } = window.HTMLElements;
    window.display = {createGroupInfoElement, createAverageValueTable};

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
     * @summary Creates a html table with the average values of all the groups (the table at the top of the DOM)
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

    // --- Functions that make the details elements with the info from the groups ----------------
    /**
     * @summary Creates a list as a html element
     * @param {object} group Takes a class of groups with all the students in the class
     * @returns {HTMLElement} Returns a list as a html element
     */
    function createGroupElement(group) {
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        const details = createDetailsElement(`Groupname: ${group.name}`, "Group");
        const studentList = document.createElement("ul");
        for (const studentIdx in group.students) {
            const studentColor = colorArr[studentIdx];
            studentList.appendChild(createStudentElement(group.students[studentIdx], studentColor));
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
        const details = createDetailsElement(student.name, "Student", false);
        // The summary element is appended in the createDetailsElement, so it will be the firstChild
        const detailsSummary = details.firstChild;
        detailsSummary.setAttribute("class", "studentClass");
        detailsSummary.setAttribute("style", `color: ${color};`);
        const criteriaList = document.createElement("ul");
        for (let criteria in student.criteria) {
            if (typeof student.criteria[criteria] === "object"){
                criteriaList.appendChild(createCriteriaElement(student.criteria[criteria], criteria));
            }
            else {
                const listItem = createListItem(`${criteria}: ${student.criteria[criteria]}`);
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
        const details = createDetailsElement(criteriaName, "CriteriaObect", true);
        const criteriaList = document.createElement("ul");
        for (let criterias in criteria) {
            if (typeof criteria[criterias] === "object"){
                criteriaList.appendChild(createSubjectElement(criteria[criterias], criterias));
            }
            else {
                const listItem = createListItem(`${criterias}: ${criteria[criterias]}`);
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
        const details = createDetailsElement(subjectName, "Subject", true);
        const subjectList = document.createElement("ul");
        for (const subjects of subject){
            const detailsSubject = createDetailsElement(subjects.name, "Subject name", true);
            const subjectScore = document.createElement("span");
            subjectScore.innerText = subjects.score;
            detailsSubject.appendChild(subjectScore);
            subjectList.appendChild(detailsSubject);
        }
        details.appendChild(subjectList);
        return details;
    }
}());