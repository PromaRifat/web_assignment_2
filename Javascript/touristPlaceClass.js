var touristPlaceClass = function () {
    this.name;
    this.address;
    this.rating;
    this.type;
    this.picture;
    let self = this;
    this.createNewPlace = function(name, address, rating, type, picture){
        self.name = name;
        self.address = address;
        self.rating = rating;
        self.type = type;
        self.picture = picture;
        document.getElementById('reset').click();
        return self;
    }

    // this.showPlaces = function(){
    //     console.log(this.name = this.address + this.type + this.rating + this.picture);
    // }

}