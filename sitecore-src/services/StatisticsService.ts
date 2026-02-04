import { gql } from 'graphql-request';
import { graphQLClient } from './GraphQLClientService';
import { stringToDate, stringToGuid } from '../helpers/ContentHelper';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getTemplates = async (path: string, language = 'en', throttleMs = 250): Promise<Array<any>> => {
	const variables = {
		path,
		language,
		after: '',
		hasNext: true
	};

	const templates = Array<{ id: string, name: string }>();

	while (variables.hasNext) {
		const query = gql`    
			query getItems($language: String!, $path: String!) {
				item(language: $language, path: $path) {
					children {
						results {
							template {
								id
								name
							}
							children {
								results {
									template {
										id
										name
									}
								}
							}
						}
						pageInfo {
							endCursor
							hasNext
						}
					}
				}
			}
        `;

		const data = await graphQLClient.request(query, variables) as any;

		data?.item?.children?.results.map((result: any) => {
			templates.push(
				{
					id: result.template?.id,
					name: result.template?.name
				} as any
			);

			if (result.children) {
				result.children.results.map((child: any) => {
					templates.push(
						{
							id: child.template?.id,
							name: child.template?.name
						}
					)
				});
			}
		});

		variables.after = data.item.children.pageInfo.endCursor;
		variables.hasNext = data.item.children.pageInfo.hasNext;

		if (variables.hasNext) {
			await sleep(throttleMs);
		}
	}

	return templates;
};

export const getTemplatesCount = async (path: string, language = 'en', throttleMs = 250): Promise<Array<any>> => {
	const templates = await getTemplates(path, language, throttleMs);

	if (!templates)
		return [];

	const templatesCount = Array<{ name: string, count: number }>();

	for (let i = 0; i < templates.length; i++) {
		const variables = {
			path: stringToGuid(templates[i].id), // TODO: If using Delivery GraphQL Endpoint use stringToGuid(templates[i].id); (Included here as an example)
			language,
		};

		const query = gql`    
			query getItem($path: String!) {
				search(
					where: {
						AND: [
							{
								name: "_templates"
								value: $path
								operator: CONTAINS
							}       
						]
					}
					first: 1
				) {
					results {
						template {
							id
							name
						}						
					}
					total
				}
			}
        `;

		const data = await graphQLClient.request(query, variables) as any;

		if (data.search) {
			templatesCount.push(
				{
					name: templates[i].name,
					count: data.search.total as number
				} as any
			);
		}
	}

	return templatesCount;
};

export const getTemplatesCountByName = async (path: string, templateName: string, language = 'en', throttleMs = 250): Promise<Array<any>> => {
	const templates = await getTemplates(path, language, throttleMs);

	if (!templates)
		return [];

	const template = templates.find(x => x.name.toLowerCase().trim() === templateName.toLowerCase().trim());

	if (!template)
		return [];

	const templatesCount = Array<{ name: string, count: number }>();

	const variables = {
		path: template.id, // TODO: If using Delivery GraphQL Endpoint use stringToGuid(templates[i].id)
		language,
	};

	const query = gql`    
		query getItem($path: String!) {
			search(
				where: {
					AND: [
						{
							name: "_templates"
							value: $path
							operator: CONTAINS
						}       
					]
				}
				first: 1
			) {
				total
			}
		}
	`;

	const data = await graphQLClient.request(query, variables) as any;

	if (data.search) {
		templatesCount.push(
			{
				name: template.name,
				count: data.search.total as number
			} as any
		);
	}

	return templatesCount;
};

export const getTemplatesFieldsByName = async (path: string, templateName: string, language = 'en', throttleMs = 250): Promise<any> => {
	const templates = await getTemplates(path, language, throttleMs);

	if (!templates)
		return [];

	const template = templates.find(x => x.name.toLowerCase().trim() === templateName.toLowerCase().trim());

	if (!template)
		return [];

	const fields = Array<{ id: string, name: string }>();

	const variables = {
		path: template.id, // TODO: If using Delivery GraphQL Endpoint use stringToGuid(templates[i].id)
		language,
	};

	const query = gql`    
		query getItem($path: String!) {
			search(
				where: {
					AND: [
						{
							name: "_templates"
							value: $path
							operator: CONTAINS
						}       
					]
				}
				first: 1
			) {
				results {
					fields {
						id
						name
					}						
				}
				total
			}
		}
	`;

	const data = await graphQLClient.request(query, variables) as any;

	data?.search?.results[0]?.fields?.map((field: any) => {
		fields.push(
			{
				id: field?.id,
				name: field?.name
			}
		)
	});

	return { template: templateName, fields };
};

export const getTemplatesUpdatedByName = async (path: string, templateName: string, language = 'en', throttleMs = 250): Promise<any> => {
	const templates = await getTemplates(path, language, throttleMs);

	if (!templates)
		return [];

	const template = templates.find(x => x.name.toLowerCase().trim() === templateName.toLowerCase().trim());

	if (!template)
		return [];

	const content = Array<{ id: string, url: string, name: string, title: string, date: string }>();

	const variables = {
		path: template.id, // TODO: If using Delivery GraphQL Endpoint use stringToGuid(templates[i].id)
		language,
	};

	const query = gql`    
		query getItems($path: String!) {
			search(
				where: {
					AND: [
						{
							name: "_templates"
							value: $path
							operator: CONTAINS
						}       
					]
				}
				first: 5
				orderBy: { 
					name: "__Updated"
					direction: DESC 
				}
			) {
				results {
					id                      
					url {
						path
					}    
					name: displayName
					title: field(name: "Title") {
						value
					}
					updated: field(name: "__Updated") {
						value
					}						
				}
			}
		}
	`;

	const data = await graphQLClient.request(query, variables) as any;

	data?.search?.results?.map((result: any) => {
		content.push(
			{
				id: result?.id,
				url: result?.url.path,
				name: result?.name,
				title: result?.title?.value,
				date: (result.updated?.value ? stringToDate(result.updated?.value) : new Date(-62135596800000)).toISOString()
			} as any
		)
	});

	return { template: templateName, content };
}