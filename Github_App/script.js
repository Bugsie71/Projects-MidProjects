const APIurl = "https://api.github.com/users/";

const searchBarForm = document.querySelector(".form");
const searchBar = document.querySelector("#searchBar");
const profile = document.querySelector(".profile");

async function getUserInfo(username) {
  const resp = await fetch(APIurl + username);
  const respData = await resp.json();
  const respRepo = await fetch(APIurl + username + "/repos");
  const respDataRepo = await respRepo.json();
  const card = document.querySelector(".cardconst ");
  if (resp.status === 404) {
    createError();
  } else {
    createUserCard(respData);
    createRepos(respDataRepo);
  }
}

function createUserCard(user) {
  const card = document.createElement("div");
  card.classList = "card";

  const cardHTML = `
		<a href="${user.html_url}" target="_blank"><img src="${user.avatar_url}" alt="profile picture"></a>
		<div class="profileRight">
		<h2>${user.name}</h2>
		<p>${user.bio}</p>
		<ul class="counts">
		<li>${user.followers} Followers</li>
		<li>${user.following} Following</li>
		<li>${user.public_repos} Repos</li>
		</ul>
		<p>Top Repos:</p>
		<ul class="repos"></ul>
		</div>
		`;

  card.innerHTML = cardHTML;
  profile.append(card);
  profile.style.display = "flex";
}

function createRepos(userRepo) {
  const repos = document.querySelector(".repos");

  userRepo
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const card = document.createElement("li");

      card.innerHTML = `
		<a href="${repo.html_url}" class="repo" target="_blank">${repo.name}</a>
		`;
      repos.append(card);
    });
}

function createError() {
  const cardHTML = `
	<h2>Username not found. Please Try again</h2>
	`;
  profile.innerHTML = cardHTML;
  profile.style.display = "flex";
}

searchBarForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (searchBar.value) {
    profile.innerHTML = "";
    getUserInfo(searchBar.value);
    searchBar.value = "";
  }
});
