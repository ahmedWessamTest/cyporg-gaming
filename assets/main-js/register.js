//  ============ global ============
const registerInputs = {
  firstName: document.getElementById("registerFirstName"),
  lastName: document.getElementById("registerLastName"),
  email: document.getElementById("registerEmail"),
  password: document.getElementById("registerPassword"),
  age: document.getElementById("registerAge"),
};
//  ============ events ============
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
registerInputs.firstName.addEventListener("input", () => {
  mainValidation(registerInputs.firstName);
});
registerInputs.lastName.addEventListener("input", () => {
  mainValidation(registerInputs.lastName);
});
registerInputs.email.addEventListener("input", (e) => {
  mainValidation(registerInputs.email);
});
registerInputs.password.addEventListener("input", () => {
  mainValidation(registerInputs.password);
});
registerInputs.age.addEventListener("input", () => {
  mainValidation(registerInputs.age);
});
document.getElementById("submitBtn").addEventListener("click", () => {
  submitRegistration();
  getRegisterAPI();
});
//  ============ functions ============
function mainValidation(input) {
  const regex = {
    registerFirstName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    registerLastName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    registerEmail:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    registerPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    registerAge: /^([1-7][0-9]|80)$/,
  };
  const text = input.value;
  if (regex[input.id].test(text)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
function submitRegistration() {
  if (
    mainValidation(registerInputs.firstName) &
    mainValidation(registerInputs.lastName) &
    mainValidation(registerInputs.email) &
    mainValidation(registerInputs.password) &
    mainValidation(registerInputs.age)
  ) {
    return true;
  } else {
    return false;
  }
}
async function getRegisterAPI() {
  const postData = {
    first_name: registerInputs.firstName.value,
    last_name: registerInputs.lastName.value,
    email: registerInputs.email.value,
    password: registerInputs.password.value,
    age: registerInputs.age.value,
  };
  if (submitRegistration()) {
    const api = await fetch("https://movies-api.routemisr.com/signup", {
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
    location.href = "./index.html";
  } else {
    document.getElementById("submitErrorMsg").innerHTML =
      apiResponse.errors?.email?.message;
  }
}