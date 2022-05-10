// function to gather document information and send to route to generate document
async function gatherDocInfo(event) {
    event.preventDefault();
    $("#genErrorSpan").attr("class", "").text("");

    let title = 'Title';
    let heading = 'Heading';
    let subtitle = 'Subtitle';
    let text = 'Deserunt officia culpa eiusmod esse amet amet Lorem. Duis duis aute aute proident sint nostrud laboris ullamco exercitation ex. Elit qui ad ad ullamco. Consectetur commodo do minim est proident adipisicing excepteur nulla nulla cupidatat ex deserunt. Consectetur dolore proident amet do do Lorem consequat sit labore. Amet laboris ea dolor proident exercitation sunt amet laboris ut dolor fugiat sit.';

    window.open(
        `/api/docgen/?text=${text}`,
        '_blank'
    );
    
    // $("#genErrorSpan").attr("class", "bg-danger").text("Fatal error, see console for information.");

};

// button handler to generate word doc
$('#genDocBtn').click(gatherDocInfo);


// possible solution: have link to a file (invisible), button generates and saves to directory and makes like to said file visible