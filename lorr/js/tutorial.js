var discriptionDict = {};

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
    var $confirmBox = $("#confirm");

    updateOverlayText('demoVideo');
    console.log("tutorial.js is in use\n");
    // updateOverlayText('introduction');

    // $confirmBox.css('z-index', 11);
    // $('#overlay-text').text("Welcome!");
    // $overlay.data('current', $confirmBox).show();
    // tutorialConfirm();
});


function updateOverlayText(key) {

    // all description are stored in this file
    d3.csv('data/tutorial.csv', function (error, data) {
        if (error) throw error;
        for (i = 0; i < data.length; ++i) {
            // var item = { 'id': undefined, 'description': undefined, };
            var item = {};
            item.id = data[i].id;
            item.description = data[i].description;
            item.function = data[i].function;
            discriptionDict[data[i].key] = item;
        }
        updateOverlayHelper(key);
    });


}

function updateOverlayHelper(key) {
    if (dontShowAgain) {
        return;
    }
    var $overlay = $('#overlay');
    //display order
    var keys = ["demoVideo", "introduction", "selectAlgorithm", "selectSetup", "selectDistribution", "checkVehicleID", "selectParameter", "selectSpeed", "run", "pause", "clear"];

    if (discriptionDict === undefined) {

    }
    var tutorialOrder = keys.indexOf(key);// figure out the display order

    if (tutorialOrder < keys.length) {
        var curElementId = discriptionDict[key].id;
        if (discriptionDict[key].function != "") {
            var fn = window[discriptionDict[key].function];
            fn();
        }
        if (curElementId != "") { // need to display an element on top of everything
            var $element = $(curElementId);
            $element.css('z-index', 11);// 11 has higher priority


            // hide the previous different element and focus on the current element only
            if (tutorialOrder > 0) {
                var prevElementId = discriptionDict[keys[tutorialOrder - 1]].id;
                if (curElementId != prevElementId) {
                    // put the previous element behind the overlay
                    $(prevElementId).css('z-index', 10);
                }
                console.log('hidng previous', prevElementId)
            }

            // dispay overlay and its text
            $('#overlay-text').text(discriptionDict[key].description);
            $overlay.data('current', $element).show();
            $overlay.show();

        } else {
            $('#overlay-text').text(discriptionDict[key].description);
            $overlay.show();
        }

    } else if (key == 'end') {// last action
        $closeBtn = $('<div id="btn_close"><a href="javascript:void(0)" style="color: red" class="closebtn" onclick="closeNav()">&times;</a></div>').appendTo($overlay);
        $('#overlay-text').text("Congratulations! You have finished the quick tour! Have fun!");
        $("#btn_clear").css('z-index', 10);
    } else {// unkown action
        console.log('unkown action!')
        $overlay.hide();
        $overlay.data('current').css('z-index', 1);
    }
}

function skip(){
    updateOverlayText('introduction');
    d3.select("#video_container").remove();
}

function loadVideoPage() {
    console.log("loaded video page")
    var $overlay = $('#overlay');
    var $videoContainer = $('<div id="video_container" style="margin-top:10%; text-align:center; z-index: 11"><div>').appendTo($overlay);
    $('<iframe id="video" width=1000px height=500px display:block src="//www.youtube.com/embed/9B7te184ZpQ?rel=0" frameborder="0" allowfullscreen></iframe><br />').appendTo($videoContainer);
    $('<a id="skip" title="skip" href="javascript:skip()">Skip</a><br/>').appendTo($videoContainer);
}   


/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    // document.getElementById("myNav").style.width = "0%";
    var $overlay = $('#overlay');
    $overlay.hide();
    $overlay.data('current').css('z-index', 1);
    dontShowAgain = true;
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
        updateOverlayText('selectAlgorithm');
    },
        function no() {
            dontShowAgain = true;
            var $overlay = $('#overlay');
            $overlay.hide();
        });
}