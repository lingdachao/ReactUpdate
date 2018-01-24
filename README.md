# ReactUpdate
###1.安装codepush服务
1.本地安装 npm install -g code-push-cli
2.查看版本 code-push -v
3.创建账号 code-push register
4.登录 		code-push login
5.创建应用 code-push app add [APPNAME]
6.查看key  code-push deployment ls 您的应用名 -k
7.其他服务
```
code-push logout注销
code-push access-key ls列出登陆的token
code-push access-key rm 删除某个 access-key

code-push app add在账号里面添加一个新的app
code-push app remove或者rm 在账号里移除一个app
code-push app rename重命名一个存在app
code-push app list或则 ls 列出账号下面的所有app
code-push app transfer把app的所有权转移到另外一个账号
```

###2.RN配置
1.npm install --save react-native-code-push
2.npm i -g rnpm
3.rnpm link react-native-code-push

```
如果link不成功,收到修改AppDelegate.m
#import "CodePush.h"
#ifdef DEBUG
	jsCodeLocation = [[RCTBundleURLProvidersharedSettings]jsBundleURLForBundleRoot:@"index.ios"fallbackResource:nil];
#else
	jsCodeLocation = [CodePush bundleURL];
#endif
```

###3.iOS配置
1.version改为精确三位数 1.0.0
2.info CodePushDeploymentKey = Staging/Production key

###4.发布更新
0.创建bundles文件夹
```
mkdir bundles
```
1.打包js
```
react-native bundle --platform ios --entry-file index.ios.js --bundle-output ./bundles/main.jsbundle --assets-dest ./bundles --dev false
```
2.上传更新
```
code-push release ReactUpdate ./bundles/ 1.0.0 --deploymentName Staging  --description "测试1" --mandatory false
```
code-push release [AppName] ./bundles/ [版本号] --deploymentName [环境] --description ["描述"] --是否强制升级 [false]
3.查看历史
```
//总体情况
code-push deployment ls [AppName] -k 
//详细情况
code-push deployment history [AppName] Staging/Production
```
4.回滚到上一级
```
code-push rollback [AppName] Staging/Production
```
5.其他命令
```
code-push deployment add 部署
code-push deployment rename [AppName] 重命名
code-push deployment rm [AppName] 删除部署
code-push deployment ls [AppName] 列出应用的部署情况
code-push deployment ls -k 查看部署的key
```

