const {
    me,
    mygroup,
    rankedgroups,
    registerUpdateHandler
} = window.commjs;

const {updateMyInfo} = window.myInfo;
const {updateCandidateList} = window.candidateList;

let running = true;
/**
 * @summary gets data from server and updates the clients site accordingly
 */
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
                alert("An error occured! Please try logging in again. \n Error: " + e.message);
                running = false;
            });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    registerUpdateHandler(updateSite);
});
