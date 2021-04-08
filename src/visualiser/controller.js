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
            buttonElement.addEventListener("click", () => makeFromFilename(array[i]));
            document.body.appendChild(buttonElement);
        }
    }

    /**
     * @summary Displays the info of the file provided as parameter
     * @param {string} filename the name of the file
     */
    function makeFromFilename(filename) {
        console.log("Creating html from file: " + filename);
        // Creates a master div element, under which alle the info will be displayed, this is overwritten by each buttonpress
        const masterDiv = makeMasterDiv();
        document.body.appendChild(masterDiv);
        for (let i = 0; i < arrTest.length; i++) {
            const groupDiv = document.createElement("div");
            groupDiv.setAttribute("id", "DIV" + i);

            // Lav de elementer der skal appendes til groupdiv
            groupDiv.appendChild(createGroupSvg(arrTest[i]));
            groupDiv.appendChild(createGroupInfoElement(groupTest, exsampleBad, i));

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

    getData("test2.json").then(e => {
        console.log(e);
    });


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
    let arr2d = [[-11,5,6,3], [-11,6,6,3.1], [-11,2.5,2.5,3.2], [-10.5,3,3,3.3], [4,3.1,6,3.5]]; // test array med læringsstile, first idx is student, second idx is learningsstyle
    let arr2d1 = [[-1,5,6,3], [-11,6,3,3.1], [-11,2.5,2.5,3.2], [-10.5,3,1,3.3], [4,3.1,6,3.5]]; // test array med læringsstile, first idx is student, second idx is learningsstyle
    let arrTest = [arr2d, arr2d1];
}());


