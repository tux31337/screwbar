import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/mypage/temperature.css';


const Temperature = (props) => {
  const { myInfo } = props;
  const [goodkind, setGoodkind] = useState();
  const [goodtime, setGoodtime] = useState();
  const [goodmean, setGoodmean] = useState();
  const [temperature, setTemperature] = useState();

  useEffect(() => {
    axios.get('/team/getTemperature').then((result) => {
      console.log(result.data.result[0]);
      setGoodkind(result.data.result[0].goodkind);
      setGoodmean(result.data.result[0].goodmean);
      setGoodtime(result.data.result[0].goodtime);
      setTemperature(result.data.result[0].userTemp);
    });
  }, []);
  return (
    <>
      {console.log(goodmean)}
      <section className="temperature">
        <div className="temperature-text">
          <p className="passion-text">열정온도</p>
          <div className="degreebox">
            <p className="degree">{temperature}</p>
            <img
              src={require('./passion.png')}
              alt="passion"
              className="passion-img"
            />
          </div>
        </div>

        <div className="temperature-bar" aria-hidden="true">
          <span className="temperature-bar-guage"></span>
        </div>
        <div className="detail">
          {goodkind === 0 && goodtime === 0 && goodmean === 0 ? (
            <p>
              아직 받은 열정이 없네요😿 <br />
              열정을 모아보세요!!
            </p>
          ) : (
            <div>
              {goodkind !== 0 && (
                <small>
                  {goodkind * 10} 친절해요 😃 <br />
                </small>
              )}
              {goodtime !== 0 && (
                <small>
                  {goodtime * 10} 시간 약속을 잘 지켜요 ⏰ <br />
                </small>
              )}
              {goodmean !== 0 && (
                <small>{goodmean * 10} 다시 함께하고 싶어요 🤝</small>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Temperature;
