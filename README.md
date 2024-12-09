EthIndia 2024 - DAOnt Panic

# AI-Powered Social Media Content Creator

This project leverages artificial intelligence to streamline and enhance social media content creation and management across multiple platforms, including Twitter, Telegram, YouTube, Instagram, Warpcast, and 0xPPL.

## Features

### User Integration

- **Social Media Connectivity**: Users can link their social media accounts through authorization or by providing their handles.
- **Data Retrieval**: The system fetches textual data from users' posts, reposts, and comments across connected platforms.

### Persona Development

1. **Web3 Asset Persona**:
   - Analyzes user interactions to identify interests in tokens, memecoins, DeFi tools, chains, or Layer 2 solutions.
   - Stores this persona on-chain to serve as an oracle for the user's preferred Web3 assets.

2. **Platform-Specific Persona**:
   - Recognizes and adapts to the user's unique posting style on each social media platform.
   - Ensures content aligns with the user's tone and style specific to each platform.

### Autonomous AI Trading Agent

- **Portfolio Management**: Utilizes the Web3 Asset Persona to inform an on-chain AI agent that autonomously manages and invests in assets based on profitability, trade actions, and market sentiment.

### AI-Driven Content Generation

- **Custom Content Creation**: Generates tailored posts for each social media platform, adhering to their specific character limits, keywords, layouts, and tagging conventions.
- **Multimedia Integration**: Processes text, images, and videos to create comprehensive posts, including image options and video transcriptions.
- **Scheduling**: Allows users to post immediately or schedule content for optimal engagement times on each platform.

## Integrated Platforms and Technologies

- **Basenames**: Facilitate on-chain access to user personas across various platforms.
- **CDP (Collateralized Debt Position)**: Enables smart wallet connections and transaction executions to fund AI trading agents.
- **Base AI Agents with Eliza and Fere AI**: Develop autonomous trading bots informed by on-chain user personas.
- **Lit Protocol**: Manages user consent, key management, encryption, and signing for persona usage.
- **EAS (Ethereum Attestation Service)**: Attests to model responses, ensuring data integrity.
- **Akave**: Stores raw user footage for content creation.
- **Fluence**: Hosts trading models in ONNX format on-chain.
- **Walrus**: Provides decentralized storage for user photos and related media.
- **Huddle01**: Utilizes on-chain personas for AI-powered content recommendations during calls and AI-generated podcasts featuring personas of notable individuals.
- **BNB Greenfield**: Stores AI-edited short-form videos and serves as a content delivery network for social media uploads.

## File Structure

- **backend-flask**: Backend services implemented using Flask.
- **backend-node**: Backend services implemented using Node.js.
- **data**: Storage for datasets and related resources.
- **frontend**: User interface components and assets.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ai-social-media-content-creator.git
   cd ai-social-media-content-creator
   ```

2. **Install Dependencies**:
   - For Flask backend:
     ```bash
     cd backend-flask
     pip install -r requirements.txt
     ```
   - For Node.js backend:
     ```bash
     cd backend-node
     npm install
     ```
   - For frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Configure Environment Variables**:
   Set up necessary environment variables as specified in the `.env.example` files within each directory.

4. **Run the Application**:
   - Start the backend services (Flask and Node.js) and the frontend application as per the provided scripts or commands in each directory.

## Contributing

We welcome contributions to enhance this project. Please follow the standard GitHub workflow:

1. **Fork the Repository**: Click the 'Fork' button at the top right corner of this page.
2. **Create a New Branch**: ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes**: Implement your feature or fix.
4. **Commit Changes**: ```bash
   git commit -m 'Add your feature description'
   ```
5. **Push to Branch**: ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**: Navigate to the original repository and click 'New Pull Request'.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

We extend our gratitude to the developers and communities of the integrated platforms and technologies that made this project possible.

---

For any inquiries or support, please contact [team@editai.in](mailto:support@yourdomain.com). 