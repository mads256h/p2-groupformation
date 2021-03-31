(function() {
    const {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    } = window.visualjs;

    window.detailsElement = {createVisualInfo};
    document.addEventListener("DOMContentLoaded", () => {
        createVisualInfo(groupTest, exsampleBad);
    });

    /**
     * @summary Creates the html code for the information in the groups
     * @param {object} group The class with all the groups
     * @param {number[]} array Array of the students learningstyles
     */
    function createVisualInfo(group, array) {
        // The div element that are placed to the right in the svg div
        let divElement = document.createElement("div");
        const rightToSvg = document.querySelector("div > svg");
        divElement.className = "groupsize";
        rightToSvg.after(divElement);

        // The maxMine functions output inserted in the groupsize class
        let maxMine = document.createElement("P");
        maxMine.innerText = "MaxMine: " + distanceBetweenExtremes(array).toString();
        divElement.appendChild(maxMine);

        // The sum functions output inserted in the groupsize class under maxMine
        let sum = document.createElement("P");
        sum.innerText = "The sum: " + sumOfArray(array).toString();
        divElement.appendChild(sum);

        // The linearDist function output inserted in the groupsize class under sum
        let linearDist = document.createElement("P");
        linearDist.innerText = "Linear distribution: " + distribution(array).toString();
        divElement.appendChild(linearDist);

        // Details element
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        summary.innerText = "Students";
        details.appendChild(summary);
        details.appendChild(printStudents(group));
        divElement.after(details);
    }

    /**
     * @summary Prints the names of the students in a group
     * @param {object} group Takes a class of groups with all the students in the class
     * @returns {string} A string with the names in a unorded list
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
    let groupTest = {
        name: "Group 1",
        id: 1,
        students: [
            {
                name: "Morten"
            },
            {
                name: "Mads"
            },
            {
                name: "Sven"
            }
        ]
    };
    let exsampleBad = [
        -1,
        -7.333333333333334,
        -3.666666666666667,
        0,
        3.666666666666666,
        7.333333333333332,
        11
    ];
}());

