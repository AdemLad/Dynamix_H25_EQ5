var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Body = Matter.Body,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;
 
 
            let projectiles = []
 
 
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
 
        // Création du sol
        var ground = Bodies.rectangle(400, 580, 800, 40, {
            isStatic: true,
            render: { fillStyle: '#060a19' }
        });
 
        // Fonction pour créer un projectile avec les valeurs actuelles
       
           
        var rayon = parseFloat(document.getElementById("rayon").value);
            var mass = parseFloat(document.getElementById("mass").value)
            // Créer un nouveau projectile
            projectile = Bodies.circle(150, 500, rayon, {
                restitution: 0.8,
                mass: mass,
                friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
                render: { fillStyle: 'red' }
            });
 
 
        // Ajout des objets au monde
        Composite.add(world, [ground, projectile]);
 
        // Ajout du contrôle souris
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
 
        // Fonction pour appliquer une force au projectile
        function applyForce() {
            var force = parseFloat(document.getElementById("force").value);
            var angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180); // Conversion en radians
 
            if (isNaN(force) || isNaN(angle)) {
                alert("Veuillez entrer des valeurs valides pour la force et l'angle.");
                return;
            }
 
            var forceX = force * Math.cos(angle);
            var forceY = -force * Math.sin(angle); // Négatif pour aller vers le haut
 
            Body.applyForce(projectile, projectile.position, { x: forceX, y: forceY });
        }
 
        // Fonction pour réinitialiser le projectile
        function resetObject() {
            Body.setPosition(projectile, { x: 150, y: 500 });
            Body.setVelocity(projectile, { x: 0, y: 0 });
            Body.setAngularVelocity(projectile, 0);
        }
 
        // Fonction pour mettre à jour le projectile avec les nouvelles valeurs
        function updateObject() {          
           
            Composite.remove(world, projectile)
 
            var rayon = parseFloat(document.getElementById("rayon").value);
            var mass = parseFloat(document.getElementById("mass").value)
            // Créer un nouveau projectile
            projectile = Bodies.circle(150, 500, rayon, {
                restitution: 0.8,
                mass: mass,
                friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
                render: { fillStyle: 'red' }
            });
            // Ajouter le nouveau projectile au monde
            Composite.add(world, projectile);
        }