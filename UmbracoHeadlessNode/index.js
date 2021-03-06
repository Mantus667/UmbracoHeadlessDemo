var UmbracoHeadless = require('umbraco-headless');

// this will change when proper token authentication is added
var config = {
    url: "https://davids-placid-giraffe.s1.umbraco.io/",
    username: "api@davidbrendel.de",
    password: "&>u08E_i:r",
    imageBaseUrl: "https://davids-placid-giraffe.s1.umbraco.io/"
};

//to use async / await we must run all code inside a async function
async function run(){

    //create a new instance of the client
    var headlessService = new UmbracoHeadless.HeadlessService(config);

    //the client will implicitly authenticate if you don't do it manually
    await headlessService.authenticate();

    //client is connected and ready

    //get the site
    // NOTE: this currently will not work without a content item as it needs to be implemented.
    // getSite will only work when called WITH a content item argument (getting the ancestor site of that content item).
    // var site = await headlessService.getSite(content);
    // console.log("site name: " + site.name);
    // until implemented - get the site using a query or a Id.
	
    //get a specific item by id
    var site = await headlessService.getById(1059);
	
    //the returned node contains all properties
    //console.log("my custom property:", site.myPropertyAlias);

    //it can also be used to navigate by
    var firstChild = await headlessService.getFirstChild(site);

    //multiple results will be wrapped in a paged result
    var children = await headlessService.getChildren(site);
    console.log("total results: ", children.totalResults);
    
    //results on the page can be iterated in the .results array
    console.log("first result of this paged result: ", children.results[0]);
    
    //get a content item by url
    // NOTE: not implemented yet!
    //var contentByUrl = await headlessService.getByUrl("/my-content");
}

//run the async function
run();