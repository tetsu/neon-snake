# Neon Snake

*🚀 Created with the help of Google Antigravity, an advanced AI coding assistant.*

A modern, functional, dark-themed Snake game built with HTML5 Canvas, Vanilla CSS, and Vanilla JavaScript.

## Features
- **Neon Dark Aesthetics:** Sleek `#0f0f13` background with glowing `#39ff14` (green) snake and `#ff073a` (red) food.
- **Wrap-around Movement:** The snake wraps around the edges of the canvas instead of dying upon hitting the walls.
- **Scoring System:** Keeps track of your current score and displays your final score upon Game Over.
- **Keyboard Controls:** Use arrow keys or WASD to navigate the grid.

## How to Play (Tutorial)

To run the game, you need to serve the files using a local web server (opening the HTML file directly might work, but running a server is recommended for loading external assets or avoiding cross-origin issues).

1. Open your terminal and navigate to the game's directory:
   ```bash
   cd path/to/neon-snake
   ```

2. Start a Python HTTP server depending on your installed version:
   **For Python 3:**
   ```bash
   python3 -m http.server 8000
   ```
   **For Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. Open your web browser and go to:
   ```
   http://localhost:8000
   ```

4. Click the **"Start Game"** button.

5. Use your keyboard's **Arrow keys** or **W, A, S, D** to control the glowing green snake.

6. Guide the snake to eat the glowing red food and increase your score.

7. **Avoid hitting your own glowing tail**, or else it's Game Over! (Note: You can safely pass through the walls of the screen).

8. If you get a Game Over, you can click **"Play Again"** or press the Enter/Space keys to easily restart.
