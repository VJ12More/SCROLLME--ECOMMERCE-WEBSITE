import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { slideItems } from '../data';
import { useState, useEffect } from 'react';
import { mobile, tablet } from '../responsive';
import OutlinedButton from './OutlinedButton';
import LazyLoad from 'react-lazyload';

// ... (Other styled components remain unchanged)

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  
  // Added state for interval
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev < slideItems.length - 1 ? prev + 1 : 0));
    }, 4000); // Changed to 4 seconds

    return () => clearInterval(timer);
  }, []);

  const handleClick = (direction) => {
    clearInterval(timer); // Clear interval on button click
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideItems.length - 1);
    } else {
      setSlideIndex(slideIndex < slideItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {slideItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <LazyLoad height={100} offset={40} once placeholder={<Placeholder />}>
                <Image src={process.env.PUBLIC_URL + item.img} />
              </LazyLoad>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <ButtonContainer>
                <OutlinedButton text={'SHOP NOW'} link={'/products'} />
              </ButtonContainer>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
