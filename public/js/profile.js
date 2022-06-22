



const iframe = document.querySelector('#iframeID')

window.addEventListener('message', async function (e) {
  points = e.data;
})

// const newFormHandler = async () => {
//   const name = document.querySelector('.real-name').value.trim();

   
//     if (name) {
//       const response = await fetch(`/api/games`, {
//         method: 'POST',
//         body: JSON.stringify({ username, name, avatar}),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile')
//       } else {
//         alert('Failed to create project');
//       }
//     }
// };

   
  

if(iframe) {
    window.addEventListener('message', function (e) {
    
      data = e.data;
      console.log(data)
      return data.json
      })
}


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


document
.querySelector('.startGame-btn')
.addEventListener('click', function(event) {
  event.preventDefault()
})


// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
