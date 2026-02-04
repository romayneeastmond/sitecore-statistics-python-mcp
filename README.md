# Lightweight Sitecore Statistics 

A Python FastMCP Server that parses JSON output from Sitecore endpoints. Project contains a partial implementation for Next.js endpoints that produce JSON content. The FastMCP Server exposes those JSON endpoints as tools that can be included within an LLM's conversational context. 

---

## Screenshots

### Visualize Content Breakdown by Template
<img alt="Image" src="https://github.com/user-attachments/assets/2950ef6d-49cd-4a57-bfdd-b3364143a2a0" />

### Template Field Analysis
<img alt="Image" src="https://github.com/user-attachments/assets/ec7b5c42-8576-4d8f-8ce2-eba4f3a8cc31" />

### Querying Most Recent Content
<img alt="Image" src="https://github.com/user-attachments/assets/b39d4de2-9c98-4201-816c-5d8a766954b9" />

---

## Extensibility

Add additional JSON endpoints to expose site information, media library items, links to downloadable assets (PDF, Word, vCard). Next.js offers flexiliby to exposing additional API endpoints for more advanced features such as connecting to the Sitecore authoring API. This could potentially allow MCP Servers to post content directly into Sitecore. Naturally should be secured to prevent unintended changes.

# Sitecore Statistics JSON Output

Partial implementation of a Sitecore XM Cloud project that produces json output for statistical analysis. Will need to be implemented based on your own Next.js project structure. Should be relatively easy to follow or changed by addressing the limitations below (which can be avoided by using hard coded values).

[README](https://github.com/romayneeastmond/sitecore-statistics-python-mcp/blob/main/sitecore-src/README.md)

[Source Code](https://github.com/romayneeastmond/sitecore-statistics-python-mcp/tree/main/sitecore-src)

# Sitecore Statistics MCP Server, Python FastMCP

A Python FastMCP project that exposes Sitecore statistics and how to call tools from Visual Studio Code, AI Toolkit, and  Claude Desktop. Provides flexiblity of being served using stdio or http. Also provides the needed configuration to successfully host on an Azure Python Web App.

[README](https://github.com/romayneeastmond/sitecore-statistics-python-mcp/blob/main/python-fastmcp-server/README.md)

[Source Code](https://github.com/romayneeastmond/sitecore-statistics-python-mcp/tree/main/python-fastmcp-server)

## Copyright and Ownership

All terms used are copyright to their original authors.