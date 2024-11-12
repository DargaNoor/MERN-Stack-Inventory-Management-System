# MERN Stack Inventory Management System

This project is a comprehensive inventory management system developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to create, view, update, and delete product records, providing an efficient and user-friendly interface to manage an inventory database. MongoDB Atlas is utilized for cloud-based data storage, which enhances scalability and reduces server-side workload.

**Project Structure**
**Frontend:** Built with React.js, providing a responsive, dynamic interface for users to interact with inventory data. React Router handles routing, enabling seamless navigation between pages.
**Backend:** Powered by Node.js and Express.js, managing API endpoints for all CRUD operations. The server interacts with MongoDB Atlas via Mongoose, a popular ORM for MongoDB, to handle data persistence and schema validation.
**Database:** MongoDB Atlas stores product data with a schema managed by Mongoose. Data is structured efficiently to support fast queries and facilitate scalability.
Modules and Dependencies


**Backend**
**NVM:** Node Version Manager, required for managing multiple Node.js versions.
**Nodemon:** Automatically restarts the server on code changes, aiding development efficiency.
**Multer:** Middleware for handling file uploads, crucial for adding product images.
**Mongoose:** ODM for MongoDB, simplifying schema definitions and database interactions.
**JSON-Parser:** Parses incoming JSON requests.
**Express-Session:** Manages user sessions.
**Express:** Framework for Node.js, providing robust API routing capabilities.
**Dotenv:** Loads environment variables from a .env file, securing sensitive data.
**CORS:** Middleware for enabling Cross-Origin Resource Sharing, allowing frontend-backend communication.
**Cookie-Parser:** Parses cookies from HTTP headers, aiding in session management.



To Start Backend-End: run below command.
	nodemon server.js


**Frontend**
**React:** Library for building the user interface.
**React-DOM:** Serves as the entry point to the DOM and server renderers for React.
**React-Router-DOM:** Manages routing within the React application.
**Axios:** Used for HTTP requests to the backend API.
**Babel Plugins:** Configures ECMAScript features, enabling compatibility and modern syntax.


To Start Front-End run below command.
	npm start


** Workflow and Features **
**Product Management:** Upon login, users can view a list of available products in the inventory. Each product shows details like name, category, discount, order type, and stock status.
**Product Status:** Products are marked as “Available” if published or “Unavailable” otherwise. The dashboard displays a summary of active, inactive, and expired products.
**Add Product:** A dedicated form allows users to add new products with essential details, including a default creation date and an image upload.
**View Product:** Users can view product details by querying based on the product’s unique identifier, handled at the server and stored in MongoDB Atlas.
**Edit Product:** Users can update product information based on product name and stock availability, and all fields are editable.
**Delete Product:** Users can delete products with a confirmation prompt based on the product name and stock status.

**Cloud-Based Database**
MongoDB Atlas is chosen for its scalable, cloud-based storage solution, reducing client and server-side workload. This choice allows efficient data storage and retrieval, ensuring a reliable and responsive user experience.



**Technical Overview**
**Backend API:** Built with Express, handling all inventory data CRUD operations.
**Frontend UI:** Designed with React for responsive, interactive elements, and Axios for seamless backend communication.
**Data Security:** Managed with Express sessions, secure cookies, and environmental variables for sensitive configurations.
![home_page](https://github.com/user-attachments/assets/62f48370-a934-49b0-a05b-d8ac8c11666d)

