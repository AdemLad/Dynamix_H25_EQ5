// app.js

// Importer Matter.js
const { Engine, Render, World, Bodies } = Matter;

// Créer le moteur de simulation
const engine = Engine.create();
const world = engine.world;

const WIDTH = 1200
const HEIGHT = 700

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

render.canvas.style.position = 'absolute';
render.canvas.style.top = '50%';
render.canvas.style.left = '50%';
render.canvas.style.transform = 'translate(-50%, -50%)';

// Créer les murs du monde  
const ground = Bodies.rectangle(WIDTH/2, HEIGHT-20, WIDTH, 20, { isStatic: true }); // Sol
const leftWall = Bodies.rectangle(0, HEIGHT/2, 20, HEIGHT, { isStatic: true });  // Mur gauche
const rightWall = Bodies.rectangle(WIDTH, HEIGHT/2, 20, HEIGHT, { isStatic: true }); // Mur droit
const topWall = Bodies.rectangle(WIDTH/2, 0, WIDTH, 20, { isStatic: true });  // Mur supérieur

// Ajouter les murs au monde
World.add(world, [ground, leftWall, rightWall, topWall]);

// Démarrer la simulation
Engine.run(engine);
Render.run(render);



