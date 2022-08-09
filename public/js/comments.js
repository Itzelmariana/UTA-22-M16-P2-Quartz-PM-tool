const commentForm = document.getElementById('customizedForm');
const commentContainer = document.getElementById('comment-container');

const createCard = (comment) => {
  // Create card
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'commentCards');
  cardEl.setAttribute('key', comment.comment_id);

  // Create card header
  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-20',
    'commentCardUser'
  );
  cardHeaderEl.innerHTML = `${comment.name} </br>`;

  // Create card body
  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('commentSection', 'p-2');
  cardBodyEl.innerHTML = `<p>${comment.comment}</p>`;

  // Append the header and body to the card element
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the comments container in the DOM
  commentContainer.appendChild(cardEl);
};

function getProjectId() {
  return document.querySelector('.projectId').getAttribute('project-id');
}

// Get a list of existing comments from the server
const getcomments = () => {
  const id = getProjectId();
  return fetch(`/api/comments/${id}`, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Post a new comment to the page
const postcomment = (comment) => {
  const id = getProjectId();

  return fetch(`/api/comments/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then(() => {
      createCard(comment);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// When the page loads, get all the comments
getcomments().then((data) => data.forEach((comment) => createCard(comment)));

const validatecomment = (newcomment) => {
  const { name, comment } = newcomment;

  // Object to hold our error messages until we are ready to return
  const errorState = {
    name: '',
    comment: '',
  };

  // Bool value if the username is valid
  const utest = name.length >= 4;
  if (!utest) {
    errorState.name = 'Invalid name!';
  }

  // Bool value to see if the tip being added is at least 15 characters long
  const commentContentCheck = comment.length > 15;
  if (!commentContentCheck) {
    errorState.comment = 'Tip must be at least 15 characters';
  }

  const result = {
    isValid: !!(utest && commentContentCheck),
    errors: errorState,
  };

  // Return result object with a isValid boolean and an errors object for any errors that may exist
  return result;
};

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();

  // Get the value of the comment and save it to a variable
  const commentContent = document.getElementById('commentText').value;

  // get the value of the username and save it to a variable
  const commentUsername = document
    .getElementById('commentUsername')
    .value.trim();

  // Create an object with the comment and username
  const newcomment = {
    name: commentUsername,
    comment: commentContent,
  };
  validatecomment(newcomment);
  postcomment(newcomment);
};

// Listen for when the form is submitted
document
  .querySelector('.addCommentBtn')
  .addEventListener('click', handleFormSubmit);
