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

            cutieSpan.addEventListener("click", () => {
                const cutieMainDisplay = document.querySelector(".characterInfo")

                cutieMainDisplay.innerHTML = ''

                cutieMainDisplay.innerHTML = `
                    <p id="name">${cutie.name}</p>
                    <img
                        id="image"
                        src=${cutie.image}
                        alt=${cutie.name}
                    />
                    <h4>Total Votes: <span id="vote-count">${cutie.votes} Votes</span></h4>
                    <form id="votes-form">
                        <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
                        <input type="submit" value="Add Votes" />
                    </form>
                    <button id="reset-btn">Reset Votes</button>
                `
            })

            cuties.appendChild(cutieSpan);
        }) 
    })
}

displayCuties()