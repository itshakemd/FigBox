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
  }
};