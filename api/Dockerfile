FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 8000
WORKDIR /app
COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN mkdir -p /root/db
COPY . .

RUN playwright install-deps 
RUN playwright install chromium


CMD ["python", "app.py"]
