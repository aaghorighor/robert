import React, { useContext } from 'react';
import { Text, Button, Card, Box } from 'suftnet-ui-kit';
import { BiCheckCircle } from 'react-icons/bi';
import { appContext } from '../../../shared/appContext';
import { useNavigate  } from "react-router-dom";

const PriceCard = (props) => {
  const { isMobile } = useContext(appContext);
  const navigate = useNavigate();

  const onSelect = (selectPriceId) => {
    navigate( `/check-out`, {
        state :{ priceId: selectPriceId},
    });
  };

  return (
    <>
      <Card className="single-promo single-promo-hover single-promo-1 text-center py-6 ">
        <div className="me-xl-4">
          <div className="icon icon-shape">{props.icon}</div>
        </div>
        <div className="flex-column justify-content-center align-items-center ">
          <Text
            as="h4"
            className={`text-black fw-bold mb-2 mt-2 ${
              isMobile ? 'text-center' : 'text-center'
            }`}
          >
            {props.plan.planName}
          </Text>
          <div className="prices price price-show">
            <span className="price-currency">{props.plan.currency}</span>
            <span className="price-value">{props.plan.raw}</span>
            <span className="price-duration">{props.plan.billingCycle}</span>
          </div>
          <Box
            as="div"
            className="list-unstyled flex-column justify-content-start align-items-start px-5 pt-3 pb-3"
          >
            {props.plan.features.map((feature, index) => (
              <Box
                key={index}
                as="div"
                className="flex-row justify-content-start align-items-center"
              >
                <BiCheckCircle size={25} className='me-1' />
                <Text as="p" className="lead text_small1">
                  {feature}
                </Text>
              </Box>
            ))}
          </Box>
          <Button
            className="google-play-store-btn"     
            Component={"a"} 
            onClick={()=> onSelect(props.plan.priceId)}
          >
            Choose Plan
          </Button>
        </div>
      </Card>
    </>
  );
};

export default PriceCard;

