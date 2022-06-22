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

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);

