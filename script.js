// 从 localStorage 加载用户数据
let users = JSON.parse(localStorage.getItem('users')) || {};

// 获取 DOM 元素
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const dashboard = document.getElementById('dashboard');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const checkinButton = document.getElementById('checkinButton');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');
const checkinMessage = document.getElementById('checkinMessage');
const usernameDisplay = document.getElementById('username');
const pointsDisplay = document.getElementById('points');
const adminView = document.getElementById('adminView');
const showUsersButton = document.getElementById('showUsersButton');
const userList = document.getElementById('userList');

let currentUser = null;

// 手动添加管理员账户（如果不存在）
if (!users['Admin']) {
  users['Admin'] = { username: 'Admin', password: 'admin123', points: 0, lastCheckin: null };
  localStorage.setItem('users', JSON.stringify(users));
}

// 登录逻辑
loginButton.addEventListener('click', () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (users[username] && users[username].password === password) {
    currentUser = users[username];
    loginMessage.textContent = '登录成功！';
    showDashboard();
  } else {
    loginMessage.textContent = '用户名或密码错误！';
  }
});

// 注册逻辑
registerButton.addEventListener('click', () => {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  if (!username.startsWith('Yo') && !username.startsWith('Ga')) {
    registerMessage.textContent = '我们不是一波的，你不能注册！';
    return;
  }

  if (password.length < 3) {
    registerMessage.textContent = '密码长度不得小于 3 位！';
    return;
  }

  if (users[username]) {
    registerMessage.textContent = '用户名已存在！';
  } else {
    users[username] = { username, password, points: 0, lastCheckin: null };
    localStorage.setItem('users', JSON.stringify(users));
    registerMessage.textContent = '注册成功！';
  }
});

// 显示仪表盘
function showDashboard() {
  document.getElementById('auth').style.display = 'none';
  dashboard.style.display = 'block';
  usernameDisplay.textContent = currentUser.username;
  pointsDisplay.textContent = currentUser.points;

  // 如果是管理员，显示管理员视图
  if (currentUser.username.startsWith('Admin')) {
    adminView.style.display = 'block';
  }
}

// 每日签到逻辑
checkinButton.addEventListener('click', () => {
  const today = new Date().toDateString();
  if (currentUser.lastCheckin === today) {
    checkinMessage.textContent = '今天已经签到过了！';
  } else {
    const points = getRandomPoints();
    currentUser.points += points; // 累加积分
    currentUser.lastCheckin = today;
    pointsDisplay.textContent = currentUser.points;
    checkinMessage.textContent = `签到成功，获得 ${points} 积分！`;
    localStorage.setItem('users', JSON.stringify(users));
  }
});

// 显示所有用户
showUsersButton.addEventListener('click', () => {
  userList.innerHTML = ''; // 清空列表
  for (const username in users) {
    const user = users[username];
    const li = document.createElement('li');
    li.textContent = `${user.username}: ${user.points} 积分`;
    userList.appendChild(li);
  }
});

// 随机生成积分
function getRandomPoints() {
  const points = Math.floor(Math.random() * 50) + 1;
  const probability = 1 / (points / 4.5);
  return Math.random() < probability ? points : getRandomPoints();
}