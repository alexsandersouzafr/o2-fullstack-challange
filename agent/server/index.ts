import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const NWS_API_BASE = "http:/localhost:3000";
const USER_AGENT = "stock-user";

export const server = new McpServer({
  name: "stock-agent",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

const transport = new StdioServerTransport();
await server.connect(transport);
