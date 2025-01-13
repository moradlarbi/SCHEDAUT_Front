Steps to run the application:

1- Clone the back-end repository:
   git clone https://github.com/moradlarbi/SCHEDAUT_Back

2- Install dependencies:
   yarn

3- Start RabbitMQ via Docker:
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   // Alternatively, install RabbitMQ locally

4- Create a .env file:
   JAWSDB_URL=mysql://e3v5vqvmprsuzjfi:a4dps9zul7ar1t85@onnjomlc4vqc55fw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/pettlxfldr9yfyx0

5- Start the back-end server:
   yarn run dev

6- Install Python dependencies:
   pip install pymysql pika pulp sqlalchemy pandas datetime

7- Test RabbitMQ:
   python3 test_rabbitmq.py


1- Navigate to the client directory:
   cd client

2- Install dependencies:
   yarn

3- Update the proxy in package.json:
   Update the `proxy` field with the address of the back-end server

4- Start the client application:
   yarn run start


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.  

The build is minified, and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you cannot go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project, giving you full control over them. All commands except `eject` will still work, but they will now point to the copied scripts so you can tweak them as needed. At this point, you’re on your own.

You never have to use `eject`. The curated feature set is suitable for small and medium deployments, and there’s no obligation to use this feature unless customization is necessary.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
