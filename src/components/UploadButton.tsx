import React, { useCallback, useState } from 'react';
import { UploadState } from '../types';

interface UploadButtonProps {
  onFileSelect: (file: File) => void;
  uploadState: UploadState;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect, uploadState }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`upload-zone ${isDragging ? 'dragging' : ''} ${uploadState.status}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        disabled={uploadState.status === 'uploading' || uploadState.status === 'analyzing'}
      />
      <div className="upload-content">
        {uploadState.status === 'idle' && (
          <>
            <span className="upload-icon">📁</span>
            <p>Drag and drop your audio file here or click to browse</p>
            <small>Supports WAV, MP3, AAC, and FLAC formats</small>
          </>
        )}
        {(uploadState.status === 'uploading' || uploadState.status === 'analyzing') && (
          <>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${uploadState.progress}%` }}></div>
            </div>
            <p>{uploadState.status === 'uploading' ? 'Uploading...' : 'Analyzing...'}</p>
            {uploadState.fileName && <small>{uploadState.fileName}</small>}
          </>
        )}
      </div>
    </div>
  );
};
