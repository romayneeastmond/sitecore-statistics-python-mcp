import { GetServerSideProps } from 'next';
import { getTemplates } from '../../services/StatisticsService';

const Default: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res, req, query }) => {
	if (res && req) {
		const language = (query.lang as string) || 'en';

		const templates = await getTemplates('/sitecore/content/company-headless-tenant/company/Data/Global/Settings/Search Helpers', language);

		res.setHeader('Content-Type', 'application/json');

		res.statusCode = 200;
		res.write(JSON.stringify(templates));

		res.end();
	}

	return {
		props: {},
		notFound: true
	};
};

export default Default;