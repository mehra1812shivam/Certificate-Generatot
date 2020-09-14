const pdfkit=require('pdfkit')
const fs=require('fs')

const pdfdoc=new pdfkit

pdfdoc.pipe(fs.createWriteStream('Output.pdf'))
pdfdoc.image('path/to/image.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
 });

 pdfdoc.text("hello world")