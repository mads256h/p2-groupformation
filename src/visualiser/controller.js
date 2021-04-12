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
            const buttonElement = document.createElement("BUTTON");
            buttonElement.innerText = "Filename: " + array[i];
            buttonElement.addEventListener("click", () => callData(array[i]));
            document.body.appendChild(buttonElement);
        }
    }

    /**
     * @summary Displays the info of the file provided as parameter
     * @param {string} filename the name of the file
     */
    function makeAllGroups(allGroupLSarr, allGroupsInfo) {
        // Creates a master div element, under which alle the info will be displayed, this is overwritten by each buttonpress
        const masterDiv = makeMasterDiv();
        document.body.appendChild(masterDiv);
        for (let i = 0; i < allGroupLSarr.length; i++) {
            const groupDiv = document.createElement("div");
            groupDiv.setAttribute("id", "DIV" + i);

            // Lav de elementer der skal appendes til groupdiv
            groupDiv.appendChild(createGroupSvg(allGroupLSarr[i]));
            groupDiv.appendChild(createGroupInfoElement(allGroupsInfo[i], allGroupLSarr[i]));

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

    function callData(filename){
        console.log("Creating html from file: " + filename);
        getData(filename).then(content=>useData(content));
    }

    function useData(content){
        console.log(content);
        let allGroupsLSarr = [];
        let allGroupsInfo = [];
        for (const group of content) {
            console.log(group);
            let groupLSarr = [];
            for (const student of group.students) {
                // console.log(student);
                groupLSarr.push(getStudentLS(student));
            }
            allGroupsInfo.push(group);
            allGroupsLSarr.push(groupLSarr);
        }
        makeAllGroups(allGroupsLSarr, allGroupsInfo);
    }
    function getStudentLS(student){
        const studentLS = student.criteria.learningStyles;
        let arr = [];
        for (const learningStyle in studentLS) {
            // if (Object.hasOwnProperty.call(studentLS, learningStyle)) { // necessary?????
            arr.push(parseInt(studentLS[learningStyle]));
            // }
        }
        // console.log(...arr);
        return arr;
    }
}());


