//API YOUTUBE
const videoSection =document.querySelector('#loader-box');

const key = "AIzaSyB36ht2dOVv3aDkrs-1V2dKmmQpaIVN0ew";

fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=PLUnNJGK7nllpwccCbhnJPT1WSkQofID6P&key=${key}`).then(res =>res.json())
.then(data => {
    data.items.forEach(element => {
      const thumbnail = element.snippet.thumbnails;
      const imageUrl =
        thumbnail.maxres?.url || thumbnail.high?.url || thumbnail.medium?.url || thumbnail.default?.url || '';

      videoSection.innerHTML += `
        <a target="_blank" href="https://www.youtube.com/watch?v=${element.snippet.resourceId.videoId}" class="yt-video">
            <img src="${imageUrl}" alt="Thumbnail">
            <h3>${element.snippet.title}</h3>
        </a>`;
    });
    console.log(data.items[0]);
  })
  .catch(error => {
    console.error("Sorry, something went wrong, try again later:", error);
  });

  //CARDS
  //Add JSON
const url = "data/skz.json";
const cards = document.querySelector("#member-cards");
async function getMembersData() {
  try{
    const response = await fetch(url);
    const data = await response.json();
    displayLogoCards(data.members);

  }catch(error){
    console.error("Error fetching data:", error);
  }   
}

const displayLogoCards = (members) => {
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add('band-card');
        const name = document.createElement("h3");
        const birth = document.createElement("p");
        const position = document.createElement("p");

        name.textContent = member.name;
        birth.innerHTML = `<strong>Birth</strong>: ${member.birth}`;
        position.innerHTML = `<strong>Position: </strong>: ${member.position}`;
        const picture = document.createElement('picture');

        const largeImg = document.createElement('source');
        largeImg.setAttribute('media', '(min-width: 1020px)');
        largeImg.setAttribute('srcset', `${member.imgUrlLarge}`);
        largeImg.setAttribute('width', '800');
        largeImg.setAttribute('height', '800');

        const mediumImg = document.createElement('source');
        mediumImg.setAttribute('media', '(min-width: 600px)');
        mediumImg.setAttribute('srcset', `${member.imgUrlMedium}`);
        mediumImg.setAttribute('width', '500');
        mediumImg.setAttribute('height', '500');

        const smallImg = document.createElement('img');
        smallImg.setAttribute('src', `${member.imgUrl}`);
        smallImg.setAttribute('alt', `Image of ${member.name}`)
        smallImg.setAttribute("loading", "lazy");
        smallImg.setAttribute('width', '300');
        smallImg.setAttribute('height', '300');

        picture.appendChild(largeImg);
        picture.appendChild(mediumImg);
        picture.appendChild(smallImg);

        card.appendChild(picture);
        card.appendChild(name);
        card.appendChild(birth);
        card.appendChild(position);
        
        cards.appendChild(card);
    });
}
getMembersData() ;   

