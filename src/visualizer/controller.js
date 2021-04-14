(function() {
    const {
        getListOfData,
        getData
    } = window.comm;
    const {
        createGroupInfoElement,
        createAverageValueTable
    } = window.detailsElement;
    const {
        createGroupSvg
    } = window.svg;

    getListOfData().then(responds => {
        console.log(responds);
        const filtered = responds.filter((f)=>f !== ".gitkeep");
        if (filtered.length === 0){
            const displayHelp = document.createElement("p");
            displayHelp.innerText = "You do not have any files in your src/visualizer/data folder, insert files with json data in this folder :)";
            document.body.appendChild(displayHelp);
        }
        else {
            document.body.appendChild(createButtons(filtered));
        }
    });

    /**
     * @summary Creates a button for each file in the data folder
     * @param {string[]} array this is an array with the names of the files in the data folder
     * @returns {HTMLDivElement} Returns a html div element with the buttons appended.
     */
    function createButtons(array) {
        const div = document.createElement("div");
        for (const file of array) {
            const buttonElement = document.createElement("BUTTON");
            buttonElement.innerText = "Filename: " + file;
            buttonElement.addEventListener("click", () => showData(file));
            div.appendChild(buttonElement);
        }
        return div;
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
            // Lav de elementer der skal appendes til groupdiv
            groupDiv.appendChild(createGroupSvg(allGroupLSArr[i]));
            groupDiv.appendChild(createGroupInfoElement(allGroupsInfoArr[i], allGroupLSArr[i]));
            const line = document.createElement("hr");
            groupDiv.appendChild(line);
            // Tilføj groupDiv til vores master element
            masterDiv.appendChild(groupDiv);
        }
        masterDiv.prepend(createAverageValueTable());
    }

    /**
     * @summary Creates/overwrites the master div element
     * @returns {HTMLDivElement} an empty html master div element
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
    function showData(filename){
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


