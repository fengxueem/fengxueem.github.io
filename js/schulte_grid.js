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

function refreshRecords(thisTime) {
    if (thisTime < bestRecord || bestRecord < 0) {
        bestRecord = thisTime;
        $("#best_record").html(timeToString(bestRecord));
    }
    lastRecord = thisRecord;
    thisRecord = thisTime;
    $("#this_record").html(timeToString(thisRecord));
    $("#last_record").html(timeToString(lastRecord));
}
var startTime;
var elapsedTime = 0;
var timerInterval;
var bestRecord = -1;
var thisRecord = 0;
var lastRecord = 0;

function start() {
    startTime = Date.now();
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        $("#display").html(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    $("#display").html("00:00:00");
    refreshRecords(elapsedTime);
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

function drawGridSVG(squareLength, squareNum) {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = squareLength;
    var height = squareLength;
    for (var row = 0; row < squareNum; row++) {
        data.push(new Array());
        for (var column = 0; column < squareNum; column++) {
            data[row].push({
                    x: xpos,
                    y: ypos,
                    width: squareLength,
                    height: squareLength
                })
                // increment the x position. I.e. move it over by 50 (width variable)
            xpos += squareLength;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += squareLength;
    }
    return data;
}
$("#grid_length_slider").on("input change", function(sliderValue) {
    drawGrid(sliderValue.value.newValue);
});

function drawGrid(squareNum) {
    $("#grid").html("");
    var grid_ele = document.getElementById("grid");
    var squareLength = Math.min(window.innerHeight * 0.85, grid_ele.offsetWidth) / squareNum;
    console.log(squareNum);
    var grid_length = squareLength * squareNum + 2;
    grid_ele.style.paddingLeft = (grid_ele.offsetWidth - grid_length) / 2 + "px";
    var grid = d3.select("#grid")
        .append("svg")
        .attr("width", grid_length + "px")
        .attr("height", grid_length + "px");
    var gridData = drawGridSVG(squareLength, squareNum);
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