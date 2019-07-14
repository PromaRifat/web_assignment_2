
var placeArray = [];

function createPageShow(){
    document.getElementById('submit').innerHTML = "Submit";
    document.getElementById('list_container').style = "display: none;";
    document.getElementById('information_container').style = "display: inline;";
    document.getElementById('title').innerHTML = "Add a New Tourist Place";
    document.getElementById("reset").click();
    document.getElementById("place_type").parentElement.style.display = "flex";
    document.getElementById("place_picture").style.display = "inline";
    // for(let i = 0; i < placeArray.length; i++){
    //     let child = document.getElementById(placeArray[i].name);
    //     document.getElementById('place_list').table_body.removeChild(child);
    // }
    
}

function listPageShow(){
    if(document.getElementById('place_name').value != ""  && document.getElementById("submit").innerHTML == "Update"){
        document.getElementById("submit").click();
    }


    document.getElementById('list_container').style = "display: inline;";
    showPlaces();
    document.getElementById('information_container').style = "display: none;";
    
}

function newPlace(){
    
    console.log(document.getElementById('place_picture'));
    if(document.getElementById('place_name').value == ""){
        alert("Please give a name for the place !");
        return;
    }
    if(document.getElementById('place_address').value == ""){
        alert("Please give an address for the place !");
        return;
    }
    if(document.getElementById('place_picture').value == ""){
        alert("Please upload a picture for the place !");
        return;
    }

   
    let place = new touristPlaceClass();
    let name = document.getElementById('place_name').value;
    let address = document.getElementById('place_address').value;
    let rating = document.getElementById('place_rating').value;;
    let type = document.getElementById('place_type').value;
    let picture = document.getElementById('place_picture').files[0];
    placeArray.push(place.createNewPlace(name, address, rating, type, picture));
    if(document.getElementById('submit').innerHTML == "Update"){
        document.getElementById('submit').innerHTML == "Submit";
        if(document.getElementById('update_pic')){
            document.getElementById("update_pic").parentElement.removeChild(document.getElementById("update_pic"));
            document.getElementById("change_pic_btn").parentElement.removeChild(document.getElementById("change_pic_btn"));
        }
        alert("Place has been updated !");
        
    }
    else{
        alert("New place has been added !");
    }
    

}

function showPlaces(){
    refreshTable();
    for(let i = 0; i < placeArray.length; i++){
       show( placeArray[i]);
    }
}

function refreshTable(){
    let placeData = document.getElementsByClassName("place_data");
    document.getElementById("sort").value = "null";
    while(placeData.length != 0){
        placeData[0].parentElement.removeChild(placeData[0]);
    }
}

function updatePlace(btn){
    document.getElementById('submit').innerHTML = "Update";
    let row = btn.parentElement.parentElement.parentElement;
    let upd_name = row.firstChild.innerHTML;
    let upd_add = row.firstChild.nextSibling.innerHTML;

    document.getElementById('list_container').style = "display: none;";
   
    document.getElementById('information_container').style = "display: inline;";
   
    document.getElementById('title').innerHTML = "Update this place";
   
    document.getElementById("place_name").value = upd_name;
   
    document.getElementById("place_address").value = upd_add;
   
    document.getElementById("place_rating").value = row.firstChild.nextSibling.nextSibling.innerHTML;
   
    document.getElementById("place_type").parentElement.style.display = "none";
    
    let source =row.firstChild.nextSibling.nextSibling.nextSibling.firstChild.src;
   // document.getElementById("place_picture").value =  source;
    document.getElementById("place_picture").style.display = "none";
   
    if(source){
        let img = document.createElement('img');
        img.id =  "update_pic";
        img.src = source;
        img.style.height = "80px";
        document.getElementById("place_picture").parentElement.appendChild(img);
        let changeBtn = document.createElement('button');
        changeBtn.id = "change_pic_btn";
        changeBtn.type = "button";
        changeBtn.setAttribute("onclick" , "showPictureChangeOption()");
        changeBtn.innerHTML = "change picture"
        document.getElementById("place_picture").parentElement.appendChild(changeBtn);
    }


    btn.nextSibling.click();
    
}

function showPictureChangeOption(){
    document.getElementById("update_pic").parentElement.removeChild(document.getElementById("update_pic"));
    document.getElementById("change_pic_btn").parentElement.removeChild(document.getElementById("change_pic_btn"));
    document.getElementById("place_picture").style.display = "inline";
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

function sort(sortType){
    if(sortType == "asc"){
        ascSort();
    }
    else{
        descSort();
    }
}

function ascSort(){
    let tempPlace = new touristPlaceClass();

    for(let i =0; i<placeArray.length; i++){
        for(let j= i+1; j<placeArray.length; j++){
            if(placeArray[i].rating > placeArray[j].rating){
                temp = placeArray[i];
                placeArray[i] = placeArray[j];
                placeArray[j] = temp;
            }
        }
    }

    showPlaces();
}

function descSort(){
    let tempPlace = new touristPlaceClass();

    for(let i =0; i<placeArray.length; i++){
        for(let j= i+1; j<placeArray.length; j++){
            if(placeArray[i].rating < placeArray[j].rating){
                temp = placeArray[i];
                placeArray[i] = placeArray[j];
                placeArray[j] = temp;
            }
        }
    }

    showPlaces();
}

function searchPlace(){
    let searchInput = document.getElementById("search_box").value.toUpperCase(); 
    let table = document.getElementById('place_list');
    let rowList = table.getElementsByClassName("place_data");
    for(let i =0; i < rowList.length ;i++){
        if(rowList[i].firstChild.innerHTML.toUpperCase().indexOf(searchInput) > -1){
            rowList[i].style.display = "";
        }
        else{
            rowList[i].style.display = "none";
        }
    }
}

function show(place){
    
        let table = document.getElementById('place_list');
        let row = table.insertRow(table.row);
        let nameCell = row.insertCell(0);
        let addressCell = row.insertCell(1);
        let ratingCell = row.insertCell(2); 
        let pictureCell = row.insertCell(3);  
        let actionCell = row.insertCell(4);

        row.id = place.name;
        row.setAttribute("class","place_data");
        let actionDiv = document.createElement('div');
        actionDiv.class = ("action_button_container");
        
        let updateBtn = document.createElement("button");
        updateBtn.setAttribute("class", "update_btn");
        updateBtn.setAttribute("onclick", "updatePlace(this)");
        updateBtn.innerHTML = "Update";
        
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete_btn"); 
        deleteBtn.setAttribute("onclick", "deletePlace(this)");
        deleteBtn.innerHTML = "Delete";

        if(place.picture){
            let img = document.createElement('img');
            img.id =  place.picture.name;
            img.src = URL.createObjectURL(place.picture);
            pictureCell.appendChild(img);
            pictureCell.setAttribute("class", "picture");
        }
       

        actionDiv.appendChild(updateBtn);
        actionDiv.appendChild(deleteBtn);
        nameCell.innerHTML = place.name;
        nameCell.setAttribute("class", "name");

        addressCell.innerHTML = place.address;
        addressCell.setAttribute("class", "addr");

        ratingCell.innerHTML = place.rating;
        ratingCell.setAttribute("class", "rating");

        actionCell.appendChild(actionDiv);
           
}