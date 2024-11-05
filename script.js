const questions = [
    "Ik voel me geestelijk uitgeput.",
    "Alles wat ik doe, kost mij moeite.",
    "Ik raak maar niet uitgerust.",
    "Ik voel me lichamelijk uitgeput.",
    "Als ik 's morgens opsta, mis ik de energie om aan de dag te beginnen.",
    "Ik wil wel actief zijn, maar het lukt mij niet.",
    "Als ik me inspan, dan word ik snel moe.",
    "Op het einde van de dag voel ik me mentaal uitgeput en leeg.",
    "Ik kan geen belangstelling en enthousiasme opbrengen voor mijn werk.",
    "Ik voel tegenzin naar mijn werk.",
    "Mijn werk doet me niet zoveel.",
    "Ik ben cynisch over wat mijn werk voor anderen betekent.",
    "Ik kan er mijn aandacht moeilijk bijhouden.",
    "Ik heb moeite om helder na te denken.",
    "Ik ben vergeetachtig en verstrooid.",
    "Ik kan me moeilijk concentreren.",
    "Ik maak fouten omdat ik er met mijn hoofd ‘niet goed bij ben’.",
    "Ik heb het gevoel geen controle te hebben over mijn emoties.",
    "Ik herken mezelf niet in de wijze waarop ik emotioneel reageer.",
    "Ik raak snel geïrriteerd als de dingen niet lopen zoals ik dat wil.",
    "Ik word kwaad of verdrietig zonder goed te weten waarom.",
    "Ik kan te sterk emotioneel reageren, terwijl ik dat niet wou.",
    "Ik heb problemen met inslapen of doorslapen.",
    "Ik heb de neiging om te piekeren.",
    "Ik voel mij opgejaagd en gespannen.",
    "Ik voel me angstig en/of heb last van paniekaanvallen.",
    "Ik heb moeite met drukte en/of lawaai.",
    "Ik heb last van hartkloppingen of pijn in de borststreek.",
    "Ik heb last van maag- en/of darmklachten.",
    "Ik heb last van spanningshoofdpijn.",
    "Ik heb last van pijnlijke spieren, bijvoorbeeld in de nek, schouder of rug.",
    "Ik word snel ziek."
];

const options = [
    { text: "Nooit", color: "#4CAF50" },
    { text: "Zelden", color: "#8BC34A" },
    { text: "Soms", color: "#FFEB3B" },
    { text: "Vaak", color: "#FFC107" },
    { text: "Altijd", color: "#F44336" }
];

const form = document.getElementById('burnoutForm');
const questionsDiv = document.getElementById('questions');
const resultDiv = document.getElementById('result');

// URL's voor elke uitkomst
const highRiskURL = "https://vibrant-venable-i2knm.zipwp.link/contact/"; // URL voor hoge risico
const moderateRiskURL = "https://vibrant-venable-i2knm.zipwp.link/contact/"; // URL voor matig risico
const lowRiskURL = "https://vibrant-venable-i2knm.zipwp.link/blog/"; // URL voor laag risico

questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${question}</p>`;
    options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="q${index}" value="${optionIndex}" required>
            <span style="color: ${option.color}">${option.text}</span>`;
        questionDiv.appendChild(label);
    });
    questionsDiv.appendChild(questionDiv);
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let score = 0;
    questions.forEach((_, index) => {
        const radios = document.getElementsByName(`q${index}`);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                score += parseInt(radios[i].value);
                break;
            }
        }
    });

    let resultText = `Uw totale score is: ${score}`;
    let redirectURL = ""; // URL wordt bepaald op basis van de score

    if (score > 80) {
        resultText += "<br>U heeft een hoge kans op burn-out. Overweeg om professionele hulp te zoeken.";
        redirectURL = highRiskURL;
    } else if (score > 60) {
        resultText += "<br>U loopt risico op burn-out. Het kan nuttig zijn om te praten met een professional.";
        redirectURL = moderateRiskURL;
    } else {
        resultText += "<br>U heeft waarschijnlijk geen burn-out. Blijf goed voor uzelf zorgen.";
        redirectURL = lowRiskURL;
    }

    resultDiv.innerHTML = resultText;

    // Navigatie naar de bijpassende URL na 5 seconden
    setTimeout(() => {
        window.location.href = redirectURL;
    }, 5000); // 5 seconden vertraging om het resultaat te laten zien
});