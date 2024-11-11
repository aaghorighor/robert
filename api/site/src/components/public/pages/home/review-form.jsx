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
import { REVIEW_VALIDATION_RULES } from './rules';
import useMobile from '../../../../hooks/useMobile';
import { useReview } from '../../../../hooks/useReviews';
import StarRating from '../../shared/startRating';

const ReviewForm = () => {
  const { data, error, loading, handleAddReviews } = useReview()
  const { isMobile } = useMobile();
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(REVIEW_VALIDATION_RULES.fields);

  console.log("..........................fields", data)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    const { hasError, errors } = validate(fields, REVIEW_VALIDATION_RULES.Review);
    if (hasError) setErrorMessages(errors)

    await handleAddReviews({ ...fields })
  };

  return (
    <>
      <Form className={`${isMobile ? 'w-100' : 'w-100'}`}>
        <div className="flex-column justify-content-center align-items-center py-3">
          <StarRating rating={0} handleRate={(rate) => setFields({ ...fields, star: parseInt(rate) })} />
        </div>

        <Form horizontal>
          <FormGroup>
            <Input
              id="first_name"
              name="first_name"
              placeholder="Firstname"
              maxLength={50}
              value={fields.first_name}
              onChange={(e) =>
                setFields({ ...fields, first_name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Lastname"
              value={fields.last_name}
              maxLength={50}
              onChange={(e) =>
                setFields({ ...fields, last_name: e.target.value })
              }
            />
          </FormGroup>
        </Form>
        <Form horizontal>
          <FormGroup>
            <TextArea
              id="message"
              name="message"
              placeholder="Type in your reviews"
              value={fields.desc}
              errorMessage={
                errorMessages?.desc && errorMessages?.desc?.message
              }
              maxLength={200}
              rows={5}
              onChange={(e) =>
                setFields({ ...fields, desc: e.target.value })
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
    </>
  );
};

export default ReviewForm;
