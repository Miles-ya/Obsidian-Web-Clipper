# Direct-Obsidian-Clipper (中文说明)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 本项目已废弃，如有同步到Obsidian的需求请使用官方插件[官方插件](https://chromewebstore.google.com/detail/cnjifjpddelmedmihgijeibhnjfabmlf?utm_source=item-share-cb)

一款轻量级的 Obsidian 网页剪藏工具。它通过一个 Chrome 浏览器插件和一个独立的本地服务，直接将网页全文或划线笔记保存为 Markdown 文件，无需在 Obsidian 中安装额外插件。

[English Version](./README-en.md)

---

## 工作原理

本工具由两个协同工作的小程序组成：

1.  **Chrome 浏览器插件:** 负责在浏览器中捕获您想要保存的内容。
2.  **独立的本地服务:** 负责接收来自插件的数据，并将其直接存为您指定文件夹下的 `.md` 文件。

整个流程非常简单：
`[浏览器插件]` ---发送数据---> `[本地 Node.js 服务]` ---保存---> `[你的 Markdown 文件]`

这种“直接”模式意味着您无需在 Obsidian 中安装或管理任何插件，让您的知识库保持纯净。

## 功能特性

-   剪藏网页全文。
-   仅剪藏您用鼠标划选的重点文本。
-   直接保存为干净、易读的 Markdown 文件。
-   **无需安装 Obsidian 插件。**
-   系统轻量、简单，完全在您的本地电脑上运行。

## 安装步骤

安装过程分为两步：启动本地服务和安装浏览器插件。

**必备前提:** 您的电脑上必须已经安装了 [Node.js](https://nodejs.org/)。

### 第一步：启动本地服务

这个服务是您剪藏内容的“接收器”，必须在后台运行才能进行剪藏。

1.  进入本项目的 `standalone-server` 文件夹。
2.  双击运行 `start-server.bat` 文件。
3.  您会看到一个命令行窗口弹出，并显示 `Standalone clipping server listening...`。**请不要关闭这个窗口**，可以将其最小化。

### 第二步：安装 Chrome 插件

这个插件是捕获网页内容的“发送器”。

1.  打开 Chrome 浏览器，在地址栏输入 `chrome://extensions` 并回车。
2.  在页面右上角，**开启“开发者模式”** (Developer mode)。
3.  点击左上角的“加载已解压的扩展程序” (Load unpacked) 按钮。
4.  在弹出的文件选择框中，定位并选择本项目中的 `chrome-extension` 文件夹。
5.  “Obsidian Web Clipper” 插件会出现在您的插件列表中，表示安装成功。

## 如何使用

1.  确保本地服务 (`start-server.bat`) 正在运行。
2.  在任意网页上，您可以选择：
    *   **保存整个网页:** 在页面任意位置点击右键。
    *   **保存划线重点:** 用鼠标选中文本，然后在选中的文本上点击右键。
3.  在弹出的右键菜单中，选择 **“Save to Obsidian”**。
4.  内容会立刻被保存为您指定目录下的一个 Markdown 文件。

## 配置

如果您想修改文件的保存位置，需要编辑服务器的配置文件。

1.  用任意文本编辑器打开 `standalone-server/server.js` 文件。
2.  在文件顶部找到以下这行代码：
    ```javascript
    const FINAL_SAVE_PATH = 'E:\Users\Desktop'; 
    ```
3.  将路径修改为您想要的文件夹路径。
    *   **Windows 用户请注意:** 路径中的反斜杠 `\` 需要写成两个，例如 `C:\MyNotes`。
4.  保存文件，然后**重启本地服务** (关闭命令行窗口，然后重新运行 `start-server.bat` 文件)，配置才会生效。

## 未来计划 (Roadmap)

这是一个简单的小工具，但我们计划进行以下改进：

-   [ ] **添加 YAML 元数据:** 在每个文件的头部自动加入源链接、剪藏日期等信息。
-   [ ] **优化文件名格式:** 在文件名前加入日期 (例如 `YYYY-MM-DD - 网页标题.md`)，以防重名覆盖。
-   [ ] **使用独立的配置文件:** 将保存路径等设置项移至一个独立的 `config.json` 文件中，让配置修改更方便、更安全。

## 参与贡献

欢迎任何形式的贡献！如果您有任何建议或发现了 Bug，请随时提交 Issue 或 Pull Request。

## 许可证

本项目采用 MIT 许可证。详情请见 `LICENSE` 文件。
