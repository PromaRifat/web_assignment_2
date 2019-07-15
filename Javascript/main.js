var placeArray = [];
eventRegister();


function refreshTable(){
    let placeData = document.getElementsByClassName("place_data");
    document.getElementById("sort").value = "null";
    while(placeData.length != 0){
        placeData[0].parentElement.removeChild(placeData[0]);
    }
}

function updatePlace(event){
    document.getElementById('submit').innerHTML = "Update";
    let row = event.target.parentElement.parentElement.parentElement;
    let upd_name = row.firstChild.innerHTML;
    let upd_add = row.firstChild.nextSibling.innerHTML;

    for(let i = 0; i < placeArray.length ; i++){
        if(placeArray[i].name == upd_name && placeArray[i].address == upd_add){
            placeArray[i].toBeUpdated = true;
            break;
        }
    }


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
        changeBtn.addEventListener("click" , showPictureChangeOption);
        changeBtn.innerHTML = "change picture"
        document.getElementById("place_picture").parentElement.appendChild(changeBtn);
    }


   // event.target.nextSibling.click();
    
}

function showPictureChangeOption(){
    document.getElementById("update_pic").parentElement.removeChild(document.getElementById("update_pic"));
    document.getElementById("change_pic_btn").parentElement.removeChild(document.getElementById("change_pic_btn"));
    document.getElementById("place_picture").style.display = "inline";
}

function deletePlace(event){
    let row = event.target.parentElement.parentElement.parentElement;
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
    updateBtn.addEventListener("click", updatePlace);
    updateBtn.innerHTML = "Update";
    
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete_btn"); 
    deleteBtn.addEventListener("click", deletePlace);
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

 function ascSort(){
    let tempPlace = new touristPlaceClass();
 
    for(let i =0; i<placeArray.length; i++){
        for(let j= i+1; j<placeArray.length; j++){
            if(placeArray[i].rating > placeArray[j].rating){
                tempPlace = placeArray[i];
                placeArray[i] = placeArray[j];
                placeArray[j] = tempPlace;
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
                tempPlace = placeArray[i];
                placeArray[i] = placeArray[j];
                placeArray[j] = tempPlace;
            }
        }
    }
 
    showPlaces();
 }





