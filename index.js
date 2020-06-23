
$(document).ready(function () {
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "https://api.covid19api.com/summary"
        }).done(function (data) {


                var data2= data["Global"];
                var listaPaises = data.Countries;
                var bodyTable = "";
                console.log(data2);

                $("#newConfirmed").text(data2.NewConfirmed);
                $("#newDeaths").text(data2.NewDeaths);
                $("#newRecovered").text(data2.NewRecovered);
                $("#totalConfirmed").text(data2.TotalConfirmed);
                $("#totalDeaths").text(data2.TotalDeaths);
                $("#totalRecovered").text(data2.TotalRecovered);


                $.each(listaPaises, function (i, pais) {
                    bodyTable += "<tr>";
                    bodyTable += "<td>" + (i + 1) + "</td>";
                    bodyTable += "<td>" + pais.Country + "</td>";
                    bodyTable += "<td>" + pais.TotalConfirmed + "</td>";
                    bodyTable += "<td>" + pais.TotalDeaths+ "</td>";
                    bodyTable += "<td>" + pais.TotalRecovered + "</td>";
                    bodyTable += "<td>" + pais.NewConfirmed + "</td>";
                    bodyTable += "<td>" + pais.NewDeaths + "</td>";
                    bodyTable += "<td>" + pais.NewRecovered + "</td>";
                    bodyTable += "</tr>";
                });
                $("#body-paises").html(bodyTable);
        }).fail(function (err) {
            var jsonData = err.responseJSON;
            console.log(jsonData.msg);
            alert(jsonData.msg);
        });
    });








});

// Función para hacer el sort de un array
function compare(a, b) {
    // TODO
}
// Función para devolver un formato de fecha
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    // TODO
    return '';
}