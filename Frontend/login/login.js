const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email,
    password,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      userData,
    );

    document.getElementById("message").innerText = "Login Successful";

    console.log(response.data);
  } catch (error) {
    document.getElementById("message").innerText =
      error.response.data.message || "Login failed";
  }
});
