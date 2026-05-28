async function loadPosts() {

    const response = await fetch("/posts");
    const posts = await response.json();

    const postsDiv = document.getElementById("posts");

    postsDiv.innerHTML = "";

    posts.forEach(post => {

        let commentsHTML = "";

        post.comments.forEach(comment => {
            commentsHTML += `<li>${comment}</li>`;
        });

        postsDiv.innerHTML += `
            <div class="post">
                <h2>${post.title}</h2>

                <p>${post.content}</p>

                <h4>Comments</h4>

                <ul>${commentsHTML}</ul>

                <input type="text" id="comment-${post.id}" placeholder="Write comment">

                <button onclick="addComment(${post.id})">
                    Add Comment
                </button>
            </div>
        `;
    });
}

async function addPost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    });

    loadPosts();
}

async function addComment(id) {

    const comment = document.getElementById(`comment-${id}`).value;

    await fetch(`/comment/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment })
    });

    loadPosts();
}

loadPosts();