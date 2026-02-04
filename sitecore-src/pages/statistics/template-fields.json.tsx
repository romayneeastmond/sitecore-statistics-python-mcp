import { GetServerSideProps } from 'next';
import { getTemplatesFieldsByName } from '../../services/StatisticsService';

const Default: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res, req, query }) => {
	if (res && req) {
		const language = (query.lang as string) || 'en';
		const templateName = (query.templateName as string) || 'Page';

		const templatesCount = await getTemplatesFieldsByName('/sitecore/content/company-headless-tenant/company/Data/Global/Settings/Search Helpers', templateName, language);

		res.setHeader('Content-Type', 'application/json');

		res.statusCode = 200;
		res.write(JSON.stringify(templatesCount));

		res.end();
	}

	return {
		props: {},
		notFound: true
	};
};

export default Default;