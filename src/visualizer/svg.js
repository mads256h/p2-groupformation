/**
 * @description SVG functions.
 * @author henneboy
 */
// Inspired by: https://www.w3.org/TR/2011/REC-SVG11-20110816/shapes.html#CircleElement
const {
    getLSValuesOfGroup,
    getSubjectValuesOfGroup,
    getWorkingAtHomeOfGroup
} = window.statisticsMath;

(function(){
    window.svg = {
        createGroupSvg};
    // Declaration of global consts, which are layout settings of the svg
    const svgWidth = window.innerWidth / 2; // width of the svg is half the browser size
    const svgLineSpace = svgWidth * 0.04; // the amount of space between each line, by the width of the svg
    const svgLineWidth = svgWidth * 0.01;
    const svgTextSize = svgLineSpace * 0.5;
    const LSRANGEWIDTH = 22; // Learningstyle rangewith, from -11 to 11 = 22
    const WAHRANGEWIDTH = 2; // Working At Home rangewith, from -1 to 1 = 2

    /**
     * @summary Creates and appends a div element with the svg of the learningstyles
     * @param {object} group the group object with students
     * @returns {HTMLDivElement} Html div element with the graphical info of the group from the argument
     */
    function createGroupSvg(group){
        const svgDiv = document.createElement("div");
        svgDiv.setAttribute("class", "svg");
        svgDiv.setAttribute("style", "width: " + svgWidth + "px;");
        // Create LearningStyles:
        const learningStyleTitle = document.createElement("p");
        learningStyleTitle.innerText = "Learningstyles";
        svgDiv.appendChild(learningStyleTitle);
        svgDiv.appendChild(createLearningStyles(group));

        // Create SubjectPreferences:
        const subjectTitle = document.createElement("p");
        subjectTitle.innerText = "Subjectpreferences";
        svgDiv.appendChild(subjectTitle);
        svgDiv.appendChild(createSubjectPreference(group));

        // Create WorkingAtHome:
        const workingAtHomeTitle = document.createElement("p");
        workingAtHomeTitle.innerText = "Working at home";
        svgDiv.appendChild(workingAtHomeTitle);
        svgDiv.appendChild(createWorkingAtHome(group));
        return svgDiv;
    }

    /**
     * @summary Creates and appends a div element with the svg of the learningstyles
     * @param {object} group the group object with students
     * @returns {SVGElement} Svg element with the graphical info about the groups learningstyles
     */
    function createLearningStyles(group){
        const learningStyle = group.students[0].criteria.learningStyles;
        const svg = createSvgElement(2 * svgLineSpace * Object.keys(learningStyle).length);
        let yValue = svgLineSpace;
        for (const learningStyleName in learningStyle) {
            createLearningStyleDimension(group, learningStyleName, svg, yValue);
            yValue += 2 * svgLineSpace;
        }
        return svg;
    }

    /**
     * @summary Creates and appends a svg learningstyle to the svg element
     * @param {object} group the group object with students
     * @param {string} learnStyleName the name of the learningstyle
     * @param {SVGElement} svg svg element on which we append the svg for a learningstyle
     * @param {number} yValue the yValue of this bar and the circles
     */
    function createLearningStyleDimension(group, learnStyleName, svg, yValue){
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        createBar(yValue, -11, LSRANGEWIDTH, svg, learnStyleName);
        // Create the circles
        const arrCircleSize = closeby(getLSValuesOfGroup(group, learnStyleName), 0.5);
        for (const i in arrCircleSize) {
            const xValue = circleXValue(group.students[i].criteria.learningStyles[learnStyleName], LSRANGEWIDTH, LSRANGEWIDTH / 2);
            const studentColor = colorArr[i];
            svg.appendChild(createCircle(xValue, yValue, studentColor, arrCircleSize[i]));
        }
    }

    /**
     * @summary Calls the createSubject function for each subject
     * @param {object} group the group object with students
     * @returns {SVGElement} Svg element with the graphical info about the groups subjectPreference
     */
    function createSubjectPreference(group){
        const subjects = group.students[0].criteria.subjectPreference.subjects;
        const svg = createSvgElement(2 * svgLineSpace * subjects.length);
        let yValue = svgLineSpace;
        for (const subject of subjects) {
            createSubject(group, subject.name, svg, yValue);
            yValue += 2 * svgLineSpace;
        }
        return svg;
    }

    /**
     * @summary Creates and appends a svg element with the subject to the svg element
     * @param {object} group the group object with students
     * @param {string} subjectName the name of the subject
     * @param {SVGElement} svg svg element on which we append the svg for a learningstyle
     * @param {number} yValue the yValue of this bar and the circles
     */
    function createSubject(group, subjectName, svg, yValue){
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        createBar(yValue, 0, 1, svg, subjectName);
        // Create the circles
        const arrCircleSize = closeby(getSubjectValuesOfGroup(group, subjectName), 0.05);
        for (const i in arrCircleSize) {
            const xValue = circleXValue(group.students[i].criteria.subjectPreference.subjects[subjectName].score, 1, 0);
            const studentColor = colorArr[i];
            svg.appendChild(createCircle(xValue, yValue, studentColor, arrCircleSize[i]));
        }
    }

    /**
     * @summary Calls the createSubject function for each subject
     * @param {object} group the group object with students
     * @returns {SVGElement} Svg element with the graphical info about the groups subjectPreference
     */
    function createWorkingAtHome(group){
        const svg = createSvgElement(2 * svgLineSpace);
        const yValue = svgLineSpace;
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        createBar(yValue, -1, WAHRANGEWIDTH, svg, "Working at home");

        // Create the circles
        const arrCircleSize = closeby(getWorkingAtHomeOfGroup(group), 0.1);
        for (const i in arrCircleSize) {
            const xValue = circleXValue(group.students[i].criteria.workingAtHome, WAHRANGEWIDTH, WAHRANGEWIDTH / 2);
            const studentColor = colorArr[i];
            svg.appendChild(createCircle(xValue, yValue, studentColor, arrCircleSize[i]));
        }
        return svg;
    }
    // --------------------------------------------------- Element generators -----------------------------------
    /**
     * @summary Creates and return a new svg element with a grey rectangle
     * @param {number} svgHeight The height of the svg element
     * @returns {SVGElement} The svg element with the grey rectangle
     */
    function createSvgElement(svgHeight){
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", svgWidth);
        svg.setAttribute("height", svgHeight);
        svg.appendChild(createRect(0, 0, svgWidth, svgHeight)); // create a lightgrey rect that fills the whole svg to show it in the browser.
        return svg;
    }

    /**
     * @summary Creates and appends the line with the axis-titles in each end and a line in the middle
     * @param {number} yValue The yValue of the bar
     * @param {number} minimalValue The axis-title to the left, the smalles possible value for the data
     * @param {number} rangeWidth This is added to the minimalValue, and will be the axis-title to the right
     * @param {SVGElement} svg the svg element on which to append the bar
     * @param {string} title This is the title of the bar, e.g. the name of the subject
     */
    function createBar(yValue, minimalValue, rangeWidth, svg, title){
        // Create the etiquettes at the ends of the bar
        svg.appendChild(createText(svgLineSpace * 0.25, yValue + 6, minimalValue));
        svg.appendChild(createText(svgWidth - svgLineSpace + 10, yValue + 6, minimalValue + rangeWidth));
        // Create the horisontal line
        svg.appendChild(createLine(svgLineSpace, yValue, svgWidth - svgLineSpace));
        // Create the little line to indicate the midle of the line
        svg.appendChild(createLine(svgWidth / 2, yValue + 10, svgWidth / 2, yValue - 10, svgLineWidth / 1.5));
        // If defined, then make a title
        svg.appendChild(createText(svgWidth / 2, yValue - 15, title));
    }
    // --------------------------------------------------- SVG constructors -----------------------------------
    /**
     * @summary Creates and return a svg rectangle
     * @param {number} x the position of the x value of the rectangle
     * @param {number} y the position of the y value of the rectangle
     * @param {number} width the widthe of the rectangle
     * @param {number} height the height of the rectangle
     * @param {string} color the fill color of the rectangle, default: "grey"
     * @returns {SVGRectElement} A rectangle svg element with the width, height, color provided as arguments, starts in the x,y coordinates
     */
    function createRect(x, y, width, height, color = "lightgrey"){
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", color);
        return rect;
    }

    /**
     * @summary Creates and return a svg line
     * @param {number} x1 the x position of the start of the line
     * @param {number} y1 the y position of the start of the line
     * @param {number} x2 the x position of the end of the line
     * @param {number} y2 the y position of the end of the line, y1 by default
     * @param {number} width the width of the line, default is determined by the browser size
     * @returns {SVGLineElement} A line with the coordinates and with provided as arguments
     */
    function createLine(x1, y1, x2, y2 = y1, width = svgLineWidth){
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke-width", width);
        line.setAttribute("style", "stroke: black;");
        return line;
    }

    /**
     * @summary Creates and return a svg cicle
     * @param {number} cx the x position of the center of the circle
     * @param {number} cy the y position of the center of the circle
     * @param {color} color the color of the circle
     * @param {number} r the radius of the circle
     * @returns {SVGCircleElement} SVGCicleElement with the color and radius provided as arguments
     */
    function createCircle(cx, cy, color, r){
        const cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cir.setAttribute("cx", cx);
        cir.setAttribute("cy", cy);
        cir.setAttribute("r", r);
        cir.setAttribute("fill", color);
        return cir;
    }

    /**
     * @summary Creates and returns a svg text element
     * @param {number} x the x position of the center of the text
     * @param {number} y the y position of the center of the text
     * @param {string} text the text to be displayed
     * @param {string} fontSize the text to be displayed, default is determinded by svgLineSpace
     * @returns {SVGTextElement} SVGTextElement with the text given as argument
     */
    function createText(x, y, text, fontSize = svgTextSize){
        const textSvg = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textSvg.textContent = text;
        textSvg.setAttribute("x", x);
        textSvg.setAttribute("y", y);
        textSvg.setAttribute("font-size", fontSize);
        return textSvg;
    }
    // --------------------------------------------------- End of SVG constructors ----------------------------
    // --------------------------------------------------- Start of math functions only used for svg ----------
    /**
     * @summary calculates the x coordinate of the circle's center from the LearningStyleValue(from -11 to 11) to a x coordinate on the line
     * @param {number} value the value form which to calculate the x value of the circle
     * @param {number} rangeWidth the range of the value, like from -1 to 1 = 2, -11 to 11 = 22, etc.
     * @param {number} offset the offset of the value, to convert to percent, this is the maximum negative value
     * @returns {number} Returns the x coordinate of the circle
     */
    function circleXValue(value, rangeWidth, offset){
        let xPos = svgLineSpace; // add the ofset from the left of the svg (the lines start some length inside the grey) this is equal to the -11 position
        const percent = (value + Math.abs(offset)) / rangeWidth; // from -11 to 11, how many % is the position into the line? 0%=-11, 100%=11
        const lineLength = svgWidth - (2 * svgLineSpace); // the length of the line
        xPos += lineLength * percent; // how far into the line must the center of the circle be placed
        return xPos;
    }

    /**
     * @summary finds how many elements are close to each other and increases their size accordingly
     * @param {number[]} groupLSValues the input array, this contains the values of the learningStyles for a learningstyle of a group
     * @param {number} distance the maximum distance between the to elements
     * @returns {number[]} Returns an array with the radius(size) of the circles to be made, so alle the circles can be seen
     */
    function closeby(groupLSValues, distance){ // something is wrong in this function, but it still kinda works
        const resArr = new Array();
        for (const i in groupLSValues) {
            resArr[i] = 1;
            for (const j in groupLSValues) {
                // If they aren't the same person and their scores are close, the make the size of one of the circles larger, so it'll still be visible
                if (i !== j && range(groupLSValues[i], groupLSValues[j], distance)){
                    resArr[j]++;
                }
            }
        }
        // calc the circlesize in pixels by the size e.g. 1, 2, 3... depends on how many values are close to eachother
        return resArr.map((value) => 0.25 * svgLineSpace * Math.pow(value, 0.6));
    }

    /**
     * @summary Returns boolean whether the distance between a & b is smaller than 'distance'
     * @param {number} a the first number
     * @param {number} b the second number
     * @param {number} distance the maximum distance between the to elements
     * @returns {boolean} Returns boolean whether the distance between a & b is smaller than 'distance'
     */
    function range(a, b, distance){
        return (Math.abs(a - b) <= Math.abs(distance));
    }
}());