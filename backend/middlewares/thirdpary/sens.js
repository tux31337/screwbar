const config = require('../../config/config.js');
const cryptojs = require('crypto-js');
const axios = require('axios');
const Cache = require('memory-cache');
const userRepository = require('../auth/authRepository.js');

const messageAuthentication = {
  sendVerificationSMS: async (req, res) => {
    try {
      const phoneNumber = req.body.phoneNumber;
      const passwordSearch = req.body.passwordSearch;
      const user = await userRepository.findByNumbmer(phoneNumber);
      if(!passwordSearch && user) {
        return res.status(200).json({message: "이미 가입한 휴대폰 번호입니다."});
      }
      Cache.del(phoneNumber);
      const date = Date.now().toString();
      //6자리 인증코드 생성
      const verificationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      //캐시에 넣어서
      Cache.put(phoneNumber, verificationCode.toString());
      //환경 변수
      const sens_service_id = config.sens.serviceId;
      const sens_access_key = config.sens.accessKey;
      const sens_secret_key = config.sens.secretKey;
      const sens_call_number = config.sens.callNumber;
      //URL 관련 함수 선언.
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
      const url2 = `/sms/v2/services/${sens_service_id}/messages`;
      //암호화
      const hmac = cryptojs.algo.HMAC.create(
        cryptojs.algo.SHA256,
        sens_secret_key
      );
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(sens_access_key);
      const hash = hmac.finalize();
      const signature = hash.toString(cryptojs.enc.Base64);

      const smsRes = await axios({
        method: method,
        url: url,
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": sens_access_key,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
        data: {
          type: "SMS",
          countryCode: "82",
          from: sens_call_number,
          content: `인증번호는 [${verificationCode}] 입니다.`,
          messages: [{ to: `${phoneNumber}` }],
        },
      });
      return res.status(200).json({ message: "인증 메시지를 보냈습니다." });
    } catch (error) {
      return res.status(404).json({ message: "sms 전송에 실패했습니다" });
    }
  }, confirmSms: (req, res) => {
    const { phoneNumber , checkVerificationCode} = req.body;
    console.log(phoneNumber);
    console.log(checkVerificationCode);
    const CacheData = Cache.get(phoneNumber);
    console.log(CacheData);
    if(!CacheData) {
      return res.status(200).json({ message: "fail" });
    } else if (CacheData != checkVerificationCode) {
      return res.status(200).json({ message: "fail" });
    } else {
      Cache.del(phoneNumber);
      return res.status(200).json({ message: "success" });
    }
  }
};


module.exports.sendVerificationSMS = messageAuthentication.sendVerificationSMS;
module.exports.confirmSms = messageAuthentication.confirmSms;