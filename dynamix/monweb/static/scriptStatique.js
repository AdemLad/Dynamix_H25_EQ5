var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite;
    

// create an engine
var engine = Engine.create();
engine.enableSleeping = true

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});
render.canvas.width = window.innerWidth
render.canvas.height = window.innerHeight

x = window.innerWidth/2
y = window.innerHeight/2

var body = Bodies.rectangle(x, y-100, 80, 80);

    var constraint = Constraint.create({
        pointA: { x: x, y: 100 },
        bodyB: body
    });

Composite.add(engine.world, [body, constraint]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);