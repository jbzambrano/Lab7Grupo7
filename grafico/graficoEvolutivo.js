
$(document).ready(function () {

    // TODO
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    const slug = urlParams.get('slug');

    const countryCode = urlParams.get('countryCode');

    // TODO adecuar el url
    var url = "https://api.covid19api.com/total/dayone/country/"+ slug +"/status/confirmed";

    var urlBandera = "https://www.countryflags.io/" + countryCode + "/flat/64.png"


    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 100 },
        width = 900 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    // parse the date / time
    //TODO Revisar este Formato
    var parseTime = d3.timeParse("%B %d");
    // var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.cases); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#div-grafico").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.json(url, function (error, data) {

        //const urlParams = new URLSearchParams(window.location.search);
        //const name = urlParams.get('name');
        //var nombrePais = name;



        if (error) throw error;

        // format the data
        //TODO Revisar este Formato, obtencion de elementos desde la web service
        data.forEach(function (d) {
            d.date = parseTime(formatDate(d.Date));
            d.cases = d.Cases;
            d.country= d.Country;
            $("#titulo").value(d.country);
            $("#banderita").src(urlBandera);
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, d3.max(data, function (d) { return d.cases; })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    });
});

function formatDate(date) {
    // TODO adecuar la función de formateo de fecha

    return (d3.timeSecond(date) < date ? d3.timeFormat(".%L")
        : d3.timeMinute(date) < date ? d3.timeFormat(":%S")
            : d3.timeHour(date) < date ? d3.timeFormat("%I:%M")
                : d3.timeDay(date) < date ? d3.timeFormat("%I %p")
                    : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? d3.timeFormat("%a %d") : d3.timeFormat("%b %d"))
                        : d3.timeYear(date) < date ? d3.timeFormat("%B")
                            : d3.timeFormat("%Y"))(date);

}