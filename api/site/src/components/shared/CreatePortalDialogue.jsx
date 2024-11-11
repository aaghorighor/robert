import React from 'react';
import { createPortal } from 'react-dom';

function CreatePortalDialogue({children}) {
  return createPortal(
    <div>
     {children}
    </div>,
    document.getElementById('dialogue-portal')
  );
}

export default CreatePortalDialogue;