import React from 'react';
import { Grid, Text, Button } from 'suftnet-ui-kit';
import { onStripeOnBoarding } from '../../utils/helper';
import { useAppContext } from '../shared/appContext';

const CenteredModal = ({ isOpen, onClose }) => {
    const { currentUser } = useAppContext();

    if (!isOpen) {
        return null;
    }

    const handleStripeOnBoarding = async () => {
        const body = {
            stripe_user_id: currentUser?.stripe_user_id
        }
        await onStripeOnBoarding(body)
    }

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
        },
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <Grid col lg={12} xs={12}>
                    <div className="flex-column justify-content-starts align-items-start p-5 py-4">
                        <Text as="h3" className="fw-normal text-white">
                            Welcome to Jerur Administration Panel!
                        </Text>
                        <Text as="p" className="fw-normal text-white mt-2">
                            We're delighted to have you join Jerur. Your role is crucial in ensuring a smooth giving experience for your church members.
                        </Text>

                        <Text as="p" className="fw-normal text-white">
                            To facilitate member's tithes, offerings, and donations. Please complete the setup of our Stripe payment provider.
                        </Text>

                        <Text as="p" className="fw-normal text-white mt-2">
                            To begin, click the button below to initiate the Stripe setup process.
                        </Text>
                        <div className="flex-row justify-content-starts align-items-start">
                            <Button
                                className="rounded-circle-30 primary-solid-btn-0 mt-2"
                                onClick={() => handleStripeOnBoarding()}
                            >
                                Setup Stripe Account
                            </Button>
                            <div style={{ marginLeft: 2, marginRight: 2 }}></div>
                            <Button
                                className="rounded-circle-30 mt-2 status-btn"
                                onClick={() => onClose()}
                            >
                                Close
                            </Button>
                        </div>

                    </div>
                </Grid>
            </div>
        </div>
    );
};

export default CenteredModal;
