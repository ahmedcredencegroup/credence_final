# Contact form → Google Sheet setup

The contact form on the homepage sends each submission to a Google Sheet via a
free Google Apps Script "web app". No third-party service or paid plan is needed.

Once configured, every inquiry appends a row: **Timestamp, Name, Email, Phone,
Project type, Budget, Message**.

## One-time setup (about 5 minutes)

1. **Create the sheet.** Go to <https://sheets.google.com>, create a new blank
   spreadsheet, and name it e.g. `Credence — Website Inquiries`.

2. **Open the script editor.** In that sheet: **Extensions → Apps Script**.

3. **Paste this code** (replace anything already in `Code.gs`), then save:

   ```js
   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

       // Add a header row once, if the sheet is empty.
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Project type", "Budget", "Message"]);
       }

       const d = JSON.parse(e.postData.contents);
       sheet.appendRow([
         d.submittedAt || new Date().toISOString(),
         d.name || "",
         d.email || "",
         d.phone || "",
         d.type || "",
         d.budget || "",
         d.message || "",
       ]);

       return ContentService.createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

4. **Deploy it.** Click **Deploy → New deployment**. Choose type **Web app**.
   Set:
   - **Execute as:** Me
   - **Who has access:** Anyone

   Click **Deploy**, authorize when prompted, and **copy the Web app URL**
   (it ends in `/exec`).

5. **Point the site at it.** Put the URL in the `VITE_CONTACT_ENDPOINT`
   environment variable:
   - **Locally:** create a `.env` file (copy `.env.example`) and set
     `VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/AKfyc.../exec`
   - **On Netlify:** Site settings → Environment variables → add
     `VITE_CONTACT_ENDPOINT` with the same value, then redeploy.

That's it. Submit a test inquiry — a new row should appear in the sheet.

## Optional: email alert on each submission

To also get an email whenever a form is submitted, add this inside `doPost`,
right after the `appendRow(...)` call:

```js
MailApp.sendEmail(
  "ahmed@credencegroup.co",
  "New website inquiry — " + (d.name || "Unknown"),
  `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nType: ${d.type}\nBudget: ${d.budget}\n\n${d.message}`
);
```

## Notes

- If `VITE_CONTACT_ENDPOINT` is not set, the form still validates and shows the
  success message, but the submission is **not stored anywhere** (a warning is
  logged to the console in development). Set the variable to go live.
- Prefer Excel instead? The frontend is unchanged — point
  `VITE_CONTACT_ENDPOINT` at a Power Automate "When an HTTP request is received"
  flow that writes to an Excel workbook in OneDrive/SharePoint (requires a
  Microsoft 365 business plan).
