import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface ImageUploaderProps {
  onChange: (files: FileList) => void;
  multiple?: boolean;
  tooltip?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  multiple = false,
  tooltip = 'Upload images',
}) => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleFileChange = (files: FileList) => {
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setImageURLs(urls);
    onChange(files);
  };

  const handleDeleteImage = (index: number) => {
    setImageURLs(prevURLs => prevURLs.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Tooltip title={tooltip}>
        <Input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={e => {
            if (e.target.files) {
              handleFileChange(e.target.files);
            }
          }}
        />
      </Tooltip>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {imageURLs.map((url, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={url}
              alt={`Uploaded Image ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <DeleteOutlined
              onClick={() => handleDeleteImage(index)}
              style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: 'red' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
