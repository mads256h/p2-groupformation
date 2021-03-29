document.addEventListener("DOMContentLoaded", () =>{
    let para = document.createElement("P");
    para.innerText = "Svg area is grey";
    document.body.appendChild(para);

    //Dette vil være main
    const RANGEWIDTH = 22;
    let svgWidth = window.innerWidth/2;
    let svgLineSpace = 20; // the amount of space between each line
    let svgHeight = 5*svgLineSpace;
    let svgElement = document.createElement("DIV");
    document.body.appendChild(svgElement);

    // create master svg element
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", svgWidth);
    svg1.setAttribute("height", svgHeight);
    svg1.appendChild(createRect(0, 0, svgWidth, svgHeight)); // create a lightgrey rect that fills the whole svg to show it in browser.


    // create a shape
    /*    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir1.setAttribute("cx", 50 );
    cir1.setAttribute("cy", 50 );
    cir1.setAttribute("r", 50);
    */

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "0");
    line.setAttribute("x2", "50");
    line.setAttribute("y2", "50");
    line.setAttribute("style", "stroke: black; stroke-width: 10px;");

    //    svg1.appendChild(rect);
    svg1.appendChild(line);
    //svg1.appendChild(cir1);

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
function createLine(x1, y1, x2, y2, width){
    if (width === undefined){
        width = 10;
    }
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke-width", width);
    //line.setAttribute("style", "stroke: black; stroke-width: 10px;");
    return line;
}

