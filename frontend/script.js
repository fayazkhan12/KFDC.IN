document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await res.json();
    document.getElementById('message').textContent = data.message;
  
    if (res.ok) {
      document.getElementById('message').style.color = 'green';
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 1000);
    }
  });
  