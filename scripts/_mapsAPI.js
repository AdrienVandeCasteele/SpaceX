// https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyAW9aIRfhPIDbMyJMawk6I93TwrX8ylgrs

function initMap(){
  var origin2 = 'Greenwich, England';
  var destinationA = 'Stockholm, Sweden';

  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [origin2],
      destinations: [destinationA],
      travelMode: 'DRIVING',
    }, callback(response, status));

function callback(response, status){
    console.log(response.originAddresses)
  }
}