import dgram from "dgram";

const client = dgram.createSocket("udp4");
const BULB_IP = process.env.BULB_IP; 
const BULB_PORT = process.env.BULB_PORT ? parseInt(process.env.BULB_PORT) : 5577;

export async function turnOnBulb() {
  const message = JSON.stringify({
    method: "setState",
    params: {
      state: true,
    },
  });

  client.send(message, BULB_PORT, BULB_IP, (err) => {
    if (err) {
      console.error("Error sending message:", err);
    } else {
      console.log("Message sent to the bulb");
    }
    client.close();
  });
}

export async function turnOffBulb() {
  const message = JSON.stringify({
    method: "setState",
    params: {
      state: false,
    },
  });

  client.send(message, BULB_PORT, BULB_IP, (err) => {
    if (err) {
      console.error("Error sending message:", err);
    } else {
      console.log("Message sent to the bulb");
    }
    client.close();
  });
}

export async function changeColor({
  r,
  g,
  b,
  dimming,
}: {
  r: number;
  g: number;
  b: number;
  dimming: number;
}) {
  const message = JSON.stringify({
    method: "setState",
    params: {
      state: true,
      r,
      g,
      b,
      dimming,
    },
  });

  client.send(message, BULB_PORT, BULB_IP, (err) => {
    if (err) {
      console.error("Error sending message:", err);
    } else {
      console.log("Message sent to the bulb");
    }
    client.close();
  });
}
