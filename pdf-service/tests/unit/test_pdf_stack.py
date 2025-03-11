import aws_cdk as core
import aws_cdk.assertions as assertions

from pdf.pdf_stack import PdfStack

# example tests. To run these tests, uncomment this file along with the example
# resource in pdf/pdf_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PdfStack(app, "pdf")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
