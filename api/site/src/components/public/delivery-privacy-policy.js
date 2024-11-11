import React from 'react';

const PrivacyPolicy = (props) => {

    return (
        <>
            <div style={{ minHeight: "100vh", width: '50%', marginTop: '2%', marginBottom: '5%', marginLeft: 'auto', marginRight: 'auto' }} >

                <h1>Privacy Policy for Jerur Mobile App</h1>

                <p>Effective Date: 11/10/2023</p>

                <p>Welcome to Jerur Mobile App ("Jerur," "we," "our," or "us"). Jerur is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information when you use our mobile app.</p>

                <h2>Information We Collect</h2>
                <p>Jerur collects the following information:</p>
                <ul>
                    <li>Your name, email address, and other necessary information required by Stripe when setting up a Stripe account to make tithes and offerings payments.</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information collected only for the following purposes:</p>
                <ul>
                    <li>To facilitate the processing of tithes and offerings through Stripe.</li>
                    <li>To comply with legal and regulatory requirements.</li>
                </ul>

                <h2>Data Storage</h2>
                <p>We do not store any member information in our database. All member information required for Stripe account setup is transmitted directly to Stripe and is subject to Stripe's Privacy Policy.</p>

                <h2>Disclosure of Your Information</h2>
                <p>We do not sell, trade, or otherwise transfer your information to third parties, except for the purpose of processing tithes and offerings payments through Stripe.</p>

                <h2>Security</h2>
                <p>We take reasonable measures to protect the information collected, including encryption and secure transmission methods.</p>

                <h2>Changes to this Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website or within the Jerur Mobile App.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@suftnet.com.</p>

                <p>This Privacy Policy was last updated on 11/10/2023.</p>
            </div>
        </>
    )
}

export default PrivacyPolicy;
