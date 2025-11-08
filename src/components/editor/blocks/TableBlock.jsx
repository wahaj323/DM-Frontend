import { GripVertical, Trash2, Plus, Minus, Upload } from 'lucide-react';
import { useState } from 'react';
import TTSButton from '../TTSButton';
import { userAPI } from '../../../services/userAPI';

const TableBlock = ({ block, onUpdate, onDelete }) => {
  const [rows, setRows] = useState(block.data.rows || [[{ type: 'text', content: '' }]]);
  const [headers, setHeaders] = useState(block.data.headers || ['Column 1']);
  const [columnTypes, setColumnTypes] = useState(block.data.columnTypes || ['text']);

  const handleSave = () => {
    onUpdate(block.id, {
      ...block.data,
      rows,
      headers,
      columnTypes
    });
  };

  const addRow = () => {
    const newRow = headers.map((_, colIndex) => ({
      type: columnTypes[colIndex],
      content: ''
    }));
    setRows([...rows, newRow]);
  };

  const removeRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setColumnTypes([...columnTypes, 'text']);
    setRows(rows.map(row => [...row, { type: 'text', content: '' }]));
  };

  const removeColumn = (colIndex) => {
    setHeaders(headers.filter((_, index) => index !== colIndex));
    setColumnTypes(columnTypes.filter((_, index) => index !== colIndex));
    setRows(rows.map(row => row.filter((_, index) => index !== colIndex)));
  };

  const updateCell = (rowIndex, colIndex, content) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = {
      ...newRows[rowIndex][colIndex],
      content
    };
    setRows(newRows);
  };

  const updateHeader = (colIndex, value) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    setHeaders(newHeaders);
  };

  const updateColumnType = (colIndex, type) => {
    const newColumnTypes = [...columnTypes];
    newColumnTypes[colIndex] = type;
    setColumnTypes(newColumnTypes);

    const newRows = rows.map(row => {
      const newRow = [...row];
      newRow[colIndex] = { type, content: type === 'image' ? '' : row[colIndex].content };
      return newRow;
    });
    setRows(newRows);
  };

  const handleImageUpload = async (rowIndex, colIndex, file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      const result = await userAPI.uploadProfileImage(file);
      updateCell(rowIndex, colIndex, result.profileImage);
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase ml-8">Table</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={addRow}
            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Row
          </button>
          <button
            onClick={addColumn}
            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Column
          </button>
          <button
            onClick={handleSave}
            className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header, colIndex) => (
                <th key={colIndex} className="border border-gray-300 p-2">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateHeader(colIndex, e.target.value)}
                      onBlur={handleSave}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Header"
                    />
                    <div className="flex items-center justify-between">
                      <select
                        value={columnTypes[colIndex]}
                        onChange={(e) => updateColumnType(colIndex, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                      </select>
                      {headers.length > 1 && (
                        <button
                          onClick={() => removeColumn(colIndex)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-2">
                    {cell.type === 'image' ? (
                      <div className="space-y-2">
                        {cell.content ? (
                          <img
                            src={cell.content}
                            alt="Table cell"
                            className="w-full h-20 object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No image</span>
                          </div>
                        )}
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(rowIndex, colIndex, e.target.files[0])}
                            className="hidden"
                          />
                          <div className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded cursor-pointer text-center">
                            <Upload className="w-3 h-3 inline mr-1" />
                            Upload
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <textarea
                          value={cell.content}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                          onBlur={handleSave}
                          rows="2"
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded resize-none"
                          placeholder="Enter text..."
                        />
                        {cell.content && <TTSButton text={cell.content} className="flex-shrink-0" />}
                      </div>
                    )}
                  </td>
                ))}
                {rows.length > 1 && (
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => removeRow(rowIndex)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBlock;