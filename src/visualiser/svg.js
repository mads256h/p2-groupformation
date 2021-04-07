/**
 * @description SVG functions.
 * @author henneboy
 */
// Inspired by: https://www.w3.org/TR/2011/REC-SVG11-20110816/shapes.html#CircleElement

(function(){
    window.svg = {visualiseGroup};
    // Declaration of global consts, which are layout settings of the svg
    const RANGEWIDTH = 22;
    const svgWidth = window.innerWidth / 2; // width of the svg is half the browser size
    const svgLineSpace = svgWidth * 0.04; // the amount of space between each line, by the width of the svg
    const svgLineWidth = svgWidth * 0.01;
    const svgTextSize = svgLineSpace * 0.5;
    const svgHeight = 2 * 4 * svgLineSpace; // height of the svg, 4 lines, double linespace between lines, +2 for top&bottom
    const colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
    const learningStyles = 4; // antal læringsstile

    // This function is run after the html is loaded ->run on buttonclick
    document.addEventListener("DOMContentLoaded", () =>{
        // use data from file instead:
        let arr2d = [[-11,5,6,3], [-11,6,6,3.1], [-11,2.5,2.5,3.2], [-10.5,3,3,3.3], [4,3.1,6,3.5]]; // test array med læringsstile, first idx is student, second idx is learningsstyle
        // run in a forloop:
        visualiseGroup(arr2d, "0");
    });

    /**
     * @summary Creates and appends a div element with and id to the body of the html-doc, and runs and appends the result of createGroupSvg to this div
     * @param {Array} groupArray the group array with students
     * @param {number} divID the id of the div, this could be the position of the group in the groupformation array, this id should be unique
     * @param {element} masterDiv the id of the div, this could be the position of the group in the groupformation array, this id should be unique
     */
    function visualiseGroup(groupArray, divID, masterDiv){
        // create a div element for this group
        let svgDiv = document.createElement("DIV");
        svgDiv.setAttribute("id", divID);
        // attach the master svg to the element on page
        masterDiv.appendChild(svgDiv);
        // create and append the group svg element to the groups svgDiv
        svgDiv.appendChild(createGroupSvg(svgWidth, svgHeight, groupArray));
    }

    /**
     * @summary Creates and appends a div element with and id to the body of the html-doc, and runs and appends the result of createGroupSvg to this div
     * @param {number} width the width of the svg element
     * @param {number} height the height of the svg element
     * @param {Array} groupArray the group array with students
     * @returns {Element} rectangle svg element?
     */
    function createGroupSvg(width, height, groupArray){
        const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg1.setAttribute("width", width);
        svg1.setAttribute("height", height);
        svg1.appendChild(createRect(0, 0, width, height)); // create a lightgrey rect that fills the whole svg to show it in browser.
        let yValue = svgLineSpace;
        for (let LearnStyle = 1; LearnStyle <= learningStyles; LearnStyle++) {
            // Create the -11 and 11 text
            svg1.appendChild(createText(svgLineSpace * 0.25, yValue + 6, "-11"));
            svg1.appendChild(createText(width - svgLineSpace, yValue + 6, "11"));

            // Create the horisontal lines
            svg1.appendChild(createLine(svgLineSpace, yValue, width - svgLineSpace));

            // Create the circles
            let arrCircleSize = closeby(arrayBySecondIndex(groupArray, LearnStyle));
            for (let student = 0; student < groupArray.length; student++) {
                // Create & append one circle by the info:
                svg1.appendChild(createCircle(circleXValue(groupArray[student][LearnStyle - 1]), yValue, colorArr[student], arrCircleSize[student]));
                arrCircleSize[groupArray[student][LearnStyle - 1]]--;
            }
            arrCircleSize.length = 0;
            yValue += 2 * svgLineSpace;
        }
        return svg1;
    }
    // --------------------------------------------------- SVG constructors -----------------------------------
    /**
     * @summary Creates and return a svg rectangle
     * @param {number} x the position of the x value of the rectangle
     * @param {number} y the position of the y value of the rectangle
     * @param {number} width the widthe of the rectangle
     * @param {number} height the height of the rectangle
     * @param {string} color the fill color of the rectangle, default: "grey"
     * @returns {Element} rectangle svg element?
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
     * @returns {Element} line svg element?
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
     * @returns {Element} circle svg element?
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
     * @returns {Element} text svg element?
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
    /**
     * @summary calculates the x coordinate of the circle's center from the LearningStyleValue(from -11 to 11) to a x coordinate on the line
     * @param {number} LSvalue the LearningStyleValue form which to calculate the x value of the circle
     * @returns {number} Returns the x coordinate of the circle
     */
    function circleXValue(LSvalue){
        let xPos = svgLineSpace; // add the ofset from the left of the svg (the lines start some length inside the grey) this is equal to the -11 position
        let percent = (LSvalue + 11) / RANGEWIDTH; // from -11 to 11, how many % is the position into the line? 0%=-11, 100%=11
        let lineLength = svgWidth - (2 * svgLineSpace); // the length of the line
        xPos += lineLength * percent; // how far into the line must the center of the circle be placed
        return xPos;
    }

    /**
     * @summary finds how many elements are close to each other and increases their size accordingly
     * @param {Array} arrCircleSize the input array, this contains
     * @returns {Array} Returns an array with the radius(size) of the circles to be made, so alle the circles can be seen
     */
    function closeby(arrCircleSize){ // something is wrong in this function, but it still kinda works, derfor console.log
        let A = new Array();
        for (let i = 0; i < arrCircleSize.length; i++) {
            A[i] = 0;
            for (let j = i; j < arrCircleSize.length; j++) {
                if (i !== j){
                    if (range(arrCircleSize[i], arrCircleSize[j])){
                        A[i]++;
                        A[j]++;
                    }
                }
            }
            A[i]++; // add sig selv, så kan vi gange med det, ellers ganger vi med 0 og så kommer der problemer
        }
        // calc the circlesize in pixels by the size e.g. 1, 2, 3... depends on how many values are close to eachother
        A.forEach((size, idx, arr) => {
            arr[idx] = 0.25 * svgLineSpace * Math.pow(size, 0.6);
        });
        return A;
    }
    /**
     * @summary Returns boolean whether the distance between a & b is smaller than 'afstand'
     * @param {number} a the first number
     * @param {number} b the second number
     * @returns {boolean} Returns boolean whether the distance between a & b is smaller than 'afstand'
     */
    function range(a, b){
        let afstand = 0.5;
        if (Math.abs(a - b) <= Math.abs(afstand)){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @summary Creates and return a new array by the second index e.g.: A[[1,2],[3,4]] with idx=1 becomes [2,4]
     * @param {Array} arr the array from which to create the sub-array
     * @param {number} idx the index to use as second index
     * @returns {Array} return an array
     */
    function arrayBySecondIndex(arr, idx){
        let resArray = new Array();
        for (let q = 0; q < arr.length; q++) {
            resArray[q] = arr[q][idx - 1];
        }
        return resArray;
    }
}());