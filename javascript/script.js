var voice = {
    wrap: null, 
    btn: null, 
    recog: null,
    init: () => {
        voice.wrap = document.getElementById("vwrap");
        voice.btn = document.getElementById("vbtn");
        voice.img = document.getElementById("voiceimg");

        navigator.mediaDevices.getUserMedia({
                audio: true
            })
            .then((stream) => {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                voice.recog = new SpeechRecognition();
                voice.recog.lang = "nl-nl";
                voice.recog.continuous = false;
                voice.recog.interimResults = false;

                voice.recog.onresult = (evt) => {
                    let said = evt.results[0][0].transcript.toLowerCase();
                    if (cmd[said]) {
                        cmd[said]();
                    } else {
                        said += " (Dit command is niet gevonden, probeer iets anders alstublieft!)";
                    }
                    voice.stop();
                };

                voice.recog.onerror = (err) => {
                    console.error(evt);
                };

                voice.btn.disabled = false;
                voice.stop();
            })
            .catch((err) => {
                console.error(err);
                voice.wrap.innerHTML = "Schakel toegang in en sluit een microfoon aan.";
            });
    },

    // Start
    start: () => {
        voice.recog.start();
        voice.btn.onclick = voice.stop;
        voice.btn.value = "U kunt praten, klik om te stoppen";
    },

    // Cancel/stop
    stop: () => {
        voice.recog.stop();
        voice.btn.onclick = voice.start;
        voice.btn.value = "Klik en begin met praten";
    }
};
window.addEventListener("DOMContentLoaded", voice.init);

//Get date in dd/mm/yyyy format
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var dateTime = date

let datum = document.getElementById("date");
datum.textContent = dateTime + ', Amsterdam';

//Variabelen voor verschillende data
var naam, adres, begroeting1, begroeting2, begroeting3, afsluiting, bericht;

//SUBMIT FORM
let form = document.querySelector('form');
form.addEventListener('submit', setStorage );

//RENDER EMAIL
let button = document.getElementById('btn');
button.addEventListener('click', test);

//Zelf in te vullen waardes

function test() {
    let email = document.getElementById('content');
    console.log(email);
    email.insertAdjacentHTML('beforeend', 
    `
    <h3>Jouw e-mail</h3>
    <article id="contentEmail" contenteditable="true">
        <p id="name">${naamStorage.value}
        </p>
        <p id="adress">${adresStorage.value}</p>
        <p id="nameO">${naamOntvanger.value}</p>
        <p id="adressO">${adresOntvanger.value}</p> 
        <p>${plaatsDatumStorage.value}</p>
        <p>${begroetingStorage.value}</p>
        <p>${emailContent.value}</p>
        <p>${afsluitStorage.value}</p>
        <p>${naamOntvanger.value}</p>
    </article> 
    `
    )
}
// function renderEmail(){
//     setStorage();
//     let email = document.getElementById('emailContent');
//     email.insertAdjacentHTML('beforeend', `
//         <p>${naamStorage.value}</p>
//     `)

//LOCAL STORAGE
let naamStorage = document.getElementById('naam');
let adresStorage = document.getElementById('adres');
let plaatsDatumStorage = document.getElementById('plaats-datum');
let begroetingStorage = document.getElementById('begroeting');
let afsluitStorage = document.getElementById('afsluit-begroeting');

//Zelf in te vullen waarden
let naamOntvanger = document.getElementById('naam-ontvanger');
let adresOntvanger = document.getElementById('adres-ontvanger');
let emailContent = document.getElementById('bericht');
// let naamOntvanger = document.getElementById('naam-ontvanger');
// let adresOntvanger = document.getElementById('adres-ontvanger');

function setStorage () {
    console.log('Het formulier wordt gesubmit');

    naamStorage.value;
    localStorage.setItem("Naam", naamStorage.value);

    adresStorage.value;
    localStorage.setItem("Adres", adresStorage.value);

    plaatsDatumStorage.value;
    localStorage.setItem('Plaats en datum', plaatsDatumStorage.value);

    begroetingStorage.value;
    localStorage.setItem('Begroeting', begroetingStorage.value);

    afsluitStorage.value;
    localStorage.setItem('Afsluiting', afsluitStorage.value);

    naamOntvanger.value;
    sessionStorage.setItem("Naam ontvanger", naamOntvanger.value);

    adresOntvanger.value;
    sessionStorage.setItem("Adres ontvanger", adresOntvanger.value);

    //DEZE NOG FIXEN
    // emailContent.textContent;
    // emailContent.setItem('Email content', emailContent.textContent);
}

naamStorage.value = localStorage.getItem("Naam");
adresStorage.value = localStorage.getItem("Adres");
plaatsDatumStorage.value = localStorage.getItem("Plaats en datum");
begroetingStorage.value = localStorage.getItem("Begroeting");
afsluitStorage.value = localStorage.getItem('Afsluiting');

naamOntvanger.value = sessionStorage.getItem("Naam ontvanger");
adresOntvanger.value = sessionStorage.getItem("Adres ontvanger");

//DEZE NOG FIXEN
// emailContent.textContent = sessionStorage.getItem('Email content');



//SPEAK COMMANDS
let kopieerMelding = document.getElementById('kopieerMelding');

var cmd = {
    //Kopieer en plak naam
    "kopieer naam": () => {
        let naamArea = document.getElementById("naamAfzender");
        naam = naamArea.textContent;
         document.execCommand('copy');
            alert(naam + ' is gekopieërd');
                console.log(naam);
                kopieerMelding.textContent = naam + ' is gekopieerd';
    },
    "plak naam": () => {
        navigator.clipboard
            .readText()
                .then(
                 cliptext =>
                 (document.getElementById('naam').value = naam),
                    err => console.log(err));
                    kopieerMelding.textContent = '';
    },
    //Kopieer en plak adres
    "kopieer adres": () => {
        let adresArea = document.getElementById('adresAfzender');
        adres = adresArea.textContent;
        document.execCommand('copy');
        alert(adres + ' is gekopieerd');
        console.log(adres);
        kopieerMelding.textContent = adres + ' is gekopieerd';
    },
    "plak adres": () => {
        navigator.clipboard
            .readText()
            .then(
                cliptext => 
                (document.getElementById('adres').value = adres),
                    err => console.log(err)
            )
            kopieerMelding.textContent = '';
    },
    //Kopieer en plak plaats en datum
    "kopieer plaats en datum": () => {
        datum = datum.textContent;
        document.execCommand('copy');
        alert(datum + ' is gekopieerd');
        console.log(datum);
        kopieerMelding.textContent = datum + ' is gekopieerd';
    },
    "plak plaats en datum": () => {
        navigator.clipboard
            .readText()
            .then(
                cliptext => 
                (document.getElementById('plaats-datum').value = datum)
            )
            kopieerMelding.textContent = '';
    },
    //Begroetingen
    "kopieer introductie 1": () => {
        let begroeting1Area = document.getElementById('begroeting1');
        begroeting1 = begroeting1Area.textContent;
        document.execCommand('copy');
        alert(begroeting1 + ' is gekopieerd');
        kopieerMelding.textContent = begroeting1 + ' is gekopieerd';
    },
    "kopieer introductie 2": () => {
        let begroeting2Area = document.getElementById('begroeting2');
        begroeting2 = begroeting2Area.textContent;
        document.execCommand('copy');
        alert(begroeting2 + ' is gekopieerd');
        kopieerMelding.textContent = begroeting2 + ' is gekopieerd';
    },
    "kopieer introductie 3": () => {
        let begroeting3Area = document.getElementById('begroeting3');
        begroeting3 = begroeting3Area.textContent;
        document.execCommand('copy');
        alert(begroeting3 + ' is gekopieerd');
        kopieerMelding.textContent = begroeting3 + ' is gekopieerd';
    },
    "plak introductie": () => {
        navigator.clipboard
        .readText()
        .then(
            cliptext => 
            (document.getElementById('begroeting').value = begroeting1)
        )
        kopieerMelding.textContent = '';
    },
    //Afsluit bericht
    "kopieer afsluiting": () => {
        let afsluitingArea = document.getElementById('afsluiting');
        afsluiting = afsluitingArea.textContent;
        document.execCommand('copy');
        alert(afsluiting + ' is gekopieerd');
        kopieerMelding.textContent = afsluiting + ' is gekopieerd';
    },
    "plak afsluiting": () => {
        navigator.clipboard
        .readText()
        .then(
            cliptext => 
            (document.getElementById('afsluit-begroeting').value = afsluiting)
        )
        kopieerMelding.textContent = '';
    },
    //DIT MOET NOG WERKEND GEMAAKT WORDEN!!!!!
    "kopieer bericht": () => {
        let berichtArea = document.getElementById('contentEmail');
        bericht = berichtArea.textContent;
        document.execCommand('copy');
        alert('Jouw email is gekopieerd');
    }
}

//Hulp melding
const open = document.getElementById('open');
const close = document.getElementById('close');
const help_containter = document.getElementById('help_container');

open.addEventListener('click', () => {
    help_containter.classList.add('show');
})

close.addEventListener('click', () => {
    help_containter.classList.remove('show');
})