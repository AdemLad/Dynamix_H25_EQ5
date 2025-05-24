// Composants de Matter.js
var Moteur = Matter.Engine,
    Rendu = Matter.Render,
    Executeur = Matter.Runner,
    Corps = Matter.Bodies,
    Composite = Matter.Composite,
    CorpsUnitaire = Matter.Body,
    Souris = Matter.Mouse,
    ContrainteSouris = Matter.MouseConstraint;

var largeurCanvas = 800;
var hauteurCanvas = 600;

// Création du moteur et du monde
var moteur = Moteur.create();
var monde = moteur.world;
moteur.world.gravity.y = 0; // Gravité désactivée

// Création du rendu
var rendu = Rendu.create({
    element: document.body,
    engine: moteur,
    options: {
        width: largeurCanvas,
        height: hauteurCanvas,
        wireframes: false,
        background: '#000000'
    }
});

Rendu.run(rendu);

// Démarrage du moteur de simulation
var executeur = Executeur.create();
Executeur.run(executeur, moteur);

// Création des bordures du monde
const bordures = [
    Corps.rectangle(largeurCanvas / 2, hauteurCanvas - 10, largeurCanvas, 20, { isStatic: true }),
    Corps.rectangle(10, hauteurCanvas / 2, 20, hauteurCanvas, { isStatic: true }),
    Corps.rectangle(largeurCanvas - 10, hauteurCanvas / 2, 20, hauteurCanvas, { isStatic: true }),
    Corps.rectangle(largeurCanvas / 2, 10, largeurCanvas, 20, { isStatic: true })
];

Composite.add(monde, bordures);

// Définition des objets mobiles
var objetA, objetB;
function creerObjets() {
    // Récupération des valeurs des champs HTML
    var masseA = parseFloat(document.getElementById("massA").value);
    var rayonA = parseFloat(document.getElementById("rayonA").value);
    var masseB = parseFloat(document.getElementById("massB").value);
    var rayonB = parseFloat(document.getElementById("rayonB").value);

    // Création du premier objet (objetA)
    objetA = Corps.circle(150, 500, rayonA, {
        mass: masseA,
        restitution: 0.8,
        density: 0.005,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'red' }
    });

    // Création du second objet (objetB)
    objetB = Corps.circle(650, 500, rayonB, {
        mass: masseB,
        restitution: 0.8,
        density: 0.005,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'blue' }
    });

    // Ajout des objets au monde
    Composite.add(monde, [objetA, objetB]);
}

// Initialisation des objets
creerObjets();
Composite.add(monde, [ground]);

// Fonction pour mettre à jour les objets selon les valeurs utilisateur
function majObjets() {
    // Suppression des anciens objets
    Composite.remove(monde, [objetA, objetB]);

    // Recréation des objets avec les nouvelles valeurs
    creerObjets();

    // Réinitialisation position et vitesse
    reinitialiserObjets();
}

// Fonction pour appliquer les forces aux deux objets
function appliquerForces() {
    appliquerForceA();
    appliquerForceB();
}

// Fonction pour appliquer une force à objetA
function appliquerForceA() {
    var forceA = parseFloat(document.getElementById("forceA").value);
    var angleA = parseFloat(document.getElementById("angleA").value) * (Math.PI / 180);

    var forceXA = forceA * Math.cos(angleA);
    var forceYA = -forceA * Math.sin(angleA);

    CorpsUnitaire.applyForce(objetA, objetA.position, { x: forceXA, y: forceYA });
}

// Fonction pour appliquer une force à objetB
function appliquerForceB() {
    var forceB = parseFloat(document.getElementById("forceB").value);
    var angleB = parseFloat(document.getElementById("angleB").value) * (Math.PI / 180);

    var forceXB = forceB * Math.cos(angleB);
    var forceYB = -forceB * Math.sin(angleB);

    CorpsUnitaire.applyForce(objetB, objetB.position, { x: forceXB, y: forceYB });
}

// Fonction pour réinitialiser les positions et vitesses des objets
function reinitialiserObjets() {
    CorpsUnitaire.setPosition(objetA, { x: 150, y: 500 });
    CorpsUnitaire.setVelocity(objetA, { x: 0, y: 0 });
    CorpsUnitaire.setAngularVelocity(objetA, 0);

    CorpsUnitaire.setPosition(objetB, { x: 650, y: 500 });
    CorpsUnitaire.setVelocity(objetB, { x: 0, y: 0 });
    CorpsUnitaire.setAngularVelocity(objetB, 0);
}
