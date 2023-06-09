const stopBtn = document.querySelector("#stop");
const startBtn = document.querySelector("#start");
const speedElement = document.querySelector("#speedy");

let watchID = null
let currentRide = null
startBtn.addEventListener("click", () => {
    if(watchID)
      return
  
    const options = {enableHighAccuracy:true}
    currentRide = createNewRide();
    watchID = navigator.geolocation.watchPosition(handleSuccess,handleError,options)

    startBtn.classList.add("d-none");
    stopBtn.classList.remove("d-none");

    function handleSuccess(position){
        addPosition(currentRide,position)
        console.log(position)
        speedElement.innerText = position.coords.speed ? (position.coords.speed *3.6).toFixed(1) :0
    }
    function handleError(error){
        console.log(error.msg)
    }
})

stopBtn.addEventListener("click", ()=>{
    if(!watchID)
        return

    navigator.geolocation.clearWatch(watchID)
    upStopTime(currentRide);
    watchID = null
    startBtn.classList.remove("d-none");
    stopBtn.classList.add("d-none");

})