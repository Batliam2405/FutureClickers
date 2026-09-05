//====================================================
// FUTURE CLICKER
// Script principal
// Partie 1
//====================================================

//====================================================
// VARIABLES DU JEU
//====================================================

// Cristaux
let score = 0;

// Puissance du clic
let clickPower = 1;

// Doigt amélioré
let fingerLevel = 0;
let fingerPrice = 10;

// Robots
let robotCount = 0;
let robotPrice = 50;
let robotProduction = 1;

// Batteries
let batteryLevel = 0;
let batteryPrice = 150;

// Usines
let factoryLevel = 0;
let factoryPrice = 500;
let factoryProduction = 20;

// Laboratoire
let labLevel = 0;
let labPrice = 2500;

let labResearch = false;
let labResearchUnlocked = false;

// Arbre technologique
let robotTechUnlocked = false;
let buildingTechUnlocked = false;
let cityTechUnlocked = false;
let energyTechUnlocked = false;

// Jour / Nuit
let isNight = false;

//====================================================
// ELEMENTS HTML
//====================================================

// Affichage principal
const scoreText =
document.getElementById("score");

// Réacteur
const reactor =
document.getElementById("reactor");

const clickButton =
document.getElementById("clickButton");

// Boutique
const fingerButton =
document.getElementById("fingerUpgrade");

const robotButton =
document.getElementById("robotUpgrade");

const batteryButton =
document.getElementById("batteryUpgrade");

const factoryButton =
document.getElementById("factoryUpgrade");

const labButton =
document.getElementById("labUpgrade");

// Prix
const fingerPriceText =
document.getElementById("fingerPrice");

const robotPriceText =
document.getElementById("robotPrice");

const batteryPriceText =
document.getElementById("batteryPrice");

const factoryPriceText =
document.getElementById("factoryPrice");

const labPriceText =
document.getElementById("labPrice");

// Informations
const robotCountText =
document.getElementById("robotCount");

const batteryLevelText =
document.getElementById("batteryLevel");

// Ville
const robotsContainer =
document.getElementById("robots");

const batteriesContainer =
document.getElementById("batteries");

const factoryContainer =
document.getElementById("factoryContainer");

const labContainer =
document.getElementById("labContainer");

// Bâtiments décoratifs
const buildings =
document.querySelectorAll(".building");

const researchButton =
document.getElementById("researchButton");

// Ciel
const sky =
document.getElementById("sky");

const sun =
document.getElementById("sun");

const moon =
document.getElementById("moon");

const stars =
document.getElementById("stars");

// Voitures
const flyingCars =
document.getElementById("flyingCars");

// Succès
const achievementList =
document.getElementById("achievementList");

//====================================================
// MISE A JOUR DE L'INTERFACE
//====================================================

function updateScore(){

    const production =

        robotCount * robotProduction +

        factoryLevel * factoryProduction;

    scoreText.innerHTML =

        "Cristaux : " +

        score +

        " 💎" +

        "<br><br>" +

        "👆 Clic : +" +

        clickPower +

        "<br>" +

        "⚙ Production : " +

        production +

        " / seconde";

    fingerPriceText.textContent =
    fingerPrice + " 💎";

    robotPriceText.textContent =
    robotPrice + " 💎";

    batteryPriceText.textContent =
    batteryPrice + " 💎";

    factoryPriceText.textContent =
    factoryPrice + " 💎";

    if(labPriceText){

        labPriceText.textContent =
        labPrice + " 💎";

    }

    if(robotCountText){

        robotCountText.textContent =
        "Robots : " + robotCount;

    }

    if(batteryLevelText){

        batteryLevelText.textContent =
        "Niveau : " + batteryLevel;

    }

}

//====================================================
// CLIC SUR LE REACTEUR
//====================================================

function clickReactor(){

    score += clickPower;

    updateScore();

    reactor.classList.remove("clicked");

    void reactor.offsetWidth;

    reactor.classList.add("clicked");

    setTimeout(function(){

        reactor.classList.remove("clicked");

    },180);

    const txt =
    document.createElement("div");

    txt.className =
    "floatingText";

    txt.innerHTML =
    "+" + clickPower + " 💎";

    const rect =
    reactor.getBoundingClientRect();

    txt.style.left =
    (rect.left + rect.width / 2) + "px";

    txt.style.top =
    (rect.top + 40) + "px";

    document.body.appendChild(txt);

    setTimeout(function(){

        txt.remove();

    },1000);

    if(buildings.length > 0){

        const building =

        buildings[

            Math.floor(

                Math.random() *

                buildings.length

            )

        ];

        building.classList.add("powered");

        setTimeout(function(){

            building.classList.remove("powered");

        },2500);

    }

}

//====================================================
// EVENEMENTS
//====================================================

reactor.addEventListener(
    "click",
    clickReactor
);

clickButton.addEventListener(
    "click",
    clickReactor
);

//====================================================
// PREMIER DEMARRAGE
//====================================================

updateScore();

console.log(
    "✅ Future Clicker - Partie 1 chargée."
);

//====================================================
// PARTIE 2
// BOUTIQUE ET ACHATS
//====================================================

//====================================================
// DOIGT AMÉLIORÉ
//====================================================

function buyFinger(){

    if(score < fingerPrice){

        return;

    }

    score -= fingerPrice;

    fingerLevel++;

    clickPower++;

    fingerPrice = Math.floor(fingerPrice * 1.6);

    updateScore();

}

fingerButton.addEventListener(
    "click",
    buyFinger
);

//====================================================
// ROBOTS
//====================================================

function buyRobot(){

    if(score < robotPrice){

        return;

    }

    score -= robotPrice;

    robotCount++;

    robotPrice = Math.floor(robotPrice * 1.8);

    spawnRobot();

    updateScore();

}

robotButton.addEventListener(
    "click",
    buyRobot
);

//====================================================
// BATTERIES
//====================================================

function buyBattery(){

    if(score < batteryPrice){

        return;

    }

    score -= batteryPrice;

    batteryLevel++;

    robotProduction++;

    batteryPrice = Math.floor(
        batteryPrice * 2
    );

    spawnBattery();

    updateScore();

}

batteryButton.addEventListener(
    "click",
    buyBattery
);

//====================================================
// USINES
//====================================================

function buyFactory(){

    if(score < factoryPrice){

        return;

    }

    score -= factoryPrice;

    factoryLevel++;

    factoryPrice = Math.floor(
        factoryPrice * 1.8
    );

    spawnFactory();

    updateScore();

}

factoryButton.addEventListener(
    "click",
    buyFactory
);

//====================================================
// LABORATOIRE
//====================================================

function buyLab(){

    if(labLevel >= 1){

        alert("🧪 Vous possédez déjà un laboratoire !");

        return;

    }

    if(score < labPrice){

        alert("Pas assez de cristaux !");

        return;

    }

    score -= labPrice;

    labLevel = 1;

    researchButton.style.display = "inline-block";

    spawnLab();

    updateScore();

    saveGame();

    alert("🧪 Laboratoire construit !");

    // Désactive le bouton
    labButton.disabled = true;

    labButton.textContent = "✔ Laboratoire construit";

}

researchButton.addEventListener(
    "click",
    openResearchMenu
);

labButton.addEventListener(
    "click",
    buyLab
);

//====================================================
// PRODUCTION AUTOMATIQUE
//====================================================

setInterval(function(){

    const gain =

        robotCount * robotProduction +

        factoryLevel * factoryProduction;

    if(gain <= 0){

        return;

    }

    score += gain;

    updateScore();

},1000);

//====================================================
// OUVERTURE DU LABORATOIRE
//====================================================

function openResearch(){

    if(labLevel <= 0){

        alert(
            "Construisez un laboratoire d'abord."
        );

        return;

    }

    const menu =

    document.getElementById(
        "researchMenu"
    );

    if(menu){

        menu.style.display = "flex";

    }

}

function closeResearch(){

    const menu =

    document.getElementById(
        "researchMenu"
    );

    if(menu){

        menu.style.display = "none";

    }

}

const closeResearchButton =

document.getElementById(
    "closeResearch"
);

if(closeResearchButton){

    closeResearchButton.addEventListener(
        "click",
        closeResearch
    );

}

// Double clic sur le laboratoire
labButton.addEventListener(
    "dblclick",
    openResearch
);

//====================================================
// PRODUCTION TOTALE
//====================================================

function getProduction(){

    return (

        robotCount *

        robotProduction +

        factoryLevel *

        factoryProduction

    );

}

console.log(
    "✅ Partie 2 chargée."
);

//====================================================
// PARTIE 3
// GENERATION DE LA VILLE
//====================================================

//====================================================
// ROBOTS
//====================================================

function spawnRobot(){

    if(!robotsContainer){

        return;

    }

    const robot = document.createElement("div");

    robot.className = "robot";

    robot.innerHTML = `

        <div class="head"></div>

        <div class="body"></div>

        <div class="legs"></div>

    `;

    robot.style.left =
    (100 + Math.random() * 1100) + "px";

    robot.style.top =
    (20 + Math.random() * 80) + "px";

    robotsContainer.appendChild(robot);

}

//====================================================
// BATTERIES
//====================================================

function spawnBattery(){

    if(!batteriesContainer){

        return;

    }

    const battery = document.createElement("div");

    battery.className = "battery";

    battery.innerHTML = `

        <div class="batteryStation">

            <div class="batteryCrystal"></div>

            <div class="batteryBody"></div>

        </div>

    `;

    battery.style.left =
    (100 + Math.random() * 1100) + "px";

    batteriesContainer.appendChild(battery);

}

//====================================================
// USINES
//====================================================

function spawnFactory(){

    if(!factoryContainer){

        return;

    }

    const factory = document.createElement("div");

    factory.className = "factory";

    factory.style.left =
    (40 + Math.random() * 1150) + "px";

    factory.style.bottom = "260px";

    factory.innerHTML = `

        <div class="factoryRoof"></div>

        <div class="factoryTower"></div>

        <div class="factoryTower tower2"></div>

        <div class="factoryDoor"></div>

        <div class="factoryWindows"></div>

        <div class="factoryWindows win2"></div>

        <div class="factoryWindows win3"></div>

        <div class="factoryAntenna"></div>

    `;

    factoryContainer.appendChild(factory);

}

//====================================================
// LABORATOIRE
//====================================================

function spawnLab(){

    if(!labContainer){

        return;

    }

    const lab = document.createElement("div");

    lab.className = "lab";

    lab.style.left =
    (80 + Math.random() * 1100) + "px";

    lab.style.bottom = "260px";

    lab.innerHTML = `

        <div class="labRoof"></div>

        <div class="labCrystal"></div>

        <div class="labBody">

            <div class="labWindow"></div>

            <div class="labDoor"></div>

        </div>

    `;

    labContainer.appendChild(lab);

}

//====================================================
// RECONSTRUCTION COMPLETE
//====================================================

function rebuildCity(){

    if(robotsContainer){

        robotsContainer.innerHTML = "";

    }

    if(batteriesContainer){

        batteriesContainer.innerHTML = "";

    }

    if(factoryContainer){

        factoryContainer.innerHTML = "";

    }

    if(labContainer){

        labContainer.innerHTML = "";

    }

    //------------------------------------------------
    // Robots
    //------------------------------------------------

    for(let i = 0; i < robotCount; i++){

        spawnRobot();

    }

    //------------------------------------------------
    // Batteries
    //------------------------------------------------

    for(let i = 0; i < batteryLevel; i++){

        spawnBattery();

    }

    //------------------------------------------------
    // Usines
    //------------------------------------------------

    for(let i = 0; i < factoryLevel; i++){

        spawnFactory();

    }

    //------------------------------------------------
    // Laboratoires
    //------------------------------------------------

    for(let i = 0; i < labLevel; i++){

        spawnLab();

    }

}

//====================================================
// RAFRAICHISSEMENT DE LA VILLE
//====================================================

function refreshCity(){

    rebuildCity();

    updateScore();

}

//====================================================
// REINITIALISATION
//====================================================

function clearCity(){

    robotCount = 0;

    batteryLevel = 0;

    factoryLevel = 0;

    labLevel = 0;

    rebuildCity();

    updateScore();

}

console.log(
    "✅ Partie 3 chargée."
);

//====================================================
// PARTIE 4
// SAUVEGARDE ET CHARGEMENT
//====================================================

//====================================================
// SAUVEGARDE
//====================================================

function saveGame(){

    const save = {

        // Ressources
        score: score,
        clickPower: clickPower,

        // Doigt
        fingerLevel: fingerLevel,
        fingerPrice: fingerPrice,

        // Robots
        robotCount: robotCount,
        robotPrice: robotPrice,
        robotProduction: robotProduction,

        // Batteries
        batteryLevel: batteryLevel,
        batteryPrice: batteryPrice,

        // Usines
        factoryLevel: factoryLevel,
        factoryPrice: factoryPrice,
        factoryProduction: factoryProduction,

        // Laboratoire
        labLevel: labLevel,
        labPrice: labPrice,

        labResearch: labResearch,
        labResearchUnlocked: labResearchUnlocked,

        // Arbre technologique
        robotTechUnlocked: robotTechUnlocked,
        buildingTechUnlocked: buildingTechUnlocked,
        cityTechUnlocked: cityTechUnlocked,
        energyTechUnlocked: energyTechUnlocked,

        // Succès
        achievements: achievements,

        // Date
        saveDate: Date.now()

    };

    localStorage.setItem(
        "FutureClickerSave",
        JSON.stringify(save)
    );

}

//====================================================
// CHARGEMENT
//====================================================

function loadGame(){

    const save =

    localStorage.getItem(

        "FutureClickerSave"

    );

    if(save === null){

        console.log(

            "Nouvelle partie."

        );

        updateScore();

        return;

    }

    const data = JSON.parse(save);

    //------------------------------------------------
    // Ressources
    //------------------------------------------------

    score = data.score ?? 0;

    clickPower = data.clickPower ?? 1;

    //------------------------------------------------
    // Doigt
    //------------------------------------------------

    fingerLevel = data.fingerLevel ?? 0;
    fingerPrice = data.fingerPrice ?? 10;

    //------------------------------------------------
    // Robots
    //------------------------------------------------

    robotCount = data.robotCount ?? 0;
    robotPrice = data.robotPrice ?? 50;
    robotProduction = data.robotProduction ?? 1;

    //------------------------------------------------
    // Batteries
    //------------------------------------------------

    batteryLevel = data.batteryLevel ?? 0;
    batteryPrice = data.batteryPrice ?? 150;

    //------------------------------------------------
    // Usines
    //------------------------------------------------

    factoryLevel = data.factoryLevel ?? 0;
    factoryPrice = data.factoryPrice ?? 500;
    factoryProduction =
    data.factoryProduction ?? 20;

    //------------------------------------------------
    // Laboratoire
    //------------------------------------------------

    labLevel = data.labLevel ?? 0;

    if(labLevel >= 1){

    researchButton.style.display =
    "inline-block";

    }

    if(labLevel >= 1){

    labButton.disabled = true;

    labButton.textContent =
    "✔ Laboratoire construit";

    }

    labPrice = data.labPrice ?? 2500;

    labResearch =
    data.labResearch ?? false;

    labResearchUnlocked =
    data.labResearchUnlocked ?? false;

    robotTechUnlocked =
data.robotTechUnlocked ?? false;

buildingTechUnlocked =
data.buildingTechUnlocked ?? false;

cityTechUnlocked =
data.cityTechUnlocked ?? false;

energyTechUnlocked =
data.energyTechUnlocked ?? false;

    //------------------------------------------------
    // Reconstruction
    //------------------------------------------------

    rebuildCity();

    updateScore();

    //------------------------------------------------
    // Recharge le laboratoire
    //------------------------------------------------

    if(labResearchUnlocked){

        const button =

        document.getElementById(
            "upgradeLabResearch"
        );

        const state =

        document.getElementById(
            "labResearchState"
        );

        if(button){

            button.disabled = true;

            button.textContent =
            "✔ Recherche terminée";

        }

        if(state){

            state.textContent =
            "✅ Développé";

        }

    }

    //------------------------------------------------
    // Production hors ligne
    //------------------------------------------------

    if(data.saveDate){

        const secondsAway =

        Math.floor(

            (Date.now()

            -

            data.saveDate)

            /1000

        );

        const production =

            robotCount *

            robotProduction

            +

            factoryLevel *

            factoryProduction;

        const gain =

        production *

        secondsAway;

        if(gain > 0){

            score += gain;

            alert(

                "💎 Pendant votre absence vous avez gagné "

                +

                gain

                +

                " cristaux !"

            );

        }

    }

    updateScore();

}

//====================================================
// SAUVEGARDE AUTOMATIQUE
//====================================================

setInterval(function(){

    saveGame();

},5000);

//====================================================
// SAUVEGARDE AVANT FERMETURE
//====================================================

window.addEventListener(

    "beforeunload",

    saveGame

);

//====================================================
// INITIALISATION
//====================================================

loadGame();

console.log(

    "💾 Sauvegarde chargée."

);

//====================================================
// PARTIE 5
// LABORATOIRE ET ARBRE TECHNOLOGIQUE
//====================================================

//====================================================
// ELEMENTS HTML
//====================================================

const researchMenu =
document.getElementById("researchMenu");

const robotTechButton =
document.getElementById("openRobotTech");

const buildingTechButton =
document.getElementById("openBuildingTech");

const cityTechButton =
document.getElementById("openCityTech");

const energyTechButton =
document.getElementById("openEnergyTech");

//====================================================
// OUVERTURE DU LABORATOIRE
//====================================================

function openResearchMenu(){

    if(labLevel <= 0){

        alert(
            "Construisez un laboratoire."
        );

        return;

    }

    researchMenu.style.display = "flex";

}

function closeResearchMenu(){

    researchMenu.style.display = "none";

}

if(closeResearchButton){

    closeResearchButton.addEventListener(

        "click",

        closeResearchMenu

    );

}

//====================================================
// RECHERCHE ROBOTS
//====================================================

function unlockRobotBranch(){

    if(robotTechUnlocked){

        alert("Déjà débloqué.");

        return;

    }

    if(score < 10000){

        alert("10000 💎 nécessaires.");

        return;

    }

    score -= 10000;

    robotTechUnlocked = true;

    updateScore();

    saveGame();

    alert(

        "🤖 Branche Robots débloquée !"

    );

}

//====================================================
// RECHERCHE BATIMENTS
//====================================================

function unlockBuildingBranch(){

    if(buildingTechUnlocked){

        alert("Déjà débloqué.");

        return;

    }

    if(score < 15000){

        alert("15000 💎 nécessaires.");

        return;

    }

    score -= 15000;

    buildingTechUnlocked = true;

    updateScore();

    saveGame();

    alert(

        "🏭 Branche Bâtiments débloquée !"

    );

}

//====================================================
// RECHERCHE VILLE
//====================================================

function unlockCityBranch(){

    if(cityTechUnlocked){

        alert("Déjà débloqué.");

        return;

    }

    if(score < 20000){

        alert("20000 💎 nécessaires.");

        return;

    }

    score -= 20000;

    cityTechUnlocked = true;

    updateScore();

    saveGame();

    alert(

        "🏙️ Branche Ville débloquée !"

    );

}

//====================================================
// RECHERCHE ENERGIE
//====================================================

function unlockEnergyBranch(){

    if(energyTechUnlocked){

        alert("Déjà débloqué.");

        return;

    }

    if(score < 25000){

        alert("25000 💎 nécessaires.");

        return;

    }

    score -= 25000;

    energyTechUnlocked = true;

    updateScore();

    saveGame();

    alert(

        "⚡ Branche Énergie débloquée !"

    );

}

//====================================================
// EVENEMENTS
//====================================================

if(robotTechButton){

    robotTechButton.addEventListener(

        "click",

        unlockRobotBranch

    );

}

if(buildingTechButton){

    buildingTechButton.addEventListener(

        "click",

        unlockBuildingBranch

    );

}

if(cityTechButton){

    cityTechButton.addEventListener(

        "click",

        unlockCityBranch

    );

}

if(energyTechButton){

    energyTechButton.addEventListener(

        "click",

        unlockEnergyBranch

    );

}

//====================================================
// OUVERTURE PAR DOUBLE CLIC
//====================================================

labButton.addEventListener(

    "dblclick",

    openResearchMenu

);

console.log(
    "🌳 Arbre technologique chargé."
);

//====================================================
// PARTIE 6
// FINALISATION DU JEU
//====================================================

//====================================================
// SUCCÈS
//====================================================

const achievements = [

{

id:"firstClick",
name:"👆 Premier clic",
description:"Cliquer une première fois.",
unlocked:false

},

{

id:"firstRobot",
name:"🤖 Premier robot",
description:"Construire un robot.",
unlocked:false

},

{

id:"firstFactory",
name:"🏭 Première usine",
description:"Construire une usine.",
unlocked:false

},

{

id:"firstLab",
name:"🧪 Scientifique",
description:"Construire un laboratoire.",
unlocked:false

},

{

id:"hundred",
name:"💎 Collectionneur",
description:"Atteindre 100 cristaux.",
unlocked:false

},

{

id:"thousand",
name:"💎 Riche",
description:"Atteindre 1000 cristaux.",
unlocked:false

},

{

id:"million",
name:"👑 Empire",
description:"Atteindre 1 000 000 cristaux.",
unlocked:false

}

];

//====================================================
// DEBLOQUER UN SUCCES
//====================================================

function unlockAchievement(id){

    const achievement = achievements.find(

        a => a.id === id

    );

    if(!achievement){

        return;

    }

    if(achievement.unlocked){

        return;

    }

    achievement.unlocked = true;

    showNotification(

        "🏆 Succès",

        achievement.name

    );

    saveGame();

}

//====================================================
// VERIFICATION
//====================================================

function checkAchievements(){

    if(score >= 100){

        unlockAchievement("hundred");

    }

    if(score >= 1000){

        unlockAchievement("thousand");

    }

    if(score >= 1000000){

        unlockAchievement("million");

    }

    if(robotCount > 0){

        unlockAchievement("firstRobot");

    }

    if(factoryLevel > 0){

        unlockAchievement("firstFactory");

    }

    if(labLevel > 0){

        unlockAchievement("firstLab");

    }

}

//====================================================
// NOTIFICATION
//====================================================

function showNotification(title,message){

    const notif = document.createElement("div");

    notif.className = "notification";

    notif.innerHTML =

    "<h3>"+title+"</h3>"+

    "<p>"+message+"</p>";

    document.body.appendChild(notif);

    setTimeout(function(){

        notif.classList.add("show");

    },100);

    setTimeout(function(){

        notif.classList.remove("show");

    },3500);

    setTimeout(function(){

        notif.remove();

    },4000);

}

//====================================================
// JOUR / NUIT
//====================================================

function changeSky(){

    isNight = !isNight;

    if(isNight){

        sky.classList.add("night");

    }

    else{

        sky.classList.remove("night");

    }

}

// Toutes les deux minutes

setInterval(

    changeSky,

    120000

);

//====================================================
// SAUVEGARDE AUTOMATIQUE
//====================================================

setInterval(function(){

    saveGame();

},5000);

//====================================================
// MISE A JOUR AUTOMATIQUE
//====================================================

setInterval(function(){

    updateScore();

    checkAchievements();

},250);

//====================================================
// REINITIALISATION
//====================================================

function resetGame(){

    if(

        !confirm(

            "Voulez-vous vraiment recommencer ?"

        )

    ){

        return;

    }

    localStorage.removeItem(

        "FutureClickerSave"

    );

    location.reload();

}

//====================================================
// RACCOURCI CLAVIER
//====================================================

document.addEventListener(

    "keydown",

    function(event){

        if(

            event.ctrlKey &&

            event.key === "r"

        ){

            event.preventDefault();

            resetGame();

        }

    }

);

//====================================================
// DEMARRAGE
//====================================================

loadGame();

updateScore();

checkAchievements();

console.log("✅ Future Clicker chargé avec succès !");