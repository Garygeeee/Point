// 模拟用户数据存储
let users = {};

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

// 当前登录用户
let currentUser = null;

// 登录功能
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

// 注册功能
registerButton.addEventListener('click', () => {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  if (users[username]) {
    registerMessage.textContent = '用户名已存在！';
  } else {
    users[username] = { username, password, points: 0, lastCheckin: null };
    registerMessage.textContent = '注册成功！';
  }
});

// 显示仪表盘
function showDashboard() {
  document.getElementById('auth').style.display = 'none';
  dashboard.style.display = 'block';
  usernameDisplay.textContent = currentUser.username;
  pointsDisplay.textContent = currentUser.points;
}

// 每日签到功能
checkinButton.addEventListener('click', () => {
  const today = new Date().toDateString();
  if (currentUser.lastCheckin === today) {
    checkinMessage.textContent = '今天已经签到过了！';
  } else {
    const points = getRandomPoints();
    currentUser.points += points;
    currentUser.lastCheckin = today;
    pointsDisplay.textContent = currentUser.points;
    checkinMessage.textContent = `签到成功，获得 ${points} 积分！`;
  }
});

// 随机生成积分
function getRandomPoints() {
  const points = Math.floor(Math.random() * 50) + 1;
  const probability = 1 / (points / 4.5);
  return Math.random() < probability ? points : getRandomPoints();
}