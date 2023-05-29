


const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rideID = params.get('id');

const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async ()=>{
    ride.id = rideID ;

    const deletebtn = document.querySelector("#deletebtn")
    deletebtn.addEventListener("click" , ()=>{
        deleteRide(rideID)
        window.location.href ="../index.html"
    })

    

    const itemElement = document.querySelector("#datas")
    itemElement.className = "d-flex p-1 align-items-center shadow-sm mb-1 gap-1"


    const firstPosition = ride.data[0]
    const firstPostiondata = await getLocationData(firstPosition.latitude,firstPosition.longitude)
    

    const dataElement = document.createElement("div")
    dataElement.className ="flex-fill d-flex flex-column"


    const divCity = document.createElement("div")
    divCity.innerText = `${firstPostiondata.city} - ${firstPostiondata.countryCode}`
    divCity.className ="text-primary mb-2"

    const Speed = document.createElement("div")
    maxSpeed = getMaxspeed(ride.data)
    Speed.innerText = `Max Speed:${maxSpeed} Km/h`
    Speed.className = "h5"

    const distance = document.createElement("div")
    distance.innerText = `Distance:${getDistance(ride.data)} Km`

    const duration = document.createElement("div")
    duration.innerText = `Duration: ${getDuration(ride)}`

    const currentData = document.createElement("div")
    currentData.innerText = `${getData(ride)}`

    dataElement.appendChild(divCity)
    dataElement.appendChild(Speed)
    dataElement.appendChild(distance)
    dataElement.appendChild(duration)
    dataElement.appendChild(currentData)
    itemElement.appendChild(dataElement)

    const map = L.map("detailMap")
    map.setView([firstPosition.latitude,firstPosition.longitude],16)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    minZoom:15,
    maxZoom:18
}).addTo(map);

    const positionArray = ride.data.map((position)=>{
        return [position.latitude, position.longitude]
    })
    const polyline = L.polyline(positionArray, {color:"#F00"})
    polyline.addTo(map)

})
