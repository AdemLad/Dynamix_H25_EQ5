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

        // Création des objets
        var ground = Bodies.rectangle(400, 580, 810, 40, { isStatic: true, render: { fillStyle: '#060a19' } });
        var projectile = Bodies.circle(150, 500, 20, { restitution: 0.8, density: 0.005 });

        // Ajout des objets au monde
        Composite.add(world, [ground, projectile]);

        // Fonction pour appliquer la force
        function applyForce() {
            var forceX = parseFloat(document.getElementById("forceX").value);
            var forceY = parseFloat(document.getElementById("forceY").value);
            Body.applyForce(projectile, { x: projectile.position.x, y: projectile.position.y }, { x: forceX, y: forceY });
        }

        // Fonction pour réinitialiser l'objet
        function resetObject() {
            Body.setPosition(projectile, { x: 150, y: 500 });
            Body.setVelocity(projectile, { x: 0, y: 0 });
            Body.setAngularVelocity(projectile, 0);
        }