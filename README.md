# FigBox

FigBox is a lightweight productivity companion for Figma and FigJam. It gives you a focused set of tools for capturing references, organizing ideas, planning tasks, setting reminders, and staying focused without leaving your design environment.

## Features

### Link Library

Save useful links with a custom name or let FigBox identify the site automatically. Open saved references in a new browser tab whenever you need them.

### Quick Notes

Capture ideas in editable notes with titles, previews, update dates, and persistent local storage. Notes can also be shown directly on the Figma board.

### Daily Tasks

Create tasks, mark them complete, and remove finished or unnecessary work so your priorities stay visible.

### Smart Reminders

Set reminders for specific dates and times. FigBox keeps them visible and marks reminders as upcoming or due.

### Connected Tags

Create reusable tags and use them to organize and connect the information in your FigBox collection.

### Focus Timer

Start, pause, and reset a built-in focus timer while you work in Figma.

## Get FigBox

You can get FigBox directly from the **Figma Community**:

[Get FigBox on Figma Community](https://www.figma.com/community/plugin/1683966492844371279/figbox?utm_source=chatgpt.com)

## Run locally

### Requirements

* Node.js 18 or later
* Figma desktop app

### Setup

```bash
npm install
npm run build
```

The build creates the plugin files in `dist/`.

### Load the plugin in Figma

1. Open Figma desktop.
2. Open **Plugins > Development > Import plugin from manifest**.
3. Select the root `manifest.json` file.
4. Run **FigBox** from **Plugins > Development**.

For UI development, use:

```bash
npm run dev
```

## Privacy

FigBox does not require network access. Your saved content is kept locally by the plugin and links open only when you choose to visit them.
