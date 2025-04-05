document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const buttons = document.querySelectorAll('[data-play]');
    const resultDiv = document.getElementById('result');
    const scoreDiv = document.getElementById('score');
    
    const state = {
        wins: 0,
        losses: 0,
        ties: 0,
        options: ['rock', 'paper', 'scissors'],
        rules: {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        }
    };

    function getComputerChoice() {
        const index = Math.floor(Math.random() * 3);  
        return state.options[index];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) return 'tie';
        return state.rules[userChoice] === computerChoice ? 'win' : 'lose';  
    }

    function animateSelection(button) {
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#777';
        setTimeout(() => {
            button.style.transform = 'scale(1.05)';
            button.style.backgroundColor = '#555';
        }, 150);
    }

    function updateScore(result) {
        if (result === 'win') state.wins++;
        else if (result === 'lose') state.losses++;
        else state.ties++;
        
        scoreDiv.innerHTML = `
            <span class="wins">Wins: ${state.wins}</span> | 
            <span class="losses">Losses: ${state.losses}</span> | 
            <span class="ties">Ties: ${state.ties}</span>
        `;
    }

    function showResult(userChoice, computerChoice, result) {
        const emojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        };
        
        // Map result to CSS class names
        const resultClass = result === 'win' ? 'win' : 
                          result === 'lose' ? 'lose' : 'tie';
        
        resultDiv.innerHTML = `
            <div class="selection">
                <span class="player">You: ${emojis[userChoice]}</span>
                <span class="vs">VS</span>
                <span class="computer">PC: ${emojis[computerChoice]}</span>
            </div>
            <div class="result-text ${resultClass}">${result.toUpperCase()}!</div>
        `;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.dataset.play;
            const computerChoice = getComputerChoice();  // Renamed to avoid conflict
            const result = determineWinner(userChoice, computerChoice);
            
            animateSelection(button);
            updateScore(result);
            showResult(userChoice, computerChoice, result);
        });
    });
});