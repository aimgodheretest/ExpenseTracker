const form = document.getElementById("forgotPasswordForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const res = await axios.post(
      "http://localhost:3000/password/forgotpassword",
      { email },
    );

    alert(res.data.message);
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
});
