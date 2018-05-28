const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const shell = require('shelljs')
const node_ssh = require('node-ssh')
const ssh = new node_ssh()

const log = console.log

// 导入选项配置
const promptConfig = require('./config.prompt')
// 导入服务器配置
const serviceConfig = require('./config.service')

// 字段字典
const TEXTDATA = {
  'A': '世界杯项目',
  'DEV': '联调环境',
  'TEST': '测试环境',
  'true': '需要',
  "false": '不需要'

}

// 添加一个名字为 a 别名为 automation 的命令模块
program
  .command('a')
  .alias('automation')
  .description('前端自动化发布系统')
  .action(async option => {
    // 项目名称
    let { name } = await inquirer.prompt(promptConfig.name)
    // 项目环境
    let { type } = await inquirer.prompt(promptConfig.type)
    // 是否需要编译打包
    let { compile } = await inquirer.prompt(promptConfig.compile)

    // 确认选项
    log('请确认你选择了以下选项')
    log(chalk.green('项目名称：') + chalk.red(TEXTDATA[name]))
    log(chalk.green('项目环境：') + chalk.red(TEXTDATA[type]))
    log(chalk.green('是否需要编译打包：') + chalk.red(TEXTDATA[compile]))
    
    // 获取配置
    let config = serviceConfig[`${name}-${type}`]

    log(`使用服务器配置：${name}-${type}`)

    // 编译项目
    if (compile) {
      updateAndCompile(config, type)  
    }

    // 连接服务器
    await connectService(config)

    // 上传文件
    await updateFile(config)
  })

program.parse(process.argv)

/**
 * 上传文件
 * @param  {Object} config 项目配置
 */
async function connectService (config) {
	log('尝试连接服务：' + chalk.red(config.service.host))
	let spinner = ora('正在连接')
	spinner.start()
	await ssh.connect(config.service)
	spinner.stop()
	log('已成功连接上服务器')
}


/**
 * 更新代码版本并进行编译源码
 * @param  {Object} config 项目配置
 * @param  {String} type   编译类型
 */
async function updateAndCompile (config, type) {
	// 进入项目本地目录
	shell.cd('~/Desktop/kuaiwan/world-cup')
	// 从远程代码库拉取最新代码
	shell.exec('git pull')
	if (type === 'DEV') {
		log('联调环境编译开始')
		shell.exec('cnpm run build-debug')
	} else {
		log('测试 环境编译开始')
		shell.exec('cnpm run build-test')
	}
	log('编译完成')
}

/**
 * 上传文件
 * @param  {Object} config 项目配置
 */

async function updateFile (config) {
	// 存储失败序列
  	let failed = []
  	// 存储成功序列
  	let successful = []
  	let spinner = ora('准备上传文件').start()
  	// 上传文件夹
  	let status = await ssh.putDirectory(config.localPath, config.remotePath, {
    	// 递归
    	recursive: true,
    	// 并发数
    	concurrency: 10,
    	tick (localPath, remotePath, error) {
	      if (error) {
	        failed.push(localPath)
	      } else {
	        spinner.text = '正在上传文件：' + localPath
	        successful.push(localPath)
	      }
	    }
  	})
  	spinner.stop()
  	if (status) { 
    	log(chalk.green('完成上传'))
  	} else {
    	log(chalk.red('上传失败'))
  	}
  	if (failed.length > 0) {
    	log(`一共有${chalk.red(failed.length)}个上传失败的文件`)
    	log(failed)
  	}
}

