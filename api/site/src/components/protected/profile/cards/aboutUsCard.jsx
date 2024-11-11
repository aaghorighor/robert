import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Text,
  validate,
  Button,
  Spacer
} from 'suftnet-ui-kit';
import { useMutation } from '@apollo/client';
import { Tooltip } from 'react-tooltip';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Notification from '../../../shared/notification';
import { FiHelpCircle } from 'react-icons/fi';
import { FaSave } from 'react-icons/fa';
import { appContext } from '../../../shared/appContext';
import { UPDATE_ONE_RULES } from '../shared/rules';
import { UPDATE_ONE } from '../../../../queries/church';

const AboutUsCard = () => {
  const { currentUser = {}, updateCurrentUser } = useContext(appContext);
  const [updateOneMutation, { error = {} }] = useMutation(UPDATE_ONE);
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(UPDATE_ONE_RULES.fields);
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errorType, setErrorType] = useState('error');

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      setFields((prev) => {
        return {
          ...prev,
          name: 'description',
          value: currentUser?.church?.description,
        };
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});
    fields.name = 'description';

    try {
      const { hasError, errors } = validate(fields, UPDATE_ONE_RULES.updateOne);

      if (hasError) {
        setErrorMessages(errors);
        return false;
      }

      setLoading(true);
      const { data: { updateOneChurch } } = await updateOneMutation({
        variables: fields,
      });
   
      if (updateOneChurch) {
        const body = {
          ...currentUser,
          church :{
            ...currentUser.church,
            description: fields.value
          }     
        };         
        
        updateCurrentUser(body)
        setErrorType('success')
        setServerErrorMessage("About us changes was save successfully.");
        setNotificationStatus(true);
      }
    
    } finally {
      setLoading(false);
      setEdit(false);
    }


  };

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
    setErrorType('error')
    setServerErrorMessage("");
  };

 
  return (
    <div className={`${loading ? 'overlay__block' : null}`}>
      <Card className="bw-2">
        <div className="bg-light p-3">
          <CardHeader className="flex-row align-items-center justify-content-between">          
             <div className="flex-row align-items-center justify-content-between">
              <Text as="h2" className="text-dark fs-23 px-1">
                About Church
              </Text>
              <FiHelpCircle
                size={20}
                data-tooltip-id="large-tooltip"
              data-tooltip-content="This allows you to edit or add About your Church effortlessly, when you are done, simply click Save Changes to save the necessary changes."
              />
            </div>          
             <div className="flex-row justify-content-start align-items-center">
                <Button
                  className="rounded-circle-30 secondary-solid-btn-0"
                  onClick={(e) => onSubmit(e)}
                >
                  <FaSave
                    size={15}
                    color='#080808'
                    className="pointer mb-1"                  
                  ></FaSave>  <Spacer horizontal={2} /> Save Changes
                </Button>
                <Spacer horizontal={5} />
              </div>
          </CardHeader>
        </div>
        <CardContent className="py-4 p-4 flex-1">
          <>
              <ReactQuill
                bounds="#scrolling-container"
                scrollingContainer=".parent-scroll"
                value={fields.value}
                onChange={(e) => setFields({ ...fields, value: e })}
              />
              {errorMessages?.value && (
                <span className="icon-color-3">{errorMessages.value}</span>
              )}
            </>
        </CardContent>
      </Card>
      <Notification
        status={notificationStatus}
        type={errorType}
        message={serverErrorMessage}
        duration={4000}
        onReset={() => onReset()}
      />
      {loading && (
        <div className="overlay">
          <div className="overlay-content"></div>
        </div>
      )}
      <Tooltip id="large-tooltip" className="w-30" />
      <Tooltip id="small-tooltip" />
    </div>
  );
};

export default AboutUsCard;
