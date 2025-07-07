# **Decast Extension**

The **Decast Extension** is a browser extension for [Decast.live](https://decast.live), enabling users to create, join, and manage **Calls**, **Casts**, and **Decasts** directly from their browser. It also provides access to real-time gas prices without opening the extension and allows users to manage recordings seamlessly.

- **Calls**: Regular meetings for small groups.
- **Casts**: Medium to large-scale events.
- **Decasts**: Casts with decentralized storage options (e.g., Sia, Swarm).
- **Recordings**: Access, edit, and manage recordings directly from the browser.
- **Gas Prices**: View real-time Ethereum gas prices from the extension's popup.

---

## **Features**

✅ **Create and Join Events**: Easily create or join **Calls**, **Casts**, or **Decasts** by filling in event details.  
✅ **Manage Recordings**: Access, edit, and delete recordings directly from the browser.  
✅ **Decentralized Storage**: Store **Decast** recordings using decentralized solutions like Sia and Swarm.  
✅ **Real-Time Gas Prices**: View Ethereum gas prices without opening the extension.  
✅ **Seamless Integration**: Syncs with [Decast.live](https://decast.live) for a unified experience.  
✅ **Responsive UI**: Built with Vue.js and Tailwind CSS for a modern, user-friendly interface.  

---

## **Prerequisites**

Ensure the following are installed:

- **Node.js** (v20 or higher)  
- **npm** (v10 or higher)  
- **Google Chrome** or any Chromium-based browser (e.g., Edge, Brave)  
- **Decast.live Account** (Sign up at [decast.live](https://decast.live))  

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/decast-sia-extension
cd Decast-Extension
```

### **2. Install Dependencies**
```bash
npm install
```

The `package.json` includes key dependencies:
- **Vue.js** (`vue`, `vue-loader`, `vuex`) for the frontend framework.
- **Web3** (`ethers`, `web3`, `web3modal`, `@walletconnect/web3-provider`) for blockchain integration.
- **Tailwind CSS** (`tailwindcss`, `postcss`, `autoprefixer`) for styling.
- **Axios** for API requests to [Decast.live](https://decast.live).
- **File-Saver** for managing recording downloads.

### **3. Build the Extension**
For development (with live reloading):
```bash
npm run dev
```

For production:
```bash
npm run prod
```

To watch for changes:
```bash
npm run watch
```

This generates the extension files in the `dist/` folder.

### **4. Load the Extension in Chrome**
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (top-right toggle).
3. Click **Load Unpacked** and select the `dist/` folder from the project.
4. The Decast Extension should now appear in your browser.

### **5. Sign In to Decast.live**
1. Visit [decast.live](https://decast.live).
2. Click the **/user.signin** button in the top-right corner.
3. Log in with your credentials or sign up for a new account.
4. Open the extension to sync with your Decast.live account.

---

## **Usage**

### **Accessing the Extension**
1. After signing in to [Decast.live](https://decast.live), click the Decast Extension icon in your browser toolbar.
2. The extension’s interface will display options to create, join, or manage **Calls**, **Casts**, **Decasts**, and recordings.

### **Creating Events**
1. Navigate to the **Calls**, **Casts**, or **Decasts** section in the extension.
2. Click the **Create** button.
3. Fill in the required details (e.g., event name, date, time, and storage options for Decasts).
4. Submit to create the event. You’ll receive a confirmation with a shareable link.

### **Joining Events**
1. In the respective section (**Calls**, **Casts**, or **Decasts**), select an event from the list.
2. Click **Join** to enter the event directly from the extension.

### **Managing Recordings**
1. Go to the **Recordings** section in the extension.
2. View, edit, or delete recordings stored on centralized (for Calls/Casts) or decentralized storage (for Decasts).
3. Use the **Download** integration to download recordings locally.

### **Viewing Gas Prices**
- The extension displays real-time Ethereum gas prices in the popup interface without needing to open it fully. This is powered by the `ethers` library and Web3 integrations.

### **Example Workflow**
1. Open the extension.
2. Create a **Decast** by entering event details and selecting Sia as the storage option.
3. Share the event link with participants.
4. After the event, access the recording, edit metadata, and save it locally or on decentralized storage.
5. Check gas prices for any blockchain-related actions (e.g., storing on Swarm).

---

## **Development**

### **Tech Stack**
- **Frontend**: Vue.js 3, Vuesax, Tailwind CSS
- **Blockchain**: Ethers.js, Web3.js, WalletConnect
- **API**: Axios for Decast.live backend communication
- **Build Tools**: Webpack, PostCSS
- **Utilities**: Moment.js for date handling, Flatpickr for date pickers, File-Saver for downloads

### **Scripts**
- `npm run dev`: Builds the extension for development with hot reloading.
- `npm run prod`: Builds the extension for production.
- `npm run watch`: Watches for file changes during development.

### **Adding Features**
1. Create a new Vue component in `src/components/`.
2. Update `src/js/` for any new Web3 or API logic.
3. Test the extension in Chrome’s Developer Mode.

---

## **Troubleshooting**

- **Extension Not Loading**: Ensure the `dist/` folder is correctly built (`npm run prod`) and loaded in Chrome.
- **Login Issues**: Verify your [Decast.live](https://decast.live) credentials and ensure the extension is synced.
- **Gas Price Errors**: Check your internet connection and ensure Web3 providers (e.g., WalletConnect) are configured.
- **Decentralized Storage**: Confirm Sia/Swarm nodes are accessible in your network.

For further assistance, refer to the [Decast.live support page](https://decast.live/support).

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a **Pull Request** on GitHub.

---

## **License**

📜 **MIT License** – See `LICENSE` file for details.

---




