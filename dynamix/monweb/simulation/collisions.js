// Matter.js components
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body;
 
// Création de l'engine et du monde
var engine = Engine.create();
var world = engine.world;
engine.world.gravity.y = 0; // Désactive la gravité
 
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
 
// Création du sol
var ground = Bodies.rectangle(400, 580, 810, 40, { isStatic: true, render: { fillStyle: '#060a19' } });
 
// Définition des objets mobiles
var boxA, boxB;
function createObjects() {
    // Get the values from the HTML input fields
    var massA = parseFloat(document.getElementById("massA").value);
    var radiusA = parseFloat(document.getElementById("rayonA").value);
    var massB = parseFloat(document.getElementById("massB").value);
    var radiusB = parseFloat(document.getElementById("rayonB").value);
 
    // Create the first object (boxA)
    boxA = Bodies.circle(150, 500, radiusA, {
        mass: massA,
        restitution: 0.8,
        density: 0.005,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'red' }
    });
 
    // Create the second object (boxB)
    boxB = Bodies.circle(650, 500, radiusB, {
        mass: massB,
        restitution: 0.8,
        density: 0.005,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        render: { fillStyle: 'blue' }
    });
 
    // Add the objects to the world
    Composite.add(world, [boxA, boxB]);
}
 
// Call createObjects to initialize the objects
createObjects();
Composite.add(world, [ground]);
 
// Function to update objects based on user input
function updateObjects() {
    // Remove the old objects
    Composite.remove(world, [boxA, boxB]);
 
    // Recreate the objects with updated values
    createObjects();
 
    // Reset their position and velocity
    resetObjects();
}
 
// Function to apply force on both objects
function applyForces() {
    applyForceA();
    applyForceB();
}
 
// Function to apply force to boxA
function applyForceA() {
    var forceA = parseFloat(document.getElementById("forceA").value);
    var angleA = parseFloat(document.getElementById("angleA").value) * (Math.PI / 180);
 
    var forceXA = forceA * Math.cos(angleA);
    var forceYA = -forceA * Math.sin(angleA);
 
    Body.applyForce(boxA, boxA.position, { x: forceXA, y: forceYA });
}
 
// Function to apply force to boxB
function applyForceB() {
    var forceB = parseFloat(document.getElementById("forceB").value);
    var angleB = parseFloat(document.getElementById("angleB").value) * (Math.PI / 180);
 
    var forceXB = forceB * Math.cos(angleB);
    var forceYB = -forceB * Math.sin(angleB);
 
    Body.applyForce(boxB, boxB.position, { x: forceXB, y: forceYB });
}
 
// Function to reset objects to their initial position and velocity
function resetObjects() {
    Body.setPosition(boxA, { x: 150, y: 500 });
    Body.setVelocity(boxA, { x: 0, y: 0 });
    Body.setAngularVelocity(boxA, 0);
 
    Body.setPosition(boxB, { x: 650, y: 500 });
    Body.setVelocity(boxB, { x: 0, y: 0 });
    Body.setAngularVelocity(boxB, 0);
}
 
// Start the renderer
Render.run(render);
 
// Create and run the engine
var runner = Runner.create();
Runner.run(runner, engine);