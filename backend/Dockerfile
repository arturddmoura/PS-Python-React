FROM python:3.10.2-bullseye

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]
