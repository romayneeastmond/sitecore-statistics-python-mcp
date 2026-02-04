# Sitecore Statistics

Partial implementation of a Sitecore XM Cloud project that produces json output for statistical analysis. Will need to be implemented based on your own Next.js project structure. Should be relatively easy to follow or changed by addressing the limitations below (which can be avoided by using hard coded values).

# Endpoints

| Name                      | Description                                               | Endpoint                                                             |
|---------------------------|-----------------------------------------------------------|----------------------------------------------------------------------|
| getTemplates              | Returns a list of all templates                           | http://localhost:3000/statistics/templates.json                      |
| getTemplatesCount         | Returns the number of content items for all templates     | http://localhost:3000/statistics/templates-count.json                |
| getTemplatesCountByName   | Returns the number of content items by template name      | http://localhost:3000/statistics/template-count.json?templateName=   |
| getTemplatesFieldsByName  | Returns the fields of a given template name               | http://localhost:3000/statistics/template-fields.json?templateName=  |
| getTemplatesUpdatedByName | Returns the 5 last updated content items by template name | http://localhost:3000/statistics/template-updated.json?templateName= |

## Limitations

Although visible from the Content Editor, items outside of the "Content" tree cannot be queried using the item type. Therefore it is not possible, using the Templates path to access the templates associated with a given site. The example query below will return null.

```
query getItems {
  item(language: "en", path: "/sitecore/templates/Project" ) {
    children {
      results {
        id
        template {
          name
        }
      }
      pageInfo {
        endCursor
        hasNext
      }
    }
  }
}

```

## Workaround

This is important because the Sitecore GraphQL search endpoint uses template and path ids that are *usually* stored as hard coded values or environment variables. One workaround is to create empty content items of template types further up the tree. The code samples use the following hard coded value:

```
/sitecore/content/company-headless-tenant/company/Data/Global/Settings/Search Helpers
```
Since this structure lives within the "Content" tree, [Screenshot](Sitecore Search Helpers.png) it can be queried to return the template ids necessary to perform searches without needing to hard code any values or maintain environment variables locally or in higher environments. Note that Content Delivery Api requires guids in their strict 00000000-0000-0000-0000-000000000000 format.

```
query getItems {
  item(language: "en", path: "/sitecore/content/company-headless-tenant/company/Data/Global/Settings/Search Helpers" ) {
    children {
      results {
        id
        template {
          name
        }
      }
      pageInfo {
        endCursor
        hasNext
      }
    }
  }
}

```

## Copyright and Ownership

All terms used are copyright to their original authors.