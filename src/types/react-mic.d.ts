declare module 'react-mic' {
  import { PureComponent } from 'react';

  export interface ReactMicProps {
    record?: boolean;
    pause?: boolean;
    className?: string;
    onStop?: (recordedBlob: { blob: Blob; blobURL: string }) => void;
    onStart?: () => void;
    onData?: (recordedBlob: Blob) => void;
    strokeColor?: string;
    backgroundColor?: string;
    mimeType?: string;
    channelCount?: number;
    sampleRate?: number;
    audioBitsPerSecond?: number;
    echoCancellation?: boolean;
    autoGainControl?: boolean;
    noiseSuppression?: boolean;
    timeSlice?: number;
  }

  export class ReactMic extends PureComponent<ReactMicProps> {
    refs: {
      [key: string]: any;
    };
  }
} 