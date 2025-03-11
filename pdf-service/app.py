#!/usr/bin/env python3
import aws_cdk as cdk

from app.pdf_stack import PdfLambdaStack


app = cdk.App()
PdfLambdaStack(app, "CdkStack", env=cdk.Environment(account='319921948801', region='us-east-2'),)

app.synth()
