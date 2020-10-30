const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limits = 5;
let page = 1;


//fetching posts from API
async function getPost() {
    const res = await fetch (`https://jsonplaceholder.typicode.com/posts?_limit=${limits}&_page=${page}`);

    const data = await res.json();
    return data;
}

//show posts in DOM
async function showPosts() {
    //await returns promise, promise is a function in JS.
    const posts = await getPost();
    // console.log(posts);

    posts.forEach( post  => {
        //We are creating an element in HTML dynamically.
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        //Adding contents into HTML dynamically using a variable.
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>    
        `;
        //This will append Post to every element
        postContainer.appendChild(postEl);
    });
}

//Show loader & fetch more post
function showLoading() {
    loading.classList.add('show');

    //now the timeout is created to show the loading after certain amount of time.
    setTimeout( ()=> {
    loading.classList.remove('show');

        setTimeout( () => {
            //page is incremented to next 5 posts
            page++;
            //we call the function
            showPosts();
        },300);
    },1000);
}

//filter posts by input
function filterPosts(e) {
    //targeting the value from the search to the posts
    const term = e.target.value.toUpperCase();
    //getting all of the posts
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        //we are targeting the content of the post
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display =  'flex';
        }else {
            post.style.display = 'none';
        }
    });

}

showPosts();

window.addEventListener(('scroll'), () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

//filter is focusing on class input, function is called then 'filterPosts'
filter.addEventListener('input',filterPosts)