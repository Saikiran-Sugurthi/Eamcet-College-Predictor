# 🎯 EAMCET College Predictor

A web application designed for EAMCET aspirants to predict potential colleges based on their rank, category, and branch preference. This project transforms raw counseling data into a clean, user-friendly tool that provides realistic college predictions across all three counseling phases.

This project was a deep dive into the real-world challenges of a developer—from complex data wrangling and database optimization to robust server-side logic and debugging.



## 🚀 Live Demo

**Check out the live application here: https://eamcet-college-predictor-chi.vercel.app/**

---

## ✨ Key Features

* **Personalized Predictions:** Enter your rank, category (caste), gender, and desired branch to receive a tailored list of probable colleges.
* **Phase-Wise Results:** View separate predictions for the First, Second, and Final counseling phases.
* **Adaptive Buffer Logic:** An intelligent algorithm that provides fair and realistic results, even when historical data for a specific rank is limited.
* **Responsive UI:** A clean and simple interface that works seamlessly on both desktop and mobile devices.
* **Dynamic Filtering:** The backend handles complex combinations of category and gender to deliver accurate results.

---

## 🛠️ Tech Stack

| Category          | Technology / Tool                                         |
| ----------------- | --------------------------------------------------------- |
| **Frontend** | `HTML5`, `CSS3`, `JavaScript`                             |
| **Backend** | `Node.js`, `Express.js`                                   |
| **Database** | `MongoDB` (Managed with `MongoDB Atlas` & `MongoDB Compass`) |
| **Tooling** | `Thunder Client` (API Testing), `dotenv`, `CORS`, `Nodemon` |
| **Data Handling** | `CSV/Excel Parsing`, `JSON`                               |

---

## 💥 The Journey: Challenges & Learnings

> “This project made me understand the real struggles of a developer.”

This wasn't just about writing code; it was about problem-solving at every level. Here are some of the key challenges I tackled:

* **📊 Data Transformation:** The biggest hurdle was converting massive, cluttered Excel sheets of rank data into a structured, queryable JSON format suitable for MongoDB.
* **🧠 Intelligent Querying:** I developed adaptive buffer logic to ensure students with ranks at the edge of data cutoffs would still receive a fair and useful list of colleges.
* **🚦 Dynamic Logic:** Created a robust backend capable of handling numerous category and gender combinations without hardcoding every possibility.
* **🌍 Secure Deployment:** Configured a secure remote connection to a MongoDB Atlas cluster, managing environment variables and access controls properly.
* **🐞 Real-Time Debugging:** Solved a variety of real-world issues, including CORS errors between the client and server, API 404s, server crashes, and other client-server mismatches.

My key takeaway is that building a functional application is a battle on multiple fronts. It's about **understanding the data's soul**, designing with **edge cases in mind**, and **debugging like a detective**.

---

## ⚙️ Getting Started Locally

To run this project on your local machine, follow these steps:

### Prerequisites

* Node.js installed
* NPM or Yarn installed
* MongoDB instance (local or a free Atlas cluster)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Saikiran-Sugurthi/Eamcet-College-Predictor.git](https://github.com/Saikiran-Sugurthi/Eamcet-College-Predictor.git)
    cd Eamcet-College-Predictor
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the values with your own.
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Run the server:**
    To run the server in development mode with auto-reloading:
    ```sh
    npm run dev
    ```
    To run in production mode:
    ```sh
    npm start
    ```

The server should now be running on `http://localhost:3000`.

---

## 🙌 Feedback & Collaboration

I'd love to hear your feedback or suggestions! If you're working on similar tools or have ideas for collaboration, feel free to connect with me or open an issue in this repository.

---

