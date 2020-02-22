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