const form = document.querySelector(".contact__form");
const formUserName = document.getElementById("name");
const formUserEmail = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!formUserName.validity.valid || !formUserEmail.validity.valid) {
    console.log("Not valid");
    //Add custom validation msg code here
    return;
  } else {
    try{
      console.log("It worked! Now sending form");
      const formData = new FormData(form); 
      const response = await fetch("https://zblzv92std.execute-api.ap-southeast-2.amazonaws.com/form-submission", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        mode: 'cors', 
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseJSON = await response.json();
      console.log(`${responseJSON.message}${response.status}`);

      if (!response.ok){
        throw new Error(`HTTP error. ${response.status}`);
      }

    } catch(error) {
      console.log(`Failed to submit form. Network error: ${error}`);
      //Add custom error msg here
    }

  }
})
