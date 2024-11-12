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
  Grid,
} from 'suftnet-ui-kit';
import { REVIEW_VALIDATION_RULES } from './rules';
import useMobile from '../../../../hooks/useMobile';
import { useReview } from '../../../../hooks/useReviews';
import StarRating from '../../shared/startRating';
import { convertToShortDate } from '../../../../utils/helper';

const ReviewForm = () => {
  const { data, handleAddReviews } = useReview();
  const { isMobile } = useMobile();
  const [errorMessages, setErrorMessages] = useState({});
  const [fields, setFields] = useState(REVIEW_VALIDATION_RULES.fields);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});

    const { hasError, errors } = validate(
      fields,
      REVIEW_VALIDATION_RULES.Review,
    );
    if (hasError) setErrorMessages(errors);

    handleAddReviews({ ...fields }).then((result) => {
      result &&
        setFields({
          first_name: '',
          last_name: '',
          start: 1,
          desc: '',
        });
    });
  };

  const RenderCard = ({ review }) => {
    return (
      <Grid row spacing={2} className={`mt-2 flex-row`}>
        <Grid col lg={12} xs={12}>
          <div className="flex-column justify-content-start align-items-start">
            <div className="flex-row justify-content-start align-items-center  mb-2">
              <StarRating start_rating={review?.star} starSize="1x" />
              <Text as="p" className={`text-dark fw-normal ms-2`}>
                Reviewed on {convertToShortDate(review?.createdAt)}
              </Text>
            </div>
            <Text as="p" className={`text-dark fw-normal`}>
              {review?.desc}
            </Text>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className='mb-5'>
      <Form className={`${isMobile ? 'w-100' : 'w-100'} `}>
        <div className="flex-column justify-content-center align-items-center py-3">
          <StarRating
            rating={0}
            handleRate={(rate) =>
              setFields({ ...fields, star: parseInt(rate) })
            }
          />       
          <Text
            as="p"
            className={`fw-normal mt-1 text-invalid `}
          >
            {errorMessages?.star && errorMessages?.star?.message}
          </Text>  
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
              errorMessage={errorMessages?.desc && errorMessages?.desc?.message}
              maxLength={1000}
              rows={5}
              onChange={(e) => setFields({ ...fields, desc: e.target.value })}
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
      {data?.map((review, index) => (
        <RenderCard key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewForm;
