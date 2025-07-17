let currentPageUrl = 'https://api.attackontitanapi.com/organizations';

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    };

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    //nextButton.addEventListener('click', loadNextPage);
    nextButton.onclick = () => {loadNextPage()}
    //backButton.addEventListener('click', loadPreviousPage);
    backButton.onclick = () => {loadPreviousPage()}
}

async function loadCharacters(url) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url(${(character.img.split(".png"))[0].concat(".png")})`;
            card.className = "cards";
            const characterNameBg = document.createElement("div");
            characterNameBg.className = "charactername-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = '';

                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage =
                `url(${(character.img.split(".png"))[0].concat(".png")})`;
                characterImage.className = "character-image";

                const name = document.createElement("span");
                name.className = "character-details";
                name.innerText = `Name: ${character.name}`;

                const notableMembers = document.createElement("span");
                notableMembers.className = "character-details";
                notableMembers.innerText = `Notable Members: ${character.notable_members.length}`;

                const notableFormerMembers = document.createElement("span");
                notableFormerMembers.className = "character-details";
                notableFormerMembers.innerText = `Former Members: ${character.notable_former_members.length}`;

                const affiliation = document.createElement("span");
                affiliation.className = "character-details";
                affiliation.innerText = `Affiliation: ${character.affiliation}`;

                const debut = document.createElement("span");
                debut.className = "character-details";
                debut.innerText = `Debut Episode: ${character.debut.match(/\d+/g)[0]}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(notableMembers);
                modalContent.appendChild(notableFormerMembers);
                modalContent.appendChild(affiliation);
                modalContent.appendChild(debut);
            }

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        //nextButton.disabled = !responseJson.next;
        //backButton.disabled = !responseJson.previous;

        //backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        currentPageUrl = url;
    } catch (error){
        //alert('Erro ao carregar os personagens');
        console.log(error);
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.info.next_page);

    } catch (error){
        console.log(error);
        alert('Erro ao carregar a próxima página');
    };
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.info.prev_page);
        
    } catch (error){
        console.log(error);
        alert('Erro ao carregar a página anerior');
    };
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rose",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unkown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown"){
        return "desconhecida"
    }

    return (height/100).toFixed(2);
}

function convertMass (mass) {
    if (mass === "unknown"){
        return "desconhecido"
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown"){
        return "desconhecido"
    }

    return birthYear
}