
const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log(event.target.getAttribute('data-id'))

  const message = document.querySelector('#message').value.trim();
  const blogId =  event.target.getAttribute('data-id');

  if (message ) {


    const response = await fetch(`/api/blogs/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ 
        message
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload()
    } else {
      alert('Failed to post comment');
    }
  }
};

document
  .querySelector('#post-button')
  .addEventListener('click', newCommentHandler)

// open up new blog post modal
