var arrayx = [];
var arrayy = [];
var xtemp = [];
var ytemp = [];
var position = 0;
d3.csv("/pos_data.csv", function(data) {
    while (position < data.length) { 
        for (var i = position; i < position + 6002; i = i + 1) {
            // console.log(data[i].x);
            // console.log(data[i].y);
            xtemp.push(data[i].x);
            ytemp.push(data[i].y);
        }
        arrayx.push(xtemp);
        arrayy.push(ytemp);
        xtemp = [];
        ytemp = [];
        position = position + 6002;
    }

});



function ballCircle() {
       var element1 = document.getElementById('ball1');
       var element2 = document.getElementById('ball2');
       var element3 = document.getElementById('ball3');
       var element4 = document.getElementById('ball4');
       var element5 = document.getElementById('ball5');
       var element6 = document.getElementById('ball6');
       var element7 = document.getElementById('ball7');
       var element8 = document.getElementById('ball8');
       var element9 = document.getElementById('ball9');
       var element10 = document.getElementById('ball10');
       var element11 = document.getElementById('ball11');
       var element12 = document.getElementById('ball12');
       var element13 = document.getElementById('ball13');
       var element14 = document.getElementById('ball14');
       var element15 = document.getElementById('ball15');
       var element16 = document.getElementById('ball16');
       var element17 = document.getElementById('ball17');
       var element18 = document.getElementById('ball18');
       var element19 = document.getElementById('ball19');
       var element20 = document.getElementById('ball20');
       var element21 = document.getElementById('ball21');
       var element22 = document.getElementById('ball22');
    
       var id = setInterval(frame, 5)
       var pos = 0;
       function frame() {
            if (pos == 100000) {
                clearInterval(id);
            } else {
                element1.style.top = (arrayy[0][pos] * 5) + 100 + 'px';
                element1.style.left = (arrayx[0][pos] * 5) + 100 + 'px';
                element2.style.top = (arrayy[1][pos] * 5) + 100 + 'px';
                element2.style.left = (arrayx[1][pos] * 5) + 100 + 'px';
                element3.style.top = (arrayy[2][pos] * 5) + 100 + 'px';
                element3.style.left = (arrayx[2][pos] * 5) + 100 + 'px';
                element4.style.top = (arrayy[3][pos] * 5) + 100 + 'px';
                element4.style.left = (arrayx[3][pos] * 5) + 100 + 'px';
                element5.style.top = (arrayy[4][pos] * 5) + 100 + 'px';
                element5.style.left = (arrayx[4][pos] * 5) + 100 + 'px';
                element6.style.top = (arrayy[5][pos] * 5) + 100 + 'px';
                element6.style.left = (arrayx[5][pos] * 5) + 100 + 'px';
                element7.style.top = (arrayy[6][pos] * 5) + 100 + 'px';
                element7.style.left = (arrayx[6][pos] * 5) + 100 + 'px';
                element8.style.top = (arrayy[7][pos] * 5) + 100 + 'px';
                element8.style.left = (arrayx[7][pos] * 5) + 100 + 'px';
                element9.style.top = (arrayy[8][pos] * 5) + 100 + 'px';
                element9.style.left = (arrayx[8][pos] * 5) + 100 + 'px';
                element10.style.top = (arrayy[9][pos] * 5) + 100 + 'px';
                element10.style.left = (arrayx[9][pos] * 5) + 100 + 'px';
                element11.style.top = (arrayy[10][pos] * 5) + 100 + 'px';
                element11.style.left = (arrayx[10][pos] * 5) + 100 + 'px';
                element12.style.top = (arrayy[11][pos] * 5) + 100 + 'px';
                element12.style.left = (arrayx[11][pos] * 5) + 100 + 'px';
                element13.style.top = (arrayy[12][pos] * 5) + 100 + 'px';
                element13.style.left = (arrayx[12][pos] * 5) + 100 + 'px';
                element14.style.top = (arrayy[13][pos] * 5) + 100 + 'px';
                element14.style.left = (arrayx[13][pos] * 5) + 100 + 'px';
                element15.style.top = (arrayy[14][pos] * 5) + 100 + 'px';
                element15.style.left = (arrayx[14][pos] * 5) + 100 + 'px';
                element16.style.top = (arrayy[15][pos] * 5) + 100 + 'px';
                element16.style.left = (arrayx[15][pos] * 5) + 100 + 'px';
                element17.style.top = (arrayy[16][pos] * 5) + 100 + 'px';
                element17.style.left = (arrayx[16][pos] * 5) + 100 + 'px';
                element18.style.top = (arrayy[17][pos] * 5) + 100 + 'px';
                element18.style.left = (arrayx[17][pos] * 5) + 100 + 'px';
                element19.style.top = (arrayy[18][pos] * 5) + 100 + 'px';
                element19.style.left = (arrayx[18][pos] * 5) + 100 + 'px';
                element20.style.top = (arrayy[19][pos] * 5) + 100 + 'px';
                element20.style.left = (arrayx[19][pos] * 5) + 100 + 'px';
                element21.style.top = (arrayy[20][pos] * 5) + 100 + 'px';
                element21.style.left = (arrayx[20][pos] * 5) + 100 + 'px';
                element22.style.top = (arrayy[21][pos] * 5) + 100 + 'px';
                element22.style.left = (arrayx[21][pos] * 5) + 100 + 'px';
                pos++;
            }
        }
}
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 30;
ctx.beginPath();
ctx.strokeStyle = "#00BFFF"
ctx.arc(310, 268, 215, 0, 2 * Math.PI);
ctx.stroke();
