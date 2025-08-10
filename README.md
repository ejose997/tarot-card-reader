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

### 2. Start Ollama and Download a Model

```bash
# Start Ollama service (if not already running)
ollama serve
```

#### Recommended Models

The app is configured to use `gpt-oss:20b` by default, but this is a 20GB model which may be overkill for tarot readings. Here are better alternatives:

**Recommended for most users:**
```bash
# Mistral 7B - Excellent balance of quality and size (4.1GB)
ollama pull mistral

# Llama 3.2 3B - Very fast and efficient (2GB)
ollama pull llama3.2

# Phi-3 Mini - Microsoft's efficient model (2.3GB)
ollama pull phi3
```

**For better quality (larger models):**
```bash
# Llama 3.1 8B - Great quality, reasonable size (4.7GB)
ollama pull llama3.1

# Mixtral 8x7B - High quality but larger (26GB)
ollama pull mixtral
```

**For lower-end machines:**
```bash
# Gemma 2B - Google's smallest model (1.4GB)
ollama pull gemma:2b

# TinyLlama - Very small and fast (637MB)
ollama pull tinyllama
```

**Note:** After downloading your preferred model, you'll need to update the model name in `tarot-reading-app.tsx` (line 260) from `'gpt-oss:20b'` to your chosen model (e.g., `'mistral'`, `'llama3.2'`, etc.)

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
5. The app will use your chosen Ollama model to generate a personalized interpretation

## Troubleshooting

- **"Error connecting to the Ollama API"**: Make sure Ollama is running (`ollama serve`) and the model is downloaded (`ollama list` to check)
- **Model not found**: Ensure you've pulled your chosen model and updated the model name in `tarot-reading-app.tsx` (line 260)
- **Port conflicts**: Ollama runs on port 11434 by default. Make sure this port is available
- **Slow responses**: Consider using a smaller model like `llama3.2` or `mistral` for faster inference
- **Out of memory**: If you get memory errors, try a smaller model like `tinyllama` or `gemma:2b`

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
