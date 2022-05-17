//get dom elements
let listHeaderEl = $("#listHeader");
let itemListEl = $("#itemList");

// global variables
let changeType = [];
let searchValue = "";

// listener and function to set change type varriable and load form header
$('.changestatusoptions').click(function(event) {
    // prevent douple when clicking label vs box
    if (event.target.type === "checkbox"){
        // clear list
        listHeaderEl.text("");
        
        // create and add header to form
        let rowEl = $("<div>").addClass("row border-bottom");
        let itemEl = $("<div>").addClass("col-2").text("Item #");
        rowEl.append(itemEl);
        let pkEl = $("<div>").addClass("col-1").text("PK");
        rowEl.append(pkEl);
        let sizeEl = $("<div>").addClass("col-2").text("Size");
        rowEl.append(sizeEl);
        let descriptionEl = $("<div>").addClass("col-3").text("Description");
        rowEl.append(descriptionEl);
    
        // reset the changeType array and add the new checked items to that array
        changeType = [];
        for (let t = 0; t < 5; t ++) {
            if ($('.changestatusoptions')[0][t].checked) {
                changeType.push($('.changestatusoptions')[0][t].value);
                let typeEl = $("<div>").addClass("col-1");
                typeEl.text($('.changestatusoptions')[0][t].value);
                rowEl.append(typeEl)
            } 
        }
    
        listHeaderEl.append(rowEl);
    
        // if there is a search value, clear list and trigger fetch
        if (searchValue) {
            itemListEl.text("");
            itemSearch(searchValue);
        }
    }
});

// function to add item to list
const addItem = (itemData) => {
    // create and add layout of item to form
    let listItemEl = $("<div>").addClass("row border-bottom listedItem").attr("id", itemData.id);
    let itemNumberEl = $("<div>").addClass("col-2").text(itemData.id);
    listItemEl.append(itemNumberEl);
    let itemPkEl = $("<div>").addClass("col-1").text(itemData.pack);
    listItemEl.append(itemPkEl);
    let itemSizeEl = $("<div>").addClass("col-2").text(itemData.size);
    listItemEl.append(itemSizeEl);
    let itemDescriptionEl = $("<div>").addClass("col-3").text(itemData.description);
    listItemEl.append(itemDescriptionEl);
    // loop through for multiple change types to add a form for each type
    for (let r = 0; r < changeType.length; r++) {
        let itemFormEl = $("<form>").addClass("col-1");
        let formLabelEl = $("<label>").attr("for", "input");
        itemFormEl.append(formLabelEl);
        let formInputEl = $("<input>").attr("type", "text").attr("id", "input").attr("name", "input");
        itemFormEl.append(formInputEl);
        listItemEl.append(itemFormEl);
    }
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
            searchValue = itemNumber;
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
    searchValue = "";
    $("#itemnotice").text("").attr("class", "");
    $('#errorSpan').attr("class", "").text("");
    $("#genErrorSpan").attr("class", "").text("");
    $("#comments")[0].value = "";
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
    let changeStatus = changeType;
    let itemsArray = [];
        for (let l = 0; l < itemListEl[0].children.length; l++) {
            let item = {};
            item.id = itemListEl[0].children[l].children[0].textContent;
            item.pack = itemListEl[0].children[l].children[1].textContent;
            item.size = itemListEl[0].children[l].children[2].textContent;
            item.description = itemListEl[0].children[l].children[3].textContent;
            let valueArray =[];
            for (let q = 4; q < itemListEl[0].children[l].children.length - 1; q++) {
                itemValue = itemListEl[0].children[l].children[q][0].value
                if (itemValue) {
                    valueArray.push(itemValue);
                }
            }
            item.value = valueArray;
            itemsArray.push(item);
        }

    let comments = $("#comments")[0].value;

    // loop through items and add to data
    let itemHTMLLoop = () => {
        let parentElement = $("<div>");
        itemsArray.forEach(function(item) {
            let HTMLString = `<div>${item.id} - ${item.pack} - ${item.size} - ${item.description} ${valueLoop(item.value)}</div>`;
            parentElement.append(HTMLString);
        })
        return parentElement[0].innerHTML;
    };

    // loop throuch different values
    let valueLoop = (value) => {
        let HTMLString = "";
        value.forEach(function(item) {
            HTMLString = HTMLString + `- ${item} `;
        });
        return HTMLString;
    };

    // loop through different change types
    let changeLoop = () => {
        let HTMLString = "";
        changeStatus.forEach(function(value) {
            HTMLString = HTMLString + `- ${value} `;
        });
        return HTMLString;
    };


    if (adDate && adVersion && changeStatus.length > 0 && itemsArray.length > 0) {
        let capturedHTML = `
            <h1>Ad Change Form</h1>
            <div>Ad Date: ${adDate}</div>
            <div>Ad Versiion: ${adVersion}</div>
            <div>Change Type: ${changeLoop()}</div>
            <br>
            <h3>Item - PK - Size - Description ${changeLoop()}</h3>
            ${itemHTMLLoop()}
            <br>
            <h4>Comments:</h4>
            <div>${comments}</div>
        `;
    
    
        let sourceHTML = header+capturedHTML+footer;
        
        let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        let fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${adDate}, ${adVersion}, ${changeStatus}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);

        $("#genErrorSpan").attr("class", "bg-success").text("Document Generated");

    } else {
        $("#genErrorSpan").attr("class", "bg-danger").text("Ensure All Fields Are Filled In");
    }
});