const rideListElement = document.querySelector("#rideList")
const allRide = getAllRide()


allRide.forEach(([id, value])=>{

    const ride = JSON.parse(value)
    console.log(ride)
    const itemElement = document.createElement("li")
    itemElement.innerText = id
    rideListElement.appendChild(itemElement)
})