// 联调环境服务器
const serviceA = {
	host: "47.106.37.187",
	username: "root",
	password: "CryptopuppysTest123"
}

// 测试环境服务器
const serviceB = {
	host: "52.83.214.129",
	username: "worldcup",
	privateKey: '/Users/William/.ssh/id_rsa'
}

module.exports = {
	// 世界杯项目联调环境
	'A-DEV': {
		service: serviceA,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup/dist',
		remotePath: '/data/project/worldcup-fd'
	},
	// 世界杯项目测试环境
	'A-TEST': {
		service: serviceB,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup/dist',
		remotePath: '/data/wwwroot/worldcup/worldcup.test'
	}
}
