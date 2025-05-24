var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Constantes de gravité
const G = 1; // Constante gravitationnelle


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

engine.world.gravity.y = 0;


// Création des deux boules avec masses initiales
var ball1 = Bodies.circle(300, 300, 20, { mass: 19 });
var ball2 = Bodies.circle(500, 300, 20, { mass: 19 });

// Ajouter les boules au monde
Composite.add(world, [ball1, ball2]);

// Fonction pour calculer la distance entre les deux boules
function calculateDistance(body1, body2) {
    var dx = body2.position.x - body1.position.x;
    var dy = body2.position.y - body1.position.y;
    return  Math.sqrt((dx * dx) + (dy * dy));
}

// Fonction pour appliquer la force de gravité entre les deux boules
function applyGravity() {
    var distance = calculateDistance(ball1, ball2);
    if (distance > 0) {
        var force = G * (ball1.mass * ball2.mass) / (distance * distance); // F = G * (m1 * m2) / d^2
        
        var fx = force * (ball2.position.x - ball1.position.x) / distance; // Force sur l'axe X
        var fy = force * (ball2.position.y - ball1.position.y) / distance; // Force sur l'axe Y

        // Appliquer la force à chaque boule
        Body.applyForce(ball1, ball1.position, { x: fx, y: fy });
        Body.applyForce(ball2, ball2.position, { x: -fx, y: -fy });
    }
}

// Mettre à jour la simulation à chaque tick
Matter.Events.on(engine, 'beforeUpdate', function() {
    applyGravity(); // Appliquer la gravité à chaque frame
});

// Contrôles de la masse des boules (exemple simple avec des sliders) 


//A AJOUTER SUIVANT


var slider1 = document.createElement("input");
slider1.type = "range";
slider1.min = 1;
slider1.max = 100;
slider1.value = ball1.mass;
slider1.style.position = "absolute";
slider1.style.top = "20px";
slider1.style.left = "20px";
document.body.appendChild(slider1);

slider1.addEventListener('input', function() {
    ball1.mass = parseFloat(slider1.value);
});

var slider2 = document.createElement("input");
slider2.type = "range";
slider2.min = 1;
slider2.max = 100;
slider2.value = ball2.mass;
slider2.style.position = "absolute";
slider2.style.top = "60px";
slider2.style.left = "20px";
document.body.appendChild(slider2);

slider2.addEventListener('input', function() {
    ball2.mass = parseFloat(slider2.value);
});

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});

Composite.add(world, mouseConstraint);
render.mouse = mouse;
