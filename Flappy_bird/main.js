    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    const scoreDisplay = document.getElementById('score');
    const startScreen = document.getElementById('startScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreDisplay = document.getElementById('finalScore');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    const pixelBirdImage = new Image();
    pixelBirdImage.src = 'bird.png'; 
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    let bird, pipes, score, gameSpeed, gravity, lift;
    let gameState = 'start';

    // Base properties (for a 640px tall screen)
    const BASE_HEIGHT = 640;
    const BASE_GRAVITY = 0.4;
    const BASE_LIFT = -7;
    const BASE_PIPE_GAP = 180;
    const BASE_BIRD_SIZE = 40; // Approximate size of the pixel bird (width/height)
    const birdProps = {
        x: 0, //
        y: 0, // 
        width: 0,
        height: 0,
        velocity: 0,
    };
    const pipeProps = {
        width: 80,
        gap: 0,
        interval: 100,
        frameCount: 0
    };
    
    function resetGame() {
        setCanvasSize();
        
        const heightRatio = canvas.height / BASE_HEIGHT;
        gravity = BASE_GRAVITY * heightRatio;
        lift = BASE_LIFT * heightRatio;
        pipeProps.gap = BASE_PIPE_GAP * heightRatio;
        
        bird = { ...birdProps };
        bird.width = BASE_BIRD_SIZE * heightRatio;
        bird.height = BASE_BIRD_SIZE * heightRatio; 
        bird.x = canvas.width / 5 - bird.width / 2; 
        bird.y = canvas.height / 2 - bird.height / 2;
        pipes = [];
        score = 0;
        gameSpeed = 3;
        pipeProps.frameCount = 0;
        scoreDisplay.textContent = score;
    }
    function drawBird() {
        if (!pixelBirdImage.complete) {
            // 
            return;
        }
        ctx.save();
        ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
        const angle = Math.min(Math.max(-30, bird.velocity * 5), 30);
        ctx.rotate(angle * Math.PI / 180);
        
        // Draw the pixel bird image
        ctx.drawImage(pixelBirdImage, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
        
        ctx.restore();
    }
    function updateBird() {
        bird.velocity += gravity;
        bird.y += bird.velocity;
        // Collision with top/bottom
        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            endGame();
        }
    }
    function birdFlap() {
        if (gameState === 'playing') {
            bird.velocity = lift;
        }
    }
    function drawPipes() {
        pipes.forEach(pipe => {
            ctx.fillStyle = '#27ae60';
            ctx.fillRect(pipe.x, 0, pipeProps.width, pipe.topHeight);
            ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeProps.width, pipe.bottomHeight);
            
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(pipe.x + 5, 5, pipeProps.width - 10, pipe.topHeight - 10);
            ctx.fillRect(pipe.x + 5, canvas.height - pipe.bottomHeight + 5, pipeProps.width - 10, pipe.bottomHeight - 10);
        });
    }
    function updatePipes() {
        pipeProps.frameCount++;
        if (pipeProps.frameCount >= pipeProps.interval) {
            const minHeight = 50;
            const maxHeight = canvas.height - pipeProps.gap - minHeight;
            const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            const bottomHeight = canvas.height - topHeight - pipeProps.gap;
            pipes.push({ x: canvas.width, topHeight, bottomHeight, passed: false });
            pipeProps.frameCount = 0;
        }
        pipes.forEach(pipe => {
            pipe.x -= gameSpeed;
            
            // Collision with pipes
            if (
                bird.x + bird.width > pipe.x &&
                bird.x < pipe.x + pipeProps.width &&
                (bird.y < pipe.topHeight || bird.y + bird.height > canvas.height - pipe.bottomHeight)
            ) {
                endGame();
            }
            // Update score
            if (!pipe.passed && pipe.x + pipeProps.width < bird.x) {
                score++;
                scoreDisplay.textContent = score;
                pipe.passed = true;
            }
        });
        // Remove off-screen pipes
        pipes = pipes.filter(pipe => pipe.x + pipeProps.width > 0);
    }
    function gameLoop() {
        if (gameState !== 'playing') return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateBird();
        drawBird();
        updatePipes();
        drawPipes();
        
        requestAnimationFrame(gameLoop);
    }
    function startGame() {
        resetGame();
        gameState = 'playing';
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        scoreDisplay.style.display = 'block';
        gameLoop();
    }
    function endGame() {
        if (gameState === 'over') return;
        gameState = 'over';
        finalScoreDisplay.textContent = `Your Score: ${score}`;
        gameOverScreen.style.display = 'flex';
        scoreDisplay.style.display = 'none';
    }
    
    function handleResize() {
        resetGame();
        gameState = 'start';
        startScreen.style.display = 'flex';
        gameOverScreen.style.display = 'none';
        scoreDisplay.style.display = 'none';
    }
    // Event Listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (gameState === 'playing') birdFlap();
            else if (gameState === 'start') startGame();
        }
    });
    window.addEventListener('mousedown', () => {
         if (gameState === 'playing') birdFlap();
    });
    // Initialize
    resetGame();
    scoreDisplay.style.display = 'none';