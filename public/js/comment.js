
const newCommentHandler = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#msg').value.trim();
 


  if (message) {
    console.log(message)
    const response = await fetch(`/comments`, {
      method: 'POST',
      body: JSON.stringify({ 
        message: message
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('comment-form')
  .addEventListener('submit', newCommentHandler)

// open up new blog post modal
