//retrieve data and count how many vehicles for AV cars, HV cars, and SV cars
function retrieveData(data) {
    var arrayx = [];
    var arrayy = [];
    var anglearray = []
    var xtemp = [];
    var ytemp = [];
    var angles = [];
    var posofHV = [];
    var posofAV = [];
    var posofSV = [];
    var position = 0;
    var id = '';
    var length = 0;
    var HVcars = 0;
    var SVcars = 0;
    var AVcars = 0;
    var iteration = 0;
    length = data.length;
    // console.log(data.length)
    while (position < length) { 
        id = data[position].id;
        veh_cls = data[position].veh_cls;
        if (veh_cls.substr(0, 2) === 'HV') {
            HVcars++
            posofHV.push(iteration);
        } else if (veh_cls.substr(0, 2) === 'SV') {
            SVcars++
            posofSV.push(iteration);
        } else {
            AVcars++
            posofAV.push(iteration);
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
    console.log("posofHV", posofHV);
    console.log("posofAV", posofAV);
    console.log("posofSV", posofSV)
    return [arrayx, arrayy, anglearray, posofHV, posofAV, posofSV];
}

//canvas for the ring
var c = document.getElementById("outerCircle");
var ctx = c.getContext("2d");
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(313, 270, 267, 0, 2 * Math.PI);
ctx.strokeStyle = "#000000";
ctx.fillStyle = "#808080"
ctx.stroke();
ctx.fill();

var c = document.getElementById("innerCircle");
var ctx = c.getContext("2d");
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(313, 270, 232, 0, 2 * Math.PI);
ctx.strokeStyle = "#000000";
ctx.fillStyle = "#FFFFFF"
ctx.stroke();
ctx.fill();

//create elements with car images
function createelements(posofHV, posofAV, posofSV) {
    var namesofHV = [];
    var namesofAV = [];
    var namesofSV = [];
    for (i = 0; i < posofHV.length; i++) {
        var otherobj = document.createElement("IMG");
        otherobj.id = ('HV' + (posofHV[i]));
        otherobj.className = "car-img moving-car-img";// two classes
        namesofHV.push('HV' + (posofHV[i]));
        //human vehicle image
        otherobj.setAttribute('src', 'white_car.png');
        otherobj.style.position = "absolute";
        document.getElementById("car-container").appendChild(otherobj);

    }
    for (i = 0; i < posofSV.length; i++) {
        var otherobj = document.createElement("IMG");
        otherobj.id = ('SV' + (posofSV[i]));
        otherobj.className = "car-img moving-car-img";
        namesofSV.push('SV' + (posofSV[i]));
        //sensed vehicle image
        otherobj.setAttribute('src', 'blue_car.png');
        otherobj.style.position = "absolute";
        document.getElementById("car-container").appendChild(otherobj);
    }
    for (i = 0; i < posofAV.length; i++) {
        var otherobj = document.createElement("IMG");
        otherobj.id = ('AV' + (posofAV[i]));
        otherobj.className = "car-img moving-car-img";
        namesofAV.push('AV' + (posofAV[i]))
        //autonomous vehicle image
        otherobj.setAttribute('src', 'red_car.png');
        otherobj.style.position = "absolute";
        document.getElementById("car-container").appendChild(otherobj);
    }
    return [namesofHV, namesofAV, namesofSV];
    // console.log(namesofHV);
    // console.log(namesofAV);
}