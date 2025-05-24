var Moteur = Matter.Engine,
    Rendu = Matter.Render,
    Executeur = Matter.Runner,
    Corps = Matter.Bodies,
    Composite = Matter.Composite,
    CorpsUnitaire = Matter.Body,
    Souris = Matter.Mouse,
    ContrainteSouris = Matter.MouseConstraint;

// Constante gravitationnelle
const G = 1;

// Création du moteur et du monde
var moteur = Moteur.create();
var monde = moteur.world;

// Création du rendu
var rendu = Rendu.create({
    element: document.body,
    engine: moteur,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

Rendu.run(rendu);

// Création du moteur physique
var executeur = Executeur.create();
Executeur.run(executeur, moteur);

moteur.world.gravity.y = 0;

// Création des deux boules avec masses initiales
var boule1 = Corps.circle(300, 300, 20, { mass: 2 });
var boule2 = Corps.circle(500, 300, 20, { mass: 2 });

// Ajout des boules au monde
Composite.add(monde, [boule1, boule2]);

// Fonction pour calculer la distance entre les deux boules
function calculerDistance(corps1, corps2) {
    var dx = corps2.position.x - corps1.position.x;
    var dy = corps2.position.y - corps1.position.y;
    return Math.sqrt((dx * dx) + (dy * dy));
}

// Fonction pour appliquer la force gravitationnelle entre les deux boules
function appliquerGravite() {
    var distance = calculerDistance(boule1, boule2);
    if (distance > 0) {
        var force = G * (boule1.mass * boule2.mass) / (distance * distance); // F = G * (m1 * m2) / d^2

        var fx = force * (boule2.position.x - boule1.position.x) / distance; // Force sur X
        var fy = force * (boule2.position.y - boule1.position.y) / distance; // Force sur Y

        // Appliquer la force à chaque boule
        CorpsUnitaire.applyForce(boule1, boule1.position, { x: fx, y: fy });
        CorpsUnitaire.applyForce(boule2, boule2.position, { x: -fx, y: -fy });
    }
}

// Mise à jour de la gravité à chaque tick
Matter.Events.on(moteur, 'beforeUpdate', function() {
    appliquerGravite();
});

// Sliders de contrôle des masses

var curseur1 = document.createElement("input");
curseur1.type = "range";
curseur1.min = 1;
curseur1.max = 100;
curseur1.value = boule1.mass;
curseur1.style.position = "absolute";
curseur1.style.top = "20px";
curseur1.style.left = "20px";
document.body.appendChild(curseur1);

curseur1.addEventListener('input', function() {
    boule1.mass = parseFloat(curseur1.value);
});

var curseur2 = document.createElement("input");
curseur2.type = "range";
curseur2.min = 1;
curseur2.max = 100;
curseur2.value = boule2.mass;
curseur2.style.position = "absolute";
curseur2.style.top = "60px";
curseur2.style.left = "20px";
document.body.appendChild(curseur2);

curseur2.addEventListener('input', function() {
    boule2.mass = parseFloat(curseur2.value);
});

// Ajout de la souris
var souris = Souris.create(rendu.canvas);
var contrainteSouris = ContrainteSouris.create(moteur, {
    mouse: souris,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});

Composite.add(monde, contrainteSouris);
rendu.mouse = souris;
