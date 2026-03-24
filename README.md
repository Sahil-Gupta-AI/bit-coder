# QuoteCraft: AI-Powered Quotation & Proposal Generator

QuoteCraft is a full-stack, AI-driven platform that allows professionals, agencies, and freelancers to instantly generate beautiful, multi-page Quotations and Proposals. It replaces tedious manual document creation by leveraging the **Gemini 2.5 Pro API** to write tailored "Scope of Work", "Executive Summary", and "Introduction" sections dynamically based on your client needs.

## 🚀 Features

- **AI Content Generation:** Uses Gemini AI to intelligently write structured proposals and dynamic quotation terms based on bare-minimum client inputs.
- **Dynamic PDF Rendering:** Automatically paginates extremely long documents across multiple A4 canvases mathematically, maintaining perfect resolution and sticky headers on every page.
- **True Cloud Syncing:** After auto-downloading your PDF locally, QuoteCraft perfectly syncs the raw PDF into your **Cloudinary** cloud storage and saves the text schema directly into **MongoDB**.
- **Secure Authentication:** JWT-driven login and signup flow with protected front-end routes mapping uniquely to each user's generated documents.
- **Premium UI / Dark Mode:** Custom-built via Shadcn UI and Tailwind CSS. Features deeply customized "OLED Space" dark mode settings and neon-glowing interactive styling.
- **Dashboard & File Management:** Instantly retrieve, preview, or re-download your entire history of generated Proposals and Quotations in a unified interface.

## 🛠️ Technology Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn UI, Next-Themes, Radix UI.
- **PDF Engine:** jsPDF, html2canvas, pdfjs-dist.
- **Backend:** Node.js, Express.js.
- **Database / Cloud:** MongoDB (Mongoose), Cloudinary.
- **Authentication:** JSON Web Tokens (JWT), bcryptjs.
- **AI Integration:** Google Gemini API.

## 📦 How It Works

### 1. Generating a Proposal or Quotation
Users select a template (e.g., "Mobile App Development" or "IT Services"). They fill in a few targeted dynamic fields (like Client Name, Budget, and Project Goals). Clicking "Generate AI Content" ping-pongs the data to the backend Gemini controller which writes the technical boilerplate perfectly in seconds.

### 2. Multi-Page Slicing & Export
Users can select custom hex-color themes and upload custom Company Letterheads (via an integrated interactive crop tool). When downloading, `html2canvas` screenshots the DOM, and `jsPDF` calculates the mathematical height. If the document exceeds standard A4 paper length, it dynamically adds new PDF pages, shifts the Y-axis coordinates, and stamps the custom letterhead on every single page before downloading instantly to the user's hard drive.

### 3. Background Persistence
Within milliseconds of the local PDF successfully downloading, the frontend converts the JS Blob into a `multipart/form-data` package and silently POSTs it to the Express Backend, which pipes it into Cloudinary. The absolute secure URL returned from Cloudinary is merged into the user's document data and officially committed into their MongoDB profile.

## 💻 Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Sahil-Gupta-AI/bit-coder.git
```

2. **Configure your Environment (`backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

3. **Install Dependencies & Run:**
You need to operate both servers concurrently.
```bash
# Terminal 1 - Launch the Database API
cd backend
npm install
npm run dev

# Terminal 2 - Launch the UI
cd frontend
npm install
npm run dev
```
