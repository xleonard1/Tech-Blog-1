const editPost = async (event) => {
    event.preventDefault();
    let blogId = event.target.getAttribute('data-id');
    console.log(blogId)
    const editedTitle = document.querySelector('#edited-name').value.trim()
    const editedDescription = document.querySelector('#edited-description').value.trim();
    const editedText =  document.querySelector('#edited-text').value.trim();

  if (blogId, editedTitle, editedDescription, editedText) {
    const response = await fetch(`/edit/${blogId}/`, {
      method: 'PUT',
      body: JSON.stringify(
        {
          title: editedTitle,
          description: editedDescription,
          blog_text: editedText,
        }
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert('Failed to post comment');
    }
  }
}

// open the modal to edit the blog post

var modal = document.getElementById("editModal");

// Get the button that opens the modal
var btn = document.getElementById("edit-button");

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











// delete the post
const delPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  


  document
  .querySelector('#post-button')
  .addEventListener('click', delPostHandler);

  document
  .querySelector('.edit-blog-btn')
  .addEventListener('click', editPost);