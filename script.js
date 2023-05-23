const container = document.getElementById('container');
const addBlogBtn = document.getElementById('add-btn');


//function to fetch blogs
function fetchBlogs() {
    fetch(`https://jsonplaceholder.typicode.com/users/1/posts`)
        .then(response => { return response.json() })
        .then((data) => {
            container.innerHTML = "";
            data.forEach(element => {
                container.innerHTML +=
                    `<div class="blog">
                        <div class="text">
                          <h2>${element.title}</h2>
                          <p>${element.body}</p>
                        </div>
                        <div class="delete">
                            <button class="delete-btn" id="${element.id}" onclick="${deleteBlog(element.id)}">Delete</button>
                        </div>
                    </div>`
            })
        })
        .catch();
}

//function to create new blog
addBlogBtn.addEventListener('click', createBlog);
function createBlog() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: document.getElementById('title').value,
            body: document.getElementById('blog').value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById('title').value = "";
            document.getElementById('blog').value = "";
        })
        .catch()
}

//function to delete blog
function deleteBlog(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
            "content-Type": "application/json"
        },
    })
        .then(response => { return response.json() })
        .then(result => { console.log(result); })
}


fetchBlogs();