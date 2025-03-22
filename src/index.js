// Your code here

const displayCuties = () => {
    const cuties = document.querySelector("#character-bar")

    fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
            "Content-Type" : "Application/json",
            "Accept" : "Application/json",
        },
    })
    .then( (response) => response.json())
    .then( (data) => {
        console.log(data)
        data.forEach( (cutie) => {
            const cutieSpan = document.createElement("span"); 
            cutieSpan.id = `cutie-${cutie.id}`;
            cutieSpan.textContent = cutie.name

            cuties.appendChild(cutieSpan);
        }) 
    })
}

displayCuties()