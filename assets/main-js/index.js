//  ============ global ============
const loginInputs = {
  email: document.getElementById("loginEmail"),
  password: document.getElementById("loginPassword"),
};
//  ============ events ============
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
loginInputs.email.addEventListener("input", () => {
  mainValidation(loginInputs.email);
});
loginInputs.password.addEventListener("input", () => {
  mainValidation(loginInputs.password);
});
document.getElementById("submitBtn").addEventListener("click", () => {
  submitLogin();
  getLoginAPI();
});
//  ============ functions ============
function mainValidation(input) {
  const regex = {
    loginEmail:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    loginPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };
  const text = input.value;
  if (regex[input.id].test(text)) {
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    return false;
  }
}
function submitLogin() {
  if (
    mainValidation(loginInputs.email) & mainValidation(loginInputs.password)
  ) {
    return true;
  } else {
    return false;
  }
}
async function getLoginAPI() {
  const postData = {
    email: loginInputs.email.value,
    password: loginInputs.password.value,
  };
  if (submitLogin()) {
    const api = await fetch("https://movies-api.routemisr.com/signin", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const apiResponse = await api.json();
    checkEmail(apiResponse);
  }
}
function checkEmail(apiResponse) {
  if (apiResponse.message == "success") {
    location.href = "./home.html";
    localStorage.setItem("userToken", apiResponse.token);
    localStorage.setItem("userFirstName", apiResponse.user.first_name);
    localStorage.setItem("userLastName", apiResponse.user.last_name);
  } else {
    document.getElementById("submitErrorMsg").innerHTML =
      "incorrect Email or Password";
  }
}
