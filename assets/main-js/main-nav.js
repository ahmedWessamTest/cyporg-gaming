// ============== events ==============
document.getElementById("mainNav").style.cssText = `
transition: 1s transform;
`;
document.querySelector(".menu-trigger").addEventListener("click", (element) => {
  document.getElementById("mainNav").classList.toggle("active");
  element.target.classList.toggle("active");
});

document.querySelectorAll("#mainNav button").forEach((e)=>{
  e.addEventListener('click',()=>{
    document.getElementById("mainNav").classList.remove("active");
    document.querySelector(".menu-trigger").classList.remove("active");
  })
})
