# MCU Characters - STD24004

A simple application to manage a list of characters from the Marvel Cinematic Universe (MCU).  
The project is split into two parts:
- **Backend** (Express.js): REST API that stores data in a local JSON file (`characters.json`).
- **Frontend** (React + Vite + Tailwind): User interface to display and manage characters.

---

## Installation

### 1. Clone the project
```bash
git clone https://github.com/yourusername/mcu-characters.git
cd mcu-characters
```

### 2. Move to backend directory :  
```bash
cd backend
npm install
node index.js
```

### 3. Open a new terminal and move to frontend directory :
```bash
cd frontend
npm install
npm run dev
```

## Features

- Display a list of characters (id, name, real name, universe)
- Add a new character
- Update an existing character
- Delete a character with confirmation
- Reusable form for Add / Update
- Pre-filled fields when updating a character
- Cancel editing
