from flask import Flask, request, Response
from pdf2docx import Converter
import tempfile
import base64

app = Flask(__name__)

@app.post('/pdf-to-docx')
def pdf_to_docx():
  try:
    data = request.data
    assert isinstance(data, bytes), 'Invalid Data Type'

    # Write buffer to a temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tempPdf:
      tempPdf.write(data)
      tempPdfPath = tempPdf.name
    tempDocxPath = tempPdfPath.replace('.pdf', '.docx')

    # convert pdf to docx
    cv = Converter(tempPdfPath)
    cv.convert(tempDocxPath)
    cv.close()

    # read docx into memory
    with open(tempDocxPath, 'rb') as docxFile:
      docxBuffer = docxFile.read()
    
    # Bytes can't be JSON, so convert to byte array
    docxByteArray = bytearray(docxBuffer)
    encodedData = base64.b64encode(bytes(docxByteArray)).decode('utf-8')

    return Response(encodedData, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  except AssertionError:
    print(f'Assertion Error: {AssertionError}')
    print('what')
    return Response('Invalid Data Type', status=500)
  except Exception as e:
    print(f"General Exception Raised: {e}")
    return Response('Exception Occured', status=500)