const cp = require('child_process');

var worker;

function spawn(server) {
	worker = cp.spawn('node', [ server]);
	worker.on('exit', function (code) {
		if (code !== 0) {
			spawn(server);
		}
	});
}

function main() {
	spawn('server.js');
	process.on('SIGTERM', function () {
		worker.kill();
		process.exit(0);
	});
}

main();
