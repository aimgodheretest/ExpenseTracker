const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = { email, password };

  const message = document.getElementById("message");

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      userData,
    );

    message.innerText = "Login Successful";
    message.style.color = "green";

    localStorage.setItem("token", response.data.token);
    
    window.location.href = "../expenses/expenses.html";
  } catch (error) {
    message.innerText = error.response?.data?.message || "Login failed";
    message.style.color = "red";
  }
});
