# Use an official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy backend files
COPY backend/ backend/

# Copy frontend files
COPY frontend/ frontend/

# Install dependencies
RUN pip install pymupdf flask

# Expose port for Flask server (if needed)
EXPOSE 5000

# Run the backend script (adjust this if you later add a Flask server)
CMD ["python", "backend/extract_outline.py"]
