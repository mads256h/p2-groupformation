(function() {
    const {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    } = window.visualjs;

    window.detailsElement = {displayGroupInfo};
    document.addEventListener("DOMContentLoaded", () => {
        // createVisualInfo(groupTest, exsampleBad);
    });

    /**
     * @summary Creates the html code for the information in the groups
     * @param {object} group The class with all the groups
     * @param {number[]} array Array of the students learningstyles
     * @returns {HTMLElement} return a html element with info about the groups
     */
    function displayGroupInfo(group, array) {
        // The div element that are placed to the right in the svg div
        const divElement = document.createElement("div");
        divElement.className = "groupsize";

        // The maxMine functions output inserted in the groupsize class
        const maxMin = document.createElement("P");
        maxMin.innerText = "MaxMine: " + distanceBetweenExtremes(array).toString();
        divElement.appendChild(maxMin);

        // The sum functions output inserted in the groupsize class under maxMine
        const sum = document.createElement("P");
        sum.innerText = "The sum: " + sumOfArray(array).toString();
        divElement.appendChild(sum);

        // The linearDist function output inserted in the groupsize class under sum
        const linearDist = document.createElement("P");
        linearDist.innerText = "Linear distribution: " + distribution(array).toString();
        divElement.appendChild(linearDist);

        // Details element
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.innerText = "Students";
        details.appendChild(summary);
        details.appendChild(printStudents(group));
        divElement.appendChild(details);

        // Returns the div element in which all info is stored
        return divElement;
    }

    /**
     * @summary Creates a list as a html element
     * @param {object} group Takes a class of groups with all the students in the class
     * @returns {HTMLElement} Returns a list as a html element
     */
    function printStudents(group) {
        const list = document.createElement("ul");
        for (let student of group.students) {
            const listItem = document.createElement("li");
            listItem.innerText = student.name;
            list.appendChild(listItem);
        }
        return list;
    }
}());

