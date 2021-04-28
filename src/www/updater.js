const {
    me,
    mygroup,
    rankedgroups,
    registerUpdateHandler
} = window.commjs;

const {updateMyInfo} = window.myInfo;
const {updateCandidateList} = window.candidateList;

let running = true;

function updateSite(){
    if (running){
        const promises = [me(), mygroup(), rankedgroups()];
        Promise.all(promises)
            .then((results) =>{
                const [meRes, mygroupRes, rankedgroupsRes] = results;
                updateMyInfo(meRes, mygroupRes);
                updateCandidateList(mygroupRes, rankedgroupsRes);
            })
            .catch((e) => {
                console.error(e);
                alert("Der skete en fejl! Venligst forsøg at logge ind igen. \n Fejl: " + e.message);
                running = false;
            });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    registerUpdateHandler(updateSite);
});
