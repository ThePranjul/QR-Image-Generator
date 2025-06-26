import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([{
      message: "Type your URL here ",
      name: "URL"
    }])

  .then((answers) => {
    var url = answers.URL;

    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('qr-img.png'));
    
    var text = url+ "\n";
    fs.appendFile("EnteredURLs.txt", text, (error)=>{
        if (error) throw error;
        console.log('Successful');
    });

  })
  
  .catch((error) => {
    if (error.isTtyError) {
        console.log("Error occured!");
    } else {
        console.log("Unknown error occured!");
    }
  });