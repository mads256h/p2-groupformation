//Inspired by: https://www.w3.org/TR/2011/REC-SVG11-20110816/shapes.html#CircleElement
const RANGEWIDTH = 22;
let svgWidth = window.innerWidth/2;
let svgLineSpace = svgWidth*0.05; // the amount of space between each line
let svgHeight = 5*svgLineSpace*1.5;

document.addEventListener("DOMContentLoaded", () =>{
    console.log("TEST");
    let para = document.createElement("P");
    para.innerText = "Svg area is grey";
    document.body.appendChild(para);

    let colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
    let learningStyles = 4; // antal læringsstile
    let arr2d =[[-11,5,6,3], [-11,6,6,3.1], [-11,2.5,2.5,3.2], [-10.5,3,3,3.3], [4,3.1,6,3.5]]; //test array med læringsstile
    let arrCircleSize = new Array();

    let svgElement = document.createElement("DIV");
    document.body.appendChild(svgElement);

    // create master svg element with width=half of the screen
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", svgWidth);
    svg1.setAttribute("height", svgHeight);
    svg1.appendChild(createRect(0, 0, svgWidth, svgHeight)); // create a lightgrey rect that fills the whole svg to show it in browser.

    for (let i = 1; i <= learningStyles; i++) {
        svg1.appendChild(createText(svgLineSpace*0.25, svgLineSpace*i*1.5+6, "-11", svgLineSpace*0.5));
        // Create the horisontal lines
        svg1.appendChild(createLine(svgLineSpace, svgLineSpace*i*1.5, svgWidth-svgLineSpace));
        //Create the circles
        arrCircleSize = closeby(arrayBySecondIndex(arr2d, i));
        for (let j = 0; j < arr2d.length; j++) {
            svg1.appendChild(createCircle(cirXVal(arr2d[j][i-1]), svgLineSpace*i*1.5, colorArr[j], window.innerWidth*0.008*Math.pow(arrCircleSize[j], 0.6)));
            arrCircleSize[arr2d[j][i-1]]--;
        }
        arrCircleSize.length=0;
        svg1.appendChild(createText(svgWidth-svgLineSpace, svgLineSpace*i*1.5+6, "11", svgLineSpace*0.5));
    }

    // attach the master svg to the element on page
    svgElement.appendChild(svg1);
});

/**
 * @summary Creates and return a svg rectangle
 * @param {number} x the position of the x value of the rectangle
 * @param {number} y the position of the y value of the rectangle
 * @param {number} width the widthe of the rectangle
 * @param {number} height the height of the rectangle
 * @param {string} color the fill color of the rectangle, default: "grey"
 * @returns {Element} rectangle svg element?
 */
function createRect(x, y, width, height, color){
    if (color === undefined){
        color = "lightgrey";
    }
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
 * @param {number} y2 the y position of the end of the line
 * @param {number} width the width of the line
 * @returns {Element} line svg element?
 */
function createLine(x1, y1, x2, y2=y1, width=window.innerWidth*0.005){
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
function createCircle(cx, cy, color = "cyan", r=window.innerWidth*0.01,){
    const cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", cx);
    cir.setAttribute("cy", cy);
    cir.setAttribute("r", r);
    cir.setAttribute("fill", color);
    return cir;
}

/**
 * @summary Creates and return a svg circle
 * @param {number} cx the x position of the center of the circle
 * @param {number} cy the y position of the center of the circle
 * @param {color} color the color of the circle
 * @param {number} r the radius of the circle
 * @returns {Element} circle svg element?
 */
function createHollowCircle(cx, cy, color = "cyan", r=window.innerWidth*0.01,){
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
 * @param {ntring} text the text to be displayed
 * @returns {element} text svg element?
 */
function createText(x, y, text, fontSize=20){
    const textSvg = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textSvg.setAttribute("x", x);
    textSvg.setAttribute("y", y);
    textSvg.textContent = text;
    textSvg.setAttribute("font-size", fontSize);
    return textSvg;
}

function cirXVal(value){
    let x = svgLineSpace; //add the ofset from the left of the svg (the lines start some length inside the grey)
    x+=((window.innerWidth/2)-(2*svgLineSpace))*((value+11)/RANGEWIDTH);
    return x;
}

function closeby(arrCircleSize){ //something is wrong in this function, but it still kinda works, derfor console.log
    let A = new Array();
    console.log("A input: ");
    console.log(...arrCircleSize);
    for (let i = 0; i < arrCircleSize.length; i++) {
        A[i]=0;
        for (let j = i; j < arrCircleSize.length; j++) {
            if (i!==j){
                if (range(arrCircleSize[i], arrCircleSize[j])){
                    A[i]++;
                    A[j]++;
                }
            }
        }
        A[i]++; //add sig selv, så kan vi gange med det, ellers ganger vi med 0 og så kommer der problemer
    }
    console.log("A output: ");
    console.log(...arrCircleSize);
    console.log("A: ");
    console.log(...A);
    return A;
}

function range(a, b){
    let afstand = 0.5;
    if (Math.abs(a-b) <= Math.abs(afstand)){
        console.log("True:" + a + " " + b);
        return true;
    }
    else{
        return false;
    }
}

/**
 * @summary Creates and return an array by the second index e.g.: A[[1,2],[3,4]] with idx=1 becomes [2,4]
 * @param {Array} arr the array from which to create the sub-array
 * @param {number} idx the index to use as second index
 * @returns {Array} return an array
 */
function arrayBySecondIndex(arr, idx){
    let resArray = new Array();
    for (let q = 0; q < arr.length; q++) {
        resArray[q]=arr[q][idx-1];
    }
    return resArray;
}
