import Task from './components/task';

const TASKS = [];
let inputValue = '';

window.onload = () => {
  const app = document.getElementById('app');
  const input = document.getElementById('task__input');
  const pinnedTasksList = document.getElementById('task__pinned');
  const allTasksList = document.getElementById('task__all');

  input.addEventListener('keyup', inputKeyHandler);
  app.addEventListener('click', appClickHandler);

  draw(inputValue);

  function appClickHandler(evt) {
    console.log(evt.target);
    const { target } = evt;
    if (target.type === 'checkbox') {
      const li = target.closest('li');
      const { id } = li.dataset;
      console.log('id', id);
      const activeTask = TASKS.find((task) => task.id === +id);
      console.log('activeTask', activeTask);
      activeTask.pinned = target.checked;

      draw(inputValue);
      filteredDraw(inputValue);
    }
  }

  function inputKeyHandler(evt) {
    const { key } = evt;
    inputValue = evt.target.value;

    if (key === 'Enter') {
      console.log('ENTER', inputValue);
      addTask(inputValue);
      draw(inputValue);
      input.value = '';
    } else {
      console.log('INPUT', inputValue);
      filteredDraw(inputValue);
    }
  }

  function addTask(text) {
    const task = new Task({ text, id: new Date().getTime() });
    TASKS.push(task);
    console.log(TASKS);
  }

  function filteredDraw(value) {
    allTasksList.innerHTML = '';
    const FILTERED = TASKS.filter((item) => {
      return (
        !item.pinned && item.text.toLowerCase().startsWith(value.toLowerCase())
      );
    });
    if (FILTERED.length > 0) {
      FILTERED.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.id = task.id;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.pinned;
        li.appendChild(checkbox);
        allTasksList.appendChild(li);
      });
    } else {
      allTasksList.innerHTML = 'no tasks';
    }
  }

  function draw(val) {
    input.value = val;
    allTasksList.innerHTML = '';
    pinnedTasksList.innerHTML = '';
    const ALL_FILTERED = TASKS.filter((item) => !item.pinned);
    if (ALL_FILTERED.length > 0) {
      ALL_FILTERED.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.id = task.id;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.pinned;
        li.appendChild(checkbox);
        allTasksList.appendChild(li);
      });
    } else {
      allTasksList.innerHTML = 'no tasks';
    }
    const PIN_FILTERED = TASKS.filter((item) => item.pinned);
    if (PIN_FILTERED.length > 0) {
      PIN_FILTERED.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.id = task.id;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.pinned;
        li.appendChild(checkbox);
        pinnedTasksList.appendChild(li);
      });
    } else {
      pinnedTasksList.innerHTML = 'no tasks';
    }
  }
};
