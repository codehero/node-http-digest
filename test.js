var digest = require("./digest");
var sys = require("sys");

var digestClient = digest.createClient(2316, "localhost", "admin", "admin");
var hdrs = {
	"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"host":"localhost:2316",
	"accept-encoding":"gzip,deflate"
};

var maxIterations = 3;

function makeReq(i){
	if(i == maxIterations)
		return;
	sys.puts("makeReq " + i);

	var req = digestClient.request("GET", "/", hdrs);
	req.addListener("response", function(response){
		sys.puts("iteration: " + i);
		sys.puts('STATUS: ' + response.statusCode);
		sys.puts('HEADERS: ' + JSON.stringify(response.headers));
		response.setEncoding('utf8');
		response.addListener('data', function (chunk) {
			sys.puts('BODY: ' + chunk);
		});
		makeReq(i + 1);
	});

	req.end();
}

makeReq(0);
