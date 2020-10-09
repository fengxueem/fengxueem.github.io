const slider1 = $("#ballSlider1");
const slider2 = $("#ballSlider2");
const slider3 = $("#ballSlider3");
const ballNum1 = $("#ballNum1");
const ballNum2 = $("#ballNum2");
const ballNum3 = $("#ballNum3");
const tBallNum1 = $("#tBallNum1");
const tBallNum2 = $("#tBallNum2");
const tBallNum3 = $("#tBallNum3");
const pickBtn = $("#pickBtn");
const resetBtn = $("#resetBtn");
const ballColor1 = $("#color1");
const ballColor2 = $("#color2");
const ballColor3 = $("#color3");
const canvas = document.getElementById("ballCanvas");
canvas.height = 1000;
const context = canvas.getContext("2d");
function reset(price) {
  slider1.val(price);
  slider2.val(price);
  slider3.val(price);
  ballNum1.text(price);
  ballNum2.text(price);
  ballNum3.text(price);
  tBallNum1.text(price);
  tBallNum2.text(price);
  tBallNum3.text(price);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ballColor1.val("#000000");
  ballColor2.val("#000000");
  ballColor3.val("#000000");
}
slider1.on("input change", function(e) {
    ballNum1.text($(this).val());
});
slider2.on("input change", function(e) {
    ballNum2.text($(this).val());
});
slider3.on("input change", function(e) {
    ballNum3.text($(this).val());
});
resetBtn.on('click', function(e) {
    reset(0);
});
pickBtn.on('click', function(e) {
    var intBallNum1 = parseInt(slider1.val()) * 10;
    var intBallNum2 = parseInt(slider2.val()) * 10;
    var intBallNum3 = parseInt(slider3.val()) * 10;
    var total = intBallNum1 + intBallNum2 + intBallNum3;
    if (total == 0) {
        return;
    }
    var ran = Math.floor(Math.random() * total);
    var color = '#ff0000';
    if (ran < intBallNum1) {
        tBallNum1.text(parseInt(tBallNum1.text()) + 1);
        color = ballColor1.val();
    } else if (ran < intBallNum1 + intBallNum2) {
        tBallNum2.text(parseInt(tBallNum2.text()) + 1);
        color = ballColor2.val();
    } else {
        tBallNum3.text(parseInt(tBallNum3.text()) + 1);
        color = ballColor3.val();
    }
    numPickedBall = parseInt(tBallNum1.text()) + parseInt(tBallNum2.text()) + parseInt(tBallNum3.text());
    drawCircel(numPickedBall, color);
});

var Circle = {
    generateNew: function (numPickedBall) {
        var circle = {
            centerX: 0,
            centerY: 0,
            radius: 0,
        };
        var circlePerRow = 10;
        var diameter = canvas.width / circlePerRow;
        circle.radius = diameter / 2;
        var row = parseInt((numPickedBall - 1) / circlePerRow);
        var col = (numPickedBall - 1) % circlePerRow;
        // alert("row: " + row + " col: " + col);
        circle.centerX = circle.radius * ( 2 * col + 1 );
        circle.centerY = circle.radius * ( 2 * row + 1 );
        return circle;
    }
};

function drawCircel(numPickedBall, color) {
    var circle = Circle.generateNew(numPickedBall);
    context.beginPath();
    context.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}