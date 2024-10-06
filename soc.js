const fs = require('fs');
const fsExtra = require('fs-extra');
const { writeJson } = require('fs-extra');
const chokidar = require('chokidar');
//const path = require('path')
//require('log-timestamp');

const pathYandex = '/root/go/src/soc/tasks/workerYandex/';
const pathGoogle = '/root/go/src/soc/tasks/workerGoogle/';
const pathDone = '/root/go/src/soc/tasks/done/'

// const pathYandex = '/Users/admin/go/src/soc/tasks/workerYandex/';
// const pathGoogle = '/Users/admin/go/src/soc/tasks/workerGoogle/';
// const pathDone = '/Users/admin/go/src/soc/tasks/done/'

async function readJsonData(path) {
  try {
    const data = await fsExtra.readJson(path);
    //console.log('Data read successfully ');
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function writeJsonData(path, data) {
  try {
    await fsExtra.writeJson(path, data);
    //console.log('Data written to file successfully ');
  } catch (error) {
    console.log(error);
  }
}


const watcherY = chokidar.watch(pathYandex, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

const log = console.log.bind(console);
watcherY.on('add', async (path) => {
  //console.log(path)
  const data = await readJsonData(path);
  await writeJsonData(pathDone+data.task+".json", data);
  //await fs.unlink(path);
});

const watcherG = chokidar.watch(pathGoogle, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcherG.on('add', async (path) => {
  //console.log(path)
  const data = await readJsonData(path);
  await writeJsonData(pathDone+data.task+".json", data);
  //await fs.unlink(path);
});


/*
let fsWaitYa = false;
let yaDir = fs.watch(pathYandex, async (event, filename) => {
  if (filename) {
    if (fsWaitYa) return;
    fsWaitYa = setTimeout(() => {
      fsWaitYa = false;
    }, 300);
    //if (event === 'change') {
      console.log(`filename: ${filename} fired event: ${event}`);
      const data = await readJsonData(pathYandex, filename);
      ////////////////////////////
      data.itemId = "77777777777";
      ///////////////////////////
      await writeJsonData(pathDone+data.task+".json", data);

      //fs.unlinkSync(pathYandex+filename);
      //console.log(data.task);
    //}
  }
});

let fsWaitG = false;
let gDir = fs.watch(pathGoogle, async (event, filename) => {
    if (filename) {
      if (fsWaitG) return;
      fsWaitG = setTimeout(() => {
        fsWaitG = false;
      }, 300);
      //if (event === 'change') {
        console.log(`filename: ${filename} fired event: ${event}`);
        const data = await readJsonData(pathGoogle, filename);
        ////////////////////////////
        data.itemId = "9999999999999";
        ///////////////////////////
        await writeJsonData(pathDone+data.task+".json", data);

        //fs.unlinkSync(pathGoogle+filename);
        //console.log(data.task);
     //}
    }
  });
  */
