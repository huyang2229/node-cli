/**
 * 自动化模块——选取项目配置文件
 */
 module.exports = {
 	// 项目名字
 	name: [
	    {
	      	type: 'list',
	      	name: 'name',
	      	message: '请选择要发布的项目',
	      	choices: [
	        	{
		          	name: '世界杯项目',
		          	value: 'A'
	        	}
	      ]
	    }
  	],
  	// 项目环境
  	type: [
  		{
  			type: 'list',
  			name: 'type',
  			message: '请选择发布环境',
  			choices: [
  				{
  					name: '联调环境',
  					value: 'DEV'
  				},
  				{
  					name: '测试环境',
  					value: 'TEST'
  				}
  			]
  		}
  	],
  	// 询问是否需要走编译流程
  	compile: [
  		{
  			type: 'list',
  			name: 'compile',
  			message: '是否需要走编译流程',
  			choices: [
  				{
  					name: '需要',
  					value: true
  				},
  				{
  					name: '不需要',
  					value: false
  				}
  			]
  		}
  	]
 }
