FROM python:3.10-slim

WORKDIR /app

# Copy the requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port 8080 for Cloud Run
EXPOSE 8080

CMD ["python", "manage.py", "migrate"]
# Run the Django app using gunicorn, binding it to port 8080

CMD ["gunicorn", "contacts_app.wsgi:application", "--bind", "0.0.0.0:8080"]
