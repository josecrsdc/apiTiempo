window.onload = inicio;

function inicio() {
    let codProvincia;
    let codCiudad;

    let titulo = document.getElementById('titulo');
    let today = document.getElementById('today');
    let tomorrow = document.getElementById('tomorrow');
    let cajaTiempo = document.getElementsByClassName('cajaTiempo');
    let tiempoCiudad = document.getElementsByClassName('tiempo-ciudad');
    let tiempoCiudad__text = document.getElementById('tiempo-ciudad__text');
    let tiempoCiudad__max = document.getElementById('tiempo-ciudad__max');
    let tiempoCiudad__min = document.getElementById('tiempo-ciudad__min');


    displayStatus(cajaTiempo, 'none');
    displayStatus(tiempoCiudad, 'none');

   

    document.getElementById('lista').addEventListener('change', function () {
        codProvincia = this.value;
        displayStatus(tiempoCiudad, 'none');
        displayStatus(cajaTiempo, 'none');
        deleteLista(lista2);
        if (codProvincia != "00") {
            fetch('https://www.el-tiempo.net/api/json/v2/provincias/' + codProvincia)
            .then(response => response.json())
            .then(data => {
                titulo.innerText = data.title;
                today.innerHTML = `<p class='hoyManana'>Hoy: </p><div class="timeResult">${data.today.p}</div>`;
                tomorrow.innerHTML = `<p class='hoyManana'>Mañana: </p><div class="timeResult">${data.tomorrow.p}</div>`;
                displayStatus(cajaTiempo, 'block');

                deleteLista(lista2);
                
                data.ciudades.forEach(element => {
                    addLista(element.id, element.name, lista2);
                });
                document.getElementById('lista2').addEventListener('change', function () {
                    codCiudad = this.value;
                    if (codCiudad != '00') {
                        let ciudad = data.ciudades.find(ciudades => ciudades.id == codCiudad) 
                        tiempoCiudad__text.innerHTML = ciudad.stateSky.description;
                        tiempoCiudad__max.innerHTML = `<span>Temperatura máxima: </span> ${ciudad.temperatures.max} &#176;C` ;
                        tiempoCiudad__min.innerHTML = `<span>Temperatura mínima: </span> ${ciudad.temperatures.min} &#176;C` ;;
                        displayStatus(tiempoCiudad, 'block');
                    }
                });
            })
        }
    });

    

    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
    .then(response => response.json())
    .then(data => {
        
        data.provincias.forEach(provincia => {
            addLista(provincia.CODPROV, provincia.NOMBRE_PROVINCIA, lista);
        });
    })

    
}


function addLista(id, name, lista) {
    let nuevaOption = document.createElement('option');
    nuevaOption.value = id;
    nuevaOption.text = name;
    let long = lista.length;
    lista.add(nuevaOption,long);
}

function displayStatus(array, estado) {
    Array.from(array).forEach(element => {
        element.style.display = estado;
    });
}

function deleteLista(lista) {
    while (lista.length > 1) {
        lista.remove(lista.length - 1);
    }
}