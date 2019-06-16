var processing = false;
$(() => {
    onload();

    $("form").submit((e) => {
        e.preventDefault();
        if (processing) return false;

        processing = true;
        onload();
        
        const busCode = $('input').val();
        const $btnCheck = $('#btnCheck');
        const message = $btnCheck.html();
        const $error = $("#error");
        const $result = $("#result");
        const $resultPanel = $("#resultPanel");
        const $resultGrid = $("#resultGrid");
        
        $btnCheck.html("Checking...");       

        fetch('/arrival?buscode=' + busCode).then((response) => {
            response.json().then((services) => {
                $result.show();

                if (services.error){
                    $error.html(services.error).show();
                } else {
                    if (services.length > 0){
                        $resultPanel.show();
                        
                        $resultGrid.find("tbody").empty();
                        $.each(services, (index, {serviceNo, nextBus1, nextBus2} = {}) => {
                            var load1 = busLoadColor(nextBus1.load);
                            var load2 = busLoadColor(nextBus2.load);
                            var markup = `<tr><td>${serviceNo}</td> <td><span class="${load1}">${nextBus1.timeArrivalEstimation}</span></td> <td><span class="${load2}">${nextBus2.timeArrivalEstimation}</span></td></tr>`;                            
                            $resultGrid.find("tbody").append(markup);
                        });
                    }
                }

                $btnCheck.html(message);
                processing = false;
            })
        })
    });
});

const onload = () => {
    $("#error").html('').hide();
    $("#result").hide();
    $("#resultPanel").hide();
}

const busLoadColor = (code) => {
    var color;
    switch (code) { 
        case 'SEA': 
            color = "green"; //"#00AA13";
            break;
        case 'SDA': 
            color = "yellow"; //"#CCAA00";
            break;
        case 'LSD': 
            color = "red"; //"#B70000";
            break;		
        default:
            color = "black";
    }
    return color;
}