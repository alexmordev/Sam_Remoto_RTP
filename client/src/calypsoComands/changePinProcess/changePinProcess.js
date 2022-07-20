
// ********Funcion para convertir pin de 4 numeros a ascii ********

  // const newPin  = '1013';
  // const value_0 = newPin.charCodeAt(0);
  // const value_1 = newPin.charCodeAt(1);
  // const value_2 = newPin.charCodeAt(2);
  // const value_3 = newPin.charCodeAt(3);
  // const ascii_pin = `${value_0}${value_1}${value_2}${value_3}`
  // console.log('New Pin Decimal: ', newPin);
  // console.log('New Pin ASCII: ', ascii_pin);

  const GetRequest = async (url) => {
    const res = await fetch(url);
    if (!res) throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  };

  const PostRequest = async (url, object) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res) throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
  };



const changePinProcess = async() => {

  const start = Date.now();

    console.log('***Convirtiendo en ASCII***');
    const newPin  = '0000';
    const value_0 = newPin.charCodeAt(0);
    const value_1 = newPin.charCodeAt(1);
    const value_2 = newPin.charCodeAt(2);
    const value_3 = newPin.charCodeAt(3);
    const ascii_pin = `${value_0}${value_1}${value_2}${value_3}`
    console.log('New Pin Decimal: ', newPin);
    console.log('New Pin ASCII: ', ascii_pin);

    const applicationSN = await GetRequest("/selectApp");
    console.log("Select Aplication: ", applicationSN.serialNumber);
    const { SelectDiversifier } = await PostRequest(
      "http://dev-node.rtp.gob.mx:5000/diversifier",
      {
        "applicationSN": `${applicationSN.serialNumber}`,
      }
    );
    console.log("Diversifier: ", SelectDiversifier.Status);

    const getChal = await GetRequest("/getChallenge");
    console.log("Get challenge: ", getChal.GetChallenge.Status);

    const { GiveRandom } = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/random`,
      { "challenge": `${getChal.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random: ", GiveRandom.Status);

    const cardCipher = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/cipherUpdate`,
      { "pin": `${ascii_pin}` }
    );
    console.log("CardCipher: ", cardCipher.response.Status);

    const { changePinResponse } = await PostRequest(`/changePin`, {
      "newPin": `${cardCipher.response.Response.slice(0, -4)}`,
    });
    console.log("Change Pin: ", changePinResponse.Status);

    console.log('********Verificar Pin *********');

    const getChal2 = await GetRequest("/getChallenge");
    console.log("Get challenge2: ", getChal2.GetChallenge.Status);

    const data = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/random`,
      { "challenge": `${getChal2.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random2: ", data.GiveRandom.Status);


    const cipherVerify = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/cipherVerify`,
      {"pin": `${ascii_pin}`}
    );
    console.log('cipherVerify: ', cipherVerify.response.Status );

    
    let timer = Date.now() - start;
    console.log(timer);

}

export default changePinProcess;


