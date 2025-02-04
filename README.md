
# Contacts Application

A full-stack contacts management system built with Django REST Framework (backend) and React (frontend).

![alt text](https://github.com/cwashyinc/contact-priv/blob/main/frontend/screenshot.png)


## Features

- **Frontend (React)**
  - List all contacts with search functionality
  - Add new contacts
  - Edit existing contacts
  - Delete contacts with confirmation
  - Responsive design with Bootstrap

- **Backend (Django)**
  - REST API endpoints
  - Admin interface for managing contacts
  - SQLite database (default)
  - CORS support for development

## Tech Stack

**Frontend**
- React 19
- React Router 7
- Axios for API calls
- Bootstrap 5 for styling
- Flatlist-react for rendering the list of contacts
- React-icons for icons
- React-lottie for animations

**Backend**
- Django 5
- Django REST Framework
- SQLite (development)

## Prerequisites

- Node.js 18+
- Python 3.11+
- pip 23+
- npm 9+

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/cwashyinc/contact.git
cd contact
```

### 2. Set Up Backend
```bash
cd backend
```

# Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

# Install dependencies
```bash
pip install -r requirements.txt
```

# Run migrations
```bash
python manage.py migrate
```

# Create superuser
```bash
python manage.py createsuperuser
```

# Run development server
```bash
python manage.py runserver
```

### 3. Set Up Frontend
```bash
cd ../frontend  
```

# Install dependencies
```bash
npm install
```

# Start development server
```bash
npm start
```

## Running the Application

1. **Backend**: http://localhost:8000
   - API Docs: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/

2. **Frontend**: http://localhost:3000

## API Endpoints

| Method | URL                  | Description               |
|--------|----------------------|---------------------------|
| GET    | /api/contacts/       | List all contacts         |
| POST   | /api/contacts/       | Create new contact        |
| GET    | /api/contacts/{id}/  | Get single contact        |
| PUT    | /api/contacts/{id}/  | Update contact            |
| DELETE | /api/contacts/{id}/  | Delete contact            |

## Environment Variables

**Backend** (create `.env` in backend directory)
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend** (create `.env` in frontend directory)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Deployment

### 1. Build React App
```bash
cd frontend
npm run build
```

### 2. Configure Django for Production
```python
# settings.py
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'frontend/build/static']
#backend/.env
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
```

### 3. Recommended Deployment Platforms
- **Backend**: PythonAnywhere, Heroku, AWS Elastic Beanstalk
- **Frontend**: Vercel, Netlify, or serve through Django

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Similoluwa Odeyemi - similoluwaodeyemi@gmail.com

Project Link: [https://github.com/cwashyinc/contact](https://github.com/cwashyinc/contact)

