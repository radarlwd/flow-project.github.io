
function retrieveData(data) {
    var arrayx = [];
    var arrayy = [];
    var anglearray = []
    var xtemp = [];
    var ytemp = [];
    var angles = [];
    var posofreg = [];
    var posofauto = [];
    var position = 0;
    var id = '';
    var length = 0;
    var cars = 0;
    var autocars = 0;
    var iteration = 0;
    length = data.length;
    // console.log(data.length)
    while (position < length) { 
        id = data[position].id;
        if (id.substr(0, 3) === 'IDM') {
            cars++
            posofreg.push(iteration);
        } else {
            autocars++
            posofauto.push(iteration);
        }
      
            
        while (position < length && id === data[position].id) {
            xtemp.push(data[position].x);
            ytemp.push(data[position].y);
            angles.push(data[position].angle);
            position++;
        }
        arrayx.push(xtemp);
        arrayy.push(ytemp);
        anglearray.push(angles);
        xtemp = [];
        ytemp = [];
        angles = [];
        iteration++
    }
    // console.log("x", arrayx);
    // console.log("y", arrayy);
    // console.log("ang", anglearray)
    // console.log("posofreg", posofreg);
    // console.log("posofauto", posofauto);
    return [arrayx, arrayy, anglearray, posofreg, posofauto];
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(313, 270, 267, 0, 2 * Math.PI);
ctx.strokeStyle = "#000000";
ctx.fillStyle = "#808080"
ctx.stroke();
ctx.fill();

var c = document.getElementById("Canvas2");
var ctx = c.getContext("2d");
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(313, 270, 232, 0, 2 * Math.PI);
ctx.strokeStyle = "#000000";
ctx.fillStyle = "#FFFFFF"
ctx.stroke();
ctx.fill();


function createelements(posofreg, posofauto) {
    var namesofreg = [];
    var namesofauto = [];
    for (i = 0; i < posofreg.length; i++) {
        var obj = document.createElement('div');
        obj.className = "images";
        var otherobj = document.createElement("IMG");
        otherobj.id = ('IDM' + (posofreg[i]));
        namesofreg.push('IDM' + (posofreg[i]));
        otherobj.setAttribute('src', 'yellow_car.png');
        otherobj.style.position = "relative";
        obj.appendChild(otherobj);
        document.getElementById("car-container").appendChild(obj);
    }
    for (i = 0; i < posofauto.length; i++) {
        var obj = document.createElement('div');
        obj.className = "images";
        var otherobj = document.createElement("IMG");
        otherobj.id = ('AUTO' + (posofauto[i]));
        namesofauto.push('AUTO' + (posofauto[i]))
        otherobj.setAttribute('src', 'blue_car.png');
        otherobj.style.position = "relative";
        obj.appendChild(otherobj);
        document.getElementById("car-container").appendChild(obj);
    }
    return [namesofreg, namesofauto];
    // console.log(namesofreg);
    // console.log(namesofauto);
}