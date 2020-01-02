var xMax = { "value": 600.2 };
var yMax = { "value": 0 };
var yLabels = { abs_pos: "abs_pos (m)", CO: "CO (mg/s)", NOx: "NOx (mg/s)", fuel: "fuel (ml/s)", PMx: "PMx (mg/s)", speed: "speed (m/s)" };
var yLabel;
var graphTitle;
var lineColors;

var curParameter;
var curData = "";
var curDataFile = "";// global var in file_list.js
var curAlgorithm;
var curSetup;

var dontShowAgain = false;

var allCheckboxVal = false;

var algorithmDropdown;
var parameterDropdown;
var numDropdown;

var duration = 500;
const GRAPH_WIDTH = 800 // ADJUST
const GRAPH_HEIGHT = 300 // ADJUST
var margin = { top: 60, right: 20, bottom: 60, left: 50 }, // ADJUST
    width = GRAPH_WIDTH - margin.left - margin.right,
    height = GRAPH_HEIGHT - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .domain([0, xMax.value])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, yMax.value])
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);


var line = d3.line()
    .defined(function (d) { return curParameter != 'abs_pos' || d.y > 1; }) //avoid connecting the end point in one cyle to the start point of the next cycle
    .x(function (d) { return x(d.x); })
    .y(function (d) { return y(d.y); });

var svg = d3.select("#lineGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function onlyUnique(value, index, self) {
    return self.indexOf(value) == index;
}

function addLine() {

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    yLabel = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easier to center the text as the transform is applied to the anchor
        .attr("x", width - margin.left)
        .attr("y", height + margin.bottom)
        .text("Time (sec.)");

    graphTitle = svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("text-decoration", "underline")
        .style("font-weight", "bold")
        .text("Value vs. Time");

}

function addCarCheckboxes(car_names) {
    var allCheckbox = $(`<label id = "allCheckbox" class="checkbox-container"> ALL <input type="checkbox"> <span class="checkmark"></span> </label>`);
    $("#btn_group2").append(allCheckbox);


    for (i = 0; i < car_names.length; ++i) {
        var $checkbox = $(`<label class="checkbox-container">` + car_names[i] + `<input type="checkbox"> <span class="checkmark"></span> </label>`);
        $("#btn_group2").append($checkbox);
        $checkbox.on("change", function (d) {
            updateOverlayText(4);
            var childN = document.getElementById("btn_group2").childNodes;
            for (i = 0; i < childN.length; ++i) {
                childN[i].style.color = "#000000";
            }
            if (!this.childNodes[1].checked) {
                childN[0].childNodes[1].checked = false;
            }
        })
    }
    d3.select("#allCheckbox").on("change", function (d) {
        updateOverlayText(4);
        allCheckboxVal = !this.childNodes[1].checked;
        var childN = document.getElementById("btn_group2").childNodes;
        for (i = 0; i < childN.length; ++i) {
            childN[i].childNodes[1].checked = this.childNodes[1].checked;
            childN[i].style.color = "#000000";
        }

    })
}

function deleteCarCheckboxes() {
    const myNode = document.getElementById("btn_group2");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function getCarCheckedValues() {
    // const myNode = document.getElementById("btn_group2");
    // while (myNode.firstChild) {
    //     myNode.removeChild(myNode.firstChild);
    // }
    var selectedOpts = [];
    var childN = document.getElementById("btn_group2").childNodes;
    for (i = 0; i < childN.length; ++i) {
        if (childN[i].childNodes[1].checked == true) {
            selectedOpts.push(childN[i].textContent.trim());

        }
    }
    return selectedOpts;
}

//change color based on the color scheme
function updateTextCheckboxes() {
    var childN = document.getElementById("btn_group2").childNodes;
    var color = d3.scaleOrdinal(d3.schemeCategory10);  // set the colour scale
    for (i = 0; i < childN.length; ++i) {
        if (childN[i].childNodes[1].checked == true) {
            var myRegex = /(.*)(_)(.*)/g;
            var match = myRegex.exec(childN[i].firstChild.textContent);
            if (match != undefined) {
                childN[i].style.color = color(match[1]);
            }
        }
    }
}

function addButtons() {
    var algorithmGroup = ['Algorithm'];
    var setupGroup = ['Setup'];
    var parameterGroup = ['Parameter', 'abs_pos', 'CO', 'NOx', 'fuel', 'PMx', 'speed'];
    var data_filename_dict = {};
    var algo_setup_dict = {};
    var metric_filename_dict = {};
    extractAlgorithmsAndSetups(algorithmGroup, data_filename_dict, algo_setup_dict, FILE_LIST);
    console.log(METRICS_FILE_LIST);
    loadMetricsFileNames(metric_filename_dict, METRICS_FILE_LIST);

    // d3.select("#selectParameterButton").property("disabled", false);
    startButton = d3.select("#startButton").on("click", function (d) {
        updateOverlayText(6);
        console.log("start!!!!");
        updatePage(curParameter, curData, getCarCheckedValues());
        updateTextCheckboxes();
    })

    startButton.property("disabled", true);

    // add the options to the button
    algorithmDropdown = d3.select("#selectAlgorithmButton")
        .selectAll('myOptions')
        .data(algorithmGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
        .each(function (d) {
            if (d == "Algorithm") {
                d3.select(this).property("disabled", true)
            }
        });


    // add the options to the button
    setupDropdown = d3.select("#selectSetupButton")
        .selectAll('myOptions')
        .data(setupGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
        .each(function (d) {
            if (d == "Setup") {
                d3.select(this).property("disabled", true)
            }
        })
    setupDropdown.property("disabled", true);

    // add the options to the button
    parameterDropdown = d3.select("#selectParameterButton")
        .selectAll('myOptions')
        .data(parameterGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
        .each(function (d) {
            if (d == "Parameter") {
                d3.select(this).property("disabled", true)
            }
        });

    parameterDropdown.property("disabled", true);

    // When the button is changed, run the updateChart function
    var curr;
    d3.select("#selectAlgorithmButton").on("change", function (d) {
        updateOverlayText(2);
        startButton.property("disabled", true);

        curr = d3.select(this).property("value");
        curAlgorithm = curr;
        updateTitle();
        // d3.select("#selectParameterButton").property("disabled", false);

        var select = document.getElementById('selectSetupButton');
        var length = select.options.length
        while (select.options.length > 1) {
            select.remove(1);
        }

        // add and sort setup options
        var options = [];
        for (i = 0; i < algo_setup_dict[curr].length; ++i) {
            options.push(algo_setup_dict[curr][i]);
        }
        // sort alphanumeric strings
        var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        options.sort(collator.compare);

        for (var i = 0; i < options.length; i++) {
            var option = document.createElement("option");
            option.text = options[i];
            option.value = options[i];
            select.add(option);
        }


        var myDDL1 = $('#selectSetupButton');
        myDDL1[0].selectedIndex = 0;
        var myDDL2 = $("#selectParameterButton");
        myDDL2[0].selectedIndex = 0;
        deleteCarCheckboxes();

    })

    d3.select("#selectSetupButton").on("change", function (d) {
        updateOverlayText(3);
        var select = d3.select(this).property("value");
        var key = d3.select("#selectAlgorithmButton").property("value") + select;
        var curr = data_filename_dict[key];
        if (curr != curDataFile) {
            curDataFile = curr;
            d3.csv(curDataFile, function (error, data) {
                if (error) throw error;
                curData = data;
                curSetup = d3.select("#selectSetupButton").property("value");
                parameterDropdown.property("disabled", false);
                parameterDropdown.each(function (d) {
                    if (d == "Parameter") {
                        d3.select(this).property("disabled", true)
                    }
                });

                var car_ids = d3.map(data, function (d) { return (d.id) }).keys();
                var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                car_ids.sort(collator.compare);

                deleteCarCheckboxes();
                addCarCheckboxes(car_ids);
                loadMetricsFile(metric_filename_dict[select]);
            });
        }
    })





    // When the button is changed, run the updateChart function
    d3.select("#selectParameterButton").on("change", function (d) {
        updateOverlayText(5);
        // recover the option that has been chosen
        curParameter = d3.select(this).property("value");

        startButton.property("disabled", false);
    })
}

function updatePage(selectedOption, data, selectedKeys) {
    d3.selectAll(".line").remove();
    d3.select(".line").remove();
    d3.select("#vertical_time_line").remove();
    d3.select("#vertical_time_line_text").remove();

    var dataToPlot = [];
    var curYMax = Number.NEGATIVE_INFINITY;
    var selectedData; //cars selected

    if (selectedOption == "abs_pos") {
        for (i = 0; i < data.length; ++i) {
            dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i].abs_pos });
        }
        curYMax = data.reduce((max, b) => Math.max(max, b.abs_pos), data[0].abs_pos);
    } else if (selectedOption == "CO") {
        for (i = 0; i < data.length; ++i) {
            dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i].CO });
        }
        curYMax = data.reduce((max, b) => Math.max(max, b.CO), data[0].CO);
    } else if (selectedOption == "NOx") {
        for (i = 0; i < data.length; ++i) {
            dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i].NOx });
        }
        curYMax = data.reduce((max, b) => Math.max(max, b.NOx), data[0].NOx);
    } else if (selectedOption == "fuel") {
        for (i = 0; i < data.length; ++i) {
            dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i].fuel });
        }
        curYMax = data.reduce((max, b) => Math.max(max, b.fuel), data[0].fuel);
    } else if (selectedOption == "PMx") {
        for (i = 0; i < data.length; ++i) {
            dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i].PMx });
        }
        curYMax = data.reduce((max, b) => Math.max(max, b.PMx), data[0].PMx);
    } else if (selectedOption == "speed") {
        for (i = 0; i < data.length; ++i) {
            dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i].speed });
        }
        curYMax = data.reduce((max, b) => Math.max(max, b.speed), data[0].speed);
    }

    // update axis based on selection
    y = d3.scaleLinear()
        .domain([0, curYMax])
        .range([height, 0]);

    yAxis = d3.axisLeft()
        .scale(y);

    svg.selectAll("g.y.axis")
        .call(yAxis);

    yLabel.text(yLabels[curParameter]);

    // update title
    graphTitle
        .text(curAlgorithm + " (" + curSetup + "): " + yLabels[curParameter] + " vs. Time(s.)")

    // process each group using id's as keys
    var dataNest = d3.nest()
        .key(function (d) { return d.id; })// use as key
        // .entries(data);
        .entries(dataToPlot);

    selectedData = dataNest;
    if (selectedKeys[0] != "ALL") {
        var filtered = dataNest.filter(
            function (e) {
                return this.indexOf(e["key"]) >= 0;
            },
            selectedKeys
        );
        selectedData = filtered;

    }

    // ***************************************************
    // get all cars' ids
    var car_ids = d3.map(data, function (d) { return (d.id) }).keys();
    var matches = [];
    var opacities = [];

    // extract the type of the id (excluding the number)
    for (i = 0; i < car_ids.length; ++i) {
        var myRegex = /(.*)(_)(\d)*/g;
        var match = myRegex.exec(car_ids[i]);
        matches.push(match[1]);// eg. extract "IDM" from "IDM_01"
    }

    // get all unique ids
    var uniqueMatches = matches.filter(onlyUnique);

    // use differnt opacities based on different type of ids
    for (i = 0; i < matches.length; ++i) {
        for (j = 0; j < uniqueMatches.length; ++j) {
            if (matches[i] == uniqueMatches[j]) {
                opacities.push(Math.pow(0.4, j + 0.9));
                break;
            }
        }
    }

    updateGraph(selectedData, opacities);

    // TODO: CALL RING function here.
    // startRing();
    // You may need the following var
    // selectedKeys: selected car
    // dataNest: data grouped by car ID
    // data
    startRing(data);

}

function updateLineColors(dataGroups) {
    var color = d3.scaleOrdinal(d3.schemeCategory10);  // set the colour scale
    lineColors = [];
    for (i = 0; i < dataGroups.length; ++i) {
        var myRegex = /(.*)(_)(.*)/g;
        var match = myRegex.exec(dataGroups[i].key);
        lineColors.push(color(match[1]));
    }
}

// A function that updates the chart
function updateGraph(dataGroups, opacities) {
    updateLineColors(dataGroups);
    // Loop through each symbol / key
    count = 0;


    dataGroups.forEach(function (d, i) {

        var path = svg.append("path")
            .datum(dataGroups)
            .attr("class", "line")
            .attr("d", line(d.values))//
            .style("stroke", function () { // Add dynamically
                // return d.color = color(d.key);
                return d.color = lineColors[count];

            })
            .style("opacity", function () {
                return opacities[count];
            })


        // Variable to Hold Total Length
        var totalLength = path.node().getTotalLength();

        // Set Properties of Dash Array and Dash Offset and initiate Transition
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition() // Call Transition Method
            .duration(duration) // Set Duration timing (ms) 500000
            .ease(d3.easeLinear) // Set Easing option
            .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

        count += 1;

    });

    //Add vertical line time line
    var vertical_line_container = svg.append("g")
        .attr("class", "vertical_line_container")


    var vertical_time_line = vertical_line_container.append('line')
        // .attr('x1', vertLineXCoord)
        // .attr('y1', chartHeight - margins.top)
        // .attr('x2', vertLineXCoord)
        // .attr('y2', 0 + margins.top)
        .attr("id", "vertical_time_line")
        .attr('x1', 0)
        .attr('y1', GRAPH_HEIGHT - margin.top * 1.6)
        .attr('x2', 0)
        .attr('y2', 0)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .style("fill", "none")

    vertical_line_container.append("text")
        .attr("id", "vertical_time_line_text")
        .attr("x", 0)
        .attr("y", GRAPH_HEIGHT - margin.top * 1.45)
        .attr('text-anchor', 'middle')
        .text("current time");
}

function updateOverlayText(tutorialOrder) {
    if (dontShowAgain) {
        return;
    }
    // $('#remove').on('click', function () {
    var $overlay = $('#overlay');

    if (tutorialOrder == 1) {
        var $selectAlgorithmButton = $('#selectAlgorithmButton');
        $selectAlgorithmButton.css('z-index', 11);
        $('#overlay-text').text("1. Please select an algorithm.");
        $overlay.data('current', $selectAlgorithmButton).show();
    } else if (tutorialOrder == 2) {
        var $selectSetupButton = $('#selectSetupButton');
        $selectSetupButton.css('z-index', 11);
        $('#overlay-text').text(" 2. Please select a setup. In each setup, there are 22 vehicles in two different types.");
        $overlay.data('current', $selectSetupButton).show()
    } else if (tutorialOrder == 3) {
        var $btn_group2 = $('#btn_group2');
        $btn_group2.css('z-index', 11);
        $('#overlay-text').text("3. Please check the vehicles to plot on the graph.");
        $overlay.data('current', $btn_group2).show()
    } else if (tutorialOrder == 4) {
        var $selectParameterButton = $('#selectParameterButton');
        $selectParameterButton.css('z-index', 11);
        $('#overlay-text').text("4. Please select a parameter to be plotted on the y axis.");
        $overlay.data('current', $selectParameterButton).show()
    } else if (tutorialOrder == 5) {
        var $startButton = $('#startButton');
        $startButton.css('z-index', 11);
        $('#overlay-text').text("5. Please press the \"Start\" button to run the Ring and plot the graph.");
        $overlay.data('current', $startButton).show()
    } else if (tutorialOrder == 6) {
        dontShowAgain = true;
        $overlay.hide();
        $overlay.data('current').css('z-index', 1);
    }
    else {
        $overlay.hide();
        $overlay.data('current').css('z-index', 1);
    }
    // ++tutorialOrder;
    // });
}

function extractAlgorithmsAndSetups(algorithms, filename_dict, algo_setup_dict, file_strs) {
    //original "data/raw_data/IDM_AVRider_AUG--0IDM_22AUG--sugiyama_20191014-1314411571084081.113794-emission.csv"
    //current format: data/raw_data/IDM_AVRider_AUG--0IDM_22AUG
    var algos = [];
    for (i = 0; i < file_strs.length; ++i) {
        // var myRegex = /(.*)(--)(.*)(--)(.*)/g;
        var myRegex = /(.*)(--)(.*)(.csv)/g;

        var filename = file_strs[i];

        var filename = filename.replace(/^.*[\\\/]/, ''); //replace string "abc/" with empty to extract the filename
        var ALGO_INDEX = 1;
        var SETUP_INDEX = 3;
        var match = myRegex.exec(filename);
        algos.push(match[ALGO_INDEX]);
        var algo_str = match[ALGO_INDEX];

        if (algo_setup_dict[algo_str] === undefined) {
            algo_setup_dict[algo_str] = [];
        }

        algo_setup_dict[algo_str].push(match[SETUP_INDEX]);

        var key = match[1] + match[SETUP_INDEX];
        filename_dict[key] = file_strs[i];
    }

    var uniqueAlgos = algos.filter(onlyUnique);
    for (i = 0; i < uniqueAlgos.length; ++i) {
        algorithms.push(uniqueAlgos[i]);
    }
}

function loadMetricsFileNames(metric_filename_dict, file_strs) {
    for (i = 0; i < file_strs.length; ++i) {
        // var myRegex = /(.*\/)(.*)(--)(.*)(--)(.*)/g;
        var myRegex = /(.*)(\.)(csv)/g;
        var filename = file_strs[i];
        var filename = filename.replace(/^.*[\\\/]/, '')
        var filename = filename.substring(4); //ignore Big_0IDM_22AUG
        var match = myRegex.exec(filename);
        var setup_str = match[1];
        metric_filename_dict[setup_str] = file_strs[i];
    }
}
//TODO: call this in the ring's setinterval
function changeverticalTimeLinePos(curr_x) {
    // console.log("curr_x =", curr_x);
    // curr_x is the time step in sec.
    if (curr_x < 600.2) {
        d3.select("#vertical_time_line")
            .attr("x1", x(curr_x))
            .attr("x2", x(curr_x))
        d3.select("#vertical_time_line_text")
            .attr("x", x(curr_x))
    }
}

function loadMetricsFile(filename) {
    d3.select("#metrics_table").remove();
    // The table generation function
    function tabulate(data, columns) {
        var table = d3.select("#table1").append("table")
            .attr("id", "metrics_table")
            // .attr("style", "margin-left: 200px")
            .style("border-collapse", "collapse")// <= Add this line in
            .style("border", "2px black solid"), // <= Add this line in
            thead = table.append("thead"),
            tbody = table.append("tbody");

        // append the header row
        thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function (column) { return column; })
            .style("font-size", "12px");

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function (row) {
                return columns.map(function (column) {
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append("td")
            .attr("style", "font-family: Courier") // sets the font style
            .style("font-size", "18px")
            .html(function (d) { return d.value; });

        return table;
    }
    console.log("loading metrics " + filename);
    d3.csv(filename, function (error, data) {
        if (error) throw error;
        var metrics_table = tabulate(data, ["stableT", "stableSpd", "MaxGap", "AvgFuelRate", "VMT"]);
    });


}

function functionConfirm(msg, myYes, myNo) {

    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes,.no").unbind().click(function () {
        confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.find(".no").click(myNo);
    confirmBox.show();
}

function tutorialConfirm() {
    functionConfirm("Hi! Would you like a quick tour?", function yes() {
        updateOverlayText(1);
    },
        function no() {
            dontShowAgain = true;
            var $overlay = $('#overlay');
            $overlay.hide();
        });
}

var id;
var created = false;
var namesofHV;
var namesofAV;
var namesofSV;
function startRing(data) {
    d3.selectAll(".moving-car-img").remove();
    clearInterval(id);
    var datalist = retrieveData(data);
    //make arrays of points x, y, angles, positions
    var arrayx = datalist[0];
    var arrayy = datalist[1];
    var anglearray = datalist[2];
    var posofHV = datalist[3];
    var posofAV = datalist[4];
    var posofSV = datalist[5];
    //create the elements and split into HumanV, SensedV and AutonomousVehicles
    var tempList = createelements(posofHV, posofAV, posofSV);
    namesofHV = tempList[0];
    namesofAV = tempList[1];
    namesofSV = tempList[2];

    //check for created vehicles so don't duplicate vehicles when switching data
    if (created) {
        clearInterval(id);
        created = false;
    }
    //set interval of updating (change 15 to make faster or slower)
    id = setInterval(frame, 15);
    created = true;
    var pos = 0;

    //update vehicles position around the ring
    function frame() {
        if (pos >= arrayx[0].length) {
            // console.log("cleared")
            clearInterval(id);
            created = false;
        } else {
            changeverticalTimeLinePos(pos * 0.1);
            for (i = 0; i < namesofHV.length; i++) {
                eval(namesofHV[i]).style.marginLeft = arrayx[posofHV[i]][pos] * 5.85 + 70 + 'px';
                eval(namesofHV[i]).style.marginTop = arrayy[posofHV[i]][pos] * 5.85 + 60 + 'px';
                eval(namesofHV[i]).style.transform = 'rotate(' + (-anglearray[posofHV[i]][pos]) + 'deg)';
            }
            for (i = 0; i < namesofAV.length; i++) {
                eval(namesofAV[i]).style.marginLeft = arrayx[posofAV[i]][pos] * 5.85 + 70 + 'px';
                eval(namesofAV[i]).style.marginTop = arrayy[posofAV[i]][pos] * 5.85 + 60 + 'px';
                eval(namesofAV[i]).style.transform = 'rotate(' + (-anglearray[posofAV[i]][pos]) + 'deg)';
            }
            for (i = 0; i < namesofSV.length; i++) {
                eval(namesofSV[i]).style.marginLeft = arrayx[posofSV[i]][pos] * 5.85 + 70 + 'px';
                eval(namesofSV[i]).style.marginTop = arrayy[posofSV[i]][pos] * 5.85 + 60 + 'px';
                eval(namesofSV[i]).style.transform = 'rotate(' + (-anglearray[posofSV[i]][pos]) + 'deg)';
            }

        }
        pos++;
    }

}


var dict = {
    'IDM_AVRider_PI': "PI: PI with Saturation <br> Automated vehicle model using PI with saturation. Mixing of the leading vehicle speed and the target speed is used as the command speed to mitigating the speed difference between the subject vehicle and the leading vehicle while keeps the momentum to drive at the target speed. The target speed is mainly based on the average of historic speed of a passing short period, which can smooth out speed fluctuation. The catch speed is added when the space-gap is larger than a threshold to keep the momentum when it is safe.",
    'IDM_AVRider_MLYAU1': "MLYAU1: Lyapunov Based Controller Type 1 <br> Automated vehicle model using controller derived using Lyapunov method. There are two types of Lyapunov based controller considereds. This is the type 1.",
    'IDM_AVRider_MLYAU2': "MLYAU2: Lyapunov Based Controller Type 2 <br> Automated vehicle model using controller derived using Lyapunov method. There are two types of Lyapunov based controller considereds. This is the type 2. ",
    'IDM_AVRider_AUG': "AUG: Augmented Optimal-Velocity-Follow-the-Leader <br> Automated vehicle model using augmented optimal-velocity-follow-the-leader control. The controller is basically the augmentation of the so called optima-velocity-follow-the-leader model with a term regulating the difference between the current speed and the desired speed.",
    'IDM_AVRider_LACC_Unstable': "LACC: Linear Adaptive Cruise Control <br> Automated vehicle model using linear adaptive cruise control. The adaptive cruise control regulates the speed error, which is the difference in speed between the subject vehicle and the leading vehicle, and the gap error, which is the difference between the current time-gap and the desired time-gap. The control action is the linear combination of these two errors. ",
    'IDM_AVRider_LACC': "LACC: Linear Adaptive Cruise Control <br> Automated vehicle model using linear adaptive cruise control. The adaptive cruise control regulates the speed error, which is the difference in speed between the subject vehicle and the leading vehicle, and the gap error, which is the difference between the current time-gap and the desired time-gap. The control action is the linear combination of these two errors. ",
    'IDM_AVRider_FUZN': "FUZ1: <br> Automated vehicle model using fuzzy control as the core of the car following controller. There are two types of the fuzzy controller based automated vehicle model considered. This is the type 1 of the fuzzy controller.",
    'IDM_AVRider_FUZO': "FUZ2: <br> Automated vehicle model using fuzzy control as the core of the car following controller. There are two types of the fuzzy controller based automated vehicle model considered. This is the type 2 of the fuzzy controller.",
    'IDM_AVRider_LinOpt': "LinOpt: Linear Optimal Control <br> Automated vehicle model using linear optimal control. The optimal control is derived via linear quadratic regulation with the linearized model of the ring traffic around the equilibrium point.",
    'IDM_AVRider_FS': "FS: FollowerStopper <br> Automated vehicle model using FollowerStopper. The 2 dimension space of the speed difference and the space-gap difference between the subject vehicle and the preceding vehicle is segmented into a few sets using a set of nonlinear functions. The safe region, the adaptation region I, the adaption region II, and the stop region are defined accordingly. When in the safe region, the subject vehicle is controlled to drive at the preset free flow speed. In the adaptation region I and the adaptation II, varying mixing ratio of leading vehicle speed and the free flow speed is command as the control action. In the stop region, zero is command to stop the vehicle.",
    'IDM_AVRider_BCM': "BCM: Bilateral Control Model <br> Automated vehicle model using bilateral control model. The BCM is a type of linear controller that uses both the information of the leading vehicle and the following vehicle. The measurement of the leading vehicle and the following vehicle can be realized with the sensors at the front-end and at the rear-end.",
};

function updateTitle() {
    var string = dict[curAlgorithm];
    var result = string.fontsize(3);
    document.getElementById("paragraph").innerHTML = result;
}

function launch() {
    addLine();
    addButtons();
}
launch();
