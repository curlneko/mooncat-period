#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { UserStack } from "../lib/user-stack";
import { CognitoStack  } from "../lib/cognito-stack";

// 環境変数からアカウントとリージョンを取得
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

// CognitoStack の作成
const cognitoStack = new CognitoStack(app, 'CognitoStack', {
  env, // env を渡す
});
new UserStack(app, "UserStack", {
  cognitoStack: cognitoStack, // CognitoStack のインスタンスを渡す
  env, // env を渡す
});
