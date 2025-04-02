// app.js

// Importer Matter.js
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Runner = Matter.Runner,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body;

// Créer le moteur de simulation
const engine = Engine.create();
const world = engine.world;

const WIDTH = 1200
const HEIGHT = 700

engine.world.gravity.y = 1;

// Créer un rendu (affichage) sur un canvas
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: WIDTH,    // Largeur du canevas
    height: HEIGHT,   // Hauteur du canevas
    wireframes: false,  // Affichage des objets en formes solides, pas en wireframe
    pixelRatio: 1,
  }
});

function handleClick() {
        // Créer un bloc (corps physique) de type rectangle
    var block = Bodies.rectangle(400, 200, 80, 80, {
        restitution: 0.8, // Propriétés physiques : rebond
        friction: 0.5,    // Friction
        density: 1,
        isStatic: false   // Densité du bloc
    }); 

    // Ajouter le bloc au monde de Matter.js
    World.add(world, block);
}


//controle souris
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 1,
        render: { visible: false }
    }
});

Composite.add(world, mouseConstraint);
render.mouse = mouse;

render.canvas.style.position = 'fixed';
render.canvas.style.top = '50%';
render.canvas.style.left = '50%';
render.canvas.style.transform = 'translate(-50%, -50%)';

// Créer les murs du monde  
const ground = Bodies.rectangle(WIDTH/2, HEIGHT-10, WIDTH, 20, { isStatic: true }); // Sol
const leftWall = Bodies.rectangle(0, HEIGHT/2, 20, HEIGHT, { isStatic: true });  // Mur gauche
const rightWall = Bodies.rectangle(WIDTH, HEIGHT/2, 20, HEIGHT, { isStatic: true }); // Mur droit
const topWall = Bodies.rectangle(WIDTH/2, 0, WIDTH, 20, { isStatic: true });  // Mur supérieur

// Ajouter les murs au monde
World.add(world, [ground, leftWall, rightWall, topWall]);

var runner = Runner.create(); // Créer un runner
Runner.run(runner, engine);  // Lancer le runner

// Démarrer le rendu
Render.run(render);





