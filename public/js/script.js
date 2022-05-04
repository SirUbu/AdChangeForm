//get dom elements
let listEl = $(".list");

// holder variable for change type
let changeType = "";

// function to set change type varriable and load form header
$('.changestatusoptions').click(function(event) {
    // clear list
    listEl.text("");
    changeType = "";
    let selection = event.target.value;
    if (selection) {
        changeType = selection;
    } else {
        return
    };
    
    let rowEl = $("<div>").addClass("row");
    let itemEl = $("<div>").addClass("col-2").text("Item #");
    rowEl.append(itemEl);
    let pkEl = $("<div>").addClass("col-1").text("PK");
    rowEl.append(pkEl);
    let sizeEl = $("<div>").addClass("col-2").text("Size");
    rowEl.append(sizeEl);
    let descriptionEl = $("<div>").addClass("col-4").text("Description");
    rowEl.append(descriptionEl);
    let typeEl = $("<div>").addClass("col-3");
    if (changeType === "cancellation") {
        typeEl.text("Cancellation");
    } else if (changeType === "costchange") {
        typeEl.text("New Cost Amount");
    } else if (changeType === "retailchange") {
        typeEl.text("New Retail Amount");
    } else if (changeType === "dealamountchange") {
        typeEl.text("New Deal Amount");
    } else if (changeType === "additionalitems") {
        typeEl.text("Like Item");
    }
    rowEl.append(typeEl)
    listEl.append(rowEl);
});

// function to add item to list
const addItem = (itemData) => {
    let listItemEl = $("<div>").addClass("row border-bottom-1").attr("id", itemData.id);
    let itemNumberEl = $("<div>").addClass("col-2").text(itemData.id);
    listItemEl.append(itemNumberEl);
    let itemPkEl = $("<div>").addClass("col-1").text(itemData.pack);
    listItemEl.append(itemPkEl);
    let itemSizeEl = $("<div>").addClass("col-2").text(itemData.size);
    listItemEl.append(itemSizeEl);
    let itemDescriptionEl = $("<div>").addClass("col-4").text(itemData.description);
    listItemEl.append(itemDescriptionEl);
    let itemFormEl = $("<form>").addClass("col-3");
    let formLabelEl = $("<label>").attr("for", "input");
    itemFormEl.append(formLabelEl);
    let formInputEl = $("<input>").attr("type", "text").attr("id", "inpute").attr("name", "input");
    itemFormEl.append(formInputEl);
    listItemEl.append(itemFormEl);
    listEl.append(listItemEl)
};

// function to query item search
async function itemSearch(itemNumber) {
    fetch(`/api/items/${itemNumber}`)
        .then(response => {
            if (!response.ok) {
                $("#itemnotice").text("No Item Found").attr("class", "bg-danger");
                return;
            }
            return response.json();
        })
        .then(itemData => {
            if (itemData) {
                $("#itemnotice").text("").attr("class", "");
                if(itemData.buyerlink_id) {
                    let buyerlinkID = itemData.buyerlink_id;
                    buyerlinkSearch(buyerlinkID);
                    return
                } else {
                    addItem(itemData);
                    return
                };
            }
        });
};

// function to query buyerlink 
async function buyerlinkSearch(buyerlinkID) {
    fetch(`/api/items/buyerlink/${buyerlinkID}`)
        .then(response => {
            if (!response.ok) {
                return alert(response.statusText);
            }
            return response.json();
        })
        .then(buyerlinkData => {
            buyerlinkData.forEach(addItem);
            return
        });
};

// click listener for search button
$("#getItemBtn").click(function(event) {
    event.preventDefault();
    $("#itemnotice").text("Searching...").attr("class", "bg-warning");
    let itemNumber = $("#itemNum");

    itemSearch(itemNumber.val());

    itemNumber.val("");
});

// clear button to clear out the form ONLY

// reset button to reset the entire page
