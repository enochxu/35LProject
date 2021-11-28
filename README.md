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

# Downloading MongoDB for backend uses on macOS
Visit the website and download homebrew:
### `https://brew.sh/#install`

Install the following in terminal:
### `xcode-select --install`

After meeting above, run the following command in the terminal:
### `brew tap mongodb/brew`
### `brew install mongodb-community@5.0`

To start the mongoDB service, run the following in terminal:
### `brew services start mongodb-community@5.0`

To stop the mongoDB service, run the following in terminal:
### `brew services stop mongodb-community@5.0`

source: `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#std-label-osx-prereq`


# Turning off AirPlay Receiver for macOS Monterey
If you are using MacOS Monterey, make sure you disable your AirPlay Receiver feature
### `go to System Preferences`
### `go to sharing`
### `uncheck AirPlay Receiver`

The reason to disable AirPlay Receiver is to ensure localhost:5000 is not occupied since we are running our backend on this port.
AirPlay Receiver is by default occuping that port, so it will cause an error when running the backend.
