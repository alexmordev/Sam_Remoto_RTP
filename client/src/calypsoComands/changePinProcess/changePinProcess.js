
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
  console.log('Si entró')

    const applicationSN = await GetRequest("/selectApp");
    console.log("Select Aplication: ", applicationSN.serialNumber);
    const { SelectDiversifier } = await PostRequest(
      "http://dev-node.rtp.gob.mx:5000/diversifier",
      {
        applicationSN: `${applicationSN.serialNumber}`,
      }
    );
    console.log("Diversifier: ", SelectDiversifier.Status);

    const getChal = await GetRequest("/getChallenge");
    console.log("Get challenge: ", getChal.GetChallenge.Status);

    const { GiveRandom } = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/random`,
      { challenge: `${getChal.GetChallenge.Response.slice(0, -4)}` }
    );
    console.log("Give Random: ", GiveRandom.Status);

    const cardCipher = await PostRequest(
      `http://dev-node.rtp.gob.mx:5000/cipherUpdate`,
      { pin: "48454845" }
    );
    console.log("CardCipher: ", cardCipher.response.Status);

    const { changePinResponse } = await PostRequest(`/changePin`, {
      newPin: `${cardCipher.response.Response.slice(0, -4)}`,
    });
    console.log("Change Pin: ", changePinResponse.Status);

    let timer = Date.now() - start;
    console.log(timer);





  // const start = Date.now();

  // const dominio = process.env.REACT_APP_DOMINIO;
  // const newPin = '48454845';

  // // const change = async () => {

  //   const selectApp = await selectAplication('/selectApp');
  //   console.log('SelectApp: ',selectApp);


  //   const diversif = await diversifier(`${dominio}/diversifier`, {"applicationSN" : `${selectApp}`})
  //   console.log('Diversifier: ',diversif);

  //   const getChal = await getChallenge('/getChallenge');
  //   console.log('Get Challenge: ',getChal)

  //   const giveRan = await giveRandom(`${dominio}/random`, {'challenge': `${getChal}`});
  //   console.log('GiveRandom: ',giveRan);

  //   const cardCipher = await cardCipherPinUpdate(`${dominio}/cipherUpdate`, { "pin": `${newPin}` })
  //   console.log('CardCipher: ',cardCipher);

  //   const changeP = await changePin(`/changePin`, {'newPin': `${cardCipher}` })
  //   console.log('Change Pin: ',changeP)
  //   let timer = Date.now() - start; 
  //   console.log(timer);
}

export default changePinProcess;


