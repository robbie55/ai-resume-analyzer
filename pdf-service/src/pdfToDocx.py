import tempfile
import boto3
import botocore
from pdf2docx import Converter

def handler(event, context): 
  print(f'boto3 version: {boto3.__version__}')
  print(f'botocore version: {botocore.__version__}')
  pdfBuffer: bytes = event["pdfBuffer"];
  docxBuffer: bytes = convertPdfToDocx(pdfBuffer);

  return {
    "statusCode": 200,
    "headers": {"Content-Type" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    "body" : docxBuffer
  }

def convertPdfToDocx(pdfBuffer: bytes) -> bytes:
  # Write bufffer to a temp file
  with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tempPdf:
    tempPdf.write(pdfBuffer)
    tempPdfPath = tempPdf.name;

  tempDocxPath = tempPdfPath.replace(".pdf", ".docx");

  # convert pdf to docx
  cv = Converter(tempPdfPath);
  cv.convert(tempDocxPath);
  cv.close();

  # Read DOCX file into memory
  with open(tempDocxPath, "rb") as docxFile:
    docxBuffer = docxFile.read();

  return docxBuffer;

   

# Manually call the function for testing
if __name__ == "__main__":
    lambda_handler({}, {})