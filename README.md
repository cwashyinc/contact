# Contacts Application

A full-stack contacts management system built with Django REST Framework (backend) and React (frontend).
Frontend is hosted on Firebase on (https://contact-web-app202502.web.app/)

![alt text](https://github.com/cwashyinc/contact-priv/blob/main/frontend/screenshot.png)

## Features

- **Frontend (React)**

  - List all contacts with search functionality
  - Add new contacts
  - View existing contacts
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

### Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run migrations

```bash
python manage.py migrate
```

### Create superuser

```bash
python manage.py createsuperuser
```

---

### **Testing**

#### **Running Tests**

To run the test suite, use the following command:

```bash
python manage.py test
```

#### **Test Coverage**

To check test coverage:

```bash
# Install coverage
pip install coverage

# Run tests with coverage
coverage run manage.py test

# Generate coverage report
coverage report

# Generate HTML report
coverage html
```

---

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

   - API Docs: http://localhost:8000/api/docs/
   - Admin: http://localhost:8000/admin/

2. **Frontend**: http://localhost:3000

## API Endpoints

| Method | URL                 | Description        | Body                   |
| ------ | ------------------- | ------------------ | ---------------------- |
| GET    | /api/contacts/      | List all contacts  | none                   |
| POST   | /api/contacts/      | Create new contact | {name, address, phone} |
| GET    | /api/contacts/{id}/ | Get single contact | none                   |
| PUT    | /api/contacts/{id}/ | Update contact     | {name, address, phone} |
| DELETE | /api/contacts/{id}/ | Delete contact     | none                   |

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
# settings_production.py
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
#backend/.env
DEBUG=False
SECRET_KEY='your-secret-key'
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com,etc.
DB_NAME=your-db-name

CORS_ALLOWED_ORIGINS=yourdomain.com

PROD_DB_NAME=your-db-name
PROD_DB_USER=your-db-user
PROD_DB_PASSWORD=your-db-password
PROD_DB_HOST='/cloudsql/your-project-id:your-region:your-db-name'
PROD_DB_PORT=your-db-port
```

#### Generate static files

```bash
python manage.py collectstatic --noinput
```

### 3. Recommended Deployment Platforms

- **Backend**: PythonAnywhere, Heroku, AWS Elastic Beanstalk, GCP
- **Frontend**: Vercel, Netlify, or serve through Django


### **Deployment on Google Cloud Platform (GCP)**

---

### **1. Prerequisites**

- A GCP account with billing enabled.
- Google Cloud SDK installed ([Installation Guide](https://cloud.google.com/sdk/docs/install)).
- Docker installed (for containerizing the Django backend).

---

### **2. Backend (Django) Deployment**

#### **Step 1: Set Up Cloud SQL**

1. Create a PostgreSQL instance:
   ```bash
   gcloud sql instances create contacts-db \
       --database-version=POSTGRES_13 \
       --tier=db-f1-micro \
       --region=europe-west2
   ```
2. Create a database and user:

   ```bash
   gcloud sql databases create contacts --instance=your-db-name
   gcloud sql users create your-db-user --instance=your-db-name --password=your-db-password
   ```

3. Update `settings_production.py` with Cloud SQL credentials:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'your-db-name',
           'USER': 'your-db-user',
           'PASSWORD': 'your-db-password',
           'HOST': '/cloudsql/your-project-id:your-region:your-db-name',
           'PORT': 'your-db-port',
       }
   }
   ```

#### **Step 2: Containerize the Django App**

1. Create a `Dockerfile` in the `backend` directory:

   ```dockerfile
   FROM python:3.8-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["python", "manage.py", "migrate"]
   CMD gunicorn contacts_app.wsgi:application --bind 0.0.0.0:8000
   ```

2. Build the Docker image:

   ```bash
   docker build -t gcr.io/your-project-id/contacts-backend .
   ```

3. Push the image to Google Container Registry (GCR):
   ```bash
   docker push gcr.io/your-project-id/contacts-backend
   ```

#### **Step 3: Deploy to Cloud Run**

1. Deploy the container:

   ```bash
   gcloud run deploy contacts-backend \
    --image gcr.io/your-project-id/contacts-backend \
    --platform managed \
    --region [YOUR-REGION] \
    --allow-unauthenticated
   ```

2. Set environment variables:
   ```bash
   gcloud run services update contacts-backend \
      --set-env-vars "DJANGO_SETTINGS_MODULE=contacts_app.settings_production" \
      --set-env-vars "SECRET_KEY='[YOUR-SECRET-KEY]'" \
      --set-env-vars "DEBUG=False" \
      --set-env-vars "PROD_DB_PASSWORD=[YOUR-DB-PASSWORD]" \
      --set-env-vars "CORS_ALLOWED_ORIGINS=[YOUR-ALLOWED-ORIGINS]" \
      --set-env-vars "PROD_DB_HOST='/cloudsql/[YOUR-PROJECT-ID]:[REGION]:[DB-NAME]'" \
      --set-env-vars "PROD_DB_PORT=[YOUR-DB-PORT (e.g. 5432)]" \
      --set-env-vars "PROD_DB_NAME=[YOUR-DB-NAME]" \
      --set-env-vars "PROD_DB_USER=[YOUR-DB-USER]"
   ```

---

### **3. Frontend (React) Deployment**

#### **Step 1: Build the React App**

1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

#### **Step 2: Deploy to Firebase Hosting**

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:

   ```bash
   firebase init
   ```

   - Select **Hosting**.
   - Choose your Firebase project.
   - Set the public directory to `build`.

3. Deploy:
   ```bash
   firebase deploy
   ```

---

### **4. Configure Environment Variables**


#### **Frontend**

Use `.env.production` for React:

```env
REACT_APP_API_BASE_URL=https://your-cloud-run-url.com/api
```

---


### **5. Access the Application**

- **Backend API**: `https://your-cloud-run-url.com/api`
- **Frontend**: `https://your-firebase-url.com`


## License

Distributed under the MIT License. See `LICENSE` for more information.
