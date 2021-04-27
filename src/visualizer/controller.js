(function() {
    const {
        getListOfData,
        getData
    } = window.comm;
    const {
        createGroupInfoElement,
        createAverageValueTable
    } = window.display;
    const {
        createGroupSvg
    } = window.svg;

    getListOfData().then(responds => {
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
        const select = document.createElement("select");
        select.addEventListener("change", () => showData(select.options[select.selectedIndex].text));
        for (const file of array) {
            const option = document.createElement("option");
            option.value = file;
            option.text = file;
            select.appendChild(option);
        }
        select.selectedIndex = "-1";
        return select;
    }

    /**
     * @summary displays the groups and their info
     * @param {object} content this is the content of the data in the file
     */
    function displayGroups(content) {
        // Creates a master div element, under which alle the info will be displayed, this is overwritten by each buttonpress
        const masterDiv = makeMasterDiv();
        document.body.appendChild(masterDiv);
        for (const group of content) {
            const groupDiv = document.createElement("div");
            // Lav de elementer der skal appendes til groupdiv
            groupDiv.appendChild(createGroupSvg(group));
            groupDiv.appendChild(createGroupInfoElement(group));
            const line = document.createElement("hr");
            groupDiv.appendChild(line);
            // Tilføj groupDiv til vores master element
            masterDiv.appendChild(groupDiv);
        }
        masterDiv.prepend(createAverageValueTable(content));
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
        getData(filename).then(content=>displayGroups(content));
    }
}());


