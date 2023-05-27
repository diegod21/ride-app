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
    Speed.innerText = `Max Speed:${maxSpeed} Km/h`

    const distance = document.createElement("div")
    distance.innerText = `Distancia:${getDistance(ride.data)} Km`

    const duration = document.createElement("div")
    duration.innerText = `Duration: ${getDuration(ride)}`

    const currentData = document.createElement("div")
    currentData.innerText = `${getData(ride)}`

    itemElement.appendChild(divCity)
    itemElement.appendChild(distance)
    itemElement.appendChild(Speed)
    itemElement.appendChild(duration)
    itemElement.appendChild(currentData)
    rideListElement.appendChild(itemElement)
})



async function getLocationData(latitude,longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`;

    const response = await fetch(url)
    return await response.json()

}
function getMaxspeed(position){
    let maxSpeed = 0;
    position.forEach((position)=>{
        if (position.speed != null && position.speed > maxSpeed){
            maxSpeed = position.speed
        } 
        
    })
    return (maxSpeed *3.6).toFixed(1);
}
function getDistance(positions) {
    const earthRadiusKm = 6371
    let totalDistance = 0
    for (let i = 0; i < positions.length - 1; i++) {
        const p1 = {
            latitude: positions[i].latitude,
            longitude: positions[i].longitude
        }
        const p2 = {
            latitude: positions[i + 1].latitude,
            longitude: positions[i + 1].longitude
        }

        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltaLongitude = toRad(p2.longitude - p1.longitude)

        const a = Math.sin(deltaLatitude / 2) *
            Math.sin(deltaLatitude / 2) +
            Math.sin(deltaLongitude / 2) *
            Math.sin(deltaLongitude / 2) *
            Math.cos(toRad(p1.latitude)) *
            Math.cos(toRad(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a),
            Math.sqrt(1 - a))

        const distance = earthRadiusKm * c

        totalDistance += distance
    }

    function toRad(degree) {
        return degree * Math.PI / 180
    }

    return totalDistance.toFixed(2)
}
function getDuration(ride){

    let totalDuration = ride.stopTime - ride.startTime

    var segundos = Math.floor(totalDuration / 1000);

    let leftSeconds = segundos%60;

    // Calcula o número de horas
    var horas = Math.floor(segundos / 3600);
  
    // Calcula o número de minutos restantes
    var minutos = Math.floor((segundos % 3600) / 60);
  
    // Retorna uma string no formato "horas:minutos"

    let result = 0

    if(horas > 1){
        result = String(horas).padStart(2,0) + ":" + String(minutos).padStart(2,0) + "H";
        return result;
    }
    else{
        result = String(minutos).padStart(2,0) + ":" + String(leftSeconds).padStart(2,0) + "-min";
        return result;}
    
}
function getData(ride){
    let d = new Date(ride.startTime)

    const day = d.toLocaleDateString("pt-BR", {day: "numeric"})
    const month = d.toLocaleDateString("pt-BR", {month: "short"})
    const year = d.toLocaleDateString("pt-BR", {year: "2-digit"})

    const min = d.toLocaleString("pt-BR", {minute: "2-digit"})
    const hour = d.toLocaleString("pt-BR", {hour: "2-digit"})





    return ` ${hour}:${min} - ${day} ${month}, ${year} `;
}