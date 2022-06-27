
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

const deleteComment = async (event) => {
  event.preventDefault();
 const commentId = event.target.getAttribute('data-id');

 console.log(commentId)
  if (commentId) {
    console.log('hell yeah')
    const response = await fetch(`/api/blogs/${commentId}/comments`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete project');
    }
  }
}

document
  .querySelector('#post-comment-button')
  .addEventListener('click', newCommentHandler)


document
   .querySelector('#delete-button')
   .addEventListener('click', deleteComment)

// open up new blog post modal
