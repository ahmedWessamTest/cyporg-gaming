// =============== events ===============
document.getElementById("logoutBtn").addEventListener("click", () => {
  userLogout();
});
// =============== functions ===============
(function () {
  const firstName = localStorage.getItem("userFirstName");
  const lastName = localStorage.getItem("userLastName");
  document.getElementById("userName").innerHTML = firstName + " " + lastName;
})();

function userLogout() {
  location.href = "./index.html";
  localStorage.removeItem("userFirstName");
  localStorage.removeItem("userLastName");
  localStorage.removeItem("userToken");
}
