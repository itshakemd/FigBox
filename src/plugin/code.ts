import { uiHtml } from "../ui-content";

let uiWidth = 100;
let uiHeight = 40;

const TOOLBAR_HALF_WIDTH = 180;
const GAP = 12;
const BOTTOM_MARGIN = 20;

function computePosition() {
  const zoom = figma.viewport.zoom;
  const bounds = figma.viewport.bounds;
  const canvasWidthPx = bounds.width * zoom;
  const canvasHeightPx = bounds.height * zoom;

  let x = canvasWidthPx / 2 + TOOLBAR_HALF_WIDTH + GAP;

  const minX = BOTTOM_MARGIN;
  const maxX = canvasWidthPx - uiWidth - BOTTOM_MARGIN;
  x = Math.max(minX, Math.min(x, maxX));

  const y = canvasHeightPx - uiHeight - BOTTOM_MARGIN;

  return { x, y };
}

async function createCardFrame(
  text: string,
  color: { r: number; g: number; b: number },
  frameName: string,
  isReminder = false
): Promise<FrameNode> {
  const frame = figma.createFrame();
  frame.name = frameName;
  frame.resize(260, isReminder ? 180 : 160);
  const bounds = figma.viewport.bounds;
  frame.x = bounds.x + bounds.width / 2 - frame.width / 2;
  frame.y = bounds.y + bounds.height / 2 - frame.height / 2;
  frame.fills = [{ type: "SOLID", color }];
  frame.cornerRadius = 14;
  frame.strokeWeight = 1;
  frame.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 0.12 }];
  frame.paddingLeft = 20;
  frame.paddingRight = 20;
  frame.paddingTop = 18;
  frame.paddingBottom = 18;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 10;

  if (isReminder) {
    const icon = figma.createText();
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    } catch (_) {
      try {
        await figma.loadFontAsync(icon.fontName as FontName);
      } catch (__) {}
    }
    icon.characters = "⏰";
    icon.fontSize = 22;
    icon.textAlignHorizontal = "CENTER";
    icon.textAlignVertical = "CENTER";
    icon.fills = [{ type: "SOLID", color: { r: 0.45, g: 0.1, b: 0.1 } }];
    icon.locked = true;
    frame.appendChild(icon);
  }

  const title = figma.createText();
  try {
    await figma.loadFontAsync({ family: "Inter", style: isReminder ? "SemiBold" : "Regular" });
  } catch (_) {
    try {
      await figma.loadFontAsync(title.fontName as FontName);
    } catch (__) {}
  }
  title.characters = text;
  title.fontSize = isReminder ? 18 : 20;
  title.textAlignHorizontal = "CENTER";
  title.textAlignVertical = "CENTER";
  title.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  title.textAutoResize = "HEIGHT";
  title.resize(frame.width - 40, title.height);
  title.locked = true;
  frame.appendChild(title);

  if (isReminder) {
    const sub = figma.createText();
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    } catch (_) {
      try {
        await figma.loadFontAsync(sub.fontName as FontName);
      } catch (__) {}
    }
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    sub.characters = `Reminder · ${timeStr}`;
    sub.fontSize = 11;
    sub.textAlignHorizontal = "CENTER";
    sub.textAlignVertical = "CENTER";
    sub.fills = [{ type: "SOLID", color: { r: 0.35, g: 0.15, b: 0.15 } }];
    sub.locked = true;
    frame.appendChild(sub);
  }

  return frame;
}

const initialPosition = computePosition();

figma.showUI(uiHtml, {
  width: uiWidth,
  height: uiHeight,
  title: "Tools",
  themeColors: true,
  position: initialPosition,
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "resize") {
    uiWidth = msg.width;
    uiHeight = msg.height;
    figma.ui.resize(uiWidth, uiHeight);
  } else if (msg.type === "tag-create") {
    const name = (msg.name || "").toString().trim();
    if (!name) {
      figma.ui.postMessage({ type: "tag-create-result", id: msg.id, nodeId: null, error: "Name is required" });
      return;
    }
    (async () => {
      try {
        const colors = [
          { r: 1, g: 0.96, b: 0.6 },
          { r: 1, g: 0.82, b: 0.7 },
          { r: 0.76, g: 0.93, b: 0.98 },
          { r: 0.82, g: 0.94, b: 0.75 },
          { r: 0.9, g: 0.82, b: 0.98 },
          { r: 0.98, g: 0.87, b: 0.7 },
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const frame = await createCardFrame(name, color, `Tag: ${name}`);
        figma.currentPage.appendChild(frame);
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.ui.postMessage({ type: "tag-create-result", id: msg.id, nodeId: frame.id, error: null });
      } catch (e) {
        figma.ui.postMessage({ type: "tag-create-result", id: msg.id, nodeId: null, error: String(e) });
      }
    })();  } else if (msg.type === "tag-navigate") {
    const nodeId = msg.nodeId;
    if (!nodeId) return;
    const node = figma.getNodeById(nodeId);
    if (node) {
      try {
        figma.currentPage.selection = [node as SceneNode];
      } catch (_) {}
      figma.viewport.scrollAndZoomIntoView([node]);
    } else {
      figma.ui.postMessage({ type: "tag-missing", nodeId });
    }
  } else if (msg.type === "tag-delete-node") {
    const nodeId = msg.nodeId;
    if (!nodeId) return;
    const node = figma.getNodeById(nodeId);
    if (node && node.parent) {
      node.remove();
    }  } else if (msg.type === "reminder-trigger") {
    const title = ((msg.title || "") as string).toString().trim() || "Reminder";
    const id = msg.id;
    (async () => {
      try {
        const color = { r: 1, g: 0.76, b: 0.76 };
        const frame = await createCardFrame(title, color, `Reminder: ${title}`, true);
        figma.currentPage.appendChild(frame);
        try {
          figma.currentPage.selection = [frame];
        } catch (_) {}
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.ui.postMessage({ type: "reminder-trigger-result", id, nodeId: frame.id, error: null });
      } catch (e) {
        figma.ui.postMessage({ type: "reminder-trigger-result", id, nodeId: null, error: String(e) });
      }
    })();
  }
};