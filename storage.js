function createNewRide(){
    const rideID = new Date.now
    const rideRecord = {
        data:[],
        startTime:rideID,
        stopTime:null
    }
    localStorage.setItem(rideID,rideRecord)
        return rideID
}
    function addPosition(rideID, position){
       
       console.log(rideID, position)
        // const rideRecord = getRideRecord(rideID)
    }
    function getRideRecord(rideID){
        return JSON.parse(localStorage.getItem(rideID));
    }
