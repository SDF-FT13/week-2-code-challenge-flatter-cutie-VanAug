const displayCuties = () => {

    // Display names of the animals

    const cuties = document.querySelector("#character-bar")

    fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "Accept": "Application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        data.forEach((cutie) => {
            const cutieSpan = document.createElement("span")
            cutieSpan.id = `cutie-${cutie.id}`
            cutieSpan.textContent = cutie.name

            //Display Main Cutie

            cutieSpan.addEventListener("click", () => {

                const cutieMainDisplay = document.querySelector("#detailed-info")

                cutieMainDisplay.innerHTML = `
                    <p id="name">${cutie.name}</p>
                    <img
                        id="image"
                        src=${cutie.image}
                        alt=${cutie.name}
                    />
                    <h4>Total Votes: <span id="vote-count">${cutie.votes} Votes</span></h4>
                    <form id="votes-form">
                        <input type="number" placeholder="Enter Votes" id="votes" name="votes" />
                        <input type="submit" value="Add Votes" />
                    </form>
                    <button id="reset-btn">Reset Votes</button>
                    `;
                    
                    // Form Action
                    
                    const cutiesForm = document.getElementById("votes-form")
                    const voteCountDisplay = document.getElementById("vote-count")
                    const resetCutie = document.getElementById("reset-btn")
                    
                    cutiesForm.addEventListener("submit", (event) => {

                    event.preventDefault()

                    const voteInput = Number(document.getElementById("votes").value)
                    const updatedVotes = Number(cutie.votes) + voteInput

                    fetch(`http://localhost:3000/characters/${cutie.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "Application/json",
                            "Accept": "Application/json"
                        },
                        body: JSON.stringify({ votes: updatedVotes }),
                    })
                    .then(resp => resp.json())
                    .then((updatedCutie) => {
                        cutie.votes = Number(updatedCutie.votes)
                        voteCountDisplay.textContent = `${cutie.votes} Votes`
                    })
                })
                
                // Reset Vote count to 0

                resetCutie.addEventListener("click", () => {
                    fetch(`http://localhost:3000/characters/${cutie.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type" : "Application/json",
                            "Accept" : "Application/json"
                        },
                        body: JSON.stringify({ votes: 0 })
                    })
                    .then( resp => resp.json())
                    .then(() => {
                        cutie.votes = 0;
                        voteCountDisplay.textContent = `${cutie.votes} Votes`;
                      })
                })
            })

            cuties.appendChild(cutieSpan)
        })
    })
    .catch(error => console.error("Failed to fetch characters:", error))
}

// Add new Cutie

const addNewCutie = () => {
    const cutiesForm = document.getElementById("character-form");

    cutiesForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const cutieName = document.getElementById("new-name").value;
        const cutieImage = document.getElementById("image-url").value;

        const newCutie = {
            name: cutieName,
            image: cutieImage,
            votes: 0
        };

        fetch("http://localhost:3000/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newCutie)
        })
        .then(response => response.json())

        // Display the submitted image

        .then((newCutie) => {
            const cutieMainDisplay = document.querySelector("#detailed-info")

            cutieMainDisplay.innerHTML = `
                <p id="name">${newCutie.name}</p>
                <img
                    id="image"
                    src=${newCutie.image}
                    alt=${newCutie.name}
                />
                <h4>Total Votes: <span id="vote-count">${newCutie.votes} Votes</span></h4>
                <form id="votes-form">
                    <input type="number" placeholder="Enter Votes" id="votes" name="votes" />
                    <input type="submit" value="Add Votes" />
                </form>
                <button id="reset-btn">Reset Votes</button>
            `;
        })
    });
};

displayCuties()

addNewCutie();
