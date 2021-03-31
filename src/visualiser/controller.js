(function() {
    const {
        getListOfData,
        getData
    } = window.comm;
    const {
        createVisualInfo
    } = window.detailsElement;
    const {
        visualiseGroup
    } = window.svg;

    getListOfData().then(responds => {
        console.log(responds);
        createButtons(responds);
    });

    function createButtons(array) {
        let buttonElement;
        for (let i = 0; i < array.length; i++) {
            buttonElement = document.createElement("BUTTON");
            buttonElement.innerText = "Filename: " + array[i];
            buttonElement.addEventListener("click", () => makeFromFilename(array[i]));
            document.body.appendChild(buttonElement);
        }
    }

    function makeFromFilename(filename) {
        console.log("Creating from file: " + filename);
        createVisualInfo(groupTest, exsampleBad);
        visualiseGroup(arr2d);
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
}());


