# MERN Stack Inventory Management System

This project is a comprehensive inventory management system developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to create, view, update, and delete product records, providing an efficient and user-friendly interface to manage an inventory database. MongoDB Atlas is utilized for cloud-based data storage, which enhances scalability and reduces server-side workload.
<br><br>
**Project Structure** <br>
**Frontend:** Built with React.js, providing a responsive, dynamic interface for users to interact with inventory data. React Router handles routing, enabling seamless navigation between pages.
**Backend:** Powered by Node.js and Express.js, managing API endpoints for all CRUD operations. The server interacts with MongoDB Atlas via Mongoose, a popular ORM for MongoDB, to handle data persistence and schema validation.
**Database:** MongoDB Atlas stores product data with a schema managed by Mongoose. Data is structured efficiently to support fast queries and facilitate scalability.
Modules and Dependencies

<br><br>
**Backend**<br>
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


<br><br>
To Start Backend-End: run below command.
	nodemon server.js

<br><br>
**Frontend**<br>
**React:** Library for building the user interface.
**React-DOM:** Serves as the entry point to the DOM and server renderers for React.
**React-Router-DOM:** Manages routing within the React application.
**Axios:** Used for HTTP requests to the backend API.
**Babel Plugins:** Configures ECMAScript features, enabling compatibility and modern syntax.

<br><br>
To Start Front-End run below command.
	npm start


**Workflow and Features**<br>
**Product Management:** Upon login, users can view a list of available products in the inventory. Each product shows details like name, category, discount, order type, and stock status.
**Product Status:** Products are marked as “Available” if published or “Unavailable” otherwise. The dashboard displays a summary of active, inactive, and expired products.
**Add Product:** A dedicated form allows users to add new products with essential details, including a default creation date and an image upload.
**View Product:** Users can view product details by querying based on the product’s unique identifier, handled at the server and stored in MongoDB Atlas.
**Edit Product:** Users can update product information based on product name and stock availability, and all fields are editable.
**Delete Product:** Users can delete products with a confirmation prompt based on the product name and stock status.
<br><br>
**Cloud-Based Database**<br>
MongoDB Atlas is chosen for its scalable, cloud-based storage solution, reducing client and server-side workload. This choice allows efficient data storage and retrieval, ensuring a reliable and responsive user experience.


<br><br>
**Technical Overview**<br>
**Backend API:** Built with Express, handling all inventory data CRUD operations.
**Frontend UI:** Designed with React for responsive, interactive elements, and Axios for seamless backend communication.
**Data Security:** Managed with Express sessions, secure cookies, and environmental variables for sensitive configurations.<br>
**Home Page(Upon Login):**<br>
![home_page](https://github.com/user-attachments/assets/62f48370-a934-49b0-a05b-d8ac8c11666d)
<br><br>
**Viewing the Inventory Items:**<br>
![view_inventory](https://github.com/user-attachments/assets/83bb74fc-fa4b-496e-a896-3e5412f2015e)
<br><br>
**New Inventory Form:**<br>
![new_inventory](https://github.com/user-attachments/assets/5c78229a-1e30-487c-addb-38531f242e11)
<br>
**Picture of Inventory Product:**<br>
![iphone_pic_new_inventory](https://github.com/user-attachments/assets/2f960e0a-bd9d-47ab-b6ad-b8a3040d4bc4)
<br><br>
**Inventory Created Successfully:**<br>
![product_add](https://github.com/user-attachments/assets/87a96e1e-f91e-4284-ad81-ed4069fda298)
<br><br>
**Deleting the Inventory Product Successfully- Do ask regarding the Confrimation of Deletion:**<br>
![delete_warning](https://github.com/user-attachments/assets/2083fda4-5f51-4cf5-ab5f-02ce0a1b77d0)<br>
![deleted_successfully](https://github.com/user-attachments/assets/f4c60b8b-1f33-497c-8881-c5c298625db4)<br><br>
**In Case of PRoduct Not Found:**<br>
![delete_product_not_found](https://github.com/user-attachments/assets/c87763bb-7c68-4bfe-9cd1-b73713f3473d)<br>
**Updating the Product:**<br>
![Updae_confirmation](https://github.com/user-attachments/assets/df0c2459-0031-437b-bfba-11d1b62147cb)<br>
![Update_product](https://github.com/user-attachments/assets/d74e4a97-e871-4127-b385-060a7ce42218)

<br><br>
This MERN stack-based inventory management system combines React and Node.js to deliver a responsive, cloud-backed solution for efficient inventory control. MongoDB Atlas ensures scalability, and robust user session management enables secure data handling and access control.




