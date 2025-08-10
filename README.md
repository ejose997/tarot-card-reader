# Mystical Tarot Reader

This is a tarot card reader that was vibe coded using Google Studio AI Builder and Warp. It uses Ollama to provide local inference.

## Technologies Used

*   React
*   TypeScript
*   Vite
*   Ollama

## Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Ollama](https://ollama.ai/)

## Setup Instructions

### 1. Install Ollama

**macOS:**
```bash
# Download and install from https://ollama.ai/download
# Or use Homebrew:
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download the installer from [Ollama website](https://ollama.ai/download)

### 2. Start Ollama and Download the Model

```bash
# Start Ollama service (if not already running)
ollama serve

# In a new terminal, pull and run the gpt-oss:20b model
ollama pull gpt-oss:20b
```

**Note:** The `gpt-oss:20b` model is approximately 20GB in size. Make sure you have sufficient disk space and a stable internet connection.

### 3. Clone the Repository

```bash
git clone https://github.com/your-username/mystical-tarot-reader.git
cd mystical-tarot-reader
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## How to Use

1. Open the application in your browser
2. Enter your question in the text area
3. Choose between:
   - **Random Draw**: Click "Draw 3 Cards" to randomly select cards
   - **Manual Selection**: Toggle to manual mode and select 3 cards from the deck
4. Click "Get Interpretation" to receive your tarot reading
5. The app will use the local `gpt-oss:20b` model via Ollama to generate a personalized interpretation

## Troubleshooting

- **"Error connecting to the Ollama API"**: Make sure Ollama is running (`ollama serve`) and the model is downloaded (`ollama list` to check)
- **Model not found**: Ensure you've pulled the correct model: `ollama pull gpt-oss:20b`
- **Port conflicts**: Ollama runs on port 11434 by default. Make sure this port is available

## Project Structure

```
mystical-tarot-reader/
├── index.html          # Entry HTML file
├── index.tsx           # Main React entry point
├── tarot-reading-app.tsx  # Main application component
├── card-meanings.ts    # Tarot card meanings data
├── package.json        # Project dependencies
└── vite.config.ts      # Vite configuration
```
