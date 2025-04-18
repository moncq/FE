# Moncq Frontend

This is the **Moncq** web application frontend built with [Next.js](https://nextjs.org), bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🔧 Technical Stack

- **Frameworks**: Next.js, React
- **Languages**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

---

## 🎨 Figma Design

Figma URL: [Figma Design](https://www.figma.com/proto/c4u9pwbdoiv7g3Di6OYMF5/Moncq-design?node-id=0-1&t=reJhuEGPKkBajqKr-1)

---

## 🚀 Deployed URL

Frontend is deployed and accessible here: [Moncq Live Site](https://your-deployment-url.com)

---

## 🏗️ Architecture Diagram

The system architecture consists of:

- **Frontend (React & Next.js)**  
- **Backend (Node.js/Express)**  
- **Database (PostgreSQL)**  

All three components are containerized via **Docker Compose** and deployed on an **AWS EC2 instance**.

---

## 🖥️ Running Locally

If you'd like to run the frontend on your local machine, follow the steps below:

### 📊 Architecture (Local)

```text
Browser (Frontend running locally on port 3000 or 3001)
      |
      |──► API requests to Backend server hosted on EC2
                             |
                             └──► Backend (Docker on EC2)
                                         |
                                         └──► PostgreSQL DB (Docker on EC2)
```
### ⚙️ Setup Instructions
Ensure .env.local is properly configured

📝 Make sure your .env.local file is pointing to the correct EC2 backend URL (e.g. https://your-ec2-domain/api).

### Install dependencies
```bash
npm install
```
### Start the development server
```bash
npm run dev
```
### Login Credentials
🔐 Use the provided username and password found in the attached PDF file to log in to the system.

### 🧑‍💻 About
- **Email**: thienvo0211@gmail.com
- **Linkedin**: https://www.linkedin.com/in/sky-thien-vo
