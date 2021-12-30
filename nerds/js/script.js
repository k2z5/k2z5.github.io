var fb = document.querySelector(".map-btn");
var form = document.querySelector(".feedback");
var cls = form.querySelector(".close");
var nickname = form.querySelector("[name=name]");
var email = form.querySelector("[name=email]");
var letter = form.querySelector("[name=text]");
var storage_name = localStorage.getItem("name");
var storage_email = localStorage.getItem("email");
var goo = document.querySelector(".map-modal-js");
var mp = document.querySelector(".map-marker");
var clsm = goo.querySelector(".close");


fb.addEventListener("click", function(event) {
  event.preventDefault();
  form.classList.add("modal-show");
  if (storage_name) {
    nickname.value = storage_name;
    if (storage_email) {
      email.value = storage_email;
      letter.focus();
    } else {
      email.focus();
    }
  } else {
    nickname.focus();
  }
  
});

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    if (form.classList.contains("modal-show")) {
      form.classList.remove("modal-show");
    } else 
    if (goo.classList.contains("modal-show")) {
      goo.classList.remove("modal-show");
    }  
  }
});

cls.addEventListener("click", function(event) {
  event.preventDefault();
  form.classList.remove("modal-show");
  form.classList.remove("modal-error");  
});
clsm.addEventListener("click", function(event) {
  event.preventDefault();
  goo.classList.remove("modal-show");
  goo.classList.remove("modal-error");  
});


form.addEventListener("submit", function(event) {
  console.log("submit");
  if (!nickname.value || !email.value || !text.value) {
    event.preventDefault();
    form.classList.remove("modal-error");
    form.offsetWidth = form.offsetWidth;
    form.classList.add("modal-error");
  } else {
    localStorage.setItem("name", nickname.value);
    localStorage.setItem("email", email.value);
  }
});

mp.addEventListener("click", function(event) {
  console.log("map");
  event.preventDefault();
  goo.classList.add("modal-show");  
});
