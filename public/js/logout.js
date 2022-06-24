

const logout = async (event) => {
  event.preventDefault()
  console.log('I hear you')
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};




document.querySelector('#logout').addEventListener('click', logout);

   

