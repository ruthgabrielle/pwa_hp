let web_service = "characteres.json";
let data_json;
let index_characteres = 0;
let characteres = document.getElementById("characteres");
let wizards = document.getElementById("wizards");
let wizards_content = document.getElementById("wizards_content");
let btnVoltar = document.getElementById("btnVoltar");
let title = document.getElementById("title");


function loadData() {

    let ajax = new XMLHttpRequest();

    ajax.open("GET", web_service, true);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data_json = JSON.parse(this.responseText);
            printCharacteres();
        }

    }

}

loadData();

function printCharacteres() {

    let html_characteres = '<div class="row">';

    if (data_json.length > 0) {

        for (let i = 0; i < data_json.length; i++) {
            html_characteres += card_characteres(i, data_json[i].name, data_json[i].house, data_json[i].image, data_json[i].actor);
        }

    } else {
        html_characteres = msg_alert("Não há personagebs cadastrados", "warning");
    }

    html_characteres += '</div>';

    characteres.innerHTML = html_characteres;

}

function printWizard(id, name) {
    window.scrollTo(0, 0);
    title.innerHTML = name;
    characteres.style.display = "none";
    wizards.style.display = "block";

    let html_wizards = '<div class="row">';

    console.log(data_json[id].name !== null)

    if (data_json[id].name !== null) {

        html_wizards += card_wizards(data_json[id].name, data_json[id].house, data_json[id].patronus, data_json[id].wand.core, data_json[id].ancestry, data_json[id].actor, data_json[id].alive, data_json[id].image);

        console.log(data_json[id])

    } else {
        html_wizards = msg_alert("Não há informações", "warning");
    }

    wizards_content.innerHTML = html_wizards;
}

function changeModal(name, alive, ancestry, patronus, house, actor, wand) {

    document.getElementById("name_wizard").innerHTML = name;
    document.getElementById("house_wizard").innerHTML = "<strong>Casa:</strong>&nbsp;" + house;
    document.getElementById("patronus_wizard").innerHTML = "<strong>Patrono:</strong>&nbsp;" + patronus;
    document.getElementById("wand_wizard").innerHTML = "<strong>Núcleo da Varinha:</strong>&nbsp;" + wand;
    document.getElementById("ancestry_wizard").innerHTML = "<strong>Sangue:</strong>&nbsp;" + ancestry;
    document.getElementById("actor_wizard").innerHTML = "<strong>Ator:</strong>&nbsp;" + actor;
    document.getElementById("wizard_alive").innerHTML = "<strong>Vivo:</strong>&nbsp;" + alive;

}

function voltarTela() {
    characteres.style.display = "block";
    wizards.style.display = "none";
}

/*

Primitive Template Engines

*/

msg_alert = function (texto, style) {
    return '<div class="alert alert-' + style + '" role="alert">' + texto + '</div>';
}

card_characteres = function (id, nome, house, imagem) {
    return `<div class="col-12 col-lg-6">            
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
                                <img src=${imagem} class="logo_characteres">
                                </div>                      
                            </div>
                            <div class="col-8">   
                                <h5 class="card-title">${nome}</h5>
                                <p class="card-text">${house}</p>
     
                            </div>
                        </div>              
                    </div>
                    <div class="card-footer">
                    <div class="btn-group w-100" role="group" aria-label="Ações">
                        <button onClick="javascript:printWizard(${id},'${nome}')" class="btn btn-primary btn-purple w-50">Ver informações</button>
                    </div>
                    </div>
                </div>
            </div> `;
}

card_wizards = function (name, house, patronus, wand, ancestry, actor, alive, image) {

    return `<div class="col col-lg-4">            
                <div class="card h-100">
                <div class="card-body">
                   <img src=${image} class="image_wizard">
                    <h5 class="card-title">${name}</h5>                                                            
                </div>
                <div class="card-footer">
                    <div class="btn-group w-100" role="group" aria-label="Ações">
                    <a href="#" class="btn btn-warning w-50" data-bs-toggle="modal" data-bs-target="#modalWizard" onClick="javascript:changeModal('${name}','${alive}','${ancestry}','${patronus}','${house}','${actor}', '${wand}')">Ver Informações</a>
                    </div>
                </div>
                </div>
            </div>`;

}