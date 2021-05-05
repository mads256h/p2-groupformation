(function() {
    /**
     * @summary Remove all children of a element
     * @param {HTMLElement} element The element where the children will be removed
     */
    function clearChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    /**
     * @summary Creates a li element with an innerText
     * @param {string} innerText A string
     * @returns {HTMLLIElement} Returns a html li element with the string sat as innerText
     */
    function createListItem(innerText) {
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        return listItem;
    }
    window.utiljs = {clearChildren, createListItem};
}());