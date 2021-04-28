(function() {
    const {invitegroup} = window.commjs;

    window.addEventListener("DOMContentLoaded", () => {

    });

    /**
     * @summary updates all dynamic html elements of the page
     * @param {object} mygroupRes this students group
     * @param {object} rankedgroupsRes this students list of candidates
     */
    function updateCandidateList(mygroupRes, rankedgroupsRes) {
        const sortedGroup = rankedgroupsRes.sort((a, b) => b.value - a.value);
        const table = document.getElementById("candidatesTable");
        updateCandidateTable(table, sortedGroup, mygroupRes);
    }

    /**
     * @summary Updates candidate table to new candidate list and group
     * @param {string} table table HTML element to update
     * @param {object[]} candidateList Sorted array of candidates
     * @param {object} thisGroup The groups whose candidates this is
     */
    function updateCandidateTable(table, candidateList, thisGroup) {
        clearTable(table);
        table.appendChild(createCandidateTableHeader());
        for (const candidate of candidateList) {
            table.appendChild(createCandidateRow(candidate, thisGroup));
        }
    }

    /**
     * @summary creates a candidate table row HTML element and returns it
     * @param {object} candidate the candidate to create the row of
     * @param {object} thisGroup the group who has this candidate
     * @returns {string} the candidate row HTML element
     */
    function createCandidateRow(candidate, thisGroup) {
        const tableRow = document.createElement("TR");
        tableRow.appendChild(createGroupColumn(candidate.group));
        tableRow.appendChild(createScoreColumn(candidate.value));
        tableRow.appendChild(createInvColumn(candidate.group, thisGroup));
        return tableRow;
    }
    /**
     * @summary creates a candidate table column HTML element and returns it
     * @param {object} group the group to represent
     * @returns {string} the candidate table column HTML element
     */
    function createGroupColumn(group) {
        const groupColumn = document.createElement("TD");
        groupColumn.appendChild(createGroupStudentList(group));
        return groupColumn;
    }

    /**
     * @summary Removes all child elements from HTML table
     * @param {string} table table HTML element to clear
     */
    function clearTable(table) {
        while (table.lastChild) {
            table.removeChild(table.lastChild);
        }
    }

    /**
     * @summary creates the candidate table header HTML element and returns it
     * @returns {string} HTML element representing table header
     */
    function createCandidateTableHeader() {
        const tableRow = document.createElement("TR");
        tableRow.appendChild(document.createElement("TH")).textContent = "Group Name";
        tableRow.appendChild(document.createElement("TH")).textContent = "Score";
        tableRow.appendChild(document.createElement("TH")).textContent = "Invitation status";
        return tableRow;
    }

    /**
     * @summary creates HTML element representing a group, with a drop down for the students
     * @param {object} group the group to create element over
     * @returns {string} HTML element representing group
     */
    function createGroupStudentList(group) {
        const groupElement = document.createElement("details");

        const summary = document.createElement("summary");
        summary.innerText = group.name;
        groupElement.appendChild(summary);

        const nameList = document.createElement("ul");
        for (const student of group.students) {
            nameList.appendChild(createListItem(student.name));
        }
        groupElement.appendChild(nameList);

        return groupElement;
    }

    /**
     * @summary Creates and returns list item HTML element with given text
     * @param {string} innerText text content of list item
     * @returns {string} HTML element representing list item
     */
    function createListItem(innerText) {
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        return listItem;
    }

    /**
     * @summary creates table column HTML element representing score for a candidate
     * @param {number} score the score of the group
     * @returns {string} HTML element representing score item
     */
    function createScoreColumn(score) {
        const scoreColumn = document.createElement("TD");
        scoreColumn.textContent = score.toFixed(2);
        return scoreColumn;
    }

    /**
     * @summary creates table column HTML element representing invite button and status
     * @param {object} group the group that the invitation points to
     * @param {object} thisGroup the group that the invitation points from
     * @returns {object} invite button table column html element
     */
    function createInvColumn(group, thisGroup) {
        const invColumn = document.createElement("TD");
        invColumn.appendChild(createButton(group, thisGroup));
        return invColumn;
    }

    /**
     * @summary creates invite button with correct status
     * @param {object} group the group that the invitation points to
     * @param {object} thisGroup the group that the invitation points from
     * @returns {object} invite button HTML element with correct status
     */
    function createButton(group, thisGroup) {
        const button = document.createElement("button");
        button.innerText = "Invite";
        if (group.isInvited) {
            button.style.backgroundColor = "lightgreen";
        }
        else if (thisGroup.invitations.includes(group.id)) {
            button.style.backgroundColor = "yellow";
        }
        button.addEventListener("click", () =>
            invitegroup(group)
                .catch((e) => {
                    console.error(e);
                    alert("Invitation failed! \n Error: " + e.message);
                }));
        return button;
    }

    window.candidateList = {updateCandidateList};
}());
