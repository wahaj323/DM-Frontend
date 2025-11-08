import { GripVertical, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { userAPI } from '../../../services/userAPI';

const ImageBlock = ({ block, onUpdate, onDelete }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(block.data.url || '');
  const [caption, setCaption] = useState(block.data.caption || '');
  const [alt, setAlt] = useState(block.data.alt || '');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const result = await userAPI.uploadProfileImage(file);
      setImageUrl(result.profileImage);
      onUpdate(block.id, {
        ...block.data,
        url: result.profileImage,
        caption,
        alt
      });
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onUpdate(block.id, {
      ...block.data,
      url: imageUrl,
      caption,
      alt
    });
  };

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase ml-8">Image</span>
        <button
          onClick={() => onDelete(block.id)}
          className="p-1 text-red-600 hover:bg-red-50 rounded transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {imageUrl ? (
          <div>
            <img
              src={imageUrl}
              alt={alt || 'Lesson image'}
              className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 mb-3">No image uploaded</p>
          </div>
        )}

        <div>
          <label className="block w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
            <div className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition">
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Uploading...' : imageUrl ? 'Change Image' : 'Upload Image'}</span>
            </div>
          </label>
        </div>

        <div>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={handleSave}
            placeholder="Image caption (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            onBlur={handleSave}
            placeholder="Alt text for accessibility"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageBlock;