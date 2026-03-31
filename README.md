# Web Automation

A practical automation testing suite built with Selenium WebDriver and JavaScript. This project focuses on automating real user workflows using the Sauce Labs demo site.

---

## About This Project

This repository contains a set of automated test scripts that interact with a web application in a realistic way. It’s designed as a hands-on reference for learning browser automation and building a basic QA testing workflow.

The scripts cover common scenarios such as user authentication, product browsing, filtering, and completing a purchase — all handled programmatically.

---

## What's Inside

### login_test.js
Covers authentication flows.  
Includes validation for error handling, such as attempting to log in with a locked or inactive account.

### filter.js
Simulates a shopping session.  
Handles product sorting, adding items to the cart, and completing a purchase with proper wait conditions.

### order.js
A full end-to-end checkout scenario.  
Logs in, adds multiple items, and completes the checkout process while validating key steps.

---

## Tech Stack

- Language: JavaScript  
- Automation Framework: Selenium WebDriver (v4.25.0)  
- Browser: Chrome  
- Runtime: Node.js  

---

## Getting Started

Install dependencies:

```bash
npm install
