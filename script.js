const form = document.querySelector(".contact__form");
const formUserName = document.getElementById("name");
const formUserEmail = document.getElementById("email");
const formStatus = document.querySelector(".contact__status");
const formButton = document.querySelector(".contact__button");
const setStatus = (msg) => { if (formStatus) formStatus.textContent = msg; };

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!formUserName.validity.valid || !formUserEmail.validity.valid) {
    setStatus("Please add your name and a valid email address.");
    return;
  } else {
    try{
      setStatus("Sending…");
      formButton.disabled = true;
      const formData = new FormData(form); 
      const response = await fetch("https://9qewdyubjj.execute-api.ap-southeast-2.amazonaws.com/form-submission", {
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
      form.reset();
      setStatus("Thanks, your message has been sent. I'll get back to you soon.");

    } catch(error) {
      console.log(`Failed to submit form. Network error: ${error}`);
      setStatus("Sorry, something went wrong. Please email me at jie.kang@sydney.edu.au instead.");
    } finally {
      formButton.disabled = false;
    }

  }
})
