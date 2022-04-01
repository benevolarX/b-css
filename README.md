# b-css
small css framework

work in progress !


objectif : créer un petit framework css composé de : 

1) reset css
2) base pour flex / grid
3) quelques propriétés à la volée type bg-grey
4) AUCUN COMPOSANTS A PART ENTIERE TYPE MODAL / TOOLTIP
5) mettre les composants dans un 2ème projet

/!\ la version 0.x se contentait de copier coller le code commun d'autres frameworks
sans réellement comprendre à quoi ça servait

La nouvelle version 1.0 ne fera jamais de copier coller a l'aveugle

Seuls les elements indispensable seront conserves


LISTE DES TIPS A CONSERVER : 

// utiliser la police consolas par défaut
body {
  font-family: "Consolas", "Monofur", "Verdana", "Tahoma", "Times New Roman", monospace, sans-serif, serif;
}

// hack css pour tej les bordures
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

// astuces pour forcer les utilisateurs à ne pas utiliser br pour la mise en page
br + br {
  display: none;
}

// astuce pour forcer le alt sur les images

img:not([alt]) { 
  filter: blur(5px);
}

// ajouter line-height à body car ça s'utilise juste sur p et hr
body {
  line-height: 1.5;
}

// utiliser :focus-within pour tout les elements qui peuvent être :focus et leur enfants
:focus-within:valid {

  border: 0px 0px 5px 1px rgba(255,2,2,0.75)
  // valid : border succes
  // default : border info
  // invalid : border danger
}

// utliser :placeholder-shown pour représenter un input vide avec placeholder visible
input:placeholder-shown, textarea:placeholder-shown {
  --focus-box-color: var(--color-info);
}

// mettre l'url dans un a au texte vide
a[href^="http"]:empty::before {
  content: attr(href);
}

// utliser :not([class]) pour donner une valeur par défaut 
// aux éléments pour permettre des modifications sans annulation du code


// prévenir des images cassées (mauvaise url)

img {  
  display: block;
  font-family: sans-serif;
  font-weight: 300;
  height: auto;
  line-height: 2;
  position: relative;
  text-align: center;
}

img::before {  
  content: "We're sorry, the image below is broken :(";
  display: block;
  margin-bottom: 10px;
}

img::after {  
  content: "(url: " attr(src) ")";
  display: block;
  font-size: 12px;
}



// alternative 
img {
  font-family: 'Helvetica';
  font-weight: 300;
  line-height: 2;  
  text-align: center;
  width: 100%;
  height: auto;
  display: block;
  position: relative;
}

img:before { 
  content: "We're sorry, the image below is broken :(";
  display: block;
  margin-bottom: 10px;
}

img:after { 
  content: "(url: " attr(src) ")";
  display: block;
  font-size: 12px;
}








// niveau font-size, par défaut on laisser 16 pour les bonnes divisions
html {
  font-size: 100%; // 16px
}

body {
  font-size: 1.3125rem; // 21px
}

// envoyer chier les videos en autoplay qui ne sont pas mute
// parce que l'autoplay ça fait chier
video[autoplay]:not([muted]) {
  display: none;
}

// déclarer les variables par défaut dans root
:root {
  --min-font-size: 16px;
  --max-font-size: 64px;
  --calc-font-size: calc(1vw + 1vh + .5vmin);
}

// modifier les variables en cours de route
.title {
  --calc-font-size: 80px;
}

// appliquer les valeurs modifiées à la fin, définir la variable résultat
html {
  --clamp-font-size: clamp(var(--min-font-size), var(--calc-font-size), var(--max-font-size));
  font-size: var(--clamp-font-size)
}

// utiliser une syntaxe use-xxx pour ajouter la propriété utilisant la variable résultat
.use-font-size {
  font-size: var(--clamp-font-size);
}

/!\ : rem = root em = 
:root {
  font-size: 53px;
}

// modifier les font-size sur les listes déroulantes pour ne pas zoom sur mobile
select {
  font-size: 1rem; // 16px
}

// mettre une petite transition sur la couleur au moment de hover sur les a
a {
 color: #1b80b7;
 transition: all .2s linear;
}

a:hover { color: #52bff2; }

// voir la suit... 
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// de beaux guillemets 
q {
    quotes: "“" "”";
}

// utiliser un scroll doux
body {
  scroll-behavior: smooth;
}

// mode dark
@media (prefers-color-scheme: dark) {
  :root {
    --tmp: var(--light);
    --light: var(--dark);
    --dark: var(--tmp);
  }

  img {
    --darkmode-img-filter: grayscale(50%);
    filter: var(--darkmode-img-filter);
    opacity: .75;
  }

  img:hover {
    opacity: 1;
  }
}

// dark mode by default ? OUI : 75/25 pour les usages
@media (prefers-color-scheme: light) {
}

// selection = surligner texte avec la souris
::selection {
  background: #ffb7b7;
  
}

::-moz-selection {
  background: #ffb7b7;
}

// smartphone landscape : (1.5 - 2.2)
// 720 / 480 
// 720 (528-960) / 480 (320-480)

// tablet landscape : (1.777)
// 1280 (1024-1366) / (600-1024) 720

// laptop landscape : (1.777)
// 1366 () / () 768

// pc landscape : (1.777)
// 1920 / 1080