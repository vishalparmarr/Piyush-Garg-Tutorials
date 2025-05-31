import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { turnOnBulb, turnOffBulb, changeColor } from "./service";

const server = new McpServer({
  name: "AI-LIGHT",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("turn-on-bulb", "Turn on the light bulb", {}, async () => {
  await turnOnBulb();
  return { content: [{ type: "text", text: "Bulb has been turned On" }] };
});

server.tool("turn-off-bulb", "Turn off the light bulb", {}, async () => {
  await turnOffBulb();
  return { content: [{ type: "text", text: "Bulb has been turned Off" }] };
});

server.tool(
  "change-color",
  "Change the color of the light bulb",
  {
    r: z.number().describe("Red color 0 - 255"),
    g: z.number().describe("Green color 0 - 255"),
    b: z.number().describe("Blue color 0 - 255"),
    dimming: z
      .number()
      .describe(
        "Dimming level 0 - 100 0 means off 50 means half brightness 100 means full brightness"
      ),
  },
  async ({ r, g, b, dimming }) => {
    await changeColor({ r, g, b, dimming });
    return {
      content: [{ type: "text", text: `Bulb color changed to ${changeColor}` }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Light Bulb MCP Server running on stdio");
}

main();
