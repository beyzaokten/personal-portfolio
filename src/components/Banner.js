import React, { useState, useEffect, useCallback } from "react"; 
import { Container, Row, Col } from "react-bootstrap"; 
import headerImg from "../assets/img/header-img.png"; 
import { ArrowRightCircle } from 'react-bootstrap-icons'; 
import 'animate.css'; 
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100); // Yazı hızı bekleme süresi
  const toRotate = [ "Software Engineer", "Web Developer", "Mobile Developer" ]; // Başlıkta dönen metinler
  const period = 2000; //Her metnin ekran süresi

  // Yazma ve silme işlemi fonksiyonu
  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText); // Güncel metni ayarla

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setLoopNum(loopNum + 1); 
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setDelta(500);
    }
  }, [loopNum, isDeleting, text,toRotate]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [tick, delta]); 

  return (
    // Banner bölümü
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Beyza,`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Software Engineer", "Web Developer", "Mobile Developer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Hello, I’m Beyza Ökten. My passion for technology and software has led me to focus on backend development. Working in this field, which forms the foundation of systems, aligns perfectly with my passion for solving complex problems and creating efficient infrastructures.

With my passion for technology, I develop various projects. By embracing a philosophy of continuous learning and improvement, I remain open to new technologies and approaches in my projects.

So far, I have built a strong foundation in the backend field by developing projects with different technologies. My goal is to continuously improve myself and contribute to innovative projects by specializing in backend technologies. My passion for technology and eagerness to learn drive me to move forward every day.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
