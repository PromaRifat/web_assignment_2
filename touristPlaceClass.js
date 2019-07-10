touristPlaceClass = function () {
    this.name;
    this.address;
    this.rating;
    this.type;
    this.picture;

    this.createNewPlace = function(){
        this.name = document.getElementById('place_name').value;
        this.address = document.getElementById('place_address').value;
        this.rating = document.getElementById('place_rating').value;
        this.type = document.getElementById('place_type').value;
        this.picture = document.getElementById('place_picture').files[0];
        document.getElementById('reset').click();
        alert("New place has been added !");
        return this;
    }

    // this.showPlaces = function(){
    //     console.log(this.name = this.address + this.type + this.rating + this.picture);
    // }

    this.show = function(){
        let table = document.getElementById('place_list');
        let row = table.insertRow(table.row);
        let nameCell = row.insertCell(0);
        let addressCell = row.insertCell(1);
        let ratingCell = row.insertCell(2); 
        let pictureCell = row.insertCell(3);  
        let actionCell = row.insertCell(4);

        row.id = this.name;

        let actionDiv = document.createElement('div');
        actionDiv.class = ("action_button_container");
        
        let updateBtn = document.createElement("button");
        updateBtn.setAttribute("class", "update_btn");
        updateBtn.setAttribute("onclick", "updatePlace()");
        updateBtn.innerHTML = "Update";
        
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete_btn"); 
        deleteBtn.setAttribute("onclick", "deletePlace(this)");
        deleteBtn.innerHTML = "Delete";

        if(this.picture){
            let img = document.createElement('img');
            img.id =  this.picture.name;
            img.src = URL.createObjectURL(this.picture);
            pictureCell.appendChild(img);
        }
       

        actionDiv.appendChild(updateBtn);
        actionDiv.appendChild(deleteBtn);
        nameCell.innerHTML = this.name;
        addressCell.innerHTML = this.address;
        ratingCell.innerHTML = this.rating;
        actionCell.appendChild(actionDiv);
       
    }
}