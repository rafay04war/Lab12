# React + Node.js Communication Demo

A small full-stack lab project that shows how a React frontend communicates with a raw Node.js backend.

The backend uses only Node.js's built-in `http` module (no Express) and exposes a single JSON endpoint. The React frontend fetches that endpoint with `useEffect`, stores the result in `useState`, and displays the message on the page.

## Features

- Raw Node.js HTTP server with no external dependencies
- `GET /api/info` JSON endpoint
- CORS support, including `OPTIONS` preflight handling
- React frontend using `useEffect` and `useState`
- Loading and error states in the UI
- Component test with a mocked `fetch`
- Production build verified with Create React App

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | React 19, Create React App (`react-scripts` 5)  |
| Backend  | Node.js, built-in `http` module                  |
| Styling  | Plain CSS                                        |
| Testing  | Jest and React Testing Library                   |

## Project Structure

```text
lab12/
├── backend/
│   └── server.js          # Node.js HTTP server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js         # React component that fetches the API
│   │   ├── App.css
│   │   ├── App.test.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

No database or API keys are required.

## Getting Started

The frontend and backend run as two separate processes, so use two terminals.

### 1. Start the backend

```bash
cd backend
node server.js
```

The server starts at:

```text
http://localhost:5000
```

There is no `npm install` step for the backend because it has no dependencies.

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

The React app opens at:

```text
http://localhost:3000
```

If `npm install` was already run, you only need `npm start`.

## API Reference

### `GET /api/info`

Returns a JSON message confirming that React can reach the Node.js server.

**Request**

```http
GET http://localhost:5000/api/info
```

**Response — `200 OK`**

```json
{
  "info": "React is communicating with Node.js"
}
```

**Response headers**

```http
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Other routes** return `404 Not Found`.

**Preflight:** `OPTIONS` requests return `204 No Content` with the CORS headers above.

## How It Works

1. The React app mounts.
2. `useEffect` runs once and calls:

   ```js
   fetch('http://localhost:5000/api/info')
   ```

3. The backend matches the request in `backend/server.js` and responds with JSON.
4. The JSON is parsed and the `info` value is saved with `setMessage`.
5. React re-renders and displays the message.

Relevant frontend code (`frontend/src/App.js`):

```js
const [message, setMessage] = useState('Loading...');

useEffect(() => {
  fetch('http://localhost:5000/api/info')
    .then((res) => res.json())
    .then((data) => setMessage(data.info))
    .catch(() => setMessage('Could not connect to the backend.'));
}, []);
```

## Inspecting the API Call

To see the request and its response:

1. Open `http://localhost:3000`.
2. Press `F12` to open DevTools.
3. Go to the **Network** tab and filter by **Fetch/XHR**.
4. Reload the page.
5. Select the `info` request to inspect the URL, status, headers, and response body.

You can also open the endpoint directly in a browser or use:

```bash
curl http://localhost:5000/api/info
```

On Windows PowerShell:

```powershell
Invoke-RestMethod http://localhost:5000/api/info
```

## Available Scripts

### Backend (`backend/`)

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `node server.js` | Starts the backend on port 5000 |

### Frontend (`frontend/`)

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm start`     | Runs the app in development mode on port 3000 |
| `npm test`      | Runs the test suite in watch mode        |
| `npm run build` | Creates an optimized production build    |
| `npm run eject` | Ejects Create React App configuration (irreversible) |

## Testing

From the `frontend` directory:

```bash
npx react-scripts test --watchAll=false
```

Expected result:

```text
PASS src/App.test.js
  √ displays the message fetched from the backend
```

To verify the production build:

```bash
npm run build
```

## Troubleshooting

### The UI shows "Could not connect to the backend."

- Make sure the backend is running with `node server.js`.
- Confirm the backend is reachable at `http://localhost:5000/api/info`.
- Check that no other process is using port `5000`.

### CORS error in the browser console

The backend already sets `Access-Control-Allow-Origin: *`. If you change the frontend port, no backend change is needed. If you modify the server, keep the CORS headers and `OPTIONS` handling in place.

### Port already in use

Stop the process using ports `3000` or `5000`, or change the port in the relevant file:

- Backend: `server.listen(5000, ...)` in `backend/server.js`
- Frontend: Create React App prompts for another port automatically

### Blank page after starting React

Check the terminal for compile errors and make sure `npm install` completed successfully in `frontend/`.

## Notes

- The frontend API URL is hard-coded to `http://localhost:5000` for this lab. For a real deployment, move it to an environment variable such as `REACT_APP_API_URL`.
- The backend uses `Access-Control-Allow-Origin: *`, which is fine for local development but should be restricted to trusted origins in production.
