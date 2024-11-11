import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { Text, Avatar } from 'suftnet-ui-kit';
import NoteForm from './note-form';

const NotePanel = ({ row, isPanelOpen, handlePanelToggle }) => {
  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''}`}>
      <div className="__header flex-row justify-content-between align-items-center">
        <Text as="p" className="fs-20 fw-normal">
          Add Note
        </Text>
        <FaWindowClose
          size={40}
          onClick={handlePanelToggle}
          className="pointer"
        />
      </div>
      <div className="__body flex-column justify-content-start align-items-center py-4">
        <div className="px-2">
          <Avatar imgUrl={row?.secure_url} xxl={true} />
        </div>
        <div className="flex-column justify-content-center align-items-center mt-1">
          <Text as="h3">{`${row?.first_name} ${row?.last_name}`}</Text>
        </div>
      </div>
      <NoteForm row={row} handlePanelToggle={handlePanelToggle} />
    </div>
  );
};

export default NotePanel;
