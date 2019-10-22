var express = require('express');
var sensorLib = require('node-dht-sensor');
var app = express();

app.use(express.json());

app.listen(3005, async function () {
  console.log('Server Running on port 3005!');
  await initApp()
});

async function initApp() {
  await createRoutes();
}


async function createRoutes() {
  
  app.get('/ping', async function (req, res) {

    let sens = await sensorLib.read(11, 4);

    let data =  {
      deviceName: 'soggiorno_device_1',
      ip: "192.168.1.5",
      sensors: [
        {
          temperature: sens.temperature.toFixed(2),
        },
        {
          umidity: sens.humidity.toFixed(2),
        }
      ],
      actuators: [ ]
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });


  app.get('/temperature', async function (req, res) {
    let sens = await sensorLib.read(11, 4);
    let data = {
      value: sens.temperature.toFixed(2),
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })

  app.get('/umidity', async function (req, res) {
    let sens = await sensorLib.read(11, 4);
    let data = {
      value: sens.humidity.toFixed(2),
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })

  

}