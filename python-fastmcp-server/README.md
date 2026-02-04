# Sitecore Statistics MCP Server, Python FastMCP

A Python FastMCP project that exposes Sitecore statistics and how to call tools from Visual Studio Code, AI Toolkit, and  Claude Desktop. Provides flexiblity of being served using stdio or http. Also provides the needed configuration to successfully host on an Azure Python Web App.

# Tools

| Name                 | Description                                               |
|----------------------|-----------------------------------------------------------|
| get_templates        | Returns a list of all templates                           |
| get_templates_count  | Returns the number of content items for all templates     |
| get_template_count   | Returns the number of content items by template name      |
| get_template_fields  | Returns the fields of a given template name               |
| get_template_updated | Returns the 5 last updated content items by template name |

## How to Run

Update the hard coded constants (or refactor to use environment variables). Works by adding these endpoints to an existing Sitecore XM Cloud (SitecoreAI) instance. Source code available [Sitecore XM Cloud JSON Endpoints]().

```
ENDPOINT_TEMPLATES_URL = "http://localhost:3000/statistics/templates.json"
ENDPOINT_TEMPLATES_COUNT_URL = "http://localhost:3000/statistics/templates-count.json"
ENDPOINT_TEMPLATE_COUNT_URL = "http://localhost:3000/statistics/template-count.json"
ENDPOINT_TEMPLATE_FIELDS_URL = "http://localhost:3000/statistics/template-fields.json"
ENDPOINT_TEMPLATE_UPDATED_URL = "http://localhost:3000/statistics/template-updated.json"
```

From the root of the project, run

```
 .\.venv\Scripts\activate.bat
```

```
pip install -r .\requirements.txt
```

```
fastmcp dev server.py
```

The MCP Inspector allows connecting to the FastMCP Server. 

1. Click Connect
1. Navigate to Tools
1. Click List Tools
1. Click each tool as needed
    1. Enter valid values for each input
    1. Click Run Tool
    1. Observe Structured Content

## How to Deploy to Azure Web App

1. Create an Azure web app on Linux and Python runtime stack of at least 3.13
1. Add the environment variable **SCM_DO_BUILD_DURING_DEPLOYMENT** set to **true**
1. Set the startup command to **python server.ph**

During the first deployment packages are installed during building because of the SCM_DO_BUILD_DURING_DEPLOYMENT flag. Use the Deployment Center to observe the progress within the logs.

Log stream is also an option for monitoring during deployments.

The Python FastMCP server will proxy from its internal host address and port 8000 to port 80 at:

```
https://AZURE_PYTHON_WEB_APP_NAME.azurewebsites.net/mcp
```

## How to Use with Visual Studio Code

Add **.vscode\mcp.json** at the root directory level

```
{
    "servers": {
        "RSS Feed MCP Server": {
            "url": "http://localhost:8000/mcp",
            "type": "http"
        }
    }
}
```
Open the mcp.json to toggle Starting, Stopping, or Restarting added MCP Servers.

This configuration also works for AI Toolkit and servers hosted on Azure Web Apps.

```
{
    "servers": {
        "RSS Feed MCP Server Azure": {
            "url": "https://AZURE_PYTHON_WEB_APP_NAME.azurewebsites.net/mcp",
            "type": "http"
        }
    }
}
```

## How to Use with Claude Desktop

Edit **%USERPROFILE%\AppData\Roaming\Claude\claude_desktop_config.json** or the equivalent

```
{
  "mcpServers": {
    "RSS Feed MCP Server": {
      "command": "C:\\PATH_TO\\PYTHON\\Scripts\\uv.exe",
      "args": [
        "--directory",
        "C:\\PATH_TO\\CODE_HOME\\mcp-server-rss",
        "run",
        "server.py",
        "stdio"
      ]
    }
  }
}

```

The stdio flag tells the FastMCP Server to use the Standard Input/Outout protocol for communicating the transport method between client and server. 

**Claude Desktopmust be exited completely before new settings are applied** . For Windows, this might involve right clicking within the Notification Area and selecting "Quit".

## Known Issues

Running multiple local MCP Servers might cause port 8000 to be bound to unresolved processes.

From the terminal run

```
netstat -aon | findstr :8000
```

Based on the process ID, \<PID\> (number to the far right of the output) terminate the unresolved process

```
taskkill /PID <PID> /F
```

## Copyright and Ownership

All terms used are copyright to their original authors.