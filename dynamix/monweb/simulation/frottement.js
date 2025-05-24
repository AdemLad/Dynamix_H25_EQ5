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

// Création des objets
// 4 murs
var murA = Corps.rectangle(400, 0, 800, 50, { isStatic: true });
var murB = Corps.rectangle(400, 600, 800, 50, { isStatic: true });
var murC = Corps.rectangle(800, 300, 50, 600, { isStatic: true });
var murD = Corps.rectangle(0, 300, 50, 600, { isStatic: true });

// Création de la table
var tableA = Corps.rectangle(0, 300, 600, 25, {
    isStatic: true,
    render: { fillStyle: "gray" }
});

// Ajout des objets au monde
Composite.add(monde, [murA, murB, murC, murD, tableA]);

// Fonction pour réinitialiser le monde
function reinitialiserFrottement() {

}

// Fonction pour mettre à jour les objets
function mettreAJourFrottement() {
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

    // Ajouter le nouveau pendule au monde
    Composite.add(monde, [pendule, tige]);

    // Réinitialiser la position et vitesse
    reinitialiserPendule();
}
