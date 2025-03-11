from aws_cdk import (
    # Duration,
    Stack,
    aws_lambda as _lambda,
    aws_apigateway as _apiGateway,
    aws_iam as iam
)
from constructs import Construct

class PdfLambdaStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create Lambda
        pdfLambda = _lambda.Function(
            self,
            "PdfToDocx",
            runtime = _lambda.Runtime.PYTHON_3_12,
            handler = "index.handler",
            code = _lambda.Code.from_asset("src/"),
        )

        # Setup API
        api = _apiGateway.LambdaRestApi(
            self,
            "PdfToDocxApi",
            handler=pdfLambda,
            proxy=True
        )

        # # Get Server IAM Role
        # TBD
        # serverRole = iam.Role.from_role_arn(
        #     self,
        #     "ServerRole",
        #     "arn:aws:iam::319921948801:user/resume-app-user",
        #     mutable=True
        # )

        # serverRole.add_to_principal_policy(iam.PolicyStatement(
        #     actions=["execute-api:Invoke"],
        #     resources=[f"{api.arn_for_execute_api()}"],
        #     effect=iam.Effect.ALLOW
        # ))
