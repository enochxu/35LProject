# To start the frontend
`cd frontend`
`npm install`
`npm run start`

# To start the backend
`cd backend`
`npm install`
`npm run devStart` or `npm run start` (devStart hot-reloads)

The backend will be using a local mongodb database.
Make sure that mongodb is running on your computer for the backend to work.

# Turning off AirPlay Receiver for macOS Monterey
If you are using MacOS Monterey, make sure you disable your AirPlay Receiver feature
### `go to System Preferences`
### `go to sharing`
### `uncheck AirPlay Receiver`

The reason to disable AirPlay Receiver is to ensure localhost:5000 is not occupied since we are running our backend on this port.
AirPlay Receiver is by default occuping that port, so it will cause an error when running the backend.
