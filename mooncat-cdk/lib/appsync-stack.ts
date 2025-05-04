import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import path = require("path");

import * as appsync from "aws-cdk-lib/aws-appsync";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

import { CognitoStack } from './cognito-stack';

export class AppsyncStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps & {cognitoStack: CognitoStack}) {
    super(scope, id, props);

    // props が undefined でないことを確認
    if (!props || !props.cognitoStack) {
      throw new Error('CognitoStack is required.');
    }

    // CognitoStack から userPool を受け取る
    const userPool = props.cognitoStack.userPool;

    // appsync
    const api = new appsync.GraphqlApi(this, "Api", {
      name: "MoonCatUserApi",
      schema: appsync.SchemaFile.fromAsset(
        path.join(__dirname, "../schemas/schema.graphql")
      ),
      authorizationConfig: {
        // defaultAuthorization: {
        //   authorizationType: appsync.AuthorizationType.API_KEY,
        // },
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: userPool, // 先ほど作成した UserPool
          },
        },
      },
    });

    // dynamodb
    const table = new dynamodb.Table(this, "MooncatUserTable", {
      tableName: "mooncat-user",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      // sortKey: {
      //   name: "name",
      //   type: dynamodb.AttributeType.STRING,
      // },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // cdk destroyでDB削除可
    });

    // appsyncのdatasource
    const dataSource = api.addDynamoDbDataSource("DynamoDataSource", table);

    // query
    dataSource.createResolver("getMoonCatUsersResolver", {
      typeName: "Query",
      fieldName: "getMoonCatUsers",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    dataSource.createResolver("getMoonCatUserResolver", {
      typeName: "Query",
      fieldName: "getMoonCatUser",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem('id', 'id'),
      // requestMappingTemplate: appsync.MappingTemplate.dynamoDbQuery(
      //   appsync.KeyCondition.eq("id", "id")
      // ),
      // requestMappingTemplate: appsync.MappingTemplate.fromFile(
      //   path.join(__dirname, "../vtl/get_user.vtl")
      // ),
      // responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // mutation
    dataSource.createResolver("addMoonCatUserResolver", {
      typeName: "Mutation",
      fieldName: "addMoonCatUser",
      // requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
      //   appsync.PrimaryKey.partition("id").auto().sort("name").is("input.name"),
      //   appsync.Values.projecting("input")
      // ),
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").auto(),
        appsync.Values.projecting("input")
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    dataSource.createResolver("updateMoonCatUserResolver", {
      typeName: "Mutation",
      fieldName: "updateMoonCatUser",
      // requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
      //   appsync.PrimaryKey.partition("id")
      //     .is("input.id")
      //     .sort("name")
      //     .is("input.name"),
      //   appsync.Values.projecting("input")
      // ),
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").is("input.id"),
        appsync.Values.projecting("input")
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    dataSource.createResolver("DeleteMoonCatUserResolver", {
      typeName: "Mutation",
      fieldName: "deleteMoonCatUser",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem(
        "id",
        "id"
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });
  }
}
