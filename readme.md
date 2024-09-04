Api Feed
========

L'idée est de pouvoir lire une API assez via l'entrée de l'URL dans un champ prévu à cet effet.
L'objectif étant de visualiser les données sous forme de "cards" (styliser par Tailwind)

Explication
============

Vous avez le choix entre essayer 5 API proposé par le dropdown ou d'entrer vous-même l'URL de votre API.
Si vous reprenez ce projet, vous devez simplement mentionner l'api dans le data-api de la balise body et respecter la hiérarchie suivante du DOM :
    + Element (wrapper) avec la classe : .website
    + > suivi de l'élement avec l'ID : #example ( = la card stylisée) et la classe .js_item
    + enfin, respectez/ajoutez les éléments qui ont les attributs "data-api"

Structure
=========

js
---
  script.js : le plus intéressant dans ce projet

style
-----
  tailwind.css : le célèbre framework css
  favicon.png : un petit pingouin (Happy Feet !) :smile:

Autres
------
  .htaccess : afin de garantir une connexion évenutelle