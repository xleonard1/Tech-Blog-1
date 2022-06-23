let avatar = '';

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-description').value.trim();
  const blogText = document.querySelector('#blog-text').value.trim();


  if (title && description  && blogText) {
    console.log(title, description, blogText)
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ 
        title: title, 
        description: description, 
        blog_text: blogText, 
        avatar: avatar
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};


// open up new blog post modal


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};


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



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);

