FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 8000
WORKDIR /app
COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN mkdir -p /root/db
COPY . .


# Adding trusting keys to apt for repositories
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# Adding Google Chrome to the repositories
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Updating apt to see and install Google Chrome
RUN apt-get -y update

# Magic happens
RUN apt-get install -y google-chrome-stable

# Driver
# Installing Unzip
RUN apt-get install -yqq unzip curl

# Download the Chrome Driver
RUN wget -O /tmp/chromedriver.zip https://storage.googleapis.com/chrome-for-testing-public/`curl -s "https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE"`/linux64/chromedriver-linux64.zip

# Unzip the Chrome Driver into /usr/local/bin directory
RUN unzip -j /tmp/chromedriver.zip chromedriver-linux64/chromedriver -d /usr/local/bin/

# Set display port as an environment variable
ENV DISPLAY=:99

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
