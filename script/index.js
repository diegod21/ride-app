const rideListElement = document.querySelector("#rideList")
const allRide = getAllRide()


allRide.forEach(async ([rideID, value])=>{
   
    const ride = JSON.parse(value)
    ride.id = rideID ;

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center shadow-sm mb-1 gap-1"
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click",()=>{
        window.location.href = `./html/detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstPostiondata = await getLocationData(firstPosition.latitude,firstPosition.longitude)

    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.classList.add("b-img")
    mapElement.id = mapID
    

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

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapID, {
        attribution: false,
        zoomControl: false,
        dragging:false
    })
    map.setView([firstPosition.latitude,firstPosition.longitude],15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom:15,
    maxZoom:19
    }).addTo(map);
    L.marker([firstPosition.latitude,firstPosition.longitude]).addTo(map)
})


