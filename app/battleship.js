class Boat{
    locations;
    hitLocations = Array();
    isSunk = false;

    constructor(locations) {
        this.locations = locations;
    }

    registerHit(pointX, pointY) {
        this.hitLocations.push((pointX, pointY));
    }
}