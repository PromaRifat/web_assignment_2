
var placeArray = [];

function createPageShow(){
    document.getElementById('list_container').style = "display: none;";
    document.getElementById('information_container').style = "display: inline;";
}

function listPageShow(){
    document.getElementById('list_container').style = "display: inline;";
    showPlaces();
    document.getElementById('information_container').style = "display: none;";
}

function newPlace(){
    let place = new touristPlaceClass();
    placeArray.push(place.createNewPlace());
}

function showPlaces(){
    for(let i = 0; i < placeArray.length; i++){
        placeArray[i].show();
    }
}

function updatePlace(){

}

function deletePlace(btn){
    let row = btn.parentElement.parentElement.parentElement;
    let table_body = row.parentElement;
    table_body.removeChild(row);
    
    let dlt_name = row.firstChild.innerHTML;
    let dlt_address = row.firstChild.nextSibling.innerHTML;
    
    for(let i=-0; i < placeArray.length; i++){
        if(placeArray[i].name == dlt_name && placeArray[i].address == dlt_address){
            placeArray.splice(i,1);
            break;
        }
    }
    
}