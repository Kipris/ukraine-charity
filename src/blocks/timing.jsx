import React from 'react';
import { TimingBlock, TimingWrap, Title, SmallTitle, Description, Icon, Left, Right } from './timing.styled';
import { Container } from '../components/container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import timing from '../assets/img/timing.webp';

const Timing = () => {
  return (
    <TimingBlock id='timing'>
      <Container>
        <TimingWrap>
          <Left>
            <LazyLoadImage
              alt='The timing and what can you do to help?'
              effect='blur'
              src={timing}
            />
          </Left>
          <Right>
            <Title>The timing and what can you do to help?</Title>
            <Icon />
            <Description>
              Time is of the essence. We are seeing devastating situation on the ground in Ukraine. We are on daily calls during which folks from Ukraine have to stop the calls and run to bomb shelters. 
            </Description>
            <SmallTitle>We need to act now!</SmallTitle>
            <Description>
              Families are separated and need help. There is a shortage of medicine and doctors.
            </Description>
          </Right>
        </TimingWrap>
      </Container>
    </TimingBlock>
  );
}

export default Timing;