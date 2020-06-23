
$(document).ready(function () {

    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    const slug = urlParams.get('slug');

    const countryCode = urlParams.get('countryCode');


    // TODO: Metodo para cambiar el href, cambiar de acuerdo a la conveniencia
    $("#redirect-grafico").attr("href", '');

    // TODO: Consultas a la web service

    ////Consulta para obtener el summary

    $.ajax({
        method:"get",
        url: nombreUsuario,
        headers:{
            //SUMMARY
            "api-key" : "https://restcountries.eu/rest/v2/alpha/" + countryCode ,

        }
    }).done(function (dataSum){

        let r = '';

        r+='<tr><td>'+ 'capital' +'</td><td>'+dataSum.capital+'</td></tr>';
        r+='<tr><td>'+ 'poblacion' +'</td><td>'+dataSum.population+'</td></tr>';
        r+='<tr><td>'+ 'subregion' +'</td><td>'+ dataSum.subregion +'</td></tr>';


        $("#casos-pais #id1").html(r);



    }).fail(function (error){

        console.log(error);
    });

    ////Consulta para obtener los confirmados

    $.ajax({
        method:"get",
        url: nombreUsuario,
        headers:{
            //confirmados
            "api-key" : "https://api.covid19api.com/total/dayone/country/" + slug + "/status/confirmed",

        }
    }).done(function (dataConf){

        /*
        var listaEmpleados = data.lista;
        var contentHtml = "";
        */

        let r = '';

        for(let key=0,size=dataConf.length;key<size;key++){

            r+='<tr><td>'+dataConf[key].Date +'</td><td>'+dataConf[key].Cases+'</td></tr>';

        }

        $("#casos-pais #id2").html(r);

    }).fail(function (error){

        console.log(error);
    });



    //// cosnulta bandera
    var url = "https://www.countryflags.io/" + countryCode + "/flat/64.png";
    $("#banderita").src(url);

    $.ajax({
        method:"get",
        url: nombreUsuario,
        headers:{
            //SUMMARY
            "api-key" : "https://www.countryflags.io/" + countryCode + "/flat/64.png",
        }

    }).done(function (dataSum){
        console.log("no realizamos consulta ajax para obtener la imagen");

    }).fail(function (error){

        console.log("no realizamos consulta ajax para obtener la imagen");
    });





});
