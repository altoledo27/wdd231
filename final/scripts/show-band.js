import {bands} from '../data/bands.mjs';


const shuffleButton = document.querySelector('#shuffle-button');
//Dialog
function showBandDetails(band){
    const displayCoursedetails = document.querySelector("#band-info");
    displayCoursedetails.innerHTML = '';
    displayCoursedetails.innerHTML = `<button class="close-button">❌</button>
            <h3>${band.name}</h3>
            <p><strong>Monthly listeners</strong>: ${band.monthyListeners}</p>
            <p><strong>Most streamed song</strong>: ${band.famousSong}</p>
            <p class="yt-video"><a target="_blank" href="${band.urlSong}"><strong>Watch it here!</strong></a> </p>`;
    
    const closeModal = document.querySelector(".close-button");
    closeModal.addEventListener("click", () => {
        displayCoursedetails.close();
    });

    displayCoursedetails.showModal();

}

function createBandsCard(){
    const containerBandCard = document.querySelector('#show-bands');
    containerBandCard.innerHTML = '';
    const selectedBands = [...bands].sort(() => 0.5 - Math.random()).slice(0, 3);
    selectedBands.forEach(band => {
        const card = document.createElement('section');
        card.classList.add('band-card');
        const name = document.createElement('h3');
        name.textContent = band.name;

        const picture = document.createElement('picture');

        const largeImg = document.createElement('source');
        largeImg.setAttribute('media', '(min-width: 1020px)');
        largeImg.setAttribute('srcset', `${band.imgUrlLarge}`);
        largeImg.setAttribute('width', '800');
        largeImg.setAttribute('height', '800');

        const mediumImg = document.createElement('source');
        mediumImg.setAttribute('media', '(min-width: 600px)');
        mediumImg.setAttribute('srcset', `${band.imgUrlMedium}`);
        mediumImg.setAttribute('width', '500');
        mediumImg.setAttribute('height', '500');

        const smallImg = document.createElement('img');
        smallImg.setAttribute('src', `${band.imgUrl}`);
        smallImg.setAttribute('alt', `Image of ${band.name}`)
        smallImg.setAttribute("loading", "lazy");
        smallImg.setAttribute('width', '300');
        smallImg.setAttribute('height', '300');

        const learnMoreButton = document.createElement("button")

        learnMoreButton.addEventListener('click', () => {
            showBandDetails(band);
        });
        learnMoreButton.textContent = "Learn More"

        picture.appendChild(largeImg);
        picture.appendChild(mediumImg);
        picture.appendChild(smallImg);

        card.appendChild(picture);
        card.appendChild(name);
        card.appendChild(learnMoreButton);
        containerBandCard.appendChild(card);
    })
}

createBandsCard();
shuffleButton.addEventListener('click', createBandsCard);