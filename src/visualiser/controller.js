(function() {
    const {
        getListOfData,
        getData
    } = window.comm;
    const {
        createGroupInfoElement
    } = window.detailsElement;
    const {
        createGroupSvg
    } = window.svg;

    getListOfData().then(responds => {
        console.log(responds);
        createButtons(responds);
    });

    /**
     * @summary Creates a button for each file in the data folder
     * @param {Array} array this is an array with the names of the files in the data folder
     */
    function createButtons(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== ".gitkeep"){
                const buttonElement = document.createElement("BUTTON");
                buttonElement.innerText = "Filename: " + array[i];
                buttonElement.addEventListener("click", () => callData(array[i]));
                document.body.appendChild(buttonElement);
            }
        }
    }

    /**
     * @summary Displays the info of the allGroupLSarr and allGroupsInfo arrays
     * @param {Array} allGroupLSArr The array with the learningstyles from all the groups
     * @param {Array} allGroupsInfoArr The array with the info from all the groups
     */
    function displayGroups(allGroupLSArr, allGroupsInfoArr) {
        // Creates a master div element, under which alle the info will be displayed, this is overwritten by each buttonpress
        const masterDiv = makeMasterDiv();
        document.body.appendChild(masterDiv);
        for (let i = 0; i < allGroupLSArr.length; i++) {
            const groupDiv = document.createElement("div");
            groupDiv.setAttribute("id", "DIV" + i);

            // Lav de elementer der skal appendes til groupdiv
            groupDiv.appendChild(createGroupSvg(allGroupLSArr[i]));
            groupDiv.appendChild(createGroupInfoElement(allGroupsInfoArr[i], allGroupLSArr[i]));
            const line = document.createElement("hr");
            groupDiv.appendChild(line);
            // Tilføj groupDiv til vores master element
            masterDiv.appendChild(groupDiv);
        }
    }

    /**
     * @summary Creates/overwrites the master div element
     * @returns {HTMLElement} an empty html master div element
     */
    function makeMasterDiv(){
        const element = document.getElementById("MasterDiv");
        if (element !== null){
            element.remove();
        }
        const masterDiv = document.createElement("DIV");
        masterDiv.setAttribute("id", "MasterDiv");
        return masterDiv;
    }

    /**
     * @summary Changes the header and calls the getData promise
     * @param {string} filename the name of the file from which to get the data
     */
    function callData(filename){
        const header = document.querySelector("h1");
        header.innerText = "Now showing the content of: " + filename;
        getData(filename).then(content=>useData(content));
    }

    /**
     * @summary Uses the content of the file and picks out the info needed and iserts it into arrays, which is used in the displayGroups function
     * @param {object} content The content of the file, all stored into an object
     */
    function useData(content){
        let allGroupsLSarr = [];
        let allGroupsInfo = [];
        for (const group of content) {
            console.log(group);
            let groupLSarr = [];
            for (const student of group.students) {
                groupLSarr.push(getStudentLS(student));
            }
            allGroupsInfo.push(group);
            allGroupsLSarr.push(groupLSarr);
        }
        displayGroups(allGroupsLSarr, allGroupsInfo);
    }
    /**
     * @summary Uses the content of the file and picks out the info needed and iserts it into arrays, which is used in the displayGroups function
     * @param {object} student The student from which to get the learningstyles from
     * @returns {Array} an array with the learningstyles of the student
     */
    function getStudentLS(student){
        const studentLS = student.criteria.learningStyles;
        let arr = [];
        for (const learningStyle in studentLS) {
            arr.push(parseInt(studentLS[learningStyle]));
        }
        return arr;
    }
}());


