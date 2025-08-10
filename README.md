# Mystical Tarot Reader

A mystical tarot card reader with AI-powered interpretations. Features an intuitive interface for card selection and dynamic AI model management with automatic download capabilities. Built using React, TypeScript, and Ollama for local inference.

## Features

- 🎴 **Interactive Card Selection** - Choose between random draw or manual card selection
- 🤖 **Dynamic AI Model Selector** - Switch between different AI models on the fly
- 📥 **Automatic Model Download** - Download and install AI models directly from the UI
- 📊 **Real-time Download Progress** - Visual feedback during model downloads
- 🔮 **AI-Powered Interpretations** - Get personalized tarot readings using local AI
- 📖 **Complete 78-Card Deck** - Full Major and Minor Arcana with pixel art
- 🔄 **Card Reversal Support** - Upright and reversed interpretations
- 💬 **Conversation History** - Track multiple readings in one session
- ⚙️ **Advanced Settings Panel** - Collapsible settings for a clean interface
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Mystical UI** - Beautiful gradients and smooth animations

## Technologies Used

*   React
*   TypeScript
*   Vite
*   Ollama
*   Lucide React (icons)

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

# In a new terminal, pull the default model (Mistral 7B - 4.1GB)
ollama pull mistral
```

**Note:** The app uses Mistral 7B by default with a temperature of 0.8 for balanced, creative readings. You can easily switch models using the built-in model selector!

#### Alternative Models (Optional Manual Installation)

While the app can download models automatically through the UI, you can also pre-install them manually:

**For faster performance (smaller models):**
```bash
# Llama 3.2 3B - Very fast and efficient (2GB)
ollama pull llama3.2

# Phi-3 Mini - Microsoft's efficient model (2.3GB)
ollama pull phi3

# Gemma 2B - Google's smallest model (1.4GB)
ollama pull gemma:2b

# TinyLlama - Very small and fast (637MB)
ollama pull tinyllama
```

**For better quality (larger models):**
```bash
# Llama 3.1 8B - Great quality, reasonable size (4.7GB)
ollama pull llama3.1

# Mixtral 8x7B - High quality but larger (26GB)
ollama pull mixtral
```

**Tip:** You don't need to manually edit any code to switch models - just use the Advanced Settings panel in the app!

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

### Basic Usage

1. Open the application in your browser
2. Enter your question in the text area
3. Choose between:
   - **Random Draw**: Click "Draw 3 Cards" to randomly select cards
   - **Manual Selection**: Toggle to manual mode and select 3 cards from the deck
4. Click "Get Interpretation" to receive your tarot reading
5. The app will use the selected AI model to generate a personalized interpretation

### Using the AI Model Selector

1. Click on **"Advanced Settings"** below the question text area
2. In the dropdown menu, you'll see all available models with their status:
   - ✓ = Model is installed and ready
   - ↓ = Model not installed (needs download)
   - ⏳ = Model is currently downloading
3. Select any model from the dropdown
4. If the model isn't installed, click the **"Download"** button that appears
5. Wait for the download to complete (progress will be shown)
6. Once downloaded, the model will be automatically selected and ready to use

### Available Models in the Selector

- **Mistral 7B** (Default) - Best balance of quality and speed
- **Llama 3.2 3B** - Very fast and efficient
- **Llama 3.1 8B** - Great quality, reasonable size
- **Phi-3 Mini** - Microsoft's efficient model
- **Gemma 2B** - Google's smallest model
- **TinyLlama** - Ultra-lightweight for quick responses
- **Mixtral 8x7B** - Highest quality (requires more resources)

## Troubleshooting

- **"Error connecting to the Ollama API"**: Make sure Ollama is running (`ollama serve`)
- **Model not found**: Use the model selector in Advanced Settings to download the model, or verify with `ollama list`
- **Download fails**: Ensure you have sufficient disk space and a stable internet connection
- **Port conflicts**: Ollama runs on port 11434 by default. Make sure this port is available
- **Slow responses**: Use the model selector to switch to a smaller model like `llama3.2` or `tinyllama`
- **Out of memory**: Switch to a lighter model through the Advanced Settings (e.g., `tinyllama` or `gemma:2b`)
- **Model selector not showing status**: Refresh the page - it will check installed models on load

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
