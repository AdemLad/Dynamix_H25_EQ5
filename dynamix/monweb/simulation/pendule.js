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

// Masse suspendue
var pendulum = Bodies.circle(400, 300, 30,
{friction:0, inertia:Infinity, render: { fillStyle: "blue" } });

// Liaison entre le pivot et le pendule
var rod = Constraint.create({
bodyA: pivot,
bodyB: pendulum,
length: 200,
stiffness: 1,
damping:0,
render: { strokeStyle: "black", lineWidth: 3 }
});

// ajouter les control de souris
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
mouse: mouse,
constraint: {
// permettre la rotation des corps
angularStiffness: 0,
render: {
    visible: false
}
}  
});

// Synchroniser la souris et le Render
render.mouse = mouse;

// Ajout des objets au monde
Composite.add(world, [pivot, pendulum, rod, mouseConstraint]);



// Fonction pour réinitialiser le pendule
function resetPendulum() {
Body.setPosition(pendulum, { x: 400, y: 300 });
Body.setVelocity(pendulum, { x: 0, y: 0 });
Body.setAngularVelocity(pendulum, 0);
}