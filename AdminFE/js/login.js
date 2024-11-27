
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    if (!phoneNumber || !password) {
        alert('Please enter both phone number and password');
        return;
    }

    login(phoneNumber, password);
});

async function login(phoneNumber, password) {
    const url = `${API_BASE_URL}login`;

    const data = { phoneNumber: phoneNumber, password: password };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status); 
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Internal Server Error');
            } else if (response.status === 401) {
                throw new Error('Invalid Username or Password');
            }
            throw new Error(`Error: ${response.message}`);
        }

        const result = await response.json();

        if (result.token) {
            localStorage.setItem('jwtToken', result.token);
            localStorage.setItem('phoneNumber',result.phoneNumber); 
            localStorage.setItem('userType',result.userType); 

            alert(result.message);

            window.location.href = 'home.html';

        } else {
            throw new Error('Token not found in response');
        }

    } catch (error) {
        alert(`Error occurred during login: ${error.message}`);
    }
}
