const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
  },
   assetsDir:'static',
    publicPath : './' ,
})
// plugins: [
//   new GenerateAssetPlugin({
//     filename: 'config.json',
//     fn: (compilation,cb)=>{
//       cb(null, createServerConfig(compilation))
//     },
//     extraFiles: []
//   })
// ]
// const GenerateAssetPlugin = require('generate-asset-webpack-plugin');
// let createServerConfig=function(compilation){
//   let serverConfig={
//   InterfaceURL:"http://192.168.1.151:8809",//接口地址
//   };
//   return JSON.stringify(serverConfig);
//   }