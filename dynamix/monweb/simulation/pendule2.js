var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Créer l'engine et le monde
var engine = Engine.create();
var world = engine.world;

// Créer le rendu
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

// Créer le moteur physique
var runner = Runner.create();
Runner.run(runner, engine);

// Point d'attache du pendule (pivot)
var pivot = Bodies.circle(400, 100, 10, { isStatic: true, render: { fillStyle: "black" } });

// Masse suspendue (pendule)
var pendulum = Bodies.circle(400, 300, 30, { 
    density: 0.002, 
    friction: 0,      // Pas de friction interne
    frictionAir: 0,   // Pas de friction de l'air
    restitution: 1,   // Restitution parfaite (rebond sans perte d'énergie)
    render: { fillStyle: "blue" }
});

// Créer la contrainte (tige ou corde entre le pivot et le pendule)
var rod = Constraint.create({
    bodyA: pivot,
    bodyB: pendulum,
    length: 200,
    stiffness: 1,      // Stiffness élevé pour ne pas se déformer
    damping: 0,        // Aucune dissipation d'énergie dans la contrainte
    render: { strokeStyle: "black", lineWidth: 3 }
});

// Ajouter les objets au monde
Composite.add(world, [pivot, pendulum, rod]);

// Appliquer une petite force initiale pour lancer l'oscillation
Body.applyForce(pendulum, { x: pendulum.position.x, y: pendulum.position.y }, { x: 0.1, y: -0.1 });
