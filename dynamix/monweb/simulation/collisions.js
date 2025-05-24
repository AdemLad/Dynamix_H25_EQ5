 var Moteur = Matter.Engine,
        Rendu = Matter.Render,
        Executeur = Matter.Runner,
        Corps = Matter.Bodies,
        Composite = Matter.Composite,
        CorpsUnitaire = Matter.Body;

    var largeurCanvas = 800;
    var hauteurCanvas = 600;

    var moteur = Moteur.create();
    var monde = moteur.world;
    moteur.gravity.y = 0;

    var rendu = Rendu.create({
        element: document.body,
        engine: moteur,
        options: {
            width: largeurCanvas,
            height: hauteurCanvas,
            wireframes: false,
            background: '#000000'
        }
    });

    Rendu.run(rendu);

    var executeur = Executeur.create();
    Executeur.run(executeur, moteur);

    const bordures = [
        Corps.rectangle(largeurCanvas / 2, hauteurCanvas - 10, largeurCanvas, 20, { isStatic: true }),
        Corps.rectangle(10, hauteurCanvas / 2, 20, hauteurCanvas, { isStatic: true }),
        Corps.rectangle(largeurCanvas - 10, hauteurCanvas / 2, 20, hauteurCanvas, { isStatic: true }),
        Corps.rectangle(largeurCanvas / 2, 10, largeurCanvas, 20, { isStatic: true })
    ];

    Composite.add(monde, bordures);

    var objetA, objetB;

    function creerObjets() {
        var masseA = parseFloat(document.getElementById("massA").value);
        var rayonA = parseFloat(document.getElementById("rayonA").value);
        var masseB = parseFloat(document.getElementById("massB").value);
        var rayonB = parseFloat(document.getElementById("rayonB").value);

        objetA = Corps.circle(150, 500, rayonA, {
            mass: masseA,
            restitution: 0.8,
            density: 0.005,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            render: { fillStyle: 'red' }
        });

        objetB = Corps.circle(650, 500, rayonB, {
            mass: masseB,
            restitution: 0.8,
            density: 0.005,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            render: { fillStyle: 'blue' }
        });

        Composite.add(monde, [objetA, objetB]);
    }

    creerObjets();

    function mettreAJourObjets() {
        Composite.remove(monde, [objetA, objetB]);
        creerObjets();
        reinitialiserObjets();
    }

    function appliquerForces() {
        appliquerForceA();
        appliquerForceB();
    }

    function appliquerForceA() {
        var forceA = parseFloat(document.getElementById("forceA").value);
        var angleA = parseFloat(document.getElementById("angleA").value) * (Math.PI / 180);

        var forceXA = forceA * Math.cos(angleA);
        var forceYA = -forceA * Math.sin(angleA);

        CorpsUnitaire.applyForce(objetA, objetA.position, { x: forceXA, y: forceYA });
    }

    function appliquerForceB() {
        var forceB = parseFloat(document.getElementById("forceB").value);
        var angleB = parseFloat(document.getElementById("angleB").value) * (Math.PI / 180);

        var forceXB = forceB * Math.cos(angleB);
        var forceYB = -forceB * Math.sin(angleB);

        CorpsUnitaire.applyForce(objetB, objetB.position, { x: forceXB, y: forceYB });
    }

    function reinitialiserObjets() {
        CorpsUnitaire.setPosition(objetA, { x: 150, y: 500 });
        CorpsUnitaire.setVelocity(objetA, { x: 0, y: 0 });
        CorpsUnitaire.setAngularVelocity(objetA, 0);

        CorpsUnitaire.setPosition(objetB, { x: 650, y: 500 });
        CorpsUnitaire.setVelocity(objetB, { x: 0, y: 0 });
        CorpsUnitaire.setAngularVelocity(objetB, 0);
    }

    // Affichage des vitesses en continu
    function mettreAJourAffichageVitesses() {
        if (objetA && objetB) {
            document.getElementById("vxA").textContent = objetA.velocity.x.toFixed(2);
            document.getElementById("vyA").textContent = objetA.velocity.y.toFixed(2);
            document.getElementById("vxB").textContent = objetB.velocity.x.toFixed(2);
            document.getElementById("vyB").textContent = objetB.velocity.y.toFixed(2);
        }
        requestAnimationFrame(mettreAJourAffichageVitesses);
    }

    mettreAJourAffichageVitesses();