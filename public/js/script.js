//get dom elements
let listEl = $(".list");

// function to add item to list
const addItem = (itemData) => {
    let listItemEl = $("<div>").addClass("listItem").attr("id", itemData.id);
    let spanEl = $("<span>").text(itemData.id);
    listItemEl.append(spanEl);
    listEl.append(listItemEl)

};

// function to query item search
async function itemSearch(itemNumber) {
    fetch(`/api/items/${itemNumber}`)
        .then(response => {
            if (!response.ok) {
                return alert(response.statusText);
            }
            return response.json();
        })
        .then(itemData => {
            if(itemData.buyerlink_id) {
                let buyerlinkID = itemData.buyerlink_id;
                buyerlinkSearch(buyerlinkID);
            } else {
                addItem(itemData);
            };
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
        });
};

//function to handle get/add item(s) button click
$("#getItemBtn").click(function(event) {
    event.preventDefault();

    let itemNumber = $("#itemNum");

    itemSearch(itemNumber.val());

    itemNumber.val("");
});