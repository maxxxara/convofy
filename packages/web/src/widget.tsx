import { createRoot } from "react-dom/client";
import ChatWidget from "./components/widget/ChatWidget";
import "./index.css";

interface WidgetConfig {
  botId: string;
}

declare global {
  interface Window {
    ConvofyWidget: {
      init: (config: WidgetConfig) => void;
    };
  }
}

class ConvofyWidget {
  private static instance: ConvofyWidget;
  private root: any = null;
  private container: HTMLElement | null = null;

  static getInstance(): ConvofyWidget {
    if (!ConvofyWidget.instance) {
      ConvofyWidget.instance = new ConvofyWidget();
    }
    return ConvofyWidget.instance;
  }

  init(config: WidgetConfig) {
    // Validate required config
    if (!config.botId) {
      console.error("ConvofyWidget: botId is required");
      return;
    }

    // Remove existing widget if any
    this.destroy();

    // Create container
    this.container = document.createElement("div");
    this.container.id = "convofy-widget-container";
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;

    // Allow pointer events only on the widget itself
    this.container.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.body.appendChild(this.container);

    // Create React root and render widget
    this.root = createRoot(this.container);
    this.root.render(
      <div style={{ pointerEvents: "auto" }}>
        <ChatWidget config={config} />
      </div>
    );
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}

// Create the public API object
const ConvofyWidgetAPI = {
  init: (config: WidgetConfig) => {
    ConvofyWidget.getInstance().init(config);
  },
  destroy: () => {
    ConvofyWidget.getInstance().destroy();
  },
};

// Expose widget to global scope
if (typeof window !== "undefined") {
  window.ConvofyWidget = ConvofyWidgetAPI;
}

// Auto-initialize if config is provided via data attributes
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const scripts = document.querySelectorAll("script[data-convofy-bot-id]");
    scripts.forEach((script) => {
      const botId = script.getAttribute("data-convofy-bot-id");

      if (botId) {
        const config: WidgetConfig = {
          botId,
        };

        ConvofyWidget.getInstance().init(config);
      }
    });
  });
}

// Export for IIFE build
export default ConvofyWidgetAPI;
