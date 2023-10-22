if (
  localStorage.getItem('accessToken') == undefined ||
  localStorage.getItem('accessToken') == null
) {
  window.location = `${window.location.origin}/login.html`;
}
const listOfPosts = document.getElementById('postsList');

const filterBtn = document.getElementById('filterBtn');
const filterPost = document.getElementById('filterPost');

const addPostBtn = document.getElementById('addPostBtn');

const postFeedInput = document.getElementById('postFeedInput');
const postTitleInput = document.getElementById('postTitleInput');

const logout = document.getElementById('logout');

let postsArray;

logout.addEventListener('click', () => {
  localStorage.removeItem('accessToken');
  window.location = `${window.location.origin}/login.html`;
});

const editPost = e => {
  parentId = e.parentElement.getAttribute('key');
  if (postFeedInput.value && postTitleInput.value) {
    fetch(`https://api.noroff.dev/api/v1/social/posts/${parentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: postTitleInput.value,
        body: postFeedInput.value,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {});
  }
};

const deletePost = e => {
  parentId = e.parentElement.getAttribute('key');
  console.log(parentId);
  fetch(`https://api.noroff.dev/api/v1/social/posts/${parentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(json => {
      //TODO CHECK IF TOKEN EXISTS
      console.log(json);
    });
};

const createPostList = posts => {
  let postsList = posts.map(post => {
    return `<div class="card" style="width: 40vw;margin:0 auto;">
    <div class="card-body" key=${post.id}>
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
      <button  class="btn btn-warning" onclick ="editPost(this)" >Edit</button>
      <button  class="btn btn-danger" onclick ="deletePost(this)" >Delete</button>
    </div>
  </div>`;
  });
  listOfPosts.innerHTML = postsList;
};

//FOR BUGFIXES
filterBtn.addEventListener('click', e => {
  e.preventDefault();
  listOfPosts.innerHTML = '';
  if (filterPost.value == '') {
    getAllPosts();
  } else {
    getSelectedPosts(filterPost.value);
  }
});

const getSelectedPosts = postName => {
  postsArray = postsArray.filter(post => {
    const title = post.title.toLowerCase();
    const body = post.body?.toLowerCase();
    if (body == null || body == undefined) {
      return title.includes(postName.toLowerCase());
    }
    return title.includes(postName.toLowerCase()) || body.includes(postName.toLowerCase());
  });
  createPostList(postsArray);
};

const getAllPosts = () => {
  fetch('https://api.noroff.dev/api/v1/social/posts', {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
    .then(resp => resp.json())
    .then(json => {
      postsArray = json;
      createPostList(json);
    });
};

addPostBtn.addEventListener('click', () => {});

getAllPosts();

addPostBtn.addEventListener('click', e => {
  e.preventDefault();
  if (postFeedInput.value && postTitleInput.value) {
    fetch('https://api.noroff.dev/api/v1/social/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: postTitleInput.value,
        body: postFeedInput.value,
        tags: [],
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {});
  }
});
