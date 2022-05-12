//get dom elements
let listHeaderEl = $("#listHeader");
let itemListEl = $("#itemList");

// holder variable for change type
let changeType = "";

// listener and function to set change type varriable and load form header
$('.changestatusoptions').click(function(event) {
    // clear list
    listHeaderEl.text("");
    // set changetype based on new selection
    changeType = "";
    let selection = event.target.value;
    if (selection) {
        changeType = selection;
    } else {
        return
    };
    // add header to form
    let rowEl = $("<div>").addClass("row border-bottom");
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
    listHeaderEl.append(rowEl);
});

// function to add item to list
const addItem = (itemData) => {
    let listItemEl = $("<div>").addClass("row border-bottom listedItem").attr("id", itemData.id);
    let itemNumberEl = $("<div>").addClass("col-2").text(itemData.id);
    listItemEl.append(itemNumberEl);
    let itemPkEl = $("<div>").addClass("col-1").text(itemData.pack);
    listItemEl.append(itemPkEl);
    let itemSizeEl = $("<div>").addClass("col-2").text(itemData.size);
    listItemEl.append(itemSizeEl);
    let itemDescriptionEl = $("<div>").addClass("col-4").text(itemData.description);
    listItemEl.append(itemDescriptionEl);
    let itemFormEl = $("<form>").addClass("col-2");
    let formLabelEl = $("<label>").attr("for", "input");
    itemFormEl.append(formLabelEl);
    let formInputEl = $("<input>").attr("type", "text").attr("id", "input").attr("name", "input");
    itemFormEl.append(formInputEl);
    listItemEl.append(itemFormEl);
    // button to removed single item from the form
    let removeBttnEl = $("<button>").attr("type", "button").attr("id", "removeItemBtn").addClass("col-1").text("❌");
    listItemEl.append(removeBttnEl);
    itemListEl.append(listItemEl)
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

// clear button listener and function to clear out the form ONLY
$("#clearItemList").click(function() {
    itemListEl.text("");
});

// button handler to remove single item from form
$("#itemList").click(function(event) {
    if (event.target.id === "removeItemBtn") {
        // create array with existing list items
        let itemsArray = [];
        for (let l = 0; l < itemListEl[0].children.length; l++) {
            let item = {};
            item.id = itemListEl[0].children[l].children[0].textContent;
            item.pack = itemListEl[0].children[l].children[1].textContent;
            item.size = itemListEl[0].children[l].children[2].textContent;
            item.description = itemListEl[0].children[l].children[3].textContent;
            itemsArray.push(item);
        }
        // get target item to be removed
        let targetListItem = event.target.parentElement.children[0].innerText;
        // loop through array and remove the target item
        for (let i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].id === targetListItem) {
                itemsArray.splice(i, 1);
            }
        }
        // clear the item list and repopulate with the new array of items
        itemListEl.text("");
        itemsArray.forEach(addItem);
    }
});

// reset button to reset the entire page (reload page)
$("#reloadPageBtn").click(function() {
    location.reload();
});

// option to manually add an item to the form
$("#manualItemAdd").click(function(event) {
    event.preventDefault();
    if (!$("#manualItemNum")[0].value) {
        $('#errorSpan').attr("class", "bg-danger").text("Must Fill Out Item Number.");
    } else {
        $('#errorSpan').attr("class", "").text("");
        let newItem = {};
        newItem.id = $("#manualItemNum")[0].value;
        $("#manualItemNum")[0].value = "";
        newItem.pack = $("#manualItemPk")[0].value;
        $("#manualItemPk")[0].value = "";
        newItem.size = $("#manualItemSize")[0].value;
        $("#manualItemSize")[0].value = "";
        newItem.description = $("#manualItemDesc")[0].value;
        $("#manualItemDesc")[0].value = "";
        addItem(newItem);
    }
});

// listener to generate word doc
$("#genDocBtn").click(function() {
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    let footer = "</body></html>";

    // capture needed data
    let adDate = $("#adbegin")[0].value;
    let versionIndex = $("#adversion")[0].selectedIndex;
    let adVersion = $("#adversion")[0][versionIndex].text;
    let changeStatus = "";
        if (changeType === "cancellation") {
            changeStatus = "Cancellation";
        } else if (changeType === "costchange") {
            changeStatus = "New Cost Amount";
        } else if (changeType === "retailchange") {
            changeStatus = "New Retail Amount";
        } else if (changeType === "dealamountchange") {
            changeStatus = "New Deal Amount";
        } else if (changeType === "additionalitems") {
            changeStatus = "Like Item";
        }
    let itemsArray = [];
        for (let l = 0; l < itemListEl[0].children.length; l++) {
            let item = {};
            item.id = itemListEl[0].children[l].children[0].textContent;
            item.pack = itemListEl[0].children[l].children[1].textContent;
            item.size = itemListEl[0].children[l].children[2].textContent;
            item.description = itemListEl[0].children[l].children[3].textContent;
            item.value = itemListEl[0].children[l].children[4][0].value;
            itemsArray.push(item);
        }
    console.log(itemsArray);

    // loop through items and add to data
    let itemHTMLLoop = (item) => {
        return `
            <div>${item.id} - ${item.pack} - ${item.size} - ${item.description} - ${item.value}</div>
        `;
    };


    let capturedHTML = `
        <h1>Ad Change Form</h1>
        <div>Ad Date: ${adDate}</div>
        <div>Ad Versiion: ${adVersion}</div>
        <div>Change Type: ${changeStatus}</div>
        <div>Item - PK - Size - Description - ${changeStatus}</div>
        ${itemsArray.forEach(itemHTMLLoop)}
    `;


    let sourceHTML = header+capturedHTML+footer;
    
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
});