let totalRolls = 0;
let sumOfRolls = 0;
const frequency = [0, 0, 0, 0, 0, 0];

function rollDice(type) {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const resultText = document.getElementById('result');
    const rollSound = document.getElementById('roll-sound');
    
    // Play roll sound
    rollSound.currentTime = 0; // Reset audio to start
    rollSound.play().catch(error => console.error("Audio play error:", error));
    
    // Add rolling effect
    dice1.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
    dice2.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
    
    setTimeout(() => {
        // Generate random numbers
        const roll1 = Math.floor(Math.random() * 6) + 1;
        let roll2 = 0;
        if (type === 'two') {
            roll2 = Math.floor(Math.random() * 6) + 1;
        }

        // Update dice display
        document.querySelector('#dice1 .front').innerText = roll1;
        document.querySelector('#dice2 .front').innerText = type === 'two' ? roll2 : '';

        // Update result
        const result = type === 'two' ? `Dice 1: ${roll1}, Dice 2: ${roll2}, Sum: ${roll1 + roll2}` : `Dice: ${roll1}`;
        resultText.innerText = result;

        // Update statistics
        totalRolls++;
        sumOfRolls += type === 'two' ? (roll1 + roll2) : roll1;
        frequency[roll1 - 1]++;
        if (type === 'two') frequency[roll2 - 1]++;

        document.getElementById('total-rolls').innerText = totalRolls;
        document.getElementById('average-roll').innerText = (sumOfRolls / totalRolls).toFixed(2);
        document.getElementById('frequency').innerText = frequency.join(', ');

        // Reset transform for next roll
        dice1.style.transform = '';
        dice2.style.transform = '';
    }, 600); // Duration of the roll animation
}

function changeTheme(theme) {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');

    dice1.className = `dice ${theme}`;
    dice2.className = `dice ${theme}`;
}