document.addEventListener('DOMContentLoaded', function () {
    const appointments = [
        { ref: '00012', expert: 'Dr.Koshalya', date: '2024/10/1', time: '9.00 am', details: 'Consultation with Dr. Koshalya' },
        { ref: '00013', expert: 'Mr.Vanigasena', date: '2024/10/1', time: '10.30 am', details: 'Meeting with Mr. Vanigasena' },
        { ref: '00014', expert: 'Ms.Kamali', date: '2024/10/1', time: '6.00 pm', details: 'Consultation with Ms. Kamali' },
        { ref: '00015', expert: 'Mr.Vanigasena', date: '2024/10/1', time: '5.30 pm', details: 'Discussion with Mr. Vanigasena' },
        { ref: '00016', expert: 'Mr.Vanigasena', date: '2024/10/1', time: '1.30 pm', details: 'Appointment with Mr. Vanigasena' },
        { ref: '00017', expert: 'Mr.Vanigasena', date: '2024/10/1', time: '2.00 pm', details: 'Consultation with Mr. Vanigasena' },
        { ref: '00018', expert: 'Dr.Koshalya', date: '2024/10/1', time: '11.00 am', details: 'Consultation with Dr. Koshalya' },
        { ref: '00019', expert: 'Dr.Koshalya', date: '2024/10/1', time: '7.30 pm', details: 'Evening Consultation with Dr. Koshalya' }
    ];

    const tableBody = document.querySelector('#appointments-table tbody');
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modal-details');
    const closeModalBtn = document.querySelector('.close');

    // Insert rows dynamically into the table
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${appointment.ref}</td>
            <td>${appointment.expert}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td><button class="details-btn" data-details="${appointment.details}">More Details</button></td>
        `;
        
        tableBody.appendChild(row);
    });

    // Show modal when "More Details" is clicked
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function () {
            const details = this.getAttribute('data-details');
            modalDetails.textContent = details;
            modal.style.display = 'block';
        });
    });

    // Close the modal
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
