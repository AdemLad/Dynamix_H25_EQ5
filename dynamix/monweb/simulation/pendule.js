var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body;

// Création de l'engine et du monde
var engine = Engine.create();
var world = engine.world;

// Création du rendu
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

Render.run(render);

// Création du moteur physique
var runner = Runner.create();
Runner.run(runner, engine);



// Point d'attache du pendule
var pivot = Bodies.circle(400, 100, 10, { isStatic: true, render: { fillStyle: "black" } });

// Variables pour le pendule
var pendulumRadius = 30;
var pendulumMass = 1;

// Création du pendule (initial)
var pendulum = Bodies.circle(400, 300, pendulumRadius, { 
    mass: pendulumMass, 
    friction: 0, 
    inertia: Infinity, 
    render: { fillStyle: "blue" } 
});

// Liaison entre le pivot et le pendule
var rod = Constraint.create({
    bodyA: pivot,
    bodyB: pendulum,
    length: 200,
    stiffness: 1,
    damping: 0, // Pas de friction dans la contrainte
    render: { strokeStyle: "black", lineWidth: 3 }
});

// Ajout des objets au monde
Composite.add(world, [pivot, pendulum, rod]);

// Ajout du contrôle souris
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        angularStiffness: 0,
        render: { visible: false }
    }
});

Composite.add(world, mouseConstraint);
render.mouse = mouse;

// Fonction pour réinitialiser le pendule
function resetPendulum() {
    Body.setPosition(pendulum, { x: 400, y: 300 });
    Body.setVelocity(pendulum, { x: 0, y: 0 });
    Body.setAngularVelocity(pendulum, 0);
}

// Fonction pour mettre à jour le pendule
function updatePendulum() {
    // Récupérer les nouvelles valeurs
    var newRadius = parseFloat(document.getElementById("radius").value);
    var newMass = parseFloat(document.getElementById("mass").value);

    // Vérification des entrées utilisateur
    if (isNaN(newRadius) || newRadius <= 0) newRadius = 30;
    if (isNaN(newMass) || newMass <= 0) newMass = 1;

    // Supprimer l'ancien pendule et sa liaison
    Composite.remove(world, [pendulum, rod]);

    // Créer un nouveau pendule avec les nouvelles valeurs
    pendulum = Bodies.circle(400, 300, newRadius, { 
        mass: newMass, 
        friction: 0, 
        frictionAir: 0, 
        inertia: Infinity, 
        render: { fillStyle: "blue" } 
    });

    // Nouvelle liaison
    rod = Constraint.create({
        bodyA: pivot,
        bodyB: pendulum,
        length: 200,
        stiffness: 1,
        damping: 0, 
        render: { strokeStyle: "black", lineWidth: 3 }
    });

    // Ajouter le nouveau pendule au monde
    Composite.add(world, [pendulum, rod]);

    // Réinitialiser la position et vitesse
    resetPendulum();
}
