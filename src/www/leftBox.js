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
      const workingEnvironmentDiv = document.getElementById("homogenousCriteria");
      const workingEnvironment = document.createElement("p");
      workingEnvironment.innerText = "Work " + work;
      workingEnvironmentDiv.appendChild(workingEnvironment);
    }
}());