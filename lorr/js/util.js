function removeAllChildrenByID(elementID) {
    const myNode = document.getElementById(elementID);
    while (myNode.firstChild) {
        // console.log("removing " + myNode.firstChild);
      myNode.removeChild(myNode.lastChild);
    }
}