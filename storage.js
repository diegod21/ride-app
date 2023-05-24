function createNewRide(){
    const rideID =  Date.now()//indentificador de cada RIDE
    const rideRecord = { // Os dados de cada RIDE
        data:[],
        startTime:rideID,
        stopTime:null
    }
    localStorage.setItem(rideID.toString(), JSON.stringify(rideRecord))
        return rideID // Retorna o rideID como resultado da função createNewRide().
}
    function addPosition(rideID, position){
         
        const rideRecord = getRideRecord(rideID)
        const newData ={
            accuracy:  position.coords.accuracy,
            altitude:  position.coords.altitude,
            altitudeAccuracy:   position.coords.altitudeAccuracy,
            heading:   position.coords.heading,
            latitude:  position.coords.latitude,
            longitude: position.coords.longitude,
            speed:     position.coords.speed,
            timestamp: position.timestamp
        }
        rideRecord.data.push(newData)
        localStorage.setItem(rideID.toString(), JSON.stringify(rideRecord))
    }
    function getRideRecord(rideID){
        return JSON.parse(localStorage.getItem(rideID))
    }
    function upStopTime(rideID){
        const rideRecord = getRideRecord(rideID)
        rideRecord.stopTime = Date.now()
        localStorage.setItem(rideID.toString(), JSON.stringify(rideRecord));
    }
    function getAllRide(){
        return Object.entries(localStorage)
    }