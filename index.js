const rideListElement = document.querySelector("#rideList")
const allRide = getAllRide()


allRide.forEach(async ([rideID, value])=>{
   
    const ride = JSON.parse(value)
    ride.id = rideID ;

    const firstPosition = ride.data[0]
    const firstPostiondata = await getLocationData(firstPosition.latitude,firstPosition.longitude)

    const itemElement = document.createElement("li")
    itemElement.id = ride.id

    const divCity = document.createElement("div")
    divCity.innerText = `${firstPostiondata.city} - ${firstPostiondata.countryCode}`

    const Speed = document.createElement("div")
    maxSpeed = getMaxspeed(ride.data)
    Speed.innerText = maxSpeed

    
    itemElement.appendChild(divCity)
    itemElement.appendChild(Speed)
    rideListElement.appendChild(itemElement)
})



async function getLocationData(latitude,longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`;

    const response = await fetch(url)
    return await response.json()

}
function getMaxspeed(speed){
    console.log(speed)
    let maxSpeed = 0;
    speed.forEach(()=>{
        if (speed.speed != null && speed.Speed > maxSpeed){
            maxSpeed = speed.speed
        } 
        return maxSpeed;
    })
}