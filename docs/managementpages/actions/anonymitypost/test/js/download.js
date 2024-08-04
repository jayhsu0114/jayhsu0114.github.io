document.getElementById('download').addEventListener('click', function() {
    var zip = new JSZip();

    for (let i = 1; i <= 10; i++) {
        let canvas = document.getElementById(`canvas${i}`);
        if (canvas) {
            // Convert canvas to data URL
            let dataURL = canvas.toDataURL('image/png');

            // Remove the prefix from the data URL
            let data = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');

            // Add file to zip
            zip.file(`canvas${i}.png`, data, {base64: true});
        }
    }

    // Generate the zip file and trigger the download
    zip.generateAsync({type: 'blob'}).then(function(content) {
        saveAs(content, 'canvases.zip');
    });
});
