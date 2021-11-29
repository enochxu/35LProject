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

# Downloading MongoDB for backend uses on Windows 
Download the MongoDB Community Edition (.msi installer): 
### `https://www.mongodb.com/try/download/community?tck=docs_server`
### `You may choose the path if you select custom when downloading, or you can let it be the default, which will be: C:\Program Files\MongoDB\Server\5.0\bin`

The MongoDB shell is not included with the .mis installer, so it must be downloaded separately. 

Download Mongosh (MongoDB Shell) Windows 64-bit (8.1+) (MSI): 
### `https://www.mongodb.com/try/download/shell?jmp=docs`

After meeting above, run the following command in the terminal: 
### `cd C:\Program Files\MongoDB\Server\5.0\bin`
### `mongod` 

Once this is running, open up a new terminal and run the following command: 
### `mongo`

Open up VS Code, and download the extension: 
### `MongoDB for VS Code`

Once the extension is downloaded: 
### `Click add connection.` 
### `The default hostname is 'localhost' and the default port is '27017.'`
### `You may also use 'mongodb://127.0.0.1:27017' as the default server connection.`

source: `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/`
source: `https://code.visualstudio.com/docs/azure/mongodb`

# Turning off AirPlay Receiver for macOS Monterey
If you are using MacOS Monterey, make sure you disable your AirPlay Receiver feature
### `go to System Preferences`
### `go to sharing`
### `uncheck AirPlay Receiver`

The reason to disable AirPlay Receiver is to ensure localhost:5000 is not occupied since we are running our backend on this port.
AirPlay Receiver is by default occuping that port, so it will cause an error when running the backend.
