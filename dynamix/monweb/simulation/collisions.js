// Composants de Matter.js
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var canvasWidth = 800;
var canvasHeight = 600;

// Création de l'engin et du monde
var engine = Engine.create();
var world = engine.world;
engine.world.gravity.y = 0; // Gravité désactivée

// Création du rendu
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: '#000000'
    }
});

Render.run(render);

// Démarrage du moteur de simulation
var runner = Runner.create();
Runner.run(runner, engine);

// Création des bordures du monde
const borders = [
    Bodies.rectangle(canvasWidth / 2, canvasHeight - 10, canvasWidth, 20, { isStatic: true }),
    Bodies.rectangle(10, canvasHeight / 2, 20, canvasHeight, { isStatic: true }),
    Bodies.rectangle(canvasWidth - 10, canvasHeight / 2, 20, canvasHeight, { isStatic: true }),
    Bodies.rectangle(canvasWidth / 2, 10, canvasWidth, 20, { isStatic: true })
];

World.add(world, borders);

// Définition des objets mobiles
var boxA, boxB;
function createObjects() {
    // Récupération des valeurs des champs HTML
    var massA = parseFloat(document.getElementById("massA").value);
    var radiusA = parseFloat(document.getElementById("rayonA").value);
    var massB = parseFloat(document.getElementById("massB").value);
    var radiusB = parseFloat(document.getElementById("rayonB").value);

    // Création du premier objet (boxA)
    boxA = Bodies.circle(150, 500, radiusA, {
        mass: massA,
        restitution: 0.8,
        density: 0.005,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'red' }
    });

    // Création du second objet (boxB)
    boxB = Bodies.circle(650, 500, radiusB, {
        mass: massB,
        restitution: 0.8,
        density: 0.005,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'blue' }
    });

    // Ajout des objets au monde
    Composite.add(world, [boxA, boxB]);
}

// Initialisation des objets
createObjects();
Composite.add(world, [ground]);

// Fonction pour mettre à jour les objets selon les valeurs utilisateur
function updateObjects() {
    // Suppression des anciens objets
    Composite.remove(world, [boxA, boxB]);

    // Recréation des objets avec les nouvelles valeurs
    createObjects();

    // Réinitialisation position et vitesse
    resetObjects();
}

// Fonction pour appliquer les forces aux deux objets
function applyForces() {
    applyForceA();
    applyForceB();
}

// Fonction pour appliquer une force à boxA
function applyForceA() {
    var forceA = parseFloat(document.getElementById("forceA").value);
    var angleA = parseFloat(document.getElementById("angleA").value) * (Math.PI / 180);

    var forceXA = forceA * Math.cos(angleA);
    var forceYA = -forceA * Math.sin(angleA);

    Body.applyForce(boxA, boxA.position, { x: forceXA, y: forceYA });
}

// Fonction pour appliquer une force à boxB
function applyForceB() {
    var forceB = parseFloat(document.getElementById("forceB").value);
    var angleB = parseFloat(document.getElementById("angleB").value) * (Math.PI / 180);

    var forceXB = forceB * Math.cos(angleB);
    var forceYB = -forceB * Math.sin(angleB);

    Body.applyForce(boxB, boxB.position, { x: forceXB, y: forceYB });
}

// Fonction pour réinitialiser les positions et vitesses des objets
function resetObjects() {
    Body.setPosition(boxA, { x: 150, y: 500 });
    Body.setVelocity(boxA, { x: 0, y: 0 });
    Body.setAngularVelocity(boxA, 0);

    Body.setPosition(boxB, { x: 650, y: 500 });
    Body.setVelocity(boxB, { x: 0, y: 0 });
    Body.setAngularVelocity(boxB, 0);
}
