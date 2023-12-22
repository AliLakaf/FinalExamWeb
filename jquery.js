//Constructeur pour faire la recette
function Recette(nom = "", ingredient = "", quantite = 0, instruction = ""){
    this.nom = nom
    this.ingredient = ingredient
    this.quantite = quantite
    this.instruction = instruction
}


function ajouter(){    //Cette fonction nous permet d'ajouter les recettes que l'utilisateur veut
    event.preventDefault();
    const recette = new Recette($('#nomrecette').val(), $('#ingredient1').val(), $('#ingredient2').val(), $('#ingredient3').val(), $('#ingredient4').val(), $('#ingredient5').val())

    fetch('https://656f2fcc6529ec1c62378287.mockapi.io/recette', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // envoyer les données
        body: JSON.stringify(recette)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        //gérer l'erreur
        throw new Error("Erreur "+res.status);
    }).then(task => {
        // Faire l'action qu'on veut
        afficherTout()
    }).catch(error => {
        // gestion d'erreur
        $('.alert').text(error.message).removeClass('d-none');
    })
}


function creerCarte(recette) {    //Cette fonction sert a créer le modèle de la carte au mment de la création
    $("#recette_fait").append(`
    <li class = "card col-3 m-2">
  <div class="card-body">
    <div class = "card-text">
    <p>Nom de la recette: ${recette.id}</p>   
    <p>Ingrédients: ${recette.ingredient}</p>
    <p>Instructions: ${recette.instruction}</p>
        <input type = "button"  onclick = "supprimer(${recette.id})" class = "btn btn-danger" value = "Supprimer"> 
    </div> 
  </div>
</li>`)
}



function supprimer(id){    //Cette fonction fait en sorte que le bouton supprimer fonctionne
    fetch('https://656f2fcc6529ec1c62378287.mockapi.io/recette/'+id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // Gère l'erreur
        throw new Error ("Erreur"+res.status);
    }).then(chat=> {
        afficherTout()
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}



function afficherTout() { //J'ai utiliser cette fonction pour permettre l'affichage des cartes au lieu de la coder directement dans ajouter pour permettre la réutilisation
    $("#recette_fait").text("")
    $.getJSON('https://656f2fcc6529ec1c62378287.mockapi.io/recette')
        .done(function (recette) {
            recette.forEach(function (recette) {
                creerCarte(recette);
            });
        })
        .fail(function (error) {
            $('.alert').text(error.message).removeClass('d-none');
        });
}

afficherTout()