document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("passwordError");
    const savedDataEl = document.getElementById("savedData");
  
    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      savedDataEl.textContent = JSON.stringify(savedData, null, 2);
    }
  
    // Age validation function
    function validateDOB(dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age >= 18 && age <= 55;
    }
  
    // Form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Validate DOB
      if (!validateDOB(dobInput.value)) {
        dobError.textContent = "Age must be between 18 and 55 years.";
        return;
      } else {
        dobError.textContent = "";
      }
  
      // Validate Password
      if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.textContent = "Passwords do not match!";
        return;
      } else {
        passwordError.textContent = "";
      }
  
      // Collect form data
      const userData = {
        fullname: form.fullname.value,
        email: form.email.value,
        dob: form.dob.value,
        password: form.password.value,
      };
  
      // Save data to localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
  
      // Show saved data
      savedDataEl.textContent = JSON.stringify(userData, null, 2);
  
      alert("Registration Successful! Data saved.");
      form.reset();
    });
  });
  