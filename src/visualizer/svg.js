/**
 * @description SVG functions.
 * @author henneboy
 */
// Inspired by: https://www.w3.org/TR/2011/REC-SVG11-20110816/shapes.html#CircleElement
const {getstudentByStudentName,
    getLSValuesOfGroupNameAsKey,
    getStudentIdxInGroupByStudentName
} = window.objectMath;
(function(){
    window.svg = {createGroupSvg};
    // Declaration of global consts, which are layout settings of the svg
    const svgWidth = window.innerWidth / 2; // width of the svg is half the browser size
    const svgLineSpace = svgWidth * 0.04; // the amount of space between each line, by the width of the svg
    const svgLineWidth = svgWidth * 0.01;
    const svgTextSize = svgLineSpace * 0.5;
    const RANGEWIDTH = 22;


    /**
     * @summary Creates and appends a div element with the svg of the learningstyles
     * @param {Array} group the group array with students
     * @returns {HTMLElement} Html element with the graphical info of the group from the argument
     */
    function createGroupSvg(group){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const learningStyles = [];
        for (let learningStyle in group.students[0].criteria.learningStyles) {
            learningStyles.push(learningStyle);
        }
        const svgHeight = 2  * svgLineSpace * learningStyles.length;
        svg.setAttribute("width", svgWidth);
        svg.setAttribute("height", svgHeight);
        svg.appendChild(createRect(0, 0, svgWidth, svgHeight)); // create a lightgrey rect that fills the whole svg to show it in browser.
        let yValue = svgLineSpace;
        for (const learningStyle of learningStyles) {
            createLearningStyleDimension(group, learningStyle, svg, yValue);
            yValue += 2 * svgLineSpace;
        }
        return svg;
    }

    /**
     * @summary Creates and appends a svg learningstyle to the svg element
     * @param {Array} group the group array with students
     * @param {number} learnStyleName the index of the learningstyle (used for linespaceing)
     * @param {SVGElement} svg svg element on which we append the svg for a learningstyle
     * @param {number} yValue the yValue of this bar and the circles
     */
    function createLearningStyleDimension(group, learnStyleName, svg, yValue){
        const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
        createBar(yValue, -11, RANGEWIDTH, svg);

        // Create the circles
        let arrCircleSize = closeby(getLSValuesOfGroupNameAsKey(group, learnStyleName));
        for (const [studentName, circleRadius] of Object.entries(arrCircleSize)) {
            const student = getstudentByStudentName(group, studentName);
            const xValue = circleXValue(student.criteria.learningStyles[learnStyleName]);
            const studentColor = colorArr[getStudentIdxInGroupByStudentName(group, studentName)];
            svg.appendChild(createCircle(xValue, yValue, studentColor, circleRadius));
        }
    }

    /**
     * @summary Creates and appends the line with the axis-titles in each end and a line in the middle
     * @param {number} yValue The yValue of the bar
     * @param {number} minimalValue The axis-title to the left, the smalles possible value for the data
     * @param {number} totalRange This is added to the minimalValue, and will be the axis-title to the right
     * @param {SVGElement} svg the svg element on which to append the bar
     */
    function createBar(yValue, minimalValue, totalRange, svg){
        // Create the -11 and 11 text
        svg.appendChild(createText(svgLineSpace * 0.25, yValue + 6, minimalValue));
        svg.appendChild(createText(svgWidth - svgLineSpace, yValue + 6, minimalValue + totalRange));
        // Create the horisontal lines
        svg.appendChild(createLine(svgLineSpace, yValue, svgWidth - svgLineSpace));
        // Create the little line to indicate the midle of the line
        svg.appendChild(createLine(svgWidth / 2, yValue + 10, svgWidth / 2, yValue - 10, svgLineWidth / 1.5));
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
        textSvg.setAttribute("x", x);
        textSvg.setAttribute("y", y);
        textSvg.textContent = text;
        textSvg.setAttribute("font-size", fontSize);
        return textSvg;
    }
    // --------------------------------------------------- End of SVG constructors ----------------------------
    // --------------------------------------------------- Start of math functions only used for svg ----------
    /**
     * @summary calculates the x coordinate of the circle's center from the LearningStyleValue(from -11 to 11) to a x coordinate on the line
     * @param {number} learnStyleNameValue the LearningStyleValue form which to calculate the x value of the circle
     * @returns {number} Returns the x coordinate of the circle
     */
    function circleXValue(learnStyleNameValue){
        let xPos = svgLineSpace; // add the ofset from the left of the svg (the lines start some length inside the grey) this is equal to the -11 position
        let percent = (learnStyleNameValue + 11) / RANGEWIDTH; // from -11 to 11, how many % is the position into the line? 0%=-11, 100%=11
        let lineLength = svgWidth - (2 * svgLineSpace); // the length of the line
        xPos += lineLength * percent; // how far into the line must the center of the circle be placed
        return xPos;
    }

    /**
     * @summary finds how many elements are close to each other and increases their size accordingly
     * @param {Array} arrCircleSize the input array, this contains
     * @returns {Array} Returns an array with the radius(size) of the circles to be made, so alle the circles can be seen
     */
    function closeby(arrCircleSize){ // something is wrong in this function, but it still kinda works
        const resArr = new Array();
        for (const [student1Name, lsValue1] of Object.entries(arrCircleSize)) {
            resArr[student1Name] = 1;
            for (const [student2Name, lsValue2] of Object.entries(arrCircleSize)) {
                // If they aren't the same person and their scores are close, the make the size of one of the circles larger, so it'll still be visible
                if (student1Name !== student2Name && range(lsValue1, lsValue2)){
                    resArr[student2Name]++;
                }
            }
        }
        // calc the circlesize in pixels by the size e.g. 1, 2, 3... depends on how many values are close to eachother
        for (const [studentName, circleSize] of Object.entries(resArr)){
            resArr[studentName] = 0.25 * svgLineSpace * Math.pow(circleSize, 0.6);
        }
        return resArr;
    }

    /**
     * @summary Returns boolean whether the distance between a & b is smaller than 'distance'
     * @param {number} a the first number
     * @param {number} b the second number
     * @returns {boolean} Returns boolean whether the distance between a & b is smaller than 'distance'
     */
    function range(a, b){
        const distance = 0.5;
        return Math.abs(a - b) <= Math.abs(distance);
    }
}());