import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BlockToolbar from './BlockToolbar';
import HeadingBlock from './blocks/HeadingBlock';
import ParagraphBlock from './blocks/ParagraphBlock';
import ImageBlock from './blocks/ImageBlock';
import TableBlock from './blocks/TableBlock';
import DialogueBlock from './blocks/DialogueBlock';
import VocabularyBlock from './blocks/VocabularyBlock';
import GrammarBox from './blocks/GrammarBox';
import NoteBlock from './blocks/NoteBlock';

const BlockEditor = ({ blocks, onChange }) => {
  const [localBlocks, setLocalBlocks] = useState(blocks || []);

  const generateBlockId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddBlock = (type) => {
    const newBlock = {
      id: generateBlockId(),
      type,
      order: localBlocks.length,
      data: getDefaultDataForType(type)
    };

    const updatedBlocks = [...localBlocks, newBlock];
    setLocalBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const getDefaultDataForType = (type) => {
    switch (type) {
      case 'heading':
        return { text: '', level: 2 };
      case 'paragraph':
        return { text: '', hasAudio: false };
      case 'image':
        return { url: '', caption: '', alt: '' };
      case 'table':
        return { 
          headers: ['Column 1', 'Column 2'], 
          columnTypes: ['text', 'text'],
          rows: [[{ type: 'text', content: '' }, { type: 'text', content: '' }]]
        };
      case 'dialogue':
        return { lines: [{ speaker: 'Person A', text: '', translation: '' }] };
      case 'vocabulary':
        return { words: [{ word: '', gender: '', meaning: '', exampleDe: '', exampleEn: '' }] };
      case 'grammar':
        return { title: '', content: '' };
      case 'note':
        return { content: '', noteType: 'info' };
      default:
        return {};
    }
  };

  const handleUpdateBlock = (blockId, newData) => {
    const updatedBlocks = localBlocks.map(block =>
      block.id === blockId ? { ...block, data: newData } : block
    );
    setLocalBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const handleDeleteBlock = (blockId) => {
    const updatedBlocks = localBlocks.filter(block => block.id !== blockId);
    // Reorder remaining blocks
    const reorderedBlocks = updatedBlocks.map((block, index) => ({
      ...block,
      order: index
    }));
    setLocalBlocks(reorderedBlocks);
    onChange(reorderedBlocks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(localBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const reorderedBlocks = items.map((block, index) => ({
      ...block,
      order: index
    }));

    setLocalBlocks(reorderedBlocks);
    onChange(reorderedBlocks);
  };

  const renderBlock = (block, index) => {
    const commonProps = {
      block,
      onUpdate: handleUpdateBlock,
      onDelete: handleDeleteBlock
    };

    switch (block.type) {
      case 'heading':
        return <HeadingBlock {...commonProps} />;
      case 'paragraph':
        return <ParagraphBlock {...commonProps} />;
      case 'image':
        return <ImageBlock {...commonProps} />;
      case 'table':
        return <TableBlock {...commonProps} />;
      case 'dialogue':
        return <DialogueBlock {...commonProps} />;
      case 'vocabulary':
        return <VocabularyBlock {...commonProps} />;
      case 'grammar':
        return <GrammarBox {...commonProps} />;
      case 'note':
        return <NoteBlock {...commonProps} />;
      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <BlockToolbar onAddBlock={handleAddBlock} />
          <div className="text-sm text-gray-600">
            {localBlocks.length} {localBlocks.length === 1 ? 'block' : 'blocks'}
          </div>
        </div>
      </div>

      {/* Blocks */}
      {localBlocks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">No content blocks yet</p>
          <p className="text-sm text-gray-500">Click "Add Block" to start creating your lesson</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {localBlocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? 'opacity-50' : ''}
                      >
                        {renderBlock(block, index)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default BlockEditor;