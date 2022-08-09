const updateButtonHandler = async (event) => {
  console.log(event);
  if (event.target.hasAttribute('modif-id')) {
    const id = event.target.getAttribute('modif-id');
    const name = document.getElementById(`projectName-${id}`).innerText;
    const status = document.getElementById(`project-status-${id}`).value;
    const description = document.getElementById(
      `projectDescription-${id}`
    ).innerText;
    const deadline = document.getElementById(`project-deadline-${id}`).value;
    const priority = document.getElementById(`project-priority-${id}`).value;
    const budget = document.getElementById(`projectBudget-${id}`).innerText;

    const response = await fetch(`/projects/${id}`, {
      method: 'PUT',
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
      document.location.replace('/projects');
    } else {
      alert('Failed to update project');
    }
  }
};

document
  .querySelectorAll('.updateBtn')
  .forEach((el) => el.addEventListener('click', updateButtonHandler));
