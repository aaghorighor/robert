import React from 'react';
import { Grid, Text } from 'suftnet-ui-kit';
import { completeAddress } from '../../utils/helper';
import { useAppContext } from './appContext';

const HeaderPanel = ({ title }) => {
    const { isMobile, currentUser } = useAppContext();
 
    return (
        <Grid
            row
            spacing={1}
            className={`${isMobile ? 'w-100' : null
                } w-100 bg-secondary_1 shadow-sm min-vh-270`}
        >

            <Grid col lg={8} xs={12}>
                <div className="flex-row justify-content-start align-items-center py-5 ps-5">
                    {
                        currentUser?.church?.logo_url && (
                            <img width={"10%"} height={"10%"} src={currentUser?.church?.logo_url } />
                        )
                    }
                    <div className="flex-column justify-content-start align-items-start ms-xl-4">
                        <Text as="h2" className="fw-normal text-white">
                            {currentUser?.church?.name}
                        </Text>
                        <Text as="p" className="text-white">
                            {completeAddress(currentUser?.address)}
                        </Text>
                    </div>
                </div>
            </Grid>
            <Grid col lg={4} xs={12}>
                <div className="flex-row justify-content-center align-items-center py-5 ms-xl-4">
                    <Text as="h2" className="fw-normal text-white">
                        {title}
                    </Text>
                </div>
            </Grid>

        </Grid>
    )
}

export default HeaderPanel;