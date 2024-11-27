
const modal = document.getElementById("blogModal");
const modalContent = document.getElementById("modal-details");
const closeModal = document.getElementsByClassName("close")[0];
const authToken = localStorage.getItem("jwtToken");

let BLOGS = [];

async function fetchBlogs() {
  try {
    const response = await fetch(`${API_BASE_URL}admin/getRemovedBlogs`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const responseData = await response.json();
    const blogData = responseData.data;
    if (blogData.length > 0) {
      BLOGS = [];
      BLOGS = blogData;
      loadBlogs(BLOGS);
    } else {
      alert("No blogs");
    }
  } catch (error) {
    console.log("Error fetching blogs", error);
  }
}

fetchBlogs();

function loadBlogs(blogArray) {
  const blogLoadingContainer = document.getElementById("blogLoadingContainer");
  blogLoadingContainer.innerHTML = "";
  blogArray.forEach((blog, index) => {
    let src = `${API_BASE_URL}uploads/${blog.blogImage}`;
    const ele = document.createElement("div");
    ele.innerHTML = `<div class="blog-post" id=${blog.id}>
        <img src='${src}' alt="">
        <h2>${blog.title}</h2>
        <p>${blog.author}</p>
        <!-- Footer for the buttons -->
        <footer class="blog-footer">
          <button onClick="readMore(${index})" class="read-more-btn" >Read More</button>
          <button onClick="restoreBlog(${index})" class="remove-btn">Restore</button>
        </footer>
      </div>`;
    blogLoadingContainer.appendChild(ele);
  });
}

function readMore(index) {
  const blog = BLOGS[index];
  let src = API_BASE_URL + "uploads/" + blog.blogImage;
  modalContent.innerHTML = `<div class="blog-post" id=${blog.id}>
          <img src='${src}' alt="Khao Sok National Park">
          <h2>${blog.title}</h2>
          <p>${blog.content}</p>
          <footer class="blog-footer">
            <p>${blog.author}</p>
            <p>${blog.date}</p>
          </footer>
        </div>`;
  modal.style.display = "block";
}

async function restoreBlog(index) {
  try {
    const blog = BLOGS[index];
    const confirmation = confirm("Want to restore this blog post?");
    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}admin/restoreBlog`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ id: blog.id,authorId:blog.authorId,title:blog.title }),
      });
      if (response.ok) {
        let res = await response.json();
        alert(res.message);
        BLOGS.splice(index, 1);
        fetchBlogs();
        loadBlogs(BLOGS);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the blog post");
      }
    }
  } catch (error) {
    console.error("Error deleting blog post:", error.message);
  }
}


closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
