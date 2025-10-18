# Profile API Endpoint

A RESTful API endpoint that returns profile information with dynamic cat facts fetched from an external API.

## 📋 Table of Contents

- [Requirements Met](#requirements-met)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Testing the Endpoint](#testing-the-endpoint)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

---

## ✅ Requirements Met

This implementation satisfies all acceptance criteria:

1. ✅ Working `GET /me` endpoint returning 200 OK status
2. ✅ Response structure strictly follows defined JSON schema
3. ✅ All required fields present: `status`, `user`, `timestamp`, `fact`
4. ✅ `user` object contains `email`, `name`, and `stack` with valid strings
5. ✅ `timestamp` returns current UTC time in ISO 8601 format
6. ✅ `timestamp` updates dynamically with every request
7. ✅ `fact` contains cat fact from Cat Facts API
8. ✅ New cat fact fetched on every request (no caching)
9. ✅ Response Content-Type header is `application/json`
10. ✅ Well-structured code following best practices
11. ✅ Graceful error handling for external API failures
12. ✅ Appropriate timeout values for external API calls
13. ✅ CORS headers included
14. ✅ Basic logging for debugging
15. ✅ Environment variables for configuration

---

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v4.18.2)
- **HTTP Client**: Axios (v1.6.0)
- **Additional Packages**:
  - `cors` - CORS middleware
  - `dotenv` - Environment variable management
  - `morgan` - HTTP request logger

---

## 📁 Project Structure

```
profile-api-endpoint/
├── src/
│   ├── config/
│   │   └── constants.js          # Configuration constants & user profile
│   ├── services/
│   │   └── catFactService.js     # Cat Facts API integration
│   ├── controllers/
│   │   └── profileController.js  # Request handling logic
│   ├── routes/
│   │   └── profileRoutes.js      # Route definitions
│   └── app.js                     # Express app setup
├── server.js                      # Server entry point
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies & scripts
└── README.md                      # Documentation
```

### Architecture Explanation

**Modular Design Benefits:**
- **config/**: Centralized configuration and constants
- **services/**: External API integration with error handling
- **controllers/**: Business logic separated from routing
- **routes/**: Clean route definitions
- **app.js**: Express setup and middleware configuration
- **server.js**: Server initialization

---

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd profile-api-endpoint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your information:
   ```env
   PORT=3000
   USER_EMAIL=your.email@example.com
   USER_NAME=Your Full Name
   USER_STACK=Node.js/Express
   ```

---

## 🚀 Running Locally

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT).

You should see:
```
✅ Server running on port 3000
📍 Profile endpoint available at: http://localhost:3000/me
```

---

## 📖 API Documentation

### Endpoint: `GET /me`

Returns user profile information with a dynamic cat fact.

**URL**: `/me`  
**Method**: `GET`  
**Auth Required**: No

#### Success Response

**Code**: `200 OK`  
**Content-Type**: `application/json`

**Response Body**:
```json
{
  "status": "success",
  "user": {
    "email": "ibraheem.bello@example.com",
    "name": "Ibraheem Bello",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-17T14:23:45.678Z",
  "fact": "Cats have over 20 vocalizations, including the purr, meow, and chirp."
}
```

#### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always "success" for successful requests |
| `user.email` | string | User's email address |
| `user.name` | string | User's full name |
| `user.stack` | string | Backend technology stack |
| `timestamp` | string | Current UTC time in ISO 8601 format (updates per request) |
| `fact` | string | Random cat fact from Cat Facts API (fetched fresh each request) |

#### Error Handling

If the Cat Facts API is unavailable, the endpoint still returns a 200 OK with a fallback cat fact message instead of failing.

---

## 🧪 Testing the Endpoint

### Using cURL

```bash
curl http://localhost:3000/me
```

### Using HTTPie

```bash
http GET http://localhost:3000/me
```

### Using JavaScript (fetch)

```javascript
fetch('http://localhost:3000/me')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Browser

Simply navigate to: `http://localhost:3000/me`

### Test Verification Checklist

- [ ] Response returns 200 OK status
- [ ] Response Content-Type is `application/json`
- [ ] All required fields are present
- [ ] Timestamp is in ISO 8601 format (e.g., `2025-10-17T14:23:45.678Z`)
- [ ] Timestamp changes with each request
- [ ] Cat fact changes with each request
- [ ] User information matches your configuration

---

## 🌐 Deployment

### Recommended Platforms (Vercel & Render excluded as per requirements)

1. **Railway** (Recommended)
   - Connect GitHub repository
   - Railway auto-detects Node.js
   - Set environment variables in dashboard
   - Deploy automatically on push

2. **Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   heroku config:set USER_EMAIL=your.email@example.com
   heroku config:set USER_NAME="Your Name"
   heroku config:set USER_STACK="Node.js/Express"
   ```

3. **AWS Elastic Beanstalk**
   - Install EB CLI
   - Initialize: `eb init`
   - Deploy: `eb create` then `eb deploy`

4. **PXXL App** (if available)
   - Follow platform-specific deployment instructions

### Post-Deployment Testing

After deployment, test your live endpoint:
```bash
curl https://your-deployed-url.com/me
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory (use `.env.example` as template):

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `USER_EMAIL` | No | ibraheem.bello@example.com | Your email address |
| `USER_NAME` | No | Ibraheem Bello | Your full name |
| `USER_STACK` | No | Node.js/Express | Your backend stack |

**Note**: If environment variables are not set, the application uses default values from `src/config/constants.js`.

---

## 🎯 Key Implementation Features

### 1. Dynamic Data
- **Timestamp**: Generated fresh on every request using `new Date().toISOString()`
- **Cat Fact**: Fetched from external API on every request (no caching)

### 2. Error Handling
- Graceful fallback if Cat Facts API fails
- 5-second timeout for external API calls
- Proper error logging with emojis for easy debugging
- Network error handling

### 3. Best Practices
- ✅ Modular code structure
- ✅ Environment variable configuration
- ✅ CORS enabled
- ✅ Request logging (Morgan)
- ✅ Separation of concerns (MVC pattern)
- ✅ Comprehensive error handling
- ✅ Clean code with comments explaining requirements

### 4. Logging
The application includes console logging for:
- Server startup
- Each `/me` request
- Cat fact API calls
- Errors and warnings

Example output:
```
✅ Server running on port 3000
📋 Processing /me request...
🐱 Fetching cat fact from external API...
✅ Cat fact fetched successfully
✅ Response prepared successfully
```

---

## 📝 Dependencies

All dependencies are listed in `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.2",      // Web framework
    "axios": "^1.6.0",          // HTTP client for external API
    "cors": "^2.8.5",           // CORS middleware
    "dotenv": "^16.3.1",        // Environment variables
    "morgan": "^1.10.0"         // HTTP request logger
  },
  "devDependencies": {
    "nodemon": "^3.0.1"         // Development auto-reload
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Port already in use
```bash
# Solution: Use a different port
PORT=4000 npm start
```

### Issue: Cat Facts API timeout
The application automatically handles this with a fallback message. Check logs for details.

### Issue: Module not found
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

MIT

---

## 👤 Author

**Ibraheem Bello**
- Email: ibraheem.bello@example.com
- Stack: Node.js/Express

---

## 🙏 Acknowledgments

- Cat Facts API: https://catfact.ninja/
- Express.js community
- Node.js ecosystem