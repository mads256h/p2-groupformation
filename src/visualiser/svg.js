const RANGEWIDTH = 22;
let svgWidth = window.innerWidth/2;
let svgLineSpace = svgWidth*0.05; // the amount of space between each line
let svgHeight = 5*svgLineSpace;

document.addEventListener("DOMContentLoaded", () =>{
    console.log("TEST");
    let para = document.createElement("P");
    para.innerText = "Svg area is grey";
    document.body.appendChild(para);

    let colorArr = ["blue", "green", "red", "yellow", "lime", "orange", "magenta", "brown", "pink", "cyan", "purple", "hotpink", "chartreuse"];
    let learningStyles = 4; //array med læringsstile
    let arr2d =[[-11,5,6,7], [-11,6,7,11], [2,2,2,2], [3,3,3,3], [4,4,4,4]]; //array med læringsstile
    //Dette vil være main
    //let svgOfset = 25;
    let svgOfset = svgLineSpace;
    let svgElement = document.createElement("DIV");
    document.body.appendChild(svgElement);

    // create master svg element
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", svgWidth);
    svg1.setAttribute("height", svgHeight);
    svg1.appendChild(createRect(0, 0, svgWidth, svgHeight)); // create a lightgrey rect that fills the whole svg to show it in browser.
    for (let i = 1; i <= learningStyles; i++) {
        svg1.appendChild(createLine(svgOfset, svgLineSpace*i, svgWidth-svgOfset));
        svg1.appendChild(createCircle(svgOfset, svgLineSpace*i));
        for (let j = 0; j < arr2d.length; j++) {
            svg1.appendChild(createCircle(cirXVal(arr2d[j][i-1]), svgLineSpace*i, colorArr[j]));
        }
    }
    //svg1.appendChild(createLine(0, 10, svgWidth)); // create a lightgrey rect that fills the whole svg to show it in browser.

    // attach the master svg to the element on page
    svgElement.appendChild(svg1);
    //document.getElementById("someSVG").appendChild(svg1);


});

/**
 * @summary Creates and return a svg rectangle
 * @param {number} x the position of the x value of the rectangle
 * @param {number} y the position of the y value of the rectangle
 * @param {number} width the widthe of the rectangle
 * @param {number} height the height of the rectangle
 * @param {string} color the fill color of the rectangle, e.g.: "grey"
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
 * @param {number} width the widthe of the rectangle
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
 * @summary Creates and return a svg circle which is hollow
 * @param {number} cx the x position of the center of the circle
 * @param {number} cy the y position of the center of the circle
 * @param {color} color the color of the circle
 * @returns {Element} circle svg element?
 */
function createHollowCircle(cx, cy, r, color = "cyan", width=window.innerWidth*0.01){
    const cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("cx", cx);
    cir.setAttribute("cy", cy);
    cir.setAttribute("r", r);
    //cir.setAttribute("fill", color);
    cir.setAttribute("stroke-width", width);
    cir.setAttribute("stroke", color);
    cir.setAttribute("fill", "none");
    /*cir.setAttribute("fill", "none");
    cir.setAttribute("stroke", "red"); */
    return cir;
}

function cirXVal(value){
    let x = (window.innerWidth/2)*0.05; //add the ofset from the left of the svg (the lines start some length inside the grey)
    x+=((window.innerWidth/2)-(2*(window.innerWidth/2)*0.05))*((value+11)/RANGEWIDTH);
    console.log(x);
    return x;
}

let arr = [1, 1, 4, 5, 6, 7, 8];
hyppig(arr);
function hyppig(arr){
    let arrHyp;
    for (let i = 0; i < arr.length; i++){
        if (arrHyp[arr[i]] === undefined){
            arrHyp[arr[i]] = 1;
        }
        else {
            arrHyp[arr[i]]++;
        }
    }
}