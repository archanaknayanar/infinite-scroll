const postContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');
let post = 3;
let page = 1;

//Fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${post}&_page=${page}`);
    const data = await res.json();
    return data;
}

//Show post in DOM
async function showPosts() {
    const post = await getPosts();
    post.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class=number>${post.id}</div>
            <div class=post-info>
                <h2 class=post-title>${post.title}</h2>
                <p class=post-body>${post.body}</p>
            </div>
        `;
    
        postContainer.appendChild(postEl);
    });
}

//Show Loading icon and fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        },300);
    }, 1000);
}
//Filter post based on input
function filterPost(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) >= -1 || body.indexOf(term) >= -1)  {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }

    });
}

showPosts();

//Event listner
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight , clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});
filter.addEventListener('input', filterPost);