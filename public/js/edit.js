const editPost = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        const response = await fetch(`/post/${id}`, {
          method: 'PUT',
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to edit post');
        }
      }
}

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
  .querySelector('#edit-button')
  .addEventListener('click', editPost);