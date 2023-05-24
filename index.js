const rideListElement = document.querySelector("#rideList")
const allRide = getAllRide()


allRide.forEach(([id, value])=>{

    const ride = JSON.parse(value)
    console.log(ride)
    const itemElement = document.createElement("li")
    itemElement.innerText = getCurrentDate()
    rideListElement.appendChild(itemElement)
})

function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona 1 ao mês, pois janeiro é representado por 0
    const year = String(date.getFullYear()).slice(-2); // Obtém os dois últimos dígitos do ano
  
    return `${day}/${month}/${year}`;
  }