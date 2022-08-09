const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const budget = document.querySelector('#project-budget').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
  const status = document.querySelector('#project-status').value.trim();
  const deadline = document.querySelector('#project-deadline').value.trim();
  const priority = document.querySelector('#project-priority').value.trim();

  if (name && budget && description && status && deadline && priority) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        budget,
        description,
        status,
        deadline,
        priority,
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
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelectorAll('.project-list')
  .forEach((el) => el.addEventListener('click', delButtonHandler));
