/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import CodePush from "react-native-code-push";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {

  constructor(){
    super();
    this.state = {
      syncMessage: '',
      progress: 0,
    }
  }

  //简单更新
  sync() {
    CodePush.sync();
  }

  //配置更新
  syncImmediate() {
   CodePush.sync({ 
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,//启动模式三种：ON_NEXT_RESUME、ON_NEXT_RESTART、IMMEDIATE
      updateDialog: {
          appendReleaseDescription:true,//是否显示更新description，默认为false
          descriptionPrefix:"更新内容：",//更新说明的前缀。 默认是” Description:
          mandatoryContinueButtonLabel:"立即更新",//强制更新的按钮文字，默认为continue
          mandatoryUpdateMessage:"强制更新",//- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
          optionalIgnoreButtonLabel: '稍后',//非强制更新时，取消按钮文字,默认是ignore
          optionalInstallButtonLabel: '后台更新',//非强制更新时，确认文字. Defaults to “Install”
          optionalUpdateMessage: '有新版本了，是否更新？',//非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
          title: '更新提示'//要显示的更新通知的标题. Defaults to “Update available”.
        }},
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this),
    );
  }

  //更新回调
  codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: 0 });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: 0 });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: 0 });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: 0 });
        break;
    }
  }
  
  //更新进度
  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  componentWillMount(){
    //禁止更新
    // CodePush.disallowRestart();
  }

  componentDidMount() {
    //启动检测更新
    // CodePush.allowRestart();
    this.syncImmediate();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         Welcome to React Native!
        </Text>
        {/* <Text>{this.state.progress}</Text> */}
        <Text style={styles.welcome}>
          {this.state.syncMessage}
        </Text>
        <TouchableOpacity onPress={this.sync.bind(this)}>
          <Text style={styles.syncButton}>Press for background sync</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
          <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
        </TouchableOpacity>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10, 
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  syncButton: {
    marginTop: 60,
    color: "green",
    fontSize: 17
  },
});

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };

export default CodePush(codePushOptions)(App);