document.addEventListener("DOMContentLoaded", () => {
  // Cibler les éléments du DOM
  const departureInput = document.getElementById("departure");
  const arrivalInput = document.getElementById("arrival");
  const dateInput = document.getElementById("date");
  const searchButton = document.getElementById("searchButton");
  const resultIcon = document.getElementById("resultIcon");
  const resultText = document.getElementById("resultText");

  // Ajouter un écouteur d'événement au bouton de recherche
  searchButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche la page de se recharger

    // Récupérer les valeurs saisies par l'utilisateur
    const departure = departureInput.value.trim();
    const arrival = arrivalInput.value.trim();
    const date = dateInput.value.trim();

    function formatDateTime(apiDate) {
      // Create a Date object from the API date string
      const dateObj = new Date(apiDate);
    
      // Extract the date in the format YYYY-MM-DD
      const newDate = dateObj.toISOString().split('T')[0];
    
      // Extract the time in the format HH:MM:SS
      const time = dateObj.toTimeString().split(' ')[0].slice(0, 5);[0]; // Just HH:MM:SS
    
      // Return both the date and time
      return { newDate, time };
    }

    function add(data) {

      for (const trip of data) {
         
        if (trip){
          console.log(trip)
          const resultDate = formatDateTime(trip.date)
          document.querySelector(`.info-container-img`).style.display = "none";
          document.querySelector(`.info-container-p`).style.display = "none";
          document.querySelector('.info-container').innerHTML +=` <div class="trip-result">
          <span>${trip.departure} > ${trip.arrival}</span> 
            <span>${resultDate.time}</span>  
            <span>${trip.price}€</span>
        </div>`}
        else {
          //console.log("une erreur est survenue")
        }
        //document.querySelector('#results').style.justifyContent = "flex-start";
    
      }
    }
    function notrip() {
      
        document.querySelector(`.info-container-img`).style.display = "none";
        document.querySelector(`.info-container-p`).style.display = "none";
        document.querySelector(`.info-container`).innerHTML +=
              `<span><img src="./notfound.png" alt="not found" style="height: 100px; width: 100px;</span> 
                <span>No trip found</span>`
      
    }

    // Vérifier si tous les champs sont remplis
    if (departure && arrival && date) {
      try {
        // Faire une requête vers l'API backend
        //http://localhost:3000/tickets?departure=Bruxelles&arrival=Marseille&date=2023-03-09
        const response = await fetch(`http://localhost:3000/tickets/${departure}/${arrival}/${date}`)

      //   if (!response.ok) {
      //     throw new Error("Erreur lors de la recherche du trajet");
      //  }

        // Récupérer la réponse JSON du backend
        const result = await response.json();

        if (result) {
          // Afficher les informations sur le trajet trouvé
         add(result)
         console.log(result)
        
        } else {
          // Si aucun trajet n'est trouvé
          notrip()
        }
      } catch (error) {
        document.querySelector(`.info-container-img`).style.display = "none";
        document.querySelector(`.info-container-p`).style.display = "none";
        document.querySelector(`.info-container`).innerHTML =
              `<span><img src="./notfound.png" alt="not found" style="height: 100px; width: 100px;</span> 
                <span>No trip found</span>`
        console.error("le chat s'appelle Chess")
      }
    }
  });
});


 