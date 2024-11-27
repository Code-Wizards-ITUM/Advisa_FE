// Array to hold dynamic data
const dashboardData = {
    experts: 25,
    types: 5,
    users: 95,
    appointments: 15,
    blogs: 10,
    revenue: "$0.00"
};

// Function to load data into the dashboard
function loadDashboard() {
    document.getElementById('experts').innerHTML = `
        <h3>Total No of Experts in the System</h3>
        <p>${dashboardData.experts}</p>
    `;
    
    document.getElementById('types').innerHTML = `
        <h3>Total Types of Experts</h3>
        <p>${dashboardData.types}</p>
    `;
    
    document.getElementById('users').innerHTML = `
        <h3>Total No of Users in the System</h3>
        <p>${dashboardData.users}</p>
    `;
    
    document.getElementById('appointments').innerHTML = `
        <h3>No of Appointments (Month)</h3>
        <p>${dashboardData.appointments}</p>
    `;
    
    document.getElementById('blogs').innerHTML = `
        <h3>Total No of Blogs Uploaded (Month)</h3>
        <p>${dashboardData.blogs}</p>
    `;
    
    document.getElementById('revenue').innerHTML = `
        <h3>Total Revenue (Month)</h3>
        <p>${dashboardData.revenue}</p>
    `;
}

// Placeholder function for generating reports
function generateReport() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    alert(`Generating report from ${startDate} to ${endDate}`);
}

// Load the dashboard when the page is ready
window.onload = loadDashboard;
