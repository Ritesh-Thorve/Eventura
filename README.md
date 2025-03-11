# 🎉 Eventura - Event Management Platform

Eventura is a full-stack event management platform where users can explore and book various venues like hotels, banquet halls, gardens, and more for their special occasions. It provides a seamless booking experience and a powerful admin dashboard for venue management and booking approval.

---

## 🌟 Features

### 🧑‍💼 User Side
- Browse venue listings with details and images.
- Book a venue by filling out a simple form.
- Contact admins via email or mobile number.

### 🔐 Admin Side
- Secure admin login and authentication.
- View all user bookings in a dashboard.
- Accept or reject booking requests.
- Register and manage venues.
- Read and manage contact messages.
- Send emails to users directly from the dashboard.
- Delete bookings or messages.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TailwindCSS
- Framer Motion
- Lucide Icons
- Axios

### Backend
- Node.js
- Express.js (CommonJS)
- MongoDB + Mongoose
- Nodemailer
- JWT Authentication
- CORS

---

## 🗂️ Project Structure

### Backend (`/backend`)
```
/controllers     → Route logic (bookings, venues, admin, auth)
/routes          → Express route definitions
/models          → MongoDB models (User, Booking, Venue, Admin)
/utils           → Helper functions (email, JWT)
/config          → MongoDB & other configurations
server.js        → App entry point
```

### Frontend (`/frontend`)
```
/components      → Reusable UI components
/pages           → Main routes (Home, Venues, Booking, Admin)
/context         → API context & state management
/assets          → Images, icons
App.jsx          → App routing
main.jsx         → App entry point
```

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Ritesh-Thorve/Eventura.git
cd eventura
```

### 2. Backend Setup
```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with the following:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret 
```

- Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

- The frontend runs at `http://localhost:5173`
- The backend runs at `http://localhost:8000`

---

## 🔐 Admin Login

To access the admin dashboard:
1. Register as an admin (one-time).
2. Login with your credentials.
3. Access `/admin/dashboard` for full admin features like booking approvals, venue registration, and user communication.

---

## 🧪 Testing

- Test all APIs using Postman or any REST client.
- Ensure MongoDB is running locally or on a cloud provider like Atlas.
- Check console logs for server or client errors.
- Email sending can be tested using services like Gmail (with app password).

---

## 📩 Contact & Feedback

For any issues or feedback:
- Use the Contact form on the frontend.
- Submit an issue on GitHub. 

---

## 🚀 Future Features

- 💳 Payment gateway integration (e.g., Stripe or Razorpay)
- 👤 User profiles and booking history
- 📊 Admin analytics dashboard

---

## 🙌 Contributing

Contributions are welcome!
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 🙋‍♂️ Author

Developed by Ritesh Thorve.

GitHub: https://github.com/Ritesh-Thorve

Feel free to reach out and connect!

---

