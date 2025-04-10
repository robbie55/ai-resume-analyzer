'use client';

import { useState, ChangeEvent } from 'react';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader } from '../components/card';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface AnalysisResponse {
  feedback: string;
}

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<AnalysisResponse>(
        '/api/upload',
        formData
      );
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-800">
      <Card className="w-[500px] p-6 shadow-xl">
        {' '}
        {/* Set fixed width here */}
        <CardHeader className="text-xl font-semibold text-center text-gray-200">
          Upload Your Resume for AI Analysis
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4 border-dashed border-2 border-gray-300 p-6 rounded-lg">
            {file ? (
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-green-500" />
                <span>{file.name}</span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-gray-500" />
                <p className="text-sm text-gray-500">
                  Drag and drop your DOCX file here, or click to upload.
                </p>
              </>
            )}
            <input
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Choose File
            </label>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isUploading ? 'Uploading...' : 'Analyze Resume'}
          </Button>

          {analysis && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold">AI Feedback</h3>
              <p className="text-gray-700">{analysis.feedback}</p>
              <CheckCircle className="w-6 h-6 text-green-500 mt-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
