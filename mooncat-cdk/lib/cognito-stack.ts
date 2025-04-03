import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as cognito from "aws-cdk-lib/aws-cognito";

export class CognitoStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(this, "MoonCatUserPool", {
      userPoolName: "MoonCatUserPool",
      selfSignUpEnabled: true, // ユーザーがサインアップ可能
      signInAliases: { email: true }, // メールアドレスでログイン
      autoVerify: { email: true }, // メールアドレスの自動検証
      standardAttributes: {
        email: { required: true, mutable: true }, // メールアドレスを必須属性、変更可
      },
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY, //パスワード忘れ時にメールのみでアカウント回復
    });

    const userPoolClient = new cognito.UserPoolClient(
      this,
      "MoonCatUserPoolClient",
      {
        userPool: this.userPool,
        userPoolClientName: "MoonCatUserPoolClient",
        authFlows: {
          userPassword: true, // ユーザー名 & パスワード認証
          userSrp: true, // SRP (セキュアリモートパスワード) 認証
        },
        accessTokenValidity: cdk.Duration.hours(1), // アクセストークンの有効期限 (デフォルト 1時間)
        idTokenValidity: cdk.Duration.hours(1), // IDトークンの有効期限 (デフォルト 1時間)
        refreshTokenValidity: cdk.Duration.days(30), // リフレッシュトークンの有効期限 (デフォルト 30日)
        preventUserExistenceErrors: true, // セキュリティ向上のための設定
      }
    );

    const adminGroup = new cognito.CfnUserPoolGroup(this, "AdminGroup", {
      groupName: "Admin",
      userPoolId: this.userPool.userPoolId,
      description: "管理者",
      precedence: 1, // 優先度 (数値が小さい方が優先)
    });

    const userGroup = new cognito.CfnUserPoolGroup(this, "userGroup", {
      groupName: "User",
      userPoolId: this.userPool.userPoolId,
      description: "一般ユーザー",
      precedence: 10,
    });

    // ユーザープールの ID とクライアント ID を出力
    new cdk.CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
