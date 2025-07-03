function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) {
    alert('Username already exists');
    return;
  }
  users[username] = { password, tasks: [] };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful');
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (!users[username] || users[username].password !== password) {
    alert('Invalid credentials');
    return;
  }
  currentUser = username;
  document.getElementById('task-section').style.display = 'block';
  document.getElementById('welcome-user').innerText = currentUser;
  loadTasks();
}

function addTask() {
  const taskText = document.getElementById('task-input').value;
  const users = JSON.parse(localStorage.getItem('users'));
  users[currentUser].tasks.push({ text: taskText, completed: false });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('task-input').value = '';
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const users = JSON.parse(localStorage.getItem('users'));
  users[currentUser].tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerText = task.text + (task.completed ? ' ✅' : '');
    li.onclick = () => {
      users[currentUser].tasks[index].completed = !task.completed;
      localStorage.setItem('users', JSON.stringify(users));
      loadTasks();
    };
    taskList.appendChild(li);
  });
}
