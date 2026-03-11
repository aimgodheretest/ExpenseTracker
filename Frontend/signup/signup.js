const form = document.getElementById("signupForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    name,
    email,
    password,
  };

  console.log(userData);

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/signup",
      userData,
    );

    alert(response.data.message);
    console.log(response.data);
  } catch (error) {
    alert(`User with same email is already exists`);
  }
});
