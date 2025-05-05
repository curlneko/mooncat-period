#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AppsyncStack } from "../lib/appsync-stack";
import { CognitoStack  } from "../lib/cognito-stack";

// 環境変数からアカウントとリージョンを取得
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

// Cognitoの作成
const cognitoStack = new CognitoStack(app, 'CognitoStack', {
  env, // env を渡す
});

// Appsyncの作成
new AppsyncStack(app, "AppsyncStack", {
  cognitoStack: cognitoStack, // CognitoStack のインスタンスを渡す
  env, // env を渡す
});
