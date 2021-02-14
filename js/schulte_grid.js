function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

var startTime;
var elapsedTime = 0;
var timerInterval;

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        $("#display").html(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    $("#display").html("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
}

function showButton(buttonKey) {
    if (buttonKey === "PLAY") {
        $("#playButton").css("display", "block");
        $("#pauseButton").css("display", "none");
    } else {
        $("#playButton").css("display", "none");
        $("#pauseButton").css("display", "block");
    }
}
$("#playButton").on("click", start);
$("#pauseButton").on("click", pause);

function drawGridSVG(square_length, square_num) {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = square_length;
    var height = square_length;
    for (var row = 0; row < square_num; row++) {
        data.push(new Array());
        for (var column = 0; column < square_num; column++) {
            data[row].push({
                    x: xpos,
                    y: ypos,
                    width: square_length,
                    height: square_length
                })
                // increment the x position. I.e. move it over by 50 (width variable)
            xpos += square_length;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += square_length;
    }
    return data;
}
$("#grid_length_slider").on("input change", function(sliderValue) {
    drawGrid(sliderValue.value.newValue);
});

function drawGrid(square_num) {
    $("#grid").html("");
    var grid_ele = document.getElementById("grid");
    var square_length = Math.min(window.innerHeight * 0.85, grid_ele.offsetWidth) / square_num;
    console.log(square_num);
    var grid_length = square_length * square_num + 2;
    grid_ele.style.paddingLeft = (grid_ele.offsetWidth - grid_length) / 2 + "px";
    var grid = d3.select("#grid")
        .append("svg")
        .attr("width", grid_length + "px")
        .attr("height", grid_length + "px");
    var gridData = drawGridSVG(square_length, square_num);
    var row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");
    var column = row.selectAll(".square")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class", "square")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", "#fff")
        .style("stroke", "#222");
}
// draw the first grid, since the default value of square number is 5
drawGrid(5);