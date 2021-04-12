(function() {
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
        for (let i = 0; i < array[0].length; i++) {
            let lSarray = [];
            lSarray = arrayBySecondIndex(array, i);

            // The div element that are placed to the right in the svg div
            const divElement = document.createElement("div");
            divElement.className = "groupsize";

            // The maxMine functions output inserted in the groupsize class
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
            divElement.appendChild(linearDist);

            // Returns the div element in which all info is stored
            masterDivElement.appendChild(divElement);
            const lineBreak = document.createElement("br");
            masterDivElement.appendChild(lineBreak);
        }

        masterDivElement.appendChild(createGroupElement(group));
        const line = document.createElement("hr");
        masterDivElement.appendChild(line);
        return masterDivElement;
    }
    /**
     * @summary Creates a list as a html element
     * @param {object} group Takes a class of groups with all the students in the class
     * @returns {HTMLElement} Returns a list as a html element
     */
    function createGroupElement(group) {
        // Details element
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.innerText = "Groupname: " + group.name;
        details.appendChild(summary);
        const studentList = document.createElement("ul");
        console.log(group.length);
        for (let i = 0; i < group.students.length; i++) {
            studentList.appendChild(createStudentElement(group.students[i], i));
        }
        details.appendChild(studentList);
        return details;
    }

    function createStudentElement(student, i) {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.innerText = student.name;
        details.appendChild(summary);
        summary.setAttribute("style", "font-size: 150% ;color:" + colorArr[i] + "; background-color:lightgrey");
        // console.log(student);
        const criteriaList = document.createElement("ul");
        for (let criterias in student.criteria) {
            if (typeof student.criteria[criterias] === "object"){
                criteriaList.appendChild(createCriteriaElement(student.criteria[criterias], criterias));
            }
            else {
                const listItem = document.createElement("li");
                listItem.innerText = criterias + " " + student.criteria[criterias];
                criteriaList.appendChild(listItem);
            }
        }
        details.appendChild(criteriaList);
        return details;
    }

    function createCriteriaElement(criteria, criteriaName) {
        const details = document.createElement("details");
        details.setAttribute("open", 1);
        const summary = document.createElement("summary");
        summary.innerText = criteriaName;
        details.appendChild(summary);
        const studentList = document.createElement("ul");
        for (let criterias in criteria) {
            if (typeof criteria[criterias] === "object"){
                studentList.appendChild(createCriteriaElement(criteria[criterias], criterias));
            }
            else {
                const listItem = document.createElement("li");
                listItem.innerText = criterias + " " + criteria[criterias];
                studentList.appendChild(listItem);
            }
        }
        details.appendChild(studentList);
        return details;
    }

    const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
}());

