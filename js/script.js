//====================================================
// FUTURE CLICKER
// Script principal
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

// Jour / Nuit
let isNight = false;

//====================================================
// ELEMENTS HTML
//====================================================

// Affichage
const scoreText = document.getElementById("score");

// Réacteur
const core = document.getElementById("reactor");
const clickButton = document.getElementById("clickButton");

// Boutique
const fingerButton = document.getElementById("fingerUpgrade");
const robotButton = document.getElementById("robotUpgrade");
const batteryButton = document.getElementById("batteryUpgrade");
const factoryButton = document.getElementById("factoryUpgrade");

const researchMenu = document.getElementById("researchMenu");

const closeResearch = document.getElementById("closeResearch");

// Prix
const fingerPriceText = document.getElementById("fingerPrice");
const robotPriceText = document.getElementById("robotPrice");
const batteryPriceText = document.getElementById("batteryPrice");
const factoryPriceText = document.getElementById("factoryPrice");

// Informations
const robotCountText = document.getElementById("robotCount");
const batteryLevelText = document.getElementById("batteryLevel");

// Conteneurs
const robotsContainer = document.getElementById("robots");
const batteriesContainer = document.getElementById("batteries");
const factoryContainer = document.getElementById("factoryContainer");

const labButton = document.getElementById("labUpgrade");
const labPriceText = document.getElementById("labPrice");
const labContainer = document.getElementById("labContainer");

// Ville
const buildings = document.querySelectorAll(".building");

// Ciel
const sky = document.getElementById("sky");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");

// Voitures
const flyingCars = document.getElementById("flyingCars");

// Succès
const achievementList = document.getElementById("achievementList");

//====================================================
// MISE A JOUR DE L'INTERFACE
//====================================================

function updateScore(){

    const production =
        robotCount * robotProduction +
        factoryLevel * factoryProduction;

    scoreText.innerHTML =

        "Cristaux : " + score + " 💎" +

        "<br><br>" +

        "👆 Clic : +" + clickPower +

        "<br>" +

        "🤖 Production : " + production + " / seconde";

    fingerPriceText.textContent =
        fingerPrice + " 💎";

    robotPriceText.textContent =
        robotPrice + " 💎";

    batteryPriceText.textContent =
        batteryPrice + " 💎";

    factoryPriceText.textContent =
        factoryPrice + " 💎";

    robotCountText.textContent =
        "Robots : " + robotCount;

    batteryLevelText.textContent =
        "Niveau : " + batteryLevel;

        checkAchievements();

}

// Premier affichage
updateScore();

//====================================================
// CLIC SUR LE REACTEUR
//====================================================

function clickReactor(){

    // Ajoute les cristaux

    score += clickPower;

    // Met à jour l'affichage

    updateScore();

    // Sauvegarde

    saveGame();

    // Succès

    unlock("firstClick");

    //=================================
    // Animation du réacteur
    //=================================

    core.classList.remove("clicked");

    void core.offsetWidth;

    core.classList.add("clicked");

    setTimeout(function(){

        core.classList.remove("clicked");

    },180);

    //=================================
    // Texte +Cristaux
    //=================================

    const txt = document.createElement("div");

    txt.className = "floatingText";

    txt.innerHTML = "+" + clickPower + " 💎";

    const rect = core.getBoundingClientRect();

    txt.style.left =
    (rect.left + rect.width / 2) + "px";

    txt.style.top =
    (rect.top + 40) + "px";

    document.body.appendChild(txt);

    setTimeout(function(){

        txt.remove();

    },1000);

    //=================================
    // Illumine un bâtiment
    //=================================

    if(buildings.length > 0){

        const randomBuilding =

        buildings[
            Math.floor(
                Math.random() * buildings.length
            )
        ];

        randomBuilding.classList.add("powered");

        setTimeout(function(){

            randomBuilding.classList.remove("powered");

        },2500);

    }

}

//====================================================
// EVENEMENTS
//====================================================

core.addEventListener("click", clickReactor);

clickButton.addEventListener("click", clickReactor);

//====================================================
// VOITURES VOLANTES
//====================================================

const carColors = [

    "#00e5ff",
    "#ff006e",
    "#00ff88",
    "#ffae00",
    "#8a5cff"

];

function spawnCar(){

    const car = document.createElement("div");

    car.className = "car";

    const body = document.createElement("div");

    body.className = "carBody";

    body.style.background =

    carColors[
        Math.floor(
            Math.random() * carColors.length
        )
    ];

    car.appendChild(body);

    // Position verticale

    car.style.top =

    (80 + Math.random() * 320) + "px";

    // Vitesse

    const duration =

    8 + Math.random() * 6;

    car.style.animationDuration =

    duration + "s";

    flyingCars.appendChild(car);

    setTimeout(function(){

        car.remove();

    }, duration * 1000);

}

function randomCar(){

    spawnCar();

    const next =

    5000 +

    Math.random() * 10000;

    setTimeout(randomCar, next);

}

// Lance les voitures

randomCar();


//====================================================
// JOUR / NUIT
//====================================================

function changeSky(){

    if(isNight){

        //--------------------
        // JOUR
        //--------------------

        sky.style.background =

        "linear-gradient(#5ec9ff,#b8e8ff,#d7f3ff)";

        sun.style.opacity = 1;

        moon.style.opacity = 0;

        stars.style.opacity = 0;

        buildings.forEach(function(building){

            building.classList.remove("powered");

        });

    }

    else{

        //--------------------
        // NUIT
        //--------------------

        sky.style.background =

        "linear-gradient(#050816,#091229,#13203d)";

        sun.style.opacity = 0;

        moon.style.opacity = 1;

        stars.style.opacity = 0.9;

        buildings.forEach(function(building){

            building.classList.add("powered");

        });

    }

    isNight = !isNight;

}

// Change toutes les 2 minutes

setInterval(changeSky,120000);

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

    unlock("firstFinger");

    saveGame();

}

fingerButton.addEventListener("click", buyFinger);


//====================================================
// ROBOT
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

    unlock("firstRobot");

    saveGame();

}

robotButton.addEventListener("click", buyRobot);


//====================================================
// BATTERIE
//====================================================

function buyBattery(){

    if(score < batteryPrice){

        return;

    }

    score -= batteryPrice;

    batteryLevel++;

    robotProduction++;

    batteryPrice = Math.floor(batteryPrice * 2);

    spawnBattery();

    updateScore();

    unlock("firstBattery");

    saveGame();

}

batteryButton.addEventListener("click", buyBattery);


//====================================================
// USINE
//====================================================

function buyFactory(){

    if(score < factoryPrice){

        return;

    }

    score -= factoryPrice;

    factoryLevel++;

    factoryPrice = Math.floor(factoryPrice * 1.8);

    spawnFactory();

    updateScore();

    unlock("firstFactory");

    saveGame();

}

factoryButton.addEventListener("click", buyFactory);

function buyLab(){

    if(score < labPrice){

        return;

    }

    score -= labPrice;

    labLevel++;

    labPrice = Math.floor(labPrice * 2);

    labPriceText.textContent =
    labPrice + " 💎";

    spawnLab();

if(labLevel === 1){

    alert("🧪 Laboratoire débloqué !");

}

updateScore();

saveGame();

labButton.addEventListener("click", buyLab);


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

    saveGame();

},1000);

function openResearch(){

    if(labLevel <= 0){

        alert("Construisez d'abord un laboratoire !");

        return;

    }

    researchMenu.style.display = "flex";

}

function closeResearchWindow(){

    researchMenu.style.display = "none";

}

closeResearch.addEventListener("click", closeResearchWindow);

labButton.addEventListener("dblclick", openResearch);

//====================================================
// GENERATION DES ROBOTS
//====================================================

function spawnRobot(){

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
    (20 + Math.random() * 60) + "px";

    robotsContainer.appendChild(robot);

}

//====================================================
// GENERATION DES BATTERIES
//====================================================

function spawnBattery(){

    const battery = document.createElement("div");

    battery.className = "battery";

    battery.innerHTML = `

        <div class="batteryStation">

            <div class="batteryCrystal"></div>

            <div class="batteryBody"></div>

        </div>

    `;

    batteriesContainer.appendChild(battery);

}

//====================================================
// GENERATION DES USINES
//====================================================

function spawnFactory(){

    const factory = document.createElement("div");

    factory.className = "factory";

    factory.style.left =
    (50 + Math.random() * 1200) + "px";

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

function spawnLab(){

    const lab = document.createElement("div");

    lab.className = "lab";

    lab.style.left =
    (80 + Math.random()*1100) + "px";

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
// RECONSTRUCTION DE LA VILLE
//====================================================

function rebuildCity(){

    // Vide les anciens éléments

    robotsContainer.innerHTML = "";

    batteriesContainer.innerHTML = "";

    factoryContainer.innerHTML = "";

     labContainer.innerHTML = "";

    // Robots

    for(let i = 0; i < robotCount; i++){

        spawnRobot();

    }

    // Batteries

    for(let i = 0; i < batteryLevel; i++){

        spawnBattery();

    }

    // Usines

    for(let i = 0; i < factoryLevel; i++){

        spawnFactory();

    }

    for(let i = 0; i < labLevel; i++){

    spawnLab();

}

}

//====================================================
// SAUVEGARDE
//====================================================

function saveGame(){

    const data = {

        score: score,

        clickPower: clickPower,

        fingerLevel: fingerLevel,
        fingerPrice: fingerPrice,

        robotCount: robotCount,
        robotPrice: robotPrice,
        robotProduction: robotProduction,

        batteryLevel: batteryLevel,
        batteryPrice: batteryPrice,

        factoryLevel: factoryLevel,
        factoryPrice: factoryPrice,
        factoryProduction: factoryProduction,

        labLevel,
        labPrice,

        achievements: achievements,

        saveDate: Date.now()

    };

    localStorage.setItem(

        "FutureClickerSave",

        JSON.stringify(data)

    );

}

// Sauvegarde automatique

setInterval(saveGame,5000);


//====================================================
// CHARGEMENT
//====================================================

function loadGame(){

    const save = localStorage.getItem("FutureClickerSave");

    if(!save){

        return;

    }

    const data = JSON.parse(save);

    score = data.score ?? 0;

    clickPower = data.clickPower ?? 1;

    fingerLevel = data.fingerLevel ?? 0;
    fingerPrice = data.fingerPrice ?? 10;

    robotCount = data.robotCount ?? 0;
    robotPrice = data.robotPrice ?? 50;
    robotProduction = data.robotProduction ?? 1;

    batteryLevel = data.batteryLevel ?? 0;
    batteryPrice = data.batteryPrice ?? 150;

    factoryLevel = data.factoryLevel ?? 0;
    factoryPrice = data.factoryPrice ?? 500;
    factoryProduction = data.factoryProduction ?? 20;

    labLevel = data.labLevel ?? 0;
    labPrice = data.labPrice ?? 2500;

    labPriceText.textContent =
labPrice + " 💎";

    //------------------------------------------------
    // Recréation de la ville
    //------------------------------------------------

    rebuildCity();

    //------------------------------------------------
    // Rafraîchit l'interface
    //------------------------------------------------

    updateScore();

    //------------------------------------------------
    // Temps hors ligne
    //------------------------------------------------

    if(data.saveDate){

        const secondsAway =

        Math.floor(

            (Date.now() - data.saveDate)

            /1000

        );

        const production =

            robotCount * robotProduction +

            factoryLevel * factoryProduction;

        const offlineGain =

            production * secondsAway;

        if(offlineGain > 0){

            score += offlineGain;

            alert(

                "💎 Pendant votre absence vous avez gagné "

                + offlineGain +

                " cristaux !"

            );

        }

    }

    //------------------------------------------------
    // Succès sauvegardés
    //------------------------------------------------

    if(data.achievements){

        achievements.forEach(function(a){

            const saved =

            data.achievements.find(

                s => s.id === a.id

            );

            if(saved){

                a.unlocked = saved.unlocked;

            }

        });

    }

    refreshAchievements();

    updateScore();

}

//====================================================
// SUCCES
//====================================================

const achievements = [

{

id:"firstClick",

name:"👆 Premier clic",

description:"Cliquer une première fois.",

unlocked:false

},

{

id:"firstFinger",

name:"☝ Premier doigt",

description:"Acheter un doigt amélioré.",

unlocked:false

},

{

id:"firstRobot",

name:"🤖 Premier robot",

description:"Acheter un robot.",

unlocked:false

},

{

id:"firstBattery",

name:"🔋 Première batterie",

description:"Acheter une batterie.",

unlocked:false

},

{

id:"firstFactory",

name:"🏭 Première usine",

description:"Acheter une usine.",

unlocked:false

},

{

id:"hundredCrystals",

name:"💎 Collectionneur",

description:"Posséder 100 cristaux.",

unlocked:false

},

{

id:"thousandCrystals",

name:"💎 Millionnaire",

description:"Posséder 1000 cristaux.",

unlocked:false

}

];

function createAchievements(){

    achievementList.innerHTML = "";

    achievements.forEach(function(a){

        const div = document.createElement("div");

        div.className = "achievement";

        div.id = a.id;

        div.innerHTML =

        "<b>"+a.name+"</b><br>"+a.description;

        achievementList.appendChild(div);

    });

}

function refreshAchievements(){

    achievements.forEach(function(a){

        const element = document.getElementById(a.id);

        if(!element){

            return;

        }

        if(a.unlocked){

            element.classList.add("unlocked");

        }

        else{

            element.classList.remove("unlocked");

        }

    });

}

function unlock(id){

    const success = achievements.find(

        a => a.id === id

    );

    if(!success){

        return;

    }

    if(success.unlocked){

        return;

    }

    success.unlocked = true;

    refreshAchievements();

    saveGame();

    showNotification(

        "🏆 Succès débloqué !",

        success.name

    );

}

function showNotification(title,message){

    const notif = document.createElement("div");

    notif.className = "notification";

    notif.innerHTML =

    "<b>"+title+"</b><br>"+message;

    document.body.appendChild(notif);

    setTimeout(function(){

        notif.classList.add("show");

    },50);

    setTimeout(function(){

        notif.remove();

    },3500);

}

function checkAchievements(){

    if(score >= 100){

        unlock("hundredCrystals");

    }

    if(score >= 1000){

        unlock("thousandCrystals");

    }

}

createAchievements();

refreshAchievements();

loadGame();