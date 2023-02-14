module.exports = {
	// Configuration.
	ip : '192.81.134.169',
	port : 5000,
	globalStyleDependencies : [],
	globalComponentDependencies : [
		'/component/Navbar.js',
	],
	pageRoutes : [
		{
			urlPath       : '/',
			pageTitle     : 'My App',
			rootComponent : 'MainPage',
			componentDependencies : [
				'/component/Student.js',
			],
		},
		{
			urlPath       : '/other',
			pageTitle     : 'My App (Other)',
			rootComponent : 'OtherPage',
			componentDependencies : [
				'/component/Student.js',
			],
		},
		{
			urlPath       : '/view',
			pageTitle     : 'View All Students',
			rootComponent : 'ViewAllStudents',
			componentDependencies : [
				'/component/Student.js',
			],
		},
		{
			urlPath       : '/raw-api',
			pageTitle     : 'Raw API',
			rootComponent : 'RawApi',
			styleDependencies : [
				'/css/RawApi.css',
			],
			componentDependencies : [],
		},
	],
	mongodbSpecification : [
		{
			collectionName          : 'Students',
			singularName            : 'Student',
			apiBaseRoute            : '/api/student/',
			schemaPath              : '/backend/mongodb/schema/Students.js',
			apiHandlerGeneratorPath : '/backend/api/generic.js',
		},
		{
			collectionName          : 'Users',
			singularName            : 'User',
			apiBaseRoute            : '/api/user/',
			schemaPath              : '/backend/mongodb/schema/Users.js',
			apiHandlerGeneratorPath : '/backend/api/generic.js',
		},
	],
};