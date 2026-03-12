#!/usr/bin/env node
/**
 * 自动上传云函数脚本
 * 使用 miniprogram-ci 上传到微信云开发
 */

const ci = require('miniprogram-ci');
const path = require('path');
const fs = require('fs');

// 小程序配置
const PROJECT_CONFIG = {
  appid: 'wx56c3905e36b5732c',
  type: 'miniProgram',
  projectPath: path.join(__dirname),
  privateKeyPath: path.join(__dirname, 'private.key'),
  ignores: ['node_modules/**/*', 'deploy-cloud-functions.js', 'private.key', '.git/**/*']
};

// 云函数列表
const CLOUD_FUNCTIONS = [
  'initDatabase',
  'getQuestions',
  'getUserInfo',
  'saveMistake',
  'getMistakes',
  'deleteMistake',
  'updateUserStats',
  'checkIn',
  'getStudyTrend',
  'submitFeedback',
  'batchImportQuestions'
];

// 云环境 ID
const CLOUD_ENV = 'cloud1-0g2wucle222c5442';

async function deployCloudFunction(functionName) {
  const functionPath = path.join(__dirname, 'cloudfunctions', functionName);
  
  console.log(`\n📦 正在上传云函数: ${functionName}...`);
  
  try {
    // 检查文件夹是否存在
    if (!fs.existsSync(functionPath)) {
      console.error(`❌ 云函数文件夹不存在: ${functionPath}`);
      return false;
    }

    // 检查 package.json 是否存在
    const packageJsonPath = path.join(functionPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.error(`❌ 缺少 package.json: ${packageJsonPath}`);
      return false;
    }

    // 使用 miniprogram-ci 上传云函数
    const project = new ci.Project(PROJECT_CONFIG);
    
    await ci.cloud.uploadFunction({
      project,
      env: CLOUD_ENV,
      name: functionName,
      path: functionPath,
      // 云端安装依赖
      installDependencies: true
    });

    console.log(`✅ ${functionName} 上传成功`);
    return true;
  } catch (err) {
    console.error(`❌ ${functionName} 上传失败:`, err.message);
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('   微信小程序云函数自动部署工具');
  console.log('========================================');
  console.log(`云环境: ${CLOUD_ENV}`);
  console.log(`AppID: ${PROJECT_CONFIG.appid}`);
  console.log(`共 ${CLOUD_FUNCTIONS.length} 个云函数`);
  
  // 检查 private.key 是否存在
  if (!fs.existsSync(PROJECT_CONFIG.privateKeyPath)) {
    console.error('\n❌ 错误: 缺少 private.key 文件');
    console.log('\n请按以下步骤获取 private.key:');
    console.log('1. 登录微信公众平台 https://mp.weixin.qq.com');
    console.log('2. 进入「开发」→「开发管理」→「开发设置」');
    console.log('3. 找到「小程序代码上传」→「生成密钥」');
    console.log('4. 下载密钥文件并重命名为 private.key，放在项目根目录');
    console.log('\n或者使用微信开发者工具手动上传云函数（推荐）');
    process.exit(1);
  }

  const results = [];
  
  for (const funcName of CLOUD_FUNCTIONS) {
    const success = await deployCloudFunction(funcName);
    results.push({ name: funcName, success });
    // 稍微延迟，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 统计结果
  console.log('\n========================================');
  console.log('           部署结果统计');
  console.log('========================================');
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.length - successCount;
  
  results.forEach(r => {
    console.log(`${r.success ? '✅' : '❌'} ${r.name}`);
  });
  
  console.log(`\n总计: ${results.length} 个云函数`);
  console.log(`成功: ${successCount} 个`);
  console.log(`失败: ${failCount} 个`);
  
  if (failCount > 0) {
    console.log('\n失败的云函数请尝试在微信开发者工具中手动上传');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('部署失败:', err);
  process.exit(1);
});
