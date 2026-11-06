# Mamma! — Démo interactive

Ouvrir le dossier avec un serveur local (nécessaire pour une lecture vidéo fiable) :

```bash
python -m http.server 8000
```

Puis ouvrir http://localhost:8000/mamma-site/ si le serveur est lancé depuis le dossier parent, ou http://localhost:8000/ depuis `mamma-site`.

## Animation scroll

La section « Le voyage de votre Margherita » utilise une vidéo MP4 locale, mise en pause et pilotée par `video.currentTime` en fonction de la progression verticale. La section reste sticky pendant le défilement. Modifier les six libellés dans `script.js`.

**Note technique :** la précision du scrubbing dépend des images clés du MP4 et du navigateur. Les séquences sont réparties en six phases visuelles; pour un calage image par image, il faudra éventuellement réencoder la vidéo avec davantage d'images clés. Les boutons d'ajout et les filtres sont des interactions de démonstration, pas un tunnel e-commerce connecté.
