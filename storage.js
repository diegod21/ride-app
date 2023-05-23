function createNewRide(){
    const rideID =  Date.now()
    const rideRecord = {
        data:[],
        startTime:rideID,
        stopTime:null
    }
    localStorage.setItem(rideID,rideRecord)
        return rideID
}
    function addPosition(rideID, position){
         
        const rideRecord = getRideRecord(rideID)
        const newData ={
            
        }
    }
    function getRideRecord(rideID){
        return localStorage.getItem(rideID)
    }
