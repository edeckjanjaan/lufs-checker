export interface LUFSResult {
  platform: 'YouTube' | 'Spotify' | 'AppleMusic';
  targetLUFS: number;
  measuredLUFS: number;
  difference: number;
  isCompliant: boolean;
}

export interface UploadState {
  status: 'idle' | 'hovering' | 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
  fileName?: string;
  fileSize?: number;
}