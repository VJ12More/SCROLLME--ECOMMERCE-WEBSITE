import styled from "styled-components"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { slideItems } from "../data";
import { useState } from "react";
import { mobile, tablet } from "../responsive"
import { Link } from 'react-router-dom';
import OutlinedButton from "./OutlinedButton";
import LazyLoad from 'react-lazyload';


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none;" })}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    bottom:0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.bg};
    // background-color:#f5fafd;
`;
const ImgContainer = styled.div`
    height:100%;
    flex:1;
`;
const Image = styled.img`
    height:60%;
`;
const InfoContainer = styled.div`
    flex:1;
    padding:50px;
    text-align: left;
    ${tablet({ display: "none" })}
`;

const Title = styled.h1`
    font-size: 70px;
`;
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing:3px; 
`;

const Placeholder = styled.div`
    height: 40%;
    width: 40%;
    background-color: #f0f0f0;
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {slideItems.map(item => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <LazyLoad height={100} offset={40} once placeholder={<Placeholder />}>
                                <Image src={process.env.PUBLIC_URL + item.img} />
                            </LazyLoad>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <OutlinedButton text={"SHOP NOW"} link={"/products"} />
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider