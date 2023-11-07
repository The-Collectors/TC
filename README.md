# The-Collectors
The Collectors was originated by a team of students working on a project for the Software Design & Documentations course at Rensselaer Polytechnic Institute.
This project's purpose and design is to consolidate all clubs and organizations affiliated with RPI.

## Team Contact
Team Lead - UHY#8394 (Discord)

## How to set up the development environment
Directions to install necessary packages and dependencies for the project. First clone the repository on your machine.
    - note: we highly recommend you to use Github Desktop with VScode.

### Installing Python
1. Download and install latest Python at https://www.python.org/downloads/
2. When installing, make sure that:
    - Python.exe is added to PATH
    - pip is also installed

### Installing MongoDB
1. Download the MongoDB Community Server at https://www.mongodb.com/try/download/community
2. Make sure *install MongoDB Compass* is checked. You can also download at https://www.mongodb.com/try/download/compass
3. After MongoDB Compass is installed, it should open up with a new connection window. Save and connect the default connection.
    - note: for new connection, use 'mongodb://localhost:27017' as default.

### Importing Database
1. Open MongoDB Compass.
2. Connect to localhost, and then click 'Create database'
3. Enter 'TheCollectors' for Database Name, and 'Clubs' for Collection Name.
    - now you will have TheCollectors.Clubs database.
4. Go to TC\backend\external data from your workspace (should be downloaded by repository cloning), and find 'Clubs.json' file.
5. From MongoDB Compass, click ADD DATA and select Import JSON or CSV file.
6. Import 'Clubs.json' from TC\backend\external data.

### Installing Packages and Dependencies
1. Download and install latest Node.js at https://nodejs.org/en. This will also download npm which we need. Check *automatically install necessary tools* when prompted. Restart your computer.
2. Open up a new terminal and `cd` to the frontend folder. Type `npm install`. This should install all necessary frontend packages.
	![img](https://github.com/The-Collectors/TC/assets/67136819/568332d9-aac9-4f04-8c50-c7c12f780419)
3. Open up a new terminal and `cd` to the backend folder. Type `pip install pipenv` in ther terminal. If you are getting an error that the command pip does not exists, it means you haven't added Python Scripts to your PATH.
	![pipenv install](https://github.com/The-Collectors/TC/assets/67136819/2773f5e1-6876-4b67-99e6-27d7b0cf55e9)
4. Once pipenv is installed, type `pipenv shell` and then `pip install -r requirements.txt`. This installs all backend packages we need.
	![pipenv shell](https://github.com/The-Collectors/TC/assets/67136819/c04e38fe-0b2b-48d8-9527-c1a2895c63c0)
	![pip install requirements](https://github.com/The-Collectors/TC/assets/67136819/3677c4fd-117c-4404-b570-58756c94790e)


## Launching the project
Directions for launching the project once the necessary packages have been installed.
1. To start the backend, navigate to the backend folder in the terminal and start a virtual environment with `pipenv shell`. Then type `uvicorn main:app --reload`.
    - note: type `/docs` to the end of the URL (from the line 'Uvicorn running on...') to see the FastAPI backend commands.
2. To start the frontend, navigate to the frontend folder in the terminal (new prompt should be opened for frontend) and type `npm start`.
    - It will open new Windows Internet Explorer (or Google Chrome), with http://localhost:3000.
3. To see the list of clubs in the database, start MongoDB and connect to the localhost database (default - should be saved). You will see *The Collectors* database on the left hand side.


## Helpful Links and Tips

### Frontend Styling
0. Before start, we will use styled-components for overall styling. Therefore, no *.css file will be exist, instead, all styling will included within the corresponding *.js file.
	- Common (many-used) style will be stored in CommonStyling.js file.
1. https://styled-components.com/
    - For clear visual of styled-components, install vscode-styled-componets from vscode Extentions (Available on the left).
    - Overriding styles only works for (top -> bottom) order.
2. Fonts are implemented through fonts.js file. Please look through previously implemented code (the @font-face) and implement the other.
	- Some fonts are not allowed to use, please check the lisence of code carefully.
	- Some fonts are only applied for caplital letters, please comment it under @font-face when implementing those kinds.

