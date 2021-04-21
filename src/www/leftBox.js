//im so sorry
(function() {
  const {
    me
  } = window.commjs;
    document.addEventListener("DOMContentLoaded", ()=>{
    const learningStyleDiv = document.getElementById("learningStyles");
    const login = me().then((res)=>{
      showData(res.response);
      showNameOnSite(res.response);
      showWorkEnvironment(res.response);
      showSubject(res.response);
    });
    });
    function showData(content){
      console.log(content);
    }
    function showNameOnSite(content){
      const username = document.getElementById("username");
      username.innerText = "Welcome, " + content.name;
    }
    function showWorkEnvironment(content){
      const work = content.criteria.workingAtHome;
      const workingEnvironmentDiv = document.getElementById("workFromHome");
      const workingEnvironment = document.createElement("p");
      workingEnvironmentDiv.appendChild(workingEnvironment);
      workingEnvironment.innerText = workEnvironmentStringMaker(work);
    }
}());

function workEnvironmentStringMaker(work){
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

function showSubject(){
    return 1;
}