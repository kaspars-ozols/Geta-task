const characters = document.querySelector(".characters");
const button = document.querySelector(".button");
button.addEventListener("click", () => {
  getAPIdata();
  button.setAttribute("disabled", true);
  button.classList.add("pressed");
  button.innerHTML = 'Here is API data from Rick N Morty';
});

const getAPIdata = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      const html = data.results
        .map(({ name, image, status }) => {
          return `
          <figure class='character'>
            <div class='character__image-wrapper'>
              <img class='character__image' src=${image} alt=${name}>
            </div>
            <figcaption class='character__name'>${name}</figcaption>
            <h5 class='character__status'>Status: ${status}</h5>
          </figure>
        `;
        })
        .join("");

      characters.insertAdjacentHTML("afterbegin", html);
    })
    .catch((err) => {
      console.warn("bad API Call.", err);
    });
};
