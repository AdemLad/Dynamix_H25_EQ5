var Moteur = Matter.Engine,
    Rendu = Matter.Render,
    Executeur = Matter.Runner,
    Corps = Matter.Bodies,
    Composite = Matter.Composite,
    CorpsUnitaire = Matter.Body,
    Souris = Matter.Mouse,
    ContrainteSouris = Matter.MouseConstraint;

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

// Création du sol
var sol = Corps.rectangle(800, 580, 60000, 60, {
    isStatic: true,
    render: { fillStyle: '#654321' }
});

// Création du projectile
var rayon = parseFloat(document.getElementById("rayon").value);
var masse = parseFloat(document.getElementById("mass").value);
var projectile = Corps.circle(150, 500, rayon, {
    restitution: 0.8,
    mass: masse,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    render: { fillStyle: 'red' }
});

const texteVx = document.getElementById('vx');
const texteVy = document.getElementById('vy');
const canvasVecteur = document.getElementById('vectorCanvas');
const contexteVecteur = canvasVecteur.getContext('2d');

Matter.Events.on(moteur, 'afterUpdate', function () {
    if (!projectile) return;

    // Mise à jour des vitesses textuelles
    const vx = projectile.velocity.x.toFixed(2);
    const vy = projectile.velocity.y.toFixed(2);
    texteVx.textContent = vx;
    texteVy.textContent = vy;

    // Dessin de la flèche dans le canvas fixe
    const echelle = 5;
    const centreX = 50;
    const centreY = 50;
    const finX = centreX + projectile.velocity.x * echelle;
    const finY = centreY + projectile.velocity.y * echelle;

    contexteVecteur.clearRect(0, 0, 100, 100);

    // Ligne principale
    contexteVecteur.beginPath();
    contexteVecteur.moveTo(centreX, centreY);
    contexteVecteur.lineTo(finX, finY);
    contexteVecteur.strokeStyle = 'blue';
    contexteVecteur.lineWidth = 2;
    contexteVecteur.stroke();

    // Tête de flèche
    const angle = Math.atan2(finY - centreY, finX - centreX);
    const longueurTete = 8;
    contexteVecteur.beginPath();
    contexteVecteur.moveTo(finX, finY);
    contexteVecteur.lineTo(finX - longueurTete * Math.cos(angle - Math.PI / 6), finY - longueurTete * Math.sin(angle - Math.PI / 6));
    contexteVecteur.lineTo(finX - longueurTete * Math.cos(angle + Math.PI / 6), finY - longueurTete * Math.sin(angle + Math.PI / 6));
    contexteVecteur.lineTo(finX, finY);
    contexteVecteur.fillStyle = 'blue';
    contexteVecteur.fill();
});

// Ajout des objets au monde
Composite.add(monde, [sol, projectile]);

// Ajout du contrôle souris
var souris = Souris.create(rendu.canvas);
var contrainteSouris = ContrainteSouris.create(moteur, {
    mouse: souris,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});

(function suivreCamera() {
    Matter.Events.on(moteur, 'afterUpdate', function () {
        if (projectile) {
            Rendu.lookAt(rendu, {
                min: {
                    x: projectile.position.x - 400,
                    y: projectile.position.y - 500
                },
                max: {
                    x: projectile.position.x + 400,
                    y: projectile.position.y + 100
                }
            });
        }
    });
})();

Composite.add(monde, contrainteSouris);
rendu.mouse = souris;

// Fonction pour appliquer une force au projectile
function appliquerForce() {
    var force = parseFloat(document.getElementById("force").value);
    var angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180);

    if (isNaN(force) || isNaN(angle)) {
        alert("Veuillez entrer des valeurs valides pour la force et l'angle.");
        return;
    }

    const basBalle = projectile.position.y + projectile.circleRadius;
    const hautSol = sol.position.y - 30;

    if (basBalle < hautSol - 1) {
        alert("La balle doit être au sol pour appliquer une force !");
        return;
    }

    var forceX = force * Math.cos(angle);
    var forceY = -force * Math.sin(angle);

    CorpsUnitaire.applyForce(projectile, projectile.position, { x: forceX, y: forceY });
}

(function afficherVitesse() {
    Matter.Events.on(moteur, 'afterUpdate', function () {
        if (projectile) {
            document.getElementById("vx").textContent = projectile.velocity.x.toFixed(2);
            document.getElementById("vy").textContent = -projectile.velocity.y.toFixed(2);
        }
    });
})();

// Fonction pour réinitialiser le projectile
function reinitialiserObjet() {
    CorpsUnitaire.setPosition(projectile, { x: 0, y: 500 });
    CorpsUnitaire.setVelocity(projectile, { x: 0, y: 0 });
    CorpsUnitaire.setAngularVelocity(projectile, 0);
}

// Fonction pour mettre à jour le projectile avec les nouvelles valeurs
function mettreAJourObjet() {
    Composite.remove(monde, projectile);

    var rayon = parseFloat(document.getElementById("rayon").value);
    var masse = parseFloat(document.getElementById("mass").value);

    projectile = Corps.circle(150, 500, rayon, {
        restitution: 0.8,
        mass: masse,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'red' }
    });

    Composite.add(monde, projectile);
}
