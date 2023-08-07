const signupForm = document.getElementById("signupForm");

// HANDLE REGISTRATION

const userName = document.querySelector(".userName");
const userEmail = document.querySelector(".userEmail");
const userPhone = document.querySelector(".userPhone");
// const txtprofile = document.querySelector('.txtprofile')
const userPassword = document.querySelector(".userPassword");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(profileurl);
  let user =
    userName.value !== "" &&
    userEmail.value !== "" &&
    userPassword.value !== "" &&
    userPhone.value !== "";

  if (user) {
    axios
      .post(
        "http://localhost:5000/user/register",

        {
          userName: userName.value,
          userEmail: userEmail.value,
          userPassword: userPassword.value,
          userPhone: userPhone.value,
        },

        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = "./login.html";
      })
      .catch((e) => {
        console.log(e);
      });
  }
});

