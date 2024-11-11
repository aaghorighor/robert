import React from 'react';
import { Text, Card, CardContent } from 'suftnet-ui-kit';
import { FaWindowClose } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import  Scrollbars  from "react-custom-scrollbars";
import { HELP } from '../../../assets/data/help';

const HelpPanel = ({ isPanelOpen, handlePanelToggle }) => {
    
  return (
    <div className={`panel ${isPanelOpen ? 'open' : ''}`}>
      <div className="__header flex-row justify-content-between align-items-center">
        <div className='flex-row justify-content-start align-items-center'>
          <FiHelpCircle size={30} />
          <Text as="p" className="fs-20 fw-normal px-1">
            Help
          </Text>
        </div>
        <FaWindowClose
          size={40}
          onClick={handlePanelToggle}
          className="pointer"
        />
      </div>
      <div className="w-100 mt-2 position-relative">
        <Scrollbars
                style={{height : '1000px', zIndex: 9999}}                
                createContext={true}
                noScrollX={true}                
            >
          <Card className="bw-2 p-4 ">
            <CardContent className="py-2 flex-1">
              <div dangerouslySetInnerHTML={{ __html:HELP }}></div>                
            </CardContent>
          </Card>
        </Scrollbars>
      </div>
    </div>
  );
};

export default HelpPanel;
