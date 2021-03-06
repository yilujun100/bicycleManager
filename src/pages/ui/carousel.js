import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';

class UICarousel extends Component {
    render() {
        const imgBaseURL = process.env.NODE_ENV === 'development' ? '/carousel-img/' : `${process.env.PUBLIC_URL}/carousel-img/`;
        return (
            <div style={{width: '100%'}}>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-wrap">
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src={`${imgBaseURL}carousel-1.jpg`} alt=""/>
                        </div>
                        <div>
                            <img src={`${imgBaseURL}carousel-2.jpg`} alt="" />
                        </div>
                        <div>
                            <img src={`${imgBaseURL}carousel-3.jpg`} alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

export default UICarousel;
