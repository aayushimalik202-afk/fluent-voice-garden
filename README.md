# Fluent Voice Garden

Create a beautiful, fully furnished, responsive website called **“Speech Practice”**.

### Main Goal
Build a simple speech-practice website that helps users improve their English speaking, pronunciation, confidence, vocabulary, and fluency.

### Design
- Modern, clean, attractive UI.
- Use a professional blue/purple/white color theme.
- Smooth animations, rounded cards, soft shadows, and clear typography.
- Fully responsive on mobile, tablet, and desktop.
- Do not make the design overly complicated.
- Use only free/open-source UI components and features.
- Do NOT require paid APIs, premium plugins, or paid services.

### Homepage
Create a hero section with:

**Speech Practice**  
“Improve your English speaking skills, one sentence at a time.”

Add buttons:
- **Start Practice**
- **How It Works**

Show attractive feature cards:
1. Speaking Practice
2. Pronunciation Practice
3. Vocabulary Practice
4. Daily Challenges
5. Progress Tracking

### Speech Practice Page
Create a practice interface where the user can:
- See a sentence or speaking topic.
- Click **Start Practice**.
- Use the browser's microphone through the standard Web Speech API when available.
- Display the speech recognized by the browser.
- Allow the user to stop and restart practice.
- Show a simple result such as:
  - Words spoken
  - Basic accuracy indication
  - Practice completion
- Include a **Try Again** button.

If speech recognition is unavailable in the browser, show a friendly message explaining that the browser does not support the feature and provide a text-based practice option instead.

### Practice Categories
Add categories such as:
- Beginner
- Intermediate
- Advanced
- Daily Conversation
- Interview Practice
- Public Speaking
- Pronunciation

Each category should contain simple practice sentences/topics.

### Dashboard
Create a simple dashboard showing:
- Practice sessions completed
- Current streak
- Words practiced
- Recent practice activity
- Progress cards

Use local browser storage for saving simple progress. Do not require a paid database.

### Daily Challenge
Add a Daily Challenge section with:
- One speaking topic per day.
- A “Start Challenge” button.
- Completion status.
- Simple local progress tracking.

### About / How It Works
Explain the website in three simple steps:

1. Choose a practice topic.
2. Speak using your microphone.
3. Review your practice and try again.

### Navigation
Create a clean navigation bar:

- Home
- Practice
- Challenges
- Dashboard
- About

Add a footer with:
- Speech Practice
- Quick Links
- About
- Privacy
- Copyright

### Technical Requirements
- Use React with a clean component structure.
- Use Tailwind CSS or another free styling solution.
- Make the website fast and lightweight.
- Use browser/local-storage features wherever possible.
- Do not use paid APIs.
- Do not use OpenAI API or any other paid AI API unless absolutely necessary.
- Do not require authentication for the basic version.
- The website must work after deployment without requiring a paid subscription.
- Include proper error handling.
- Make all buttons functional.
- Do not leave placeholder buttons that do nothing.
- Make the website accessible and keyboard friendly.

### Project Configuration
At the bottom of the project, create a clearly labeled **Project Configuration** section with these fields:

**Published Key: sb_publishable_AedIDOL2DsUtRMdgKyE8Sw_o82-07vS

**Project URL:  https://prcdmjnlyzexoxkhrlvf.supabase.co

Keep these as editable placeholders. Do not expose private API keys or secret keys in frontend code.

### Final Requirement
Generate the complete working website, not just a mockup. Make it polished, beautiful, simple, and beginner-friendly. Prioritize functionality and reliability over unnecessary features. Use only free/basic technologies and avoid premium features.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/73d67f23-049c-4988-9c51-d10b9914c67d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
