// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
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

// create two boxes and a ground
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight-51, window.innerWidth, 100, { isStatic: true }, {friction:0});

/*    
function makeBox(){
    let box = Bodies.rectangle(window.innerWidth/2, 200, 80, 80)
    Composite.add(engine.world,[box])
    
setInterval(makeBox, 1000)
}*/



// add all of the bodies to the world
Composite.add(engine.world, [ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);