let Experts = [];

const authToken = localStorage.getItem("jwtToken");
const profileModal = document.getElementById("profileModal");

function loadConsultantRequests() {
  const container = document.getElementById("consultantRequests");
  container.innerHTML = "";
  Experts.forEach((consultant, index) => {
    const consultantCard = document.createElement("div");
    consultantCard.innerHTML = `<div class="request-item">
                <div class="profile">
                    <img src="../images/userIcon.png" alt="Profile Picture" class="profile-img">
                    <div class="profile-info">
                        <p>${consultant.name}</p>
                        <p class="neutralist">${consultant.category}</p>
                    </div>
                </div>
                <div class="actions">
                    <button onclick =viewDetails(${index}) class="view-details"> View Details</button>
                    <button onclick =approveConsultant(${index}) class="approve">Approve</button>
                    <button onclick =rejectConsultant(${index}) class="reject">Reject</button>
                </div>
            </div>`;
    container.appendChild(consultantCard);
  });
}

function closeModal() {
  profileModal.style.display = "none";
}

function viewDetails(index) {
  // onclick = "closeModal()";
  const src = API_BASE_URL + "uploads/" + Experts[index].verifiDocument;
  profileModal.innerHTML = "";
  profileModal.innerHTML = ` <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div class="profile-container">
        <img src="../images/userIcon.png" alt="Profile Image" class="profile-image">
        <h2>${Experts[index].name}</h2>
        <div class="profile-details">
          <p><strong>Email:</strong> ${Experts[index].email}</p>
          <p><strong>Category:</strong> ${Experts[index].category}</p>
          <p><strong>Phone Number:</strong> ${Experts[index].phoneNumber}</p>
          <p><strong>Bio</strong><br> ${Experts[index].bio}</p>
        </div>
        <a href="${src}" class="verification-link" target="_blank">Click to view verification document</a>
      </div>
    </div>`;
  //   alert(`Viewing details for ${Experts[index].name}`);
  profileModal.style.display = "block";
}

async function approveConsultant(index) {
  try {
    const data = { phoneNumber: Experts[index].phoneNumber };
    const response = await fetch(`${API_BASE_URL}admin/approveExpert`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      } else if (response.status === 401) {
        throw new Error("Bad Request - Please check your input");
      }
      throw new Error(`Error: ${response.message}`);
    }

    const result = await response.json();
    Experts.splice(index, 1);
    alert(result.message);
    loadConsultantRequests();
  } catch (error) {
    console.error(error);
  }
}

async function rejectConsultant(index) {
  try {
    const data = { phoneNumber: Experts[index].phoneNumber };
    const response = await fetch(`${API_BASE_URL}admin/rejectExpert`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      } else if (response.status === 401) {
        throw new Error("Bad Request - Please check your input");
      }
      throw new Error(`Error: ${response.message}`);
    }

    const result = await response.json();
    Experts.splice(index, 1);
    alert(result.message);
    loadConsultantRequests();
  } catch (error) {
    console.error(error);
  }
}

async function fetchExpertRequessts() {
  try {
    const response = await fetch(`${API_BASE_URL}admin/getPendingExperts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const responseData = await response.json();
    const data = responseData.data;
    if (data.length > 0) {
      Experts = "";
      Experts = data;
      loadConsultantRequests();
    } else {
      alert("No New Requests!");
    }
  } catch (error) {
    alert("Error fetching new requests");
    console.log("Error fetching new requests", error);
  }
}

window.onclick = function (event) {
  if (event.target === profileModal) {
    event.stopPropagation();
  }
};

fetchExpertRequessts();
