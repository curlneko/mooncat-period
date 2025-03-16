#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MooncatCdkStack } from "../lib/mooncat-cdk-stack";

const app = new cdk.App();
new MooncatCdkStack(app, "MooncatCdkStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
