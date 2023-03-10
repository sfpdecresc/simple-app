const bcrypt   = require('bcrypt'   );
const mongoose = require('mongoose' );
const crypto   = require('crypto'   );
const cliColor = require('cli-color');
module.exports = {
	
	//
	now : ()=>Date.now()/1000,
	
	//
	error : function(internalErrorDetails){
		if (typeof internalErrorDetails === "string"){
			console.log('');
			console.log(cliColor.red('[Error] : (see below)'));
			console.trace(internalErrorDetails);
			console.log('');
		}
		else{
			console.log('');
			console.log(cliColor.red('[Error] : (see below)'));
			console.log(internalErrorDetails);
			console.log('');
		}
	},
	objectIsEmpty : function(object){
		return Object.keys(object).length === 0;
	},
	
	// More wordily named "generateExceptionWrappedApiFunction".
	genApiWrap : function(fxn){
		return (function(that,fxn){return async function(req,res){
			try {
				await fxn(req,res);
			}
			catch (error){
				that.error(error);
			}
		};})(this,fxn);
	},
	
	//
	ok : function(res,payload={}){
		res.status(200).json({
			status : true,
			statusDetails : '',
			payload,
		});
		return true;
	},
	ng : function(res,statusDetails){
		res.status(200).json({
			status : false,
			statusDetails,
			payload : {},
		});
		return undefined;
	},
	
	// Generate the base HTML that is rendered on each page, before React is applied.
	generateBaseHtml : function(route,globalStyleDependencies,globalComponentDependencies){
		const page = `\
			<!DOCTYPE html>
			<html>
			<head>
				<title>${route.pageTitle}</title>
				<link href="/css/global.css" rel="stylesheet">
				<link href="/css/bootstrap.min.css" rel="stylesheet">
				${route.styleDependencies.map(path=>`<link href="${path}" rel="stylesheet">`).join('\n\t')}
				<script src="/js/lib-front.js"></script>
				<script src="/js/react.production.min.js"></script>
				<script src="/js/react-dom.production.min.js"></script>
				<script src="/js/react-bootstrap.min.js"></script>
				<script type="module">
					import ${route.rootComponent} from "/page/${route.rootComponent}.js";
					window.${route.rootComponent} = ${route.rootComponent};
				</script>
				<style src="/js/react-bootstrap.min.js"></style>
				<script>
					document.addEventListener('DOMContentLoaded',async function(){
						ReactDOM.createRoot(document.querySelector('#react-root')).render(await ${route.rootComponent}());
					});
				</script>
			</head>
			<body>
				<div id="react-root"></div>
			</body>
			</html>`.replace(/^\t{3}/gm,''); // Attempt to remove leading js code indentation so it looks nice on the client.
		return page;
	},
};