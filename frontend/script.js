// Reference to the input element and custom button
var input = document.getElementById('mypic');
var cameraButton = document.getElementById('cameraButton');

// Add event listener to the custom button to trigger the file input
cameraButton.addEventListener('click', function () {
  input.click();
});

// Handle file input change
input.onchange = function () {
  var file = input.files[0];
  if (file) {
    drawOnCanvas(file);
  }
};

// Function to draw the image on the canvas
function drawOnCanvas(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var dataURL = e.target.result,
      canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image();

    img.onload = function () {
      var maxWidth = window.innerWidth * 0.9; // Set maximum width to 90% of the viewport width
      var scale = Math.min(maxWidth / img.width, 1); // Scale to fit within the screen width
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = dataURL;
  };

  reader.readAsDataURL(file);
}
