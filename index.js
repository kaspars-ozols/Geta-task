const characters = document.querySelector(".characters");
const button = document.querySelector(".button");
button.addEventListener("click", () => {
  getAPIdata();
  button.setAttribute("disabled", true);
  button.classList.add("pressed");
  button.innerHTML = 'Here is API data from Rick N Morty';
});

const getAPIdata = () => {
  fetch("https://rickandmortyapi.com/api/episode")
    .then((response) => response.json())
    .then((data) => {
      Promise.all(data.results
        .map(({ name, episode, characters }) => {
          return Promise.all(characters
            .map(url => fetch(url))
            .map(promise => promise.then(x => x.json())))
            .then(data => {
              var charHtml = data.map(x => `<img class="character__image" src='${x.image}' alt="${x.name}"/>`).join("");

              return `
                <figure class='episode'>
                  <span class='episode__name'>${episode} - ${name}</span>
                  <div>
                    ${charHtml}
                  </div>
                </figure>
              `;
            });
        })
      )
      .then(htmls =>characters.insertAdjacentHTML("afterbegin", htmls.join()));
    })
    .catch((err) => {
      console.warn("bad API Call.", err);
    });
};

getAPIdata();