import React, { useContext, useState } from 'react';
import {
  Flex,
  Text,
  Button,
  TextArea,
  Input,
  Form,
  FormGroup,
  validate,
} from 'suftnet-ui-kit';
import Address from './address';
import { CONTACT_VALIDATION_RULES } from './rules';
import useMobile from '../../../../hooks/useMobile';

const ContactForm = () => {
  
  const { isMobile } = useMobile();
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(CONTACT_VALIDATION_RULES.fields);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessages({});

    const { hasError, errors } = validate(fields, CONTACT_VALIDATION_RULES.Contact);
    if (hasError) setErrorMessages(errors);
    
  };
 
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className="px-7 pb-7"
      >      
        <Form className={`${isMobile ? 'w-100' : 'w-70'}`}>    
         
          <Form horizontal>
            <FormGroup>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                maxLength={50}
                value={fields.name}
                errorMessage={
                  errorMessages?.name && errorMessages?.name?.message
                }
                 onChange={(e) =>
                    setFields({ ...fields, name: e.target.value })
                  }
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={fields.email}
                errorMessage={
                  errorMessages?.email && errorMessages?.email?.message
                }
                maxLength={50}
                onChange={(e) =>
                    setFields({ ...fields, email: e.target.value })
                  }
              />
            </FormGroup>
          </Form>
          <Form horizontal>
            <FormGroup>
              <Input
                id="subject"
                name="subject"
                placeholder="Subject"
                value={fields.subject}
                errorMessage={
                  errorMessages?.subject && errorMessages?.subject?.message
                }
                maxLength={100}
               onChange={(e) =>
                    setFields({ ...fields, subject: e.target.value })
                  }
              />
            </FormGroup>
          </Form>
          <Form horizontal>
            <FormGroup>
              <TextArea
                id="message"
                name="message"
                placeholder="Message"
                value={fields.message}
                errorMessage={
                  errorMessages?.message && errorMessages?.message?.message
                }
                maxLength={200}
                rows={5}
                onChange={(e) =>
                    setFields({ ...fields, message: e.target.value })
                  }
              />
            </FormGroup>
          </Form>          
           <Button
                className="rounded-circle-30 primary-solid-btn-0"
                onClick={(e) => handleSubmit(e)}
              >
                 Submit
              </Button>      
        </Form>
      </Flex>
    </>
  );
};

export default ContactForm;
