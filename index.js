var getWindowHeight = function(){
    var winHeight=0;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight;
    return winHeight
}

var getDiffDate = function(start, end) {
    var dateArr = [];
    while ((end.getTime() - start.getTime()) > 0) {
        var year = start.getFullYear();            
        var month = start.getMonth().toString().length === 1 ? "0" + (parseInt(start.getMonth().toString(),10) + 1) : (start.getMonth() + 1);
        var day = start.getDate().toString().length === 1 ? "0" + start.getDate() : start.getDate();
        dateArr.push(year + "-" + month + "-" + day);
        start.setDate(start.getDate() + 1);
    }
    return dateArr;
}

var histBenford = function(numbers) {
    hist = [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ];
    numbers.forEach(function(element) {
        var elementArr = element.toString().split('');
        var fistDigit = elementArr[0];
        hist[fistDigit-1]++;
    });
    for(let i = 0; i < 10; ++i){
        hist[i] /= numbers.length
    }
    return hist;
}

var copy_obj = function(obj) {
    var newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    }
    for(var i in obj){
       newobj[i] = typeof obj[i] === 'object' ?
       copy_obj(obj[i]) : obj[i];
    }
    return newobj
}

var predict = function(data, type) {
    switch (type) {
        case 0:
            return predict_by_moving_avg(data, 5);
        case 1:
            return predict_by_moving_avg(data, 3);
        default:
            return null;
    }
}

var predict_by_moving_avg = function(data, days) {
    var count = 0;
    var average = 0;
    for (let index = data.length; index >= 0; index--) {
        if (data[index] != null) {
            average += data[index];
            count++;
        }
        if (count == days) {
            break;
        }
    }
    return Math.floor(average / days);
}