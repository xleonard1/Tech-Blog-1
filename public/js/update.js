
let avatar = '';

let button = document.querySelector('#update-button')
console.log(button)

const profileFormHandler = async (event) => {
    event.preventDefault();
    console.log('i heard you')
    const userId = event.target.getAttribute('data-id')
  console.log(userId)
    const username = document.querySelector('#account-fn').value.trim();
    const password = document.querySelector('#account-pass').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify({ userId, username,avatar,password}),
        headers: { 'Content-Type': 'application.json' },
      });
  
      if (response.ok) {
        // document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };



  // widget code

const cloudName = "dcldpb9uf"; // replace with your own cloud name
const uploadPreset = "qxxprkel"; // replace with your own upload preset
let uploadWidget = document.querySelector("#upload_widget")


const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    sources: [
        "local",
        "url",
        "camera",
        "image_search",
        "google_drive",
        "facebook",
        "dropbox",
        "instagram",
        "shutterstock",
        "getty",
        "istock",
        "unsplash"
    ]
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      avatar = result.info.secure_url
      // document
      //   .getElementById("uploadedimage")
      //   .setAttribute("src", result.info.secure_url);
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    myWidget.open();
  },
  false
);


document
  .querySelector('#update-button')
  .addEventListener('click', profileFormHandler)

