# Direct-Obsidian-Clipper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## This project has been deprecated.If you need to sync content to Obsidian, please use the official plugin: [Official Plugin](https://chromewebstore.google.com/detail/cnjifjpddelmedmihgijeibhnjfabmlf?utm_source=item-share-cb).


A lightweight web clipper for Obsidian that saves web pages and selected text directly as Markdown files, without requiring a separate Obsidian plugin.

一款轻量级的 Obsidian 网页剪藏工具。它通过一个 Chrome 浏览器插件和一个独立的本地服务，直接将网页全文或划线笔记保存为 Markdown 文件，无需在 Obsidian 中安装额外插件。

---

## How It Works

This tool consists of two simple parts that work together:

1.  **A Chrome Extension:** This captures the content from your browser.
2.  **A Standalone Local Server:** This receives the content from the extension and saves it directly to your specified folder as `.md` files.

The flow is simple:
`[Chrome Extension]` ---sends data---> `[Local Node.js Server]` ---saves---> `[Your Markdown Files]`

This direct approach means you don't need to install or manage a separate plugin within Obsidian, keeping your vault clean.

## Features

-   Clip the full content of a webpage.
-   Clip only the text you've highlighted (selected).
-   Saves directly to clean, readable Markdown files.
-   **No Obsidian plugin required.**
-   Simple, lightweight, and runs entirely on your local machine.

## Installation

Setting up is a two-step process: running the local server and installing the browser extension.

**Prerequisite:** You must have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Run the Local Server

This server is the "receiver" for your clippings. It must be running in the background when you want to save content.

1.  Navigate to the `standalone-server` folder in this project.
2.  Double-click the `start-server.bat` file.
3.  A terminal window will open and display `Standalone clipping server listening...`. **Do not close this window.** You can minimize it.

### Step 2: Install the Chrome Extension

This extension is the "sender" that captures the web content.

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Enable **"Developer mode"** using the toggle in the top-right corner.
3.  Click the **"Load unpacked"** button.
4.  In the file selection dialog, choose the `chrome-extension` folder from this project.
5.  The "Obsidian Web Clipper" extension will now appear in your list.

## How to Use

1.  Ensure the local server (`start-server.bat`) is running.
2.  On any webpage, you can either:
    *   **Save the full page:** Right-click anywhere on the page.
    *   **Save a highlight:** Select some text with your mouse, then right-click on the selection.
3.  From the context menu, choose **"Save to Obsidian"**.
4.  The content will be instantly saved as a Markdown file in your designated folder.

## Configuration

To change where your files are saved, you need to edit the server configuration.

1.  Open the `standalone-server/server.js` file with any text editor.
2.  Find the following line at the top of the file:
    ```javascript
    const FINAL_SAVE_PATH = 'E:\Users\Desktop'; 
    ```
3.  Change the path to your desired folder.
    *   **Important for Windows users:** Remember to use double backslashes (`\\`) for your path.
4.  Save the file and **restart the local server** (close the terminal window and run `start-server.bat` again) for the changes to take effect.

## Roadmap

This is a simple tool, but here are some planned improvements:

-   [ ] **Add YAML Frontmatter:** Automatically include metadata like the source URL and clipping date at the top of each file.
-   [ ] **Improve Filename Formatting:** Add the date to the filename (e.g., `YYYY-MM-DD - Page Title.md`) to prevent duplicates.
-   [ ] **External Config File:** Move settings like the save path to a `config.json` file so you don't have to edit the code directly.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
