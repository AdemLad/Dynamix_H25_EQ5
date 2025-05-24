var Moteur = Matter.Engine,
    Rendu = Matter.Render,
    Executeur = Matter.Runner,
    Corps = Matter.Bodies,
    Composite = Matter.Composite,
    Contrainte = Matter.Constraint,
    ContrainteSouris = Matter.MouseConstraint,
    Souris = Matter.Mouse,
    CorpsUnitaire = Matter.Body;

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

// Point d'attache du pendule
var pivot = Corps.circle(400, 100, 10, { isStatic: true, render: { fillStyle: "black" } });

// Variables pour le pendule
var rayonPendule = 30;
var massePendule = 1;

// Création du pendule (initial)
var pendule = Corps.circle(400, 300, rayonPendule, { 
    mass: massePendule, 
    friction: 0, 
    inertia: Infinity, 
    render: { fillStyle: "blue" } 
});

// Liaison entre le pivot et le pendule
var tige = Contrainte.create({
    bodyA: pivot,
    bodyB: pendule,
    length: 200,
    stiffness: 1,
    damping: 0, // Pas de friction dans la contrainte
    render: { strokeStyle: "black", lineWidth: 3 }
});

// Ajout des objets au monde
Composite.add(monde, [pivot, pendule, tige]);

// Ajout du contrôle souris
var souris = Souris.create(rendu.canvas);
var contrainteSouris = ContrainteSouris.create(moteur, {
    mouse: souris,
    constraint: {
        angularStiffness: 0,
        render: { visible: false }
    }
});

Composite.add(monde, contrainteSouris);
rendu.mouse = souris;

// Fonction pour réinitialiser le pendule
function reinitialiserPendule() {
    CorpsUnitaire.setPosition(pendule, { x: 400, y: 300 });
    CorpsUnitaire.setVelocity(pendule, { x: 0, y: 0 });
    CorpsUnitaire.setAngularVelocity(pendule, 0);
}

// Fonction pour mettre à jour le pendule
function mettreAJourPendule() {
    // Récupérer les nouvelles valeurs
    var nouveauRayon = parseFloat(document.getElementById("radius").value);
    var nouvelleMasse = parseFloat(document.getElementById("mass").value);

    // Vérification des entrées utilisateur
    if (isNaN(nouveauRayon) || nouveauRayon <= 0) nouveauRayon = 30;
    if (isNaN(nouvelleMasse) || nouvelleMasse <= 0) nouvelleMasse = 1;

    // Supprimer l'ancien pendule et sa liaison
    Composite.remove(monde, [pendule, tige]);

    // Créer un nouveau pendule avec les nouvelles valeurs
    pendule = Corps.circle(400, 300, nouveauRayon, { 
        mass: nouvelleMasse, 
        friction: 0, 
        frictionAir: 0, 
        inertia: Infinity, 
        render: { fillStyle: "blue" } 
    });

    // Nouvelle liaison
    tige = Contrainte.create({
        bodyA: pivot,
        bodyB: pendule,
        length: 200,
        stiffness: 1,
        damping: 0, 
        render: { strokeStyle: "black", lineWidth: 3 }
    });

    // Ajouter le nouveau pendule au monde
    Composite.add(monde, [pendule, tige]);

    // Réinitialiser la position et vitesse
    reinitialiserPendule();
}
