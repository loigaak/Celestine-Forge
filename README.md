# Celestine Forge

Celestine Forge is a unique JavaScript-based puzzle game where players align harmonic crystals to create resonant frequencies. Match crystal states (low, mid, high) in adjacent grid cells to form frequency chains, earning points and advancing through celestial phases. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Resonance Gameplay**: Connect crystals with matching harmonic states (low, mid, high) horizontally or vertically to create resonant frequencies.
- **Celestial Phases**: Progress through phases as you score, increasing crystal counts and resonance levels.
- **Modular JavaScript**: Clean, object-oriented code for seamless integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/celestine-forge.git
   ```
2. Navigate to the project directory:
   ```bash
   cd celestine-forge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Connect adjacent crystals with the same harmonic state (low: red, mid: blue, high: green) horizontally or vertically by cycling their states.
- **Scoring**: Each frequency chain earns 65 points multiplied by the current phase.
- **Phase Progression**: Reach 650 points per phase to advance, increasing crystal count and resonance levels.
- **Interaction**: Use `game.handleClick(x, y)` to cycle crystal states (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `crystal.js`: Crystal class for harmonic entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Celestine Forge and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/your-username). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.