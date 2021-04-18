(function(){
    /**
     * @description This file contains functions that create the following html elements: tableheaders, tablerows, details and listitem
     */
    window.HTMLElements = {createTableHeader, createTableRow, createDetailsElement, createListItem};

    /**
     * @summary Creates the html table header, only the first parameter is used in calls
     * @param {string[]} header The innertext of the headers
     * @returns {HTMLTableRowElement} return a html row element with the table header
     */
    function createTableHeader(...header){
        const tr = document.createElement("tr");
        for (const headCell of header) {
            tr.appendChild(createTableTh(headCell));
        }
        return tr;
    }
    /**
     * @summary Creates the html table header, only the first parameter is used in calls
     * @param {string[]} row The innertext of the headers
     * @returns {HTMLTableRowElement} return a html row element with the table header
     */
    function createTableRow(...row){
        const tr = document.createElement("tr");
        for (const cell of row) {
            tr.appendChild(createTableTd(cell));
        }
        return tr;
    }
    /**
     * @summary Creates a html table headercell element
     * @param {string} text the name of the headercell
     * @returns {HTMLTableHeaderCellElement} returns a html table header cell element
     */
    function createTableTh(text){
        const th = document.createElement("th");
        th.innerText = text;
        return th;
    }
    /**
     * @summary Makes a table cell
     * @param {string} value The innertext of the cell
     * @returns {HTMLTableCellElement} returns a html table cell
     */
    function createTableTd(value){
        const td = document.createElement("td");
        td.innerText = value;
        return td;
    }
    /**
     * @summary Creates a html details element from the parameters
     * @param {string} summary The innertext of the summary of the details element
     * @param {string} detailsName The name of the details element (only visible in developer tool)
     * @param {boolean} open Whether the details element shoud start open, false if not defined
     * @returns {HTMLElement} return a html details element with a summary element
     */
    function createDetailsElement(summary, detailsName, open = false){
        const detailsElement = document.createElement("details");
        const summaryElement = document.createElement("summary");
        summaryElement.innerText = summary;
        if (open !== false){
            detailsElement.setAttribute("open", 1);
        }
        detailsElement.appendChild(summaryElement);
        detailsElement.setAttribute("name", detailsName);
        return detailsElement;
    }
    /**
     * @summary Creates a html listItem
     * @param {string} innerText The innertext of the list item element
     * @returns {HTMLElement} returns a html list item element
     */
    function createListItem(innerText){
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        return listItem;
    }
}());