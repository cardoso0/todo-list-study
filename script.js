const formTask = document.querySelector('#formTask');
const inputTask = document.querySelector('#inputTask');
const ul = document.querySelector('ul');
const erro = document.querySelector('.error')

const resetForm = (event) => {
  event.target.reset();
};

const validatedInput = () => {
  let regexp = new RegExp(/^[a-zA-Z\u00C0-\u00FF ]*$/)
  let result = regexp.test(inputTask.value)
  return result
}

const renderingTasks = () => {
  const inputValue = inputTask.value;
  const li = `
    <li data-todo="${inputValue}" class="taskContainer">
      <input type="checkbox" id="checkTask" data-check="${inputValue}">
      <span data-item="${inputValue}">${inputValue}</span>
      <button data-trash="${inputValue}">🗑️</button>
    </li>
  `
  if (inputValue.trim().length) {
    ul.innerHTML += li
  }
};

const finishedTask = (clickedElement, event) => {
  const checkDataValue = clickedElement.dataset.check;
  let input = document.querySelector(`[data-todo="${checkDataValue}"]`);
  let checked = event.target.checked

  if (input && checked) {
    input.classList.add('finalizado')
  } else if (input && !checked) {
    input.classList.remove('finalizado');
  }

};

const deleteTask = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash;
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`);

  if (todo) {
    todo.remove();
  }
};

ul.addEventListener('click', (event) => {
  const clickedElement = event.target;

  finishedTask(clickedElement, event);
  deleteTask(clickedElement);
});

formTask.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validatedInput()) {
    erro.classList.remove('off')
  } else {
    renderingTasks();
    erro.classList.add('off')
  }

  resetForm(event);
});
