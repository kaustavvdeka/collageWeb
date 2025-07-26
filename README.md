# College Portal - Full Stack Web Application

A comprehensive college management system built with React (frontend) and Node.js/Express (backend) using MongoDB as the database and Tailwind CSS for styling.

## Features

### 🎓 Student Features
- **User Authentication**: Secure login/signup system
- **Admission Portal**: Apply for admission with document upload
- **Course Catalog**: Browse available courses and programs
- **Notifications**: View college announcements and notices
- **Results**: Check academic results and grades
- **Responsive Design**: Works on desktop and mobile devices

### 👨‍💼 Admin Features
- **Admin Dashboard**: Comprehensive management interface
- **Admission Management**: Review and approve/reject applications
- **Notice Management**: Create, edit, and manage notifications
- **Result Management**: Upload and manage student results
- **Course Management**: Add, edit, and manage courses
- **User Management**: Manage student accounts

### 🏛️ College Information
- **Home Page**: Beautiful landing page with college information
- **Faculty Information**: Display faculty members and staff
- **Location Details**: Campus location and contact information
- **Course Subjects**: Detailed course and subject information

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Context API**: State management

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## Project Structure

```
college-portal/
├── backend/
│   ├── controllers/
│   │   ├── admissionController.js
│   │   ├── courseController.js
│   │   ├── noticeController.js
│   │   ├── resultController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminAuth.js
│   ├── models/
│   │   ├── Admission.js
│   │   ├── Course.js
│   │   ├── Notice.js
│   │   ├── Result.js
│   │   └── Student.js
│   ├── routes/
│   │   ├── admissionRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── noticeRoutes.js
│   │   ├── resultRoutes.js
│   │   └── studentRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout/
│   │   │       ├── Navbar.js
│   │   │       └── Footer.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Admission.js
│   │   │   ├── Courses.js
│   │   │   ├── Notifications.js
│   │   │   ├── Results.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/college
   JWT_SECRET=college-secret-key-2024
   ```

4. **Start the backend server**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration (Optional)**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

### Database Setup

1. **MongoDB Installation**
   - Install MongoDB locally or use MongoDB Atlas (cloud)
   - Create a database named `college`

2. **Initial Data (Optional)**
   - The application will create collections automatically
   - You can create an admin user through the signup page and manually set `isAdmin: true` in the database

## API Endpoints

### Authentication
- `POST /api/students/register` - User registration
- `POST /api/students/login` - User login
- `GET /api/students/dashboard` - Get user dashboard (protected)

### Admissions
- `POST /api/admissions/submit` - Submit admission application
- `GET /api/admissions` - Get all applications (admin only)
- `GET /api/admissions/:id` - Get application by ID (admin only)
- `PUT /api/admissions/:id/status` - Update application status (admin only)
- `GET /api/admissions/application/:applicationNumber` - Get application by number

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Notices
- `GET /api/notices` - Get all notices
- `GET /api/notices/:id` - Get notice by ID
- `POST /api/notices` - Create notice (admin only)
- `PUT /api/notices/:id` - Update notice (admin only)
- `DELETE /api/notices/:id` - Delete notice (admin only)

### Results
- `GET /api/results/student/:studentId` - Get results by student ID
- `GET /api/results` - Get all results (admin only)
- `POST /api/results` - Create result (admin only)
- `PUT /api/results/:id` - Update result (admin only)
- `DELETE /api/results/:id` - Delete result (admin only)

## Usage

### For Students
1. **Registration**: Create an account using the signup page
2. **Login**: Access your account through the login page
3. **Apply for Admission**: Fill out the admission form with required documents
4. **View Courses**: Browse available courses and programs
5. **Check Notifications**: Stay updated with college announcements
6. **View Results**: Check your academic performance

### For Administrators
1. **Admin Access**: Login with admin credentials (set `isAdmin: true` in database)
2. **Manage Admissions**: Review and process admission applications
3. **Manage Notices**: Create and manage college notifications
4. **Manage Results**: Upload and manage student results
5. **Manage Courses**: Add, edit, and manage course offerings

## Features in Detail

### Authentication System
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Student/Admin)
- Protected routes and middleware

### File Upload System
- Support for multiple file types (PDF, JPG, PNG)
- File size limitations (5MB per file)
- Secure file storage in uploads directory
- File validation and error handling

### Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Responsive navigation and layouts
- Optimized for various screen sizes

### Error Handling
- Comprehensive error handling on both frontend and backend
- User-friendly error messages
- Validation for forms and file uploads
- Loading states and feedback

## Development

### Adding New Features
1. **Backend**: Add routes, controllers, and models as needed
2. **Frontend**: Create new components and pages
3. **Database**: Update schemas and add new collections
4. **Testing**: Test both API endpoints and UI components

### Code Structure
- Follow MVC pattern for backend
- Use functional components with hooks for frontend
- Implement proper error handling and validation
- Maintain consistent code formatting

## Deployment

### Backend Deployment
1. Set up production MongoDB database
2. Configure environment variables
3. Deploy to platforms like Heroku, DigitalOcean, or AWS
4. Set up proper CORS and security headers

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Configure API endpoints for production
4. Set up proper routing for SPA

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact:
- Email: support@excellencecollege.edu
- Phone: (555) 123-4567

## Demo Credentials

For testing purposes, you can create accounts with the following pattern:
- **Student**: Any email with password (minimum 6 characters)
- **Admin**: Create an account and manually set `isAdmin: true` in the database

---

**Note**: This is a demonstration project. For production use, implement additional security measures, proper error logging, and comprehensive testing.