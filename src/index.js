const displayCuties = () => {

    // Display names of the animals

    const cuties = document.querySelector("#character-bar");

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
            const cutieSpan = document.createElement("span");
            cutieSpan.id = `cutie-${cutie.id}`;
            cutieSpan.textContent = cutie.name;

            //Display Main Cutie

            cutieSpan.addEventListener("click", () => {
                const cutieMainDisplay = document.querySelector(".characterInfo");
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

                const cutiesForm = document.getElementById("votes-form");
                const voteCountDisplay = document.getElementById("vote-count");

                cutiesForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const voteInput = Number(document.getElementById("votes").value);
                    const updatedVotes = Number(cutie.votes) + voteInput;

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
                        cutie.votes = Number(updatedCutie.votes); 
                        voteCountDisplay.textContent = `${cutie.votes} Votes`;
                    });
                });
            });

            cuties.appendChild(cutieSpan);
        });
    })
    .catch(error => console.error("Failed to fetch characters:", error));
};

displayCuties();