var   form_check = document.querySelector(".form-check");
var project_name = form_check.querySelector("[name=project-url]");
var clear = form_check.querySelector("button");

form_check.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("loaded ok");
  localStorage.setItem("project", project_name.value);
  console.log(project_name.value);  

});

window.addEventListener("load", function(event) {
  if(localStorage.getItem("project")) {
    project_name.value=localStorage.getItem("project");
  }
})

clear.addEventListener("click", function(event) {
  event.preventDefault();
  localStorage.clear();
  project_name.value = "";
});