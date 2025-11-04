# Daily Word Agent (HNG Stage 3)

This is a "smart" AI agent built for the HNG Stage 3 backend task. It is deployed on Mastra Cloud and integrates directly with **Telex.im** using the **A2A (Agent-to-Agent) protocol**.

The agent's "brain" is powered by Google's Gemini, allowing it to understand natural language requests from users.

### ✨ Live Endpoints

* **Mastra Cloud Deployment:** `https://slow-yellow-gigabyte-c3cc226a-86f2-4d70-b22f-06fb8ca27e38.mastra.cloud`
* **Telex A2A Webhook:** `https://slow-yellow-gigabyte-c3cc226a-86f2-4d70-b22f-06fb8ca27e38.mastra.cloud/api/a2a/agent/dailyWordAgent`

---

## 🚀 Features

* **Telex.im Integration:** Fully integrated with the Telex workflow system using the `lib/mastra.a2a.node` type.
* **Natural Language Understanding:** Uses Google's Gemini to parse user requests. For example, `"genesis chapter 1 verse 1"` is correctly understood and converted to `"Genesis 1:1"`.
* **Specific Verse Fetching:** A user can type `genesis 1:1` or `john 3 16` to get that exact verse.
* **Random Verse Fetching:** A user can type `give me a random verse` to get a random verse.

---

## 🛠️ Tech Stack

* **Framework:** [Mastra](https://mastra.ai/)
* **Deployment:** [Mastra Cloud](https://cloud.mastra.ai/)
* **AI "Brain":** Google Gemini (`gemini-1.5-flash`)
* **API Protocol:** A2A (JSON-RPC)
* **Server Routing:** [Hono](https://hono.dev/)
* **Data Source:** [bible-api.com](https://bible-api.com/) (Free, no-auth JSON API)
* **Language:** TypeScript

---

## 👨‍💻 How to Run This Project Locally

To run this agent on your own machine, you will need Node.js and an API key.

### Prerequisites

* **Node.js** (v20.0 or higher)
* **npm** (comes with Node.js)
* **A Google Gemini API Key** (Get one for free from [Google AI Studio](https://aistudio.google.com/))
* **An API Tester** (like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/))

### Step 1: Clone the Repository

In your terminal, clone this project to your computer:

```bash
git clone [https://github.com/maryukpete1/the-daily-word.git](https://github.com/maryukpete1/the-daily-word.git)
cd the-daily-word
```

### Step 2: Install Dependencies

Install all the required packages (like Mastra, Hono, etc.):

```bash
npm install
```

### Step 3: Set Up Your Environment

1.  In the root of the project (`the-daily-word/`), create a new file named `.env`
2.  Open this new `.env` file and add your Google Gemini API key:

    ```
    GOOGLE_GENERATIVE_AI_API_KEY=AIza...[YOUR_SECRET_KEY_HERE]
    ```

### Step 4: Run the Local Server

Start the Mastra development server:

```bash
npm run dev
```

Your server is now running and listening on `http://localhost:4111`.

### Step 5: Test it Locally (with Postman/Insomnia)

This server speaks the **A2A (Agent-to-Agent)** protocol, so you cannot test it in a web browser. You must use a tool like Postman.

1.  Open Postman and create a **POST** request.
2.  Set the URL to the local A2A endpoint:
    `http://localhost:4111/api/a2a/agent/dailyWordAgent`
3.  Go to the **Body** tab, select **JSON**, and paste in this "fake" Telex request:

    ```json
    {
      "jsonrpc": "2.0",
      "id": "local-test-123",
      "method": "tasks.create",
      "params": {
        "message": {
          "parts": [
            {
              "text": "genesis 1:1"
            }
          ]
        },
        "context": {
          "channel_id": "local-test-channel"
        }
      }
    }
    ```
4.  Click **Send**.

You will receive a `200 OK` response with the formatted A2A JSON, containing the Bible verse in the `result.message.parts[0].text` field.

This confirms the local server is 100% working.