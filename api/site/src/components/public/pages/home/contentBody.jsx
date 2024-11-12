import React, { useState } from 'react';
import { Text, Grid, Button } from 'suftnet-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../../shared/startRating';
import book_image from '../../../../assets/imgs/2024-10-30 13_49_09-Window.png';
import robert_image from '../../../../assets/imgs/robert.jpg';
import { Link } from 'react-router-dom';
import ReviewForm from './review-form';

const ContentBody = () => {
  const [addReview, setAddReview] = useState(false);
  const ReadMoreLess = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const text = `In "The Kinds of Fathers and Mothers," you will:
                      Learn from the Bible's examples of fathers and mothers, both good and bad.
                      Discover how to embrace the role of a godly parent, raising children with love, discipline, and wisdom.
                      Understand the importance of being a spiritual guide and source of light to your family.
                      Be inspired by the author's personal stories of faith and family, offering encouragement to parents and aspiring parents alike.
                      Whether you are a parent, someone aspiring to be one, or simply interested in understanding the role of parenting from a biblical perspective, this book is for you. It offers practical insights on how to nurture children according to God's plan and be the parent He calls you to be. Through its combination of scriptural wisdom and personal reflections, "The Kinds of Fathers and Mothers" equips readers with the knowledge and inspiration to raise a family that shines as a beacon of faith and love. As you read, may the Lord grant you the wisdom and grace to become a godly and distinguished parent, making a lasting impact on your children’s lives and leaving a legacy that honors God.`;

    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div>
        <p>{isExpanded ? text : `${text.substring(0, 200)}...`}</p>
        <button
          onClick={toggleReadMore}
          style={{
            background: 'none',
            border: 'none',
            color: '#0073e6',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            style={{ marginRight: '5px' }}
          />
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    );
  };
 
  return (
    <div>
      <Grid row spacing={4} className={`mt-2 w-70 flex-row`}>
        <Grid col lg={4} xs={12}>
          <div className="flex-column justify-content-start align-items-start">
            <img alt="book" src={book_image} className="img-fluid" />
            <Button
              className="solid-btn-0 w-100 mt-3"
              Component={Link}
              to="/v1/dashboard"
            >
              Want to road
            </Button>
            <Button
              className="google-play-store-btn mt-3 w-100"
              Component={Link}
              to="/v1/dashboard"
            >
              Buy this Book
            </Button>
          </div>
        </Grid>
        <Grid col lg={8} xs={8}>
          <div className="flex-column justify-content-start align-items-start">
            <Text as="h1" className={`text-dark fw-normal`}>
              The Kinds of Fathers and Mothers
            </Text>
            <div className="flex-row justify-content-start align-items-center">
              <Text as="h6" className={`text-dark fw-normal ps-1 pe-2 `}>
                Robert Musah
              </Text>
              <span className="uil-user text_small"></span>
            </div>

            <div className="flex-row justify-content-start align-items-center mt-2">
              <StarRating start_rating={4} />
              <Text as="h2" className={`text-dark fw-normal fs-35 ps-3 pe-2 `}>
                4.06
              </Text>
              <Text as="h6" className={`text-dark fw-normal pe-2 `}>
                142 rating
              </Text>
              <Text as="h6" className={`text-dark fw-normal pe-2 `}>
                50 reviews
              </Text>
            </div>
            <div className="flex-column justify-content-start align-items-center mt-2 mb-1">
              <Text as="p" className={`text-dark fw-bold pe-2 mb-3`}>
                The Kinds of Fathers and Mothers" explores the diverse examples
                of parenting found throughout the Bible, drawing lessons from
                both godly and ungodly parents. This insightful book takes
                readers on a journey through biblical stories, highlighting the
                characteristics that define godly fathers and mothers while
                contrasting them with examples of flawed parenting. It provides
                a clear understanding of the spiritual responsibilities that
                come with raising children in accordance with God’s will.
              </Text>

              <Text as="p" className={`text fw-normal pe-2 `}>
                <p className="mb-2">
                  {
                    'At the heart of the book is the powerful truth that Jesus Christ, the ultimate example of a loving and compassionate father, calls us to emulate His character. Whether it’s the story of Jesus raising the widow’s son in Nain (Luke 7:11-17) or other biblical figures who modeled parental love and sacrifice, "The Kinds of Fathers and Mothers" encourages readers to follow Christ’s example of godly parenting.'
                  }
                </p>

                <p className="mb-2">
                  {
                    "This book is not just a biblical study but also deeply personal. The author reflects on his own upbringing, influenced by a father who instilled a love for writing and a mother whose prayers shaped his spiritual journey. These personal anecdotes illustrate the profound impact parents can have on their children's lives, demonstrating how godly parenting can help children grow into people who reflect the love and light of Christ."
                  }
                </p>

                <ReadMoreLess />
              </Text>
            </div>
            <div className="flex-column justify-content-start align-items-start mt-1">
              <Text as="p" className={`text-dark fw-normal pe-2`}>
                221 pages, Hardcover
              </Text>
              <Text as="p" className={`text-dark fs-6 pe-2`}>
                First published 2024
              </Text>
            </div>
          </div>
          <Grid row spacing={2} className={`mt-2 flex-row`}>
            <Grid col lg={4} xs={12}>
              <img
                alt="book"
                src={robert_image}
                height={300}
                width={260}
                className="img-fluids"
              />
            </Grid>
            <Grid col lg={8} xs={12}>
              <div className="flex-row justify-content-start align-items-center">
                <Text as="p" className={`text-dark fw-normal ps-1 pe-2 `}>
                  <Text as="h6" className={`text-dark fw-bold pe-2 `}>
                    About the Author
                  </Text>
                  <p className="mb-2">
                    Musah Robert is an ordained pastor with over 15 years of
                    experience ministering the gospel of Jesus Christ. He is an
                    anointed teacher of the word of God and also the founder of
                    the POWER AND WISDOM MINISTRY.
                  </p>
                  <p className="mb-2">
                    He is a prolific author and widely engaged in preaching and
                    teaching across the globe.
                  </p>
                  <p className="mb-2">
                    He is passionate about the family and has come out with this
                    book to portray the Godly kind of parenting that the Lord
                    expects from His people.
                  </p>
                  <p className="mb-2">
                    Musah Robert resides in the United Kingdom, is married with
                    three children, and is a life practitioner
                    with KISIMUL GROUP
                  </p>
                </Text>
              </div>
            </Grid>
          </Grid>
          <Grid row spacing={2} className={`mt-2 flex-row`}>
            <Grid col lg={12} xs={12}>
              <div className="flex-row justify-content-start align-items-center">
                <Text as="h1" className={`text-dark fw-normal ps-1 pe-2 `}>
                  Ratings & Reviews{' '}
                </Text>
              </div>
              <div className="flex-row justify-content-center align-items-center">
                <Text as="h3" className={`text-dark fs-35 ps-1 pe-2 `}>
                  What do you think?
                </Text>
              </div>
              <div className="flex-column justify-content-center align-items-center py-3">               
                <Text
                  as="h6"
                  className={`text-dark fw-normal mt-1 text-black-50 `}
                >
                  Rate this Book
                </Text>                
              </div>
              <ReviewForm />
            </Grid>
          </Grid>        
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentBody;
