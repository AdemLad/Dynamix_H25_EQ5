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

//Création des objets
//4mures
var mureA = Bodies.rectangle(400, 0, 800, 50, { 
    isStatic: true ,
});
var mureB = Bodies.rectangle(400, 600, 800, 50, { 
    isStatic: true,
 });
var mureC = Bodies.rectangle(800, 300, 50, 600, { 
    isStatic: true,
});
var mureD =  Bodies.rectangle(0, 300, 50, 600, {
     isStatic: true,
});

//création des objets
var tableA = Bodies.rectangle(0,300,600,25, {
    isStatic: true,
    render: { fillStyle: "gray" }
});

// Ajout des objets au monde
Composite.add(world, [mureA, mureB, mureC, mureD, tableA]);

// Fonction pour réinitialiser le monde
function resetFrottement() {
    
}

// Fonction pour mettre à jour les objets
function updateFrottement() {
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

    // Ajouter le nouveau pendule au monde
    Composite.add(world, [pendulum, rod]);

    // Réinitialiser la position et vitesse
    resetPendulum();
}
