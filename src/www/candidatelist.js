(function() {
    const {invitegroup} = window.commjs;
    const {clearChildren, createListItem} = window.utiljs;

    /**
     * @summary updates all dynamic html elements of the page
     * @param {object} mygroupRes this students group
     * @param {object} rankedgroupsRes this students list of candidates
     */
    function updateCandidateList(mygroupRes, rankedgroupsRes) {
        const sortedGroups = rankedgroupsRes.sort((a, b) => b.value - a.value);
        const table = document.getElementById("candidatesTable");
        updateCandidateTable(table, sortedGroups, mygroupRes);
    }

    /**
     * @summary Updates candidate table to new candidate list and group
     * @param {HTMLTableElement} table table HTML element to update
     * @param {object[]} candidateList Sorted array of candidates
     * @param {object} thisGroup The groups whose candidates this is
     */
    function updateCandidateTable(table, candidateList, thisGroup) {
        clearChildren(table);
        table.appendChild(createCandidateTableHeader());
        for (const candidate of candidateList) {
            table.appendChild(createCandidateRow(candidate, thisGroup));
        }
    }

    /**
     * @summary creates a candidate table row HTML element and returns it
     * @param {object} candidate the candidate to create the row of
     * @param {object} thisGroup the group who has this candidate
     * @returns {HTMLTableRowElement} the candidate row HTML element
     */
    function createCandidateRow(candidate, thisGroup) {
        const tableRow = document.createElement("TR");
        tableRow.appendChild(createGroupDataCell(candidate.group));
        tableRow.appendChild(createScoreDataCell(candidate.value));
        tableRow.appendChild(createInvDataCell(candidate.group, thisGroup));
        return tableRow;
    }
    /**
     * @summary creates a candidate table data cell HTML element and returns it
     * @param {object} group the group to represent
     * @returns {HTMLTableCellElement} the candidate table dataCell HTML element
     */
    function createGroupDataCell(group) {
        const groupDataCell = document.createElement("TD");
        groupDataCell.appendChild(createGroupStudentList(group));
        return groupDataCell;
    }

    /**
     * @summary creates the candidate table header HTML element and returns it
     * @returns {HTMLTableRowElement} HTML element representing table header
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
     * @returns {HTMLDetailsElement} HTML element representing group
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
     * @summary creates table data cell HTML element representing score for a candidate
     * @param {number} score the score of the group
     * @returns {HTMLTableCellElement} HTML element representing score item
     */
    function createScoreDataCell(score) {
        const scoreDataCell = document.createElement("TD");
        scoreDataCell.textContent = score.toFixed(2);
        return scoreDataCell;
    }

    /**
     * @summary creates table dataCell HTML element representing invite button and status
     * @param {object} group the group that the invitation points to
     * @param {object} thisGroup the group that the invitation points from
     * @returns {HTMLTableCellElement} invite button table dataCell html element
     */
    function createInvDataCell(group, thisGroup) {
        const invDataCell = document.createElement("TD");
        invDataCell.appendChild(createButton(group, thisGroup));
        return invDataCell;
    }

    /**
     * @summary creates invite button with correct status
     * @param {object} group the group that the invitation points to
     * @param {object} thisGroup the group that the invitation points from
     * @returns {HTMLButtonElement} invite button HTML element with correct status
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
