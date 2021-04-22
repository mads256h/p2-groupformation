(function () {
    const {
        me,
        mygroup,
        registerUpdateHandler,
        leavegroup
    } = window.commjs;
    document.addEventListener("DOMContentLoaded", () => {
        registerUpdateHandler(update);
        leavegroupButton();
    });

    function update(){
        me().then((res) => {
            showData(res.response);
            showNameOnSite(res.response);
            showWorkEnvironment(res.response);
            showSubject(res.response);
            mygroup().then((group) => {
                showGroup(group.response.students, res.response.name);
            });
        });
    }

    /**
     * 
     * @param {*} content 
     */
    function showData(content) {
        console.log(content);
    }

    /**
     * 
     * @param {*} content 
     */
    function showNameOnSite(content) {
        const username = document.getElementById("username");
        username.innerText = "Welcome, " + content.name;
    }

    /**
     * 
     * @param {*} content 
     */
    function showWorkEnvironment(content) {
        const work = content.criteria.workingAtHome;
        const workingEnvironmentDiv = document.getElementById("workFromHome");
        const workingEnvironment = document.createElement("p");
        clearChild(workingEnvironmentDiv);
        workingEnvironmentDiv.appendChild(workingEnvironment);
        workingEnvironment.innerText = workEnvironmentStringMaker(work);
    }

    /**
     * 
     * @param {*} work 
     * @returns 
     */
    function workEnvironmentStringMaker(work) {
        let place;
        switch (work) {
        case 0:
            place = "Work from home";
            break;

        case 1:
            place = "Don't care";
            break;

        case 2:
            place = "Work in office";
            break;
        }
        return place;
    }

    /**
     * 
     * @param {*} content 
     */
    function showSubject(content) {
        let subjectArray = content.criteria.subjectPreference.subjects.slice();
        const subjectList = document.createElement("ul");
        // subjectArray.score.sort((a, b) => {
        //     return a.value - b.value;
        // });
        const subjectDiv = document.getElementById("subjectPreference");
        clearChild(subjectDiv);
        for (const subject of subjectArray) {
            const subjectPart = createListItem(subject.name + ": " + subject.score.toFixed(2));
            subjectList.appendChild(subjectPart);
            subjectDiv.appendChild(subjectList);
        }
    }

    /**
     * 
     * @param {*} innerText 
     * @returns 
     */
    function createListItem(innerText) {
        const listItem = document.createElement("li");
        listItem.innerText = innerText;
        return listItem;
    }

    function showGroup(group, myName) {
        const groupMembersList = document.createElement("ul");
        const groupMemberDiv = document.getElementById("currentGroup");
        const paragraph = document.createElement("p");
        paragraph.innerText = "Your group members:";
        clearChild(groupMemberDiv);

        for (const member of group) {
            if (member.name !== myName){
                const memberName = createListItem(member.name);
                groupMembersList.appendChild(memberName);
            }
        }
        groupMemberDiv.appendChild(paragraph);
        groupMemberDiv.appendChild(groupMembersList);
    }

    function clearChild(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    function leavegroupButton(){
        const button = document.getElementById("leaveButton");
        button.addEventListener("click", ()=> {
            leavegroup();
        });
    }
}());