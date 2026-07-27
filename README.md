# 🎯 EAMCET College Predictor

A full-stack web app that predicts probable engineering colleges based on a student's EAMCET rank, category, gender, and branch preference — across all three counseling phases.

**Live Demo:** https://eamcet-college-predictor-chi.vercel.app/

---

## ✨ Features

- **Personalized Predictions** — rank, category, gender, and branch → phase-wise college list
- **Phase-Wise Results** — First, Second, and Final counseling phases returned together
- **Adaptive Buffer Logic** — expands the rank window (in retry steps) when too few colleges match, so edge-case ranks still get useful results
- **Input Validation & Whitelisting** — rank, category, and branch inputs are validated server-side; category field is checked against an allowed list before being used in a query, preventing arbitrary-field injection
- **Rate Limiting** — `/api/predict-colleges` is throttled per IP (`express-rate-limit`) to prevent abuse and excessive DB load
- **Pooled DB Connections** — a single `MongoClient` connects once at startup and is reused across all requests, instead of opening/closing a connection per request

---

## 🛠️ Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| **Frontend**  | React, CSS3, JavaScript                          |
| **Backend**   | Node.js, Express.js                              |
| **Database**  | MongoDB (MongoDB Atlas), native `mongodb` driver |
| **Middleware**| `cors`, `dotenv`, `express-rate-limit`           |
| **Deployment**| Vercel                                           |

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js
- MongoDB instance (local or Atlas)

### Setup

```bash
git clone https://github.com/Saikiran-Sugurthi/Eamcet-College-Predictor.git
cd Eamcet-College-Predictor
npm install
```

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
DB_NAME=Eamcet_Cleaned_data
```

Run:

```bash
npm start
```

Server runs on `http://localhost:5000`.

---

## 📡 API

**POST** `/api/predict-colleges`

```json
{
  "rank": 12000,
  "categoryGender": "OC_BOYS",
  "branchName": "CSE"
}
```

Returns predicted colleges grouped by `First_Phase`, `Second_Phase`, and `Final_Phase`.

---

## 🙌 Feedback

Open an issue or connect if you'd like to collaborate or suggest improvements.