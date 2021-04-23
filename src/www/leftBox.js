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
            showData(res);
            showNameOnSite(res);
            showWorkEnvironment(res);
            showSubject(res);
            mygroup().then((group) => {
                showGroup(group, res.name);
            }).catch((e)=>{
                console.log(e);
            });
        }).catch((e)=>{
            console.log(e);
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
        const paragraph = document.createElement("h3");
        paragraph.innerText = "Your prefered place to work:";

        clearChild(workingEnvironmentDiv);

        workingEnvironmentDiv.appendChild(paragraph);
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
        const subjectDiv = document.getElementById("subjectPreference");
        const paragraph = document.createElement("h3");
        paragraph.innerText = "Your subject preferences:";

        clearChild(subjectDiv);
        subjectDiv.appendChild(paragraph);

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
        const paragraph = document.createElement("h3");
        paragraph.innerText = "Your group " + group.name + ":";
        clearChild(groupMemberDiv);
        console.log(group.name);
        for (const member of group.students) {
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
            leavegroup().catch((e)=>{
                console.log(e);
            });
        });
    }
}());