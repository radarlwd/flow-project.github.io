//Run the tutorial when the page is ready.

// put the key here to define the order of displaying msg on the tutorial page
var keysInDisplayOrder = ["demoVideo", "introduction", "selectAlgorithm", "selectSetup", "selectDistribution", "checkVehicleID", "selectParameter", "selectSpeed", "run", "pause", "resume", "clear", "end"];
var discriptionDict = null;
var TUTORIAL_CONFIRM_MSG = "Hi! Would you like a quick tour?";
var END_MSG = "Congratulations! You have finished the quick tour! Have fun!";

$(document).ready(function () {
    var $outer = $('#outer'),
        $overlay = $('<div>', {
            css: {
                position: 'absolute',
                width: '100%',
                height: '90%',
                top: $outer.position().top,
                left: $outer.position().left,
                backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: 10,
                display: 'none'
            }
        }).appendTo($outer);
    $overlay.attr('id', 'overlay');
    $explainedText = $('<div id="overlay-text" style="z-index: 11"> this is text</div>').appendTo($overlay);

    updateOverlayText('demoVideo');
});

// update the text on the tutorial page based on the key
// This function is called in script.js on each element when its action event is trigerred.
function updateOverlayText(key) {

    if (discriptionDict == null) {
        discriptionDict = {};
        // all description are stored in this file
        d3.csv('./data/tutorial.csv', function (error, data) {
            if (error) throw error;
            for (i = 0; i < data.length; ++i) {
                var item = {};
                item.id = data[i].id;
                item.description = data[i].description;
                item.function = data[i].function;
                discriptionDict[data[i].key] = item;
            }
            updateOverlayHelper(key);// caters to the asynchronous event (loading csv)
        });
    } else {
        updateOverlayHelper(key);// caters to the asynchronous event (loading csv)
    }



}

// show the correspoinding msg of the key, put the element on top and hide the previous element
// z-index usage explainaiton:
// 999: always on top of everything 
// 11 : current
// 10 : previous
// 1  : hide behind everything
function updateOverlayHelper(key) {
    if (dontShowAgain) {
        return;
    }
    var $overlay = $('#overlay'); // the black background of tutorial page

    // Debug
    // if (discriptionDict[key] === undefined) {
    //     console.log("unknow option" + key);
    // }

    var tutorialOrder = keysInDisplayOrder.indexOf(key);// get the display order

    // if the key is found in keysInDisplayOrder, hide the previous element and display the current
    if (tutorialOrder < keysInDisplayOrder.length) {

        if (key == 'end') {// last action
            $closeBtn = $('<div id="btn_close"><a href="javascript:void(0)" style="color: red" class="closebtn" onclick="closeNav()">&times;</a></div>').appendTo($overlay);
            $('<a id="finish" title="finish" href="javascript:closeNav()" style="font-size: 30px; position: absolute; top: 55%; left: 50%">Finish</a><br/>').appendTo($overlay);
            $('#overlay-text').text(END_MSG);
            $("#btn_clear").css('z-index', 10);
            return;
        }

        var curElementId = discriptionDict[key].id;

        // execute the function defined in discriptionDict
        if (discriptionDict[key].function != "") {
            var fn = window[discriptionDict[key].function];
            fn();
        }

        if (curElementId != "") { // need to display an element on top of everything
            var $element = $(curElementId);
            $element.css('z-index', 11);// 11 has higher priority


            // hide the previous different element and focus on the current element only
            if (tutorialOrder > 0) {
                var prevElementId = discriptionDict[keysInDisplayOrder[tutorialOrder - 1]].id;
                if (curElementId != prevElementId) {
                    // put the previous element behind the overlay
                    $(prevElementId).css('z-index', 10);
                }
                // console.log('hidng previous', prevElementId)
            }

            // dispay overlay and its text
            var stepNumOffset = 2;//don't dispay progression status in the first two page
            if (tutorialOrder > 1) {
                // display the progress "(curStep/totalSteps)""
                $('#overlay-text').text("(" + (tutorialOrder-stepNumOffset + 1) + '/' + (keysInDisplayOrder.length-stepNumOffset-1) + ") " + discriptionDict[key].description);
            } else {
                $('#overlay-text').text(discriptionDict[key].description);
            }
            $overlay.data('current', $element).show();
            $overlay.show();

        } else {// for unknow discription
            $('#overlay-text').text(discriptionDict[key].description);
            $overlay.show();
        }

    } else {// unkown action
        console.log('Unkown action in tutorial!')
        $overlay.hide();
        $overlay.data('current').css('z-index', 1);
    }
}

// jump to the introduction
function skip() {
    updateOverlayText('introduction');
    d3.select("#video_container").remove();
}

function loadVideoPage() {
    // console.log("loaded video page")
    var $overlay = $('#overlay');
    var $videoContainer = $('<div id="video_container" style="margin-top:10%; text-align:center; z-index: 11"><div>').appendTo($overlay);

    var url = "https://www.youtube.com/watch?v=P7xx9uH2i7w";// follow this format
    var id = url.split("?v=")[1];
    var embedLink = "https://www.youtube.com/embed/" + id;
    $('<iframe id="video" width=1000px height=500px display:block src=' + embedLink + ' frameborder="0" allowfullscreen></iframe><br />').appendTo($videoContainer);
    $('<a id="skip" title="skip" href="javascript:skip()" style="font-size: 30px;">Skip</a><br/>').appendTo($videoContainer);
}


/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    // document.getElementById("myNav").style.width = "0%";
    var $overlay = $('#overlay');
    $overlay.hide();
    $overlay.data('current').css('z-index', 1);
    dontShowAgain = true;
}

// a generate msg with yes and no options
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


// generate a msg box to ask if they want to take the tour
function tutorialConfirm() {
    functionConfirm(TUTORIAL_CONFIRM_MSG, function yes() {
        updateOverlayText('selectAlgorithm');
    },
        function no() {
            dontShowAgain = true;
            var $overlay = $('#overlay');
            $overlay.hide();
        });
}