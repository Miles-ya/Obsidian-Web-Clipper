const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// --- Configuration ---
// These paths are taken from the project's GEMINI.md documentation.
const FINAL_SAVE_PATH = 'E:\Users\Desktop';
const WEBPAGES_DIR = path.join(FINAL_SAVE_PATH, 'Webpages');
const HIGHLIGHTS_FILE = path.join(FINAL_SAVE_PATH, '浏览器划线.md');
const PORT = 3000;

// Function to sanitize a string to be a valid filename.
// Removes characters that are not allowed in Windows filenames.
function sanitizeTitle(title) {
    // Replace characters that are invalid in Windows filenames with a space
    return title.replace(/[\/:*?"<>|]/g, ' ').trim();
}

// Ensure the target directory for full pages exists.
async function ensureDirectoriesExist() {
    try {
        await fs.mkdir(WEBPAGES_DIR, { recursive: true });
    } catch (error) {
        console.error('Error creating directory:', WEBPAGES_DIR, error);
        // If we can't create the main directory, we should not continue.
        process.exit(1);
    }
}

const server = http.createServer(async (req, res) => {
    // Set CORS headers to allow requests from the Chrome extension
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle pre-flight CORS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/clip') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const { title, url, content, selection } = data;

                if (!title || !url) {
                    console.error('Received data is missing title or url.');
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Bad Request: Missing title or url.' }));
                    return;
                }

                const hasSelection = selection && selection.trim() !== '';
                const hasContent = content; // innerText can be empty, that's fine.

                // If there is highlighted text, append it to the highlights file.
                if (hasSelection) {
                    const highlightContent = `> [!quote] ${selection.trim()}\n> \n> [${title}](${url})\n\n---\n`;
                    await fs.appendFile(HIGHLIGHTS_FILE, highlightContent);
                    console.log(`Appended highlight from "${title}" to ${HIGHLIGHTS_FILE}`);
                }

                // If there is page content, save it to its own file.
                if (hasContent) {
                    const sanitized = sanitizeTitle(title);
                    const fileName = `${sanitized}.md`;
                    const filePath = path.join(WEBPAGES_DIR, fileName);
                    const fileContent = `# [${title}](${url})\n\n${content}`;

                    await fs.writeFile(filePath, fileContent);
                    console.log(`Saved full page "${title}" to ${filePath}`);
                }
                
                // If nothing was saved, log it.
                if (!hasSelection && !hasContent) {
                     console.log(`Received clip for "${title}" but it had no highlight or page content. Skipping.`);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Clipping successful.' }));

            } catch (error) {
                console.error('Failed to process clipping:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

// Before starting the server, ensure the necessary directories are in place.
ensureDirectoriesExist().then(() => {
    server.listen(PORT, '127.0.0.1', () => {
        console.log(`Standalone clipping server listening on http://127.0.0.1:${PORT}`);
        console.log('Ready to receive clippings from the Chrome extension.');
        console.log('---');
        console.log(`Full pages will be saved in: ${WEBPAGES_DIR}`);
        console.log(`Highlights will be appended to: ${HIGHLIGHTS_FILE}`);
    });
});