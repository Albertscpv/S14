        const icons = ["❤️", "🌹", "🍫", "🍦", "🎈", "🎁", "❤️", "🌹", "🍫", "🍦", "🎈", "🎁"];
        let revealedCards = [];
        let matchedPairs = 0;
        let gameStarted = false;
        let timerId;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function createCard(icon) {
            const card = document.createElement("div");
            card.className = "card";
            card.textContent = icon;
            card.onclick = () => revealCard(card, icon);
            return card;
        }

        function revealCard(card, icon) {
            if (card.classList.contains("revealed") || revealedCards.length === 2) {
                return;
            }

            card.classList.add("revealed");
            revealedCards.push({ card, icon });

            if (revealedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }

        function checkMatch() {
            const [firstCard, secondCard] = revealedCards;

            if (firstCard.icon === secondCard.icon) {
                firstCard.card.classList.add("matched");
                secondCard.card.classList.add("matched");
                matchedPairs++;
                if (matchedPairs === icons.length / 2) {
                    document.getElementById("invitation").style.display = "block";
                    startConfetti();
                }
            } else {
                firstCard.card.classList.remove("revealed");
                secondCard.card.classList.remove("revealed");
            }

            revealedCards = [];
        }

        function startConfetti() {
            const totalConfetti = 700;
            const delay = 6; // Duración más corta de la animación para cada confeti
            
            document.getElementById("timer").style.display = "none";
            for (let i = 0; i < totalConfetti; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.classList.add('confetti');
                    confetti.style.left = Math.random() * window.innerWidth + 'px';
                    confetti.style.animation = `confetti-animation ${delay}s linear infinite`;
                    document.body.appendChild(confetti);
                }, delay / totalConfetti * i * 1000); // Emite confeti en intervalos regulares
            }
        }


        function initializeGame() {
            shuffleArray(icons);
            const gameContainer = document.getElementById("gameContainer");
            icons.forEach(icon => {
                gameContainer.appendChild(createCard(icon));
            });
            startTimer();
        }

        function startTimer() {
            let timeRemaining = 30;
            timerId = setInterval(() => {
                if (timeRemaining <= 0) {
                    clearInterval(timerId);
                    endGame();
                } else {
                    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
                    const seconds = String(timeRemaining % 60).padStart(2, '0');
                    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
                    timeRemaining--;
                }
            }, 1000);
        }

        function endGame() {
            if (matchedPairs !== icons.length / 2) {
                document.getElementById("gameContainer").style.display = "none";
                document.getElementById("timer").style.display = "none";
                document.getElementById("invitation").innerHTML = "Se te acabo el tiempo, como premio de consolacion ganaste un besito en la cola uwu";
                document.getElementById("invitation").style.display = "block";
                startConfetti();
            }
        }

        initializeGame();