# Contact form → email setup

The contact form on the homepage sends each submission straight to
**komal_russell@credencegroup.co** as a clean, formatted email, via a free
Google Apps Script "web app." No third-party service, no paid plan, no
spreadsheet required.

Every inquiry arrives as an email with the subject **"New Website Inquiry —
[Name]"**, a formatted table of all the fields, and a line noting it was
*submitted through the Credence Group website contact form*.

## One-time setup (about 5 minutes)

1. **Create the script.** Go to <https://script.google.com/home> and click
   **New project**.

2. **Name it** something recognizable, e.g. `Credence Website Contact Form`
   (click the "Untitled project" title at the top).

3. **Paste this code**, replacing anything already in `Code.gs`:

   ```js
   const RECIPIENT = "komal_russell@credencegroup.co";

   function doPost(e) {
     try {
       const d = JSON.parse(e.postData.contents);

       const rows = [
         ["Name", d.name],
         ["Email", d.email],
         ["Phone", d.phone || "—"],
         ["Project type", d.type || "—"],
         ["Budget range", d.budget || "—"],
       ];

       const tableHtml = rows
         .map(
           ([label, value]) => `
             <tr>
               <td style="padding:6px 16px 6px 0;color:#6b6b6b;font:14px sans-serif;white-space:nowrap;vertical-align:top;">${label}</td>
               <td style="padding:6px 0;font:14px sans-serif;color:#111;">${escapeHtml(value)}</td>
             </tr>`,
         )
         .join("");

       const submittedAt = d.submittedAt
         ? new Date(d.submittedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
         : new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

       const html = `
         <div style="font-family:sans-serif;max-width:560px;">
           <p style="font:13px sans-serif;color:#8a8a8a;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">
             Submitted through the Credence Group website
           </p>
           <h2 style="font:600 20px sans-serif;color:#111;margin:0 0 16px;">New Project Inquiry</h2>
           <table style="border-collapse:collapse;margin-bottom:20px;">${tableHtml}</table>
           <p style="font:13px sans-serif;color:#6b6b6b;margin:0 0 6px;">Message</p>
           <p style="font:14px sans-serif;color:#111;white-space:pre-wrap;background:#f6f6f4;border-radius:6px;padding:12px 14px;margin:0 0 20px;">${escapeHtml(d.message)}</p>
           <p style="font:12px sans-serif;color:#a0a0a0;margin:0;">Received ${submittedAt}</p>
         </div>`;

       MailApp.sendEmail({
         to: RECIPIENT,
         subject: "New Website Inquiry — " + (d.name || "Unknown"),
         htmlBody: html,
         replyTo: d.email || undefined,
       });

       return ContentService.createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }

   function escapeHtml(s) {
     return String(s || "").replace(/[&<>"']/g, (c) => ({
       "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
     }[c]));
   }
   ```

   Setting `replyTo` to the inquirer's own email means Komal can just hit
   **Reply** in her inbox to respond directly to the client.

4. **Deploy it.** Click **Deploy → New deployment**. Click the gear icon next
   to "Select type" and choose **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone

   Click **Deploy**, authorize when prompted (Google will warn it's an
   unverified app — that's expected for a private script; click **Advanced →
   Go to [project name] (unsafe)** to proceed), and **copy the Web app URL**
   (it ends in `/exec`).

5. **Point the site at it.** Put that URL in the `VITE_CONTACT_ENDPOINT`
   environment variable:
   - **Locally:** create a `.env` file (copy `.env.example`) and set
     `VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/AKfyc.../exec`
   - **On Netlify:** Site settings → Environment variables → add
     `VITE_CONTACT_ENDPOINT` with the same value, then **trigger a redeploy**
     (env var changes don't apply retroactively to the current build).

That's it — submit a test inquiry on the live site and check
komal_russell@credencegroup.co (and spam folder, for the first email).

## Notes

- If `VITE_CONTACT_ENDPOINT` is not set, the form still validates and shows
  the success message to the visitor, but the email is **never sent** (a
  warning is logged to the console in development so this is easy to catch
  before launch).
- To send to more than one address, change `RECIPIENT` to a comma-separated
  string, e.g. `"komal_russell@credencegroup.co,ahmed@credencegroup.co"`.
- Prefer Excel instead of email? The frontend is unchanged — point
  `VITE_CONTACT_ENDPOINT` at a Power Automate "When an HTTP request is
  received" flow that writes to an Excel workbook in OneDrive/SharePoint
  (requires a Microsoft 365 business plan).
