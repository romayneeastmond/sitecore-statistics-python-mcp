from fastmcp import FastMCP
import requests
import sys

arguments = sys.argv[1:]

mcp = FastMCP(name="Sitecore Statistics MCP Server", stateless_http=True)

ENDPOINT_TEMPLATES_URL = "http://localhost:3000/statistics/templates.json"
ENDPOINT_TEMPLATES_COUNT_URL = "http://localhost:3000/statistics/templates-count.json"
ENDPOINT_TEMPLATE_COUNT_URL = "http://localhost:3000/statistics/template-count.json"
ENDPOINT_TEMPLATE_FIELDS_URL = "http://localhost:3000/statistics/template-fields.json"
ENDPOINT_TEMPLATE_UPDATED_URL = "http://localhost:3000/statistics/template-updated.json"

@mcp.tool(
    description=(
        "This tool must be called whenever the user asks for the names of the templates defined in their Sitecore instance."
    )
)
def get_templates() -> dict:
    response = requests.get(ENDPOINT_TEMPLATES_URL)
    data = response.json()
    names = [item["name"] for item in data if "name" in item]
    return {"status": response.status_code, "templates": names}

@mcp.tool(
    description=(
        "This tool must be called whenever the user asks for the number of content items defined by their Sitecore templates. "
    )
)
def get_templates_count() -> dict:
    response = requests.get(ENDPOINT_TEMPLATES_COUNT_URL)
    data = response.json()
    return {"status": response.status_code, "templatesCount": data}

@mcp.tool(
    description=(
        "This tool must be called whenever the user asks for the number of content items of an individual Sitecore template. "
    )
)
def get_template_count(template_name) -> dict:
    response = requests.get(f'{ENDPOINT_TEMPLATE_COUNT_URL}?templateName={template_name}')
    data = response.json()
    return {"status": response.status_code, "templateCount": data}

@mcp.tool(
    description=(
        "This tool must be called whenever the user asks for the fields of an individual Sitecore template. "
    )
)
def get_template_fields(template_name) -> dict:
    response = requests.get(f'{ENDPOINT_TEMPLATE_FIELDS_URL}?templateName={template_name}')
    data = response.json()    
    field_names = [field["name"] for field in data.get("fields", []) if "name" in field and not field["name"].startswith("__")]    
    return {"status": response.status_code, "template": template_name, "fields": field_names }

@mcp.tool(
    description=(
        "This tool must be called whenever the user asks about what content has been recently published or updated based on individual Sitecore template. "
    )
)
def get_template_updated(template_name) -> dict:
    response = requests.get(f'{ENDPOINT_TEMPLATE_UPDATED_URL}?templateName={template_name}')
    data = response.json()
    content = [
        {k: v for k, v in item.items() if k != "id"}
        for item in data.get("content", [])
        if isinstance(item, dict)
    ]  
    return {"status": response.status_code, "template": template_name, "content": content }

if __name__ == "__main__":
    if "stdio" in arguments:
        mcp.run()
    else:
        mcp.run(transport="http", host="0.0.0.0", port=8000)

#fastmcp run server.py
#fastmcp dev server.py
