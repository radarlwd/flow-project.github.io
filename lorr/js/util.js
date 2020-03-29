// Definitions of some utility functions

function addOptionsToDropdownMenu(elementID, data, textFunct, valueFunct, eachItemFunct) {
    // add options to the button
    d3.select(elementID)
        .selectAll('myOptions')
        .data(data)
        .enter()
        .append('option')
        .text(textFunct) // text showed in the menu
        .attr("value", valueFunct) // corresponding value returned by the button
        .each(eachItemFunct);
}

// remove all children which belong to the element with elementID
function removeAllChildrenByID(elementID) {
    const myNode = document.getElementById(elementID);
    while (myNode.firstChild) {
        // console.log("removing " + myNode.firstChild);
      myNode.removeChild(myNode.lastChild);
    }
}

// helper function to be used to find the unique elements in array
function onlyUnique(value, index, self) {
    return self.indexOf(value) == index;
}