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

// 线上正式环境服务器
const serviceC = {
	host: "13.229.202.26",
	username: "centos",
	privateKey: '/Users/William/.ssh/sin.pem'
}

module.exports = {
	// 世界杯项目联调环境
	'A-DEV': {
		service: serviceA,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup/dist',
		remotePath: '/data/project/worldcup-fd',
		command: 'cnpm run build-debug'
	},
	// 世界杯项目测试环境
	'A-TEST': {
		service: serviceB,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup/dist',
		remotePath: '/data/wwwroot/worldcup/worldcup.test',
		command: 'cnpm run build-test'
	},
	'A-PROD': {
		service: serviceC,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup/dist',
		remotePath: '/data/wwwroot/world-cup.games/dist',
		command: 'cnpm run build-prod'
	},
	// 世界杯管理联调环境
	'B-DEV': {
		service: serviceA,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup-admin/dist',
		remotePath: '/data/project/manage.worlcup.test',
		command: 'cnpm run build'
	},
	// 世界杯管理测试环境
	'B-TEST': {
		service: serviceB,
		localPath: '/Users/William/Desktop/kuaiwan/world-cup-admin/dist',
		remotePath: '/data/wwwroot/worldcup/manage.worldcup.test',
		command: 'cnpm run build'
	}
}
