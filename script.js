document.getElementById('searchBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        getUserDetails(username);
    } else {
        alert('Please enter a GitHub username');
    }
});

async function getUserDetails(username) {
    const url = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();
        displayUserDetails(data);
        getUserRepositories(username);
    } catch (error) {
        alert(error.message);
    }
}

async function getUserRepositories(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Repositories not found');
        }
        const repos = await response.json();
        displayUserRepositories(repos);
    } catch (error) {
        alert(error.message);
    }
}

function displayUserDetails(user) {
    const userDetails = document.getElementById('userDetails');
    userDetails.innerHTML = `
        <div class="profile">
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            <div class="user-info">
                <p><strong>Name:</strong> ${user.name || ''}</p>
                <p><strong>Bio:</strong> ${user.bio || ''}</p>
                <p><strong>Location:</strong> ${user.location || ''}</p>
                <p><strong>Public Repos:</strong> ${user.public_repos}</p>
                <p><strong>Followers:</strong> ${user.followers}</p>
                <p><strong>Following:</strong> ${user.following}</p>
            </div>
        </div>
        <div class="repositories">
            <h2>Repositories:</h2>
            <div id="repoList"></div>
        </div>
    `;
}

function displayUserRepositories(repos) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = repos.map(repo => `
        <div class="repository">
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        </div>
    `).join('');
}
