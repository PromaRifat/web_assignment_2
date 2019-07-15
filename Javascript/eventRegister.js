function eventRegister(){
   document.getElementsByTagName("body")[0].addEventListener("load", showPlaces);
   document.getElementById("new_place_btn").addEventListener("click", createPageShow);
   document.getElementById("list_link").addEventListener("click", listPageShow);
   document.getElementById("submit").addEventListener("click", newPlace);
   document.getElementById("sort").addEventListener("change", sort);
   document.getElementById("search_box").addEventListener("keyup", searchPlace); 
}

function showPlaces(){
   refreshTable();
   for(let i = 0; i < placeArray.length; i++){
      show( placeArray[i]);
   }
}

function createPageShow(){
   document.getElementById('submit').innerHTML = "Submit";
   document.getElementById('list_container').style = "display: none;";
   document.getElementById('information_container').style = "display: inline;";
   document.getElementById('title').innerHTML = "Add a New Tourist Place";
   document.getElementById("reset").click();
   document.getElementById("place_type").parentElement.style.display = "flex";
   document.getElementById("place_picture").style.display = "inline";
   
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

   if(document.getElementById('place_name').value == ""){
       alert("Please give a name for the place !");
       return;
   }
   if(document.getElementById('place_address').value == ""){
       alert("Please give an address for the place !");
       return;
   }
   if(document.getElementById('place_picture').value == "" && document.getElementById("submit").innerHTML != "Update"){
       alert("Please upload a picture for the place !");
       return;
   }

   for(let i = 0; i < placeArray.length; i++ ){
      if(placeArray[i].name == document.getElementById('place_name').value && placeArray[i].address == document.getElementById('place_address').value && !placeArray[i].toBeUpdated)
         {
            alert("This place already exists in this address!");
            return;
         }
   }

   let place = new touristPlaceClass();
   let name = document.getElementById('place_name').value;
   let address = document.getElementById('place_address').value;
   let rating = document.getElementById('place_rating').value;;
   let type = document.getElementById('place_type').value;
   let picture = document.getElementById('place_picture').files[0];

      if(document.getElementById('submit').innerHTML == "Update"){
         if(document.getElementById('update_pic')){
               document.getElementById("update_pic").parentElement.removeChild(document.getElementById("update_pic"));
               document.getElementById("change_pic_btn").parentElement.removeChild(document.getElementById("change_pic_btn"));
         }
         updatePlaceArray(name, address, rating, type, picture);
         alert("Place has been updated !");
         document.getElementById("reset").click();
         
      }
      else{
         placeArray.push(place.createNewPlace(name, address, rating, type, picture));
         alert("New place has been added !");
      }

}

function updatePlaceArray(name, address, rating, type, picture){
   for( let i = 0; i < placeArray.length; i++){
      if(placeArray[i].toBeUpdated){
         if(placeArray[i].name != name){
            placeArray[i].name = name;
         }
         if(placeArray[i].address != address){
            placeArray[i].address = address;
         }
         if(placeArray[i].rating != rating){
            placeArray[i].rating = rating;
         }
         if(placeArray[i].type != type){
            placeArray[i].type = type;
         }
         if(placeArray[i].picture != picture && picture){
            placeArray[i].picture = picture;
         }
         document.getElementById('submit').innerHTML == "Submit";
         placeArray[i].toBeUpdated = false;
         break;
      }
   }
}

function sort(event){
   if(event.target.value == "asc"){
       ascSort();
   }
   else{
       descSort();
   }
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

