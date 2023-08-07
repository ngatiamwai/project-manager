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

function viewProjects() {
    document.getElementById("projectsSection").style.display = "block";
    document.getElementById("profileSection").style.display = "none";

    axios
      .get(
        `http://localhost:5000/user/f06615ac-6fe4-43cc-8f5a-833f7d671f6a}`,

        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "token":localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      
      })
      .catch((e) => {
        console.log(e);
      });

}
function editProfile() {
    document.getElementById("projectsSection").style.display = "none";
    document.getElementById("profileSection").style.display = "block";

    const updateForm=document.querySelector('.updateForm')
    const updateUsername = document.querySelector(".updateUsername");
const updateEmail = document.querySelector(".updateEmail");
const updatePhone = document.querySelector(".updatePhone");

const updatePassword = document.querySelector(".updatePassword");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(profileurl);
  
    axios
      .put(
        `http://localhost:5000/user/update/${localStorage.getItem('userId')}`,

        {
          userName: updateUsername.value,
          userEmail: updateEmail.value,
          userPassword: updatePassword.value,
          userPhone: updatePhone.value,
        },

        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "token":localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

}

