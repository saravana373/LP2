let currentUser = null;

function showError(msg) {
  document.getElementById('error-message').innerText = msg;
}

function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (!username || !password || !confirmPassword) {
    showError("All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  if (users[username]) {
    showError("Username already exists.");
    return;
  }

  users[username] = { password, tasks: [] };
  localStorage.setItem('users', JSON.stringify(users));
  alert("Signup successful. Please log in.");
  toggleForm();
}

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (!users[username] || users[username].password !== password) {
    showError("Invalid credentials.");
    return;
  }

  currentUser = username;
  document.getElementById('welcome-user').innerText = currentUser;
  document.querySelector('.container').style.display = 'none';
  document.getElementById('task-section').style.display = 'block';
  loadTasks();
}

function toggleForm() {
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('form-title').innerText = "Login";
  document.getElementById('error-message').innerText = "";
}

function addTask() {
  const taskText = document.getElementById('task-input').value.trim();
  if (!taskText) return;

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
