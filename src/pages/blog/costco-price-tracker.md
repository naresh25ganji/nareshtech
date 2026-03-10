# 🛒 Costco Price Tracker

A Python-based web scraper that monitors Costco product prices, stores historical data in Google Sheets, and sends alerts when prices change.

---

## Overview

This project automatically scrapes product prices from Costco's website on a set schedule and logs them to a Google Sheet. Over time, it builds a price history that lets you spot trends, compare prices across dates, and get notified when a price drops (or spikes).

---

## Features

- 🔍 **Web scraping** — Pulls live prices from Costco.com using `requests` + `BeautifulSoup`
- 📊 **Google Sheets storage** — Logs each price check with a timestamp to a connected spreadsheet
- 📈 **Price history** — Tracks how prices change over time per product
- 🔔 **Price alerts** — Notifies you when a price drops below a threshold
- 📉 **Price comparison** — Compare current vs. historical prices across tracked items

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Python 3.x | Core language |
| `requests` | HTTP requests to Costco.com |
| `BeautifulSoup4` | HTML parsing / price extraction |
| `gspread` | Google Sheets API wrapper |
| `google-auth` | Google service account authentication |
| `smtplib` / email | Price alert notifications |

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourname/costco-price-tracker.git
cd costco-price-tracker
```

### 2. Install dependencies

```bash
pip install requests beautifulsoup4 gspread google-auth
```

### 3. Set up Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and enable the **Google Sheets API** and **Google Drive API**
3. Create a **Service Account** and download the JSON credentials file
4. Share your Google Sheet with the service account email (as Editor)
5. Save the credentials file as `credentials.json` in the project root

### 4. Configure your products

Edit `config.py` to add the Costco product URLs and alert thresholds you want to track:

```python
PRODUCTS = [
    {
        "name": "Kirkland Olive Oil 2L",
        "url": "https://www.costco.com/...",
        "alert_below": 15.00
    },
    {
        "name": "Organic Whole Milk 3-pack",
        "url": "https://www.costco.com/...",
        "alert_below": 10.00
    }
]

SHEET_NAME = "Costco Price Tracker"
ALERT_EMAIL = "you@example.com"
```

---

## How It Works

### Scraping prices

```python
import requests
from bs4 import BeautifulSoup

def get_price(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    price_tag = soup.find("div", {"class": "price"})  # update selector as needed
    if price_tag:
        price_text = price_tag.get_text(strip=True).replace("$", "").replace(",", "")
        return float(price_text)
    return None
```

### Logging to Google Sheets

```python
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime

SCOPES = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

def log_price(sheet_name, product_name, price):
    creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
    client = gspread.authorize(creds)
    sheet = client.open(sheet_name).sheet1

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    sheet.append_row([timestamp, product_name, price])
    print(f"Logged: {product_name} — ${price} at {timestamp}")
```

### Sending price alerts

```python
import smtplib
from email.mime.text import MIMEText

def send_alert(product_name, price, threshold, recipient):
    subject = f"💰 Price Drop: {product_name}"
    body = f"{product_name} is now ${price:.2f} (your alert was set at ${threshold:.2f})"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = "your_email@gmail.com"
    msg["To"] = recipient

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login("your_email@gmail.com", "your_app_password")
        server.send_message(msg)
    print(f"Alert sent for {product_name}")
```

### Main runner

```python
from config import PRODUCTS, SHEET_NAME, ALERT_EMAIL

for product in PRODUCTS:
    price = get_price(product["url"])
    if price:
        log_price(SHEET_NAME, product["name"], price)
        if price < product["alert_below"]:
            send_alert(product["name"], price, product["alert_below"], ALERT_EMAIL)
```

---

## Automating with Cron

To run the tracker automatically (e.g. every morning at 8am):

```bash
crontab -e
```

Add this line:

```
0 8 * * * /usr/bin/python3 /path/to/costco-price-tracker/main.py
```

---

## Google Sheet Structure

| Timestamp | Product Name | Price |
|---|---|---|
| 2026-03-01 08:00 | Kirkland Olive Oil 2L | 14.99 |
| 2026-03-02 08:00 | Kirkland Olive Oil 2L | 13.49 |
| 2026-03-02 08:00 | Organic Whole Milk 3-pack | 9.79 |

---

## Notes

- Costco's website structure may change over time — update CSS selectors in the scraper if prices stop being detected
- Use a Gmail **App Password** (not your regular password) for email alerts
- Be mindful of scraping frequency — don't hammer the site; once or twice a day is plenty
