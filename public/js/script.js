//get dom elements
let listEl = $(".list");

// function to add item to list
const addItem = (itemNumber) => {
    let listItemEl = $("<div>").addClass("listItem").attr("id", itemNumber);
    let spanEl = $("<span>").text(itemNumber);
    listItemEl.append(spanEl);
    listEl.append(listItemEl)

};

//function to handle get/add item(s) button click
$("#getItemBtn").click(function(event) {
    event.preventDefault();

    let itemNumber = $("#itemNum");

    addItem(itemNumber.val());

    itemNumber.val("");
});