"use strict;" // Prevent memory leaks caused by accidentally declaring global vars

// User Selection Properties
var curData = null;
var curDataFilename = null;// global var in file_list.js
var curAlgorithm = null;
var curSetup = null;
var curDistribution = null
var curParameter = null;
var curAnimationInterval = null;// speed

// state
var dontShowAgain = false;
var isPaused = true;
var isInitialRun = true; //true when we are at the very beginning of each run

// Gtaph Properties
const GRAPH_WIDTH = 800 // ADJUST
const GRAPH_HEIGHT = 350 // ADJUST
var margin = { top: 60, right: 20, bottom: 60, left: 65 }, // ADJUST
    width = GRAPH_WIDTH - margin.left - margin.right,
    height = GRAPH_HEIGHT - margin.top - margin.bottom;
var xMax = { "value": 600.2 };
var yMax = { "value": 0 };
var Y_LABELS = { "Absolute Position": "Absolute Position (m)", CO: "CO (mg/s)", NOx: "NOx (mg/s)", fuel: "fuel (ml/s)", PMx: "PMx (mg/s)", speed: "speed (m/s)" };
var yLabel;
var graphTitle;
var duration = 500; // in ms, smaller makes the animation of line graph faster
var PARAMETER_DICT = { "Absolute Position": "abs_pos", "CO": "CO", "NOx": "NOx", "fuel": "fuel", "PMx": "PMx", "speed": "speed" };
var ANIMATION_SPEED_DICT = { "-- Animation Speed --": "-- Animation Speed --", "fast": 15, "normal": 25, "slow": 35 };

//scaling and range of line graph
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
    .defined(function (d) { return curParameter != 'Absolute Position' || d.y > 1; }) //avoid connecting the end points in one cyle to the start point of the next cycle
    .x(function (d) { return x(d.x); })
    .y(function (d) { return y(d.y); });

// Create a line graph element
var svg = d3.select("#line_graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function addLineGraph() {

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .style("font", "16px sans-serif");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .style("font", "16px sans-serif")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");



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
    var checkbox_select_all = $(`<label id = "checkbox_select_all" class="checkbox-container">Select All<input type="checkbox" class="checkbox"> <span class="checkmark"></span> </label>`);
    $("#btn_group2").append(checkbox_select_all);
    $("#checkbox_title").show();

    for (i = 0; i < car_names.length; ++i) {
        var $checkbox = $(`<label class="checkbox-container">` + car_names[i] + `<input type="checkbox" class="checkbox"> <span class="checkmark"></span> </label>`);
        $("#btn_group2").append($checkbox);

        $checkbox.on("change", function (d) {
            updateOverlayText("selectParameter");
            var childN = document.getElementById("btn_group2").childNodes;
            for (i = 0; i < childN.length; ++i) {
                childN[i].style.color = "#000000";//set inital color of checkbox to black
            }
            // deselect "select all" button when a checkbox is not checked
            if (!this.childNodes[1].checked) {
                childN[0].childNodes[1].checked = false;
            }
        })
    }

    // a checkbox to select all vehicle
    d3.select("#checkbox_select_all").on("change", function (d) {
        updateOverlayText("selectParameter");
        var childN = document.getElementById("btn_group2").childNodes;
        for (i = 0; i < childN.length; ++i) {
            // select or deselect all other checkboxes based on this checkbox's value
            childN[i].childNodes[1].checked = this.childNodes[1].checked;
            childN[i].style.color = "#000000";
        }

    })
}

function updateRunBtnTooltip() {
    var content = "";
    if (curAlgorithm && curSetup && curDistribution && curParameter && curAnimationInterval) {
        content += "Ready to Run!\n";
    } else {
        content += 'Status: Missing the following selection(s):\n'
        if (curAlgorithm == null) {
            content += "Algorithm\n";
        }
        if (curSetup == null) {
            content += "Setup\n";
        }
        if (curDistribution == null) {
            content += "Distribution\n";
        }
        if (curParameter == null) {
            content += "Parameter\n";
        }
        if (curAnimationInterval == null) {
            content += "Animation Speed\n";
        }
    }
    document.getElementById('btn_run').setAttribute('title', content);
}

// returns all selected cars'text
function getCarCheckedValues() {
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
function updateCheckboxesTextColors() {
    var childN = document.getElementById("btn_group2").childNodes;
    var color = d3.scaleOrdinal(d3.schemeCategory10);  // set the colour scale
    for (i = 0; i < childN.length; ++i) {
        if (childN[i].childNodes[1].checked == true) {
            // var myRegex = /(.*)(_)(.*)/g;
            var myRegex = /([^_]*)(_)(.*)/g; // for something like MLYAU1_5_0
            var match = myRegex.exec(childN[i].firstChild.textContent);
            if (match != undefined) {
                childN[i].style.color = color(match[1]);
            }
        }
    }
}

function addButtons() {
    // strings to be used in dropdown menus
    var algorithmGroup = ['-- Algorithm --'];
    var setupGroup = ['-- Setup --'];
    var distributionGroup = ['-- Distribution --'];
    var parameterGroup = ['-- Parameter --', 'Absolute Position', 'CO', 'NOx', 'fuel', 'PMx', 'speed'];

    var dataFilenameDict = {}; // {ALGO+SETUP: FILENAME}
    var algoSetupDistDict = {}; // This is a nested dictionary {ALGO1: {SETUP1: [DIST1, DIST2], SETUP2: [DIST1]}}
    var metricsFilenameDict = {}; // {SETUP+DIST: METRICS_FILE_NAME}

    extractAlgorithmsAndSetups(algorithmGroup, dataFilenameDict, algoSetupDistDict, FILE_LIST);
    loadMetricsFileNames(metricsFilenameDict, METRICS_FILE_LIST);

    // *********************** add options to each dropdown menu *******************************

    addOptionsToDropdownMenu(
        "#select_algorithm",
        algorithmGroup,
        function (d) {
            if (d != "-- Algorithm --") {
                return d.substring(12);
            } else {
                return d;
            }
        },
        function (d) { return d; },
        function (d) {
            if (d == "-- Algorithm --") {
                d3.select(this).property("disabled", true)
            }
        }
    )

    addOptionsToDropdownMenu(
        "#select_setup",
        setupGroup,
        function (d) { return d; },
        function (d) { return d; },
        function (d) {
            if (d == "-- Setup --") {
                d3.select(this).property("disabled", true)
            }
        }
    )

    $("#select_setup").prop("disabled", true);

    addOptionsToDropdownMenu(
        "#select_distribution",
        distributionGroup,
        function (d) { return d; },
        function (d) { return d; },
        function (d) {
            if (d == "-- Distribution --") {
                d3.select(this).property("disabled", true)
            }
        }
    )

    $("#select_distribution").prop("disabled", true);

    addOptionsToDropdownMenu(
        "#select_parameter",
        parameterGroup,
        function (d) { return d; },
        function (d) { return d; },
        function (d) {
            if (d == "-- Parameter --") {
                d3.select(this).property("disabled", true)
            }
        }
    )

    $("#select_parameter").prop("disabled", true);

    addOptionsToDropdownMenu(
        "#select_speed",
        ["-- Animation Speed --", "fast", "normal", "slow"],
        function (d) { return d; },
        function (d) { return ANIMATION_SPEED_DICT[d]; },
        function (d) {
            if (d == "-- Animation Speed --") {
                d3.select(this).property("disabled", true)
            }
        }
    )

    // ******************* Definitoin of dropdown menu functions **************************

    d3.select("#select_algorithm").on("change", function (d) {
        updateOverlayText("selectSetup");
        removeAllChildrenByID("table_container_metrics");
        removeAllChildrenByID("btn_group2"); //remove car Checkboxes
        $("#checkbox_title").hide();
        $("#table_title").hide();
        $("#btn_run").prop("disabled", true);
        $("#btn_clear").prop("disabled", true);
        $('#select_setup').prop("disabled", false);
        // reset or remove other elements
        $('#select_setup')[0].selectedIndex = 0;
        $("#select_distribution")[0].selectedIndex = 0;
        $("#select_parameter")[0].selectedIndex = 0;
        curSetup = null;
        curDistribution = null;
        curParameter = null;

        curAlgorithm = d3.select(this).property("value");
        updateRunBtnTooltip();
        updateTitle(curAlgorithm);

        var select_setup_options = document.getElementById('select_setup');
        // clear the options (except the first one)in setup dropdown menu
        while (select_setup_options.options.length > 1) {
            select_setup_options.remove(1);
        }

        // add and sort setup options
        var setupOptions = []; // tempararily holds current options which will be sorted before adding to the dropdown

        const setups = Object.keys(algoSetupDistDict[curAlgorithm]);
        for (i = 0; i < setups.length; ++i) {
            setupOptions.push(setups[i]);
        }
        // sort alphanumeric strings
        var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        setupOptions.sort(collator.compare);

        // format and add each option 
        for (var i = 0; i < setupOptions.length; i++) {
            var option = document.createElement("option");

            /* format: 0IDM_22FS*/
            var myRegex = /(\d*)(.*)(_)(\d*)(.*)/g;
            var match = myRegex.exec(setupOptions[i]);
            // 0IDM_22FS becomes IDM: 0, FS: 22
            option.text = match[2] + ": " + match[1] + ", " + match[5] + ": " + match[4];

            // option.text = options[i];
            option.value = setupOptions[i];
            select_setup_options.add(option);
        }

    })

    d3.select("#select_setup").on("change", function (d) {
        updateOverlayText("selectDistribution");

        removeAllChildrenByID("table_container_metrics");
        $("#checkbox_title").hide();
        $("#table_title").hide();
        $("#btn_run").prop("disabled", true);
        $("#btn_clear").prop("disabled", true);
        $('#select_distribution').prop("disabled", false);
        $("#select_distribution")[0].selectedIndex = 0;
        $("#select_parameter")[0].selectedIndex = 0;
        curParameter = null;
        curDistribution = null;

        if (curSetup != d3.select(this).property("value")) {
            // deleteCarCheckboxes();
            removeAllChildrenByID("btn_group2"); //remove car Checkboxes
            curSetup = d3.select(this).property("value");
        }
        updateRunBtnTooltip();

        var select_distribution_options = document.getElementById('select_distribution');

        // clear the options(except the first one) in distribution dropdown menu
        while (select_distribution_options.options.length > 1) {
            select_distribution_options.remove(1);
        }
        var distributionOptions = algoSetupDistDict[curAlgorithm][curSetup];

        // add the distribution options to dropdown
        for (var i = 0; i < distributionOptions.length; i++) {
            var option = document.createElement("option");
            option.text = distributionOptions[i];
            option.value = distributionOptions[i];
            select_distribution_options.add(option);
        }
    })

    d3.select('#select_distribution').on("change", function (d) {
        updateOverlayText("checkVehicleID");

        $("#btn_run").prop("disabled", true);
        $("#btn_clear").prop("disabled", true);
        $("#select_parameter")[0].selectedIndex = 0;
        curParameter = null;

        curDistribution = d3.select(this).property("value");
        var key = curAlgorithm + curSetup + curDistribution;
        updateRunBtnTooltip();

        // load a new file when the previous selection is different than the current
        if (dataFilenameDict[key] != curDataFilename) {
            curData = null;// avoild consuming MEMORY when are loading new data while keeping a copy of previous

            // enable loading animatin 
            var x = document.getElementById("loading");
            x.style.display = "block";

            curDataFilename = dataFilenameDict[key];

            d3.csv(curDataFilename + "?" + (new Date).getTime(), function (error, data) {// add a string to filename to avoid caching
                if (error) throw error;
                curData = data;
                data = null;// avoild keeping the second copy in this scope which consumes lots of MEMORY

                // loading animation
                var x = document.getElementById("loading");
                x.style.display = "none";

                // only display the available parameters for the current data
                var keys = Object.keys(curData[0]);
                var op = document.getElementById("select_parameter").getElementsByTagName("option");
                for (var i = 0; i < op.length; i++) {
                    if (op[i].value == "-- Parameter --") {
                        op[i].disabled = true;
                    } else if (keys.includes(PARAMETER_DICT[op[i].value])) {
                        op[i].disabled = false;
                    } else {
                        op[i].disabled = true;
                    }
                }

                $("#select_parameter").prop("disabled", false);

                // get and sort unique CarIDs
                var uniqueCarIds = d3.map(curData, function (d) { return (d.id) }).keys();
                var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                uniqueCarIds.sort(collator.compare);

                removeAllChildrenByID("btn_group2"); //remove car Checkboxes
                addCarCheckboxes(uniqueCarIds);

                loadMetricsFile(metricsFilenameDict[curSetup + curDistribution]); //restore
            });
        }
    })

    d3.select("#select_parameter").on("change", function (d) {
        updateOverlayText("selectSpeed");

        curParameter = d3.select(this).property("value");
        updateRunBtnTooltip();
        if (curAnimationInterval != null) {
            btn_run.prop("disabled", false);
        }
    })

    d3.select("#select_speed").on("change", function (d) {
        updateOverlayText("run");

        curAnimationInterval = d3.select(this).property("value");
        updateRunBtnTooltip();
        if (curParameter != null) {
            btn_run.prop("disabled", false);
        }
    })

    //****************************** define function for each button *****************************
    var btn_run = $('#btn_run');
    btn_run.click(function () {

        // these two lines must go first to update the state 
        isPaused = !isPaused;
        btn_run.toggleClass('pause');

        $('.dropdown').prop('disabled', true);
        $("#select_speed").prop('disabled', true);
        $('#btn_clear').prop('disabled', false);
        $('.checkbox-container').children().prop('disabled', true);

        // toggle text
        if (btn_run.text() == "Run") {
            updateOverlayText("pause");
            btn_run.text("Pause");
            btn_run.prop("title", "Pause.");
        } else if (btn_run.text() == "Pause") {
            updateOverlayText("resume");
            btn_run.text("Resume");
            btn_run.prop("title", "Resume.");
        } else {
            updateOverlayText("clear");
            btn_run.text("Pause");
            btn_run.prop("title", "Pause.");
        }

        // update the page content based on the selection when it starts running next animation
        if (isInitialRun) {
            updatePage(curParameter, curData, getCarCheckedValues());
            isInitialRun = false;
        }

        updateCheckboxesTextColors();


    });
    btn_run.prop('disabled', true);

    var btn_clear = $('#btn_clear');
    btn_clear.click(function () {
        updateOverlayText("end");

        btn_clear.prop("disabled", true);
        if (!isPaused) { //if it's running, switch to pause state
            btn_run.prop("title", "Start animation.");
            btn_run.toggleClass("pause");
            isPaused = true;
        }

        updateRunBtnTooltip();

        created = false;
        isInitialRun = true;
        clearInterval(id);

        d3.selectAll(".line").remove();
        d3.select(".line").remove();
        d3.select("#vertical_time_line").remove();
        d3.select("#vertical_time_line_text").remove();
        d3.selectAll(".moving-car-img").remove();

        $('.dropdown').prop('disabled', false);
        $('.checkbox-container').children().prop('disabled', false);

        if (curAlgorithm != null && curSetup != null && curDistribution != null && curParameter != null && curAnimationInterval != null) {
            btn_run.prop("disabled", false);
        }

        btn_run.text("Run");

        // change the checkboxes text's colors to black
        var childN = document.getElementById("btn_group2").childNodes;
        for (i = 0; i < childN.length; ++i) {
            childN[i].style.color = "#000000";
            childN[i].childNodes[1].checked = false;
        }
    });
    btn_clear.prop("disabled", true);
}

// returns the data group by the selectedKeys
function getSelectedDataGroupedById(selectedOption, data, selectedKeys) {
    var dataToPlot = [];
    var curYMax = Number.NEGATIVE_INFINITY;
    var colName = PARAMETER_DICT[selectedOption];
    for (i = 0; i < data.length; ++i) {
        dataToPlot.push({ "id": data[i].id, "x": data[i].time, "y": data[i][colName] });
    }
    curYMax = data.reduce((max, b) => Math.max(max, b[colName]), data[0][colName]);

    // update y-axis based on selection
    y = d3.scaleLinear()
        .domain([0, curYMax])
        .range([height, 0]);

    yAxis = d3.axisLeft()
        .scale(y);

    svg.selectAll("g.y.axis")
        .call(yAxis);

    yLabel.text(Y_LABELS[curParameter]);

    // update title
    graphTitle
        .text(curAlgorithm.substring(12) + " (" + curSetup + "): " + Y_LABELS[curParameter] + " vs. Time (s.)")

    // process each group using id's as keys
    var dataGroupedById = d3.nest()
        .key(function (d) { return d.id; })
        .entries(dataToPlot);

    var selectedDataGroupedById = dataGroupedById;
    // if not selecting all, get the selected data
    if (selectedKeys[0] != "ALL") {
        selectedDataGroupedById = dataGroupedById.filter(function (e) { return this.indexOf(e["key"]) >= 0; }, selectedKeys);
    }
    return selectedDataGroupedById;
}


// update both the line graph and the ring
function updatePage(selectedParameter, data, selectedKeys) {

    // clear line graph
    d3.selectAll(".line").remove();
    d3.select(".line").remove();
    d3.select("#vertical_time_line").remove();
    d3.select("#vertical_time_line_text").remove();

    // ****************get all cars' ids**********************
    var car_ids = d3.map(data, function (d) { return (d.id) }).keys();
    var matches = [];
    var opacities = [];
    console.log("car_ids", car_ids);
    // extract the type of the id (excluding the number)
    for (i = 0; i < car_ids.length; ++i) {
        // var myRegex = /(.*)(_)(\d)*/g;
        var myRegex = /([^_]*)(_)(.*)/g;// can be used once, so have to declared as local variable
        var match = myRegex.exec(car_ids[i]);
        matches.push(match[1]);// eg. extract "IDM" from "IDM_01"
    }

    // get all unique ids
    var uniqueMatches = matches.filter(onlyUnique);

    // for each type of cars, decreases its corresponding capacities based on the number of 
    // cars in the group
    var curIndices = {};
    var counts = {}
    for (i = 0; i < uniqueMatches.length; ++i) {
        console.log("uniqueMatch", uniqueMatches[i]);
        curIndices[uniqueMatches[i]] = 0;
        counts[uniqueMatches[i]] = 0;
    }

    // count number of cars in each group
    for (i = 0; i < selectedKeys.length; ++i) {
        var myRegex = /([^_]*)(_)(.*)/g;// can be used once, so have to declared as local variable
        if (car_ids.includes(selectedKeys[i])) {
            counts[myRegex.exec(selectedKeys[i])[1]] += 1;
        }
    }

    // use differnt opacities based on different type of ids
    for (i = 0; i < selectedKeys.length; ++i) {
        if (car_ids.includes(selectedKeys[i])) {
            var myRegex = /([^_]*)(_)(.*)/g;
            var selectedKeyMatch = myRegex.exec(selectedKeys[i])[1];
            var j = uniqueMatches.indexOf(selectedKeyMatch);
            opacities.push(1 - curIndices[selectedKeyMatch] * (1 / counts[selectedKeyMatch]));
            curIndices[selectedKeyMatch] += 1;
        }
    }
    
    updateGraph(getSelectedDataGroupedById(selectedParameter, data, selectedKeys), opacities);

    //animate vehicles on the ring
    startRing(data);

}

function getLineColors(dataGroups) {
    // if less than 4 vehicles selected, use different colors
    // if same type of vehicles are selected, use different colors
    // otherwise, use two different colors
    // var color = d3.scaleOrdinal(d3.schemeCategory10);  // set color scale
    // var lineColors1 = {};
    // var lineColors2 = {};
    // // alert(dataGroups.length);

    // for (i = 0; i < dataGroups.length; ++i) {
    //     var myRegex = /(.*)(_)(.*)/g;
    //     var match = myRegex.exec(dataGroups[i].key);
    //     lineColors1[dataGroups[i].key] = color(match[1]);
    //     lineColors2[dataGroups[i].key] = color(dataGroups[i].key);
    // }
    // var uniqueColors = Object.keys(lineColors1).filter(onlyUnique);
    // if (uniqueColors.length == 1 || dataGroups.length < 4) {
    //     return lineColors2
    // } else {
    //     return lineColors1;
    // }
    var color = d3.scaleOrdinal(d3.schemeCategory10);  // set the colour scale
    var lineColors = [];
    for (i = 0; i < dataGroups.length; ++i) {
        var myRegex = /([^_]*)(_)(.*)/g;
        var match = myRegex.exec(dataGroups[i].key);
        lineColors.push(color(match[1]));
    }
    return lineColors;
}

// A function that updates the chart
function updateGraph(dataGroups, opacities) {

    // add a line for each vehicle
    lineColors = getLineColors(dataGroups);
    dataGroups.forEach(function (d, index) {

        var path = svg.append("path")
            .datum(dataGroups)
            .attr("class", "line")
            .attr("d", line(d.values))
            .style("stroke", function () { // Add dynamically
                return d.color = lineColors[index];
            })
            .style("opacity", function () {
                // console.log(index, opacities[index]);
                return opacities[index];
            })


        // Variable to Hold Total Length
        var totalLength = path.node().getTotalLength();

        // Set Properties of Dash Array and Dash Offset and initiate Transition
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    });

    //Add vertical line time line
    var vertical_line_container = svg.append("g")
        .attr("class", "vertical_line_container")


    var vertical_time_line = vertical_line_container.append('line')
        .attr("id", "vertical_time_line")
        .attr('x1', 0)
        .attr('y1', GRAPH_HEIGHT - margin.top * 1.6)
        .attr('x2', 0)
        .attr('y2', 0)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .style("fill", "none")
}

//save algorithm strings, setup strings from filenames, and create a dictionary with algorithm as keys and setup as values
function extractAlgorithmsAndSetups(algorithms, algoSetupDistFilenameDict, algoSetupDistDict, pathsToFiles) {

    //latest format of item in pathsToFiles: data/raw_data/IDM_AVRider_AUG--0IDM_22AUG--platooned.csv
    var algos = [];
    for (i = 0; i < pathsToFiles.length; ++i) {

        // var myRegex = /(.*)(--)(.*)(--)(.*)/g;
        var pattern = /(.*)(--)(.*)(--)(.*)(.csv)/g;
        var filename = pathsToFiles[i];

        //replace string "abc/" with empty to eliminate the directory str and extract the filename
        var filename = filename.replace(/^.*[\\\/]/, '');

        // group index for each str in the pattern
        var ALGO_INDEX = 1;
        var SETUP_INDEX = 3;
        var DISTRIBUTION_INDEX = 5;

        var match = pattern.exec(filename);
        algos.push(match[ALGO_INDEX]);

        var algo_str = match[ALGO_INDEX];
        var setup_str = match[SETUP_INDEX];
        var dist_str = match[DISTRIBUTION_INDEX];

        // populating the nested dictionary
        if (algoSetupDistDict[algo_str] === undefined) {
            algoSetupDistDict[algo_str] = {};
        }
        if (!(setup_str in algoSetupDistDict[algo_str])) {
            algoSetupDistDict[algo_str][setup_str] = [];
        }
        algoSetupDistDict[algo_str][setup_str].push(dist_str);

        // poludating the dict which has this structure: {algoSetupDist: filname}
        var key = match[ALGO_INDEX] + match[SETUP_INDEX] + match[DISTRIBUTION_INDEX];
        algoSetupDistFilenameDict[key] = pathsToFiles[i];
    }

    // save unique algorithm strings
    var uniqueAlgos = algos.filter(onlyUnique);
    for (i = 0; i < uniqueAlgos.length; ++i) {
        algorithms.push(uniqueAlgos[i]);
    }
}

function loadMetricsFileNames(metricsFilenameDict, filenames) {
    for (i = 0; i < filenames.length; ++i) {
        var myRegex = /(.*)(--)(.*)(\.)(csv)/g;
        var filename = filenames[i];
        filename = filename.replace(/^.*[\\\/]/, '')
        filename = filename.substring(4); //ignore the superscript "Big_" in "Big_0IDM_22AUG"
        var matches = myRegex.exec(filename);
        var setup_str = matches[1];
        var distribution_str = matches[3];
        metricsFilenameDict[setup_str + distribution_str] = filenames[i];
    }
}

function changeverticalTimeLinePos(curr_x) {
    // curr_x is the time step in sec.
    if (curr_x < xMax.value) {
        d3.select("#vertical_time_line")
            .attr("x1", x(curr_x))
            .attr("x2", x(curr_x))
        d3.select("#vertical_time_line_text")
            .attr("x", x(curr_x))
    }
}

function loadMetricsFile(filename) {
    // d3.select("#metrics_table").remove();
    removeAllChildrenByID("table_container_metrics");
    // The table generation function
    function tabulate(data, columns) {
        var table = d3.select("#table_container_metrics").append("table")
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

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        // create a cell in each row for each column
        rows.selectAll("td")
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
    if (filename != null) {
        $("#table_title").show();
    } else {
        $("#table_title").hide();
    }
    d3.csv(filename + "?" + (new Date()).getTime(), function (error, data) {
        if (error) throw error;

        tabulate(data, ["stableT", "stableSpd", "MaxGap", "AvgFuelRate", "VMT"]);
    });


}

// ********************************* ring ******************************
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
    id = setInterval(frame, curAnimationInterval);
    created = true;
    var pos = 0;

    //update vehicles position around the ring
    function frame() {
        if (pos >= arrayx[0].length) {
            clearInterval(id);
            created = false;

            isInitialRun = false;
            $("#btn_run").text("Done");
            $("#btn_run").prop("title", "Done! Click the \"Clear\" button before next run.");
            $("#btn_run").prop("disabled", true);
        } else {
            if (!isPaused) {
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
                pos++;
            }
        }
    }

}


var algoDescriptionDict = {
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

function updateTitle(title) {
    var string = algoDescriptionDict[title];
    var result = string.fontsize(3);
    document.getElementById("paragraph").innerHTML = result;
}


// launch the page
function launch() {
    addLineGraph();
    addButtons();
}
launch();
