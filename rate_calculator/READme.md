Pour lancer le projet, il y'a 2 options

1. Faire directement "npm install", "tsc" et enfin "node dist/index.js". Cette option affichera dans la log en temps réel, toutes les 170 millisecondes, les opportunités dont le real_rate_perc > -1 (perte inférieur à 1%, les opportunités positives sont rares malheureusement). A noter qu'il y'aura deux endpoints disponibles après ces commandes ("/" affiche l'opportunité(>-1) présente au moment où on fait un get, et "/real-opportunity" les vraies opportunités (>0)).

2. Faire "docker build -t mon_image_arb ." puis "docker run -dp 3001:3001 --name arb_container mon_image_arb". Cela mettra également à disposition les 2 endpoints cités plus haut sauf qu'il y aura rien dans log de l'IDE. L'affiche cité plus haut se fera dans la log du conteneur Docker.
