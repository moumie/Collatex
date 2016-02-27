// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter')

.controller('EditorCtrl', function($scope, $http, SERVER) {
   $scope.pdfFile="";
  
 
  function onConversionComplete(response){
       $scope.pdfFile =response.data;
       	console.log('Conversion succeeded', $scope.pdfFile);
			}
  function onConversionFailed(response) {
	console.log('Conversion failed', response);
  }
  
  
  $scope.showContent = function() {
   var content = $scope.EditContent;
   var formattedContent=content;
   var fid =1;
   var area = document.getElementById('editor-html');
   
   //Bold tag
   formattedContent = formattedContent.replace(/\[b\]/gi, "<b>");
   formattedContent = formattedContent.replace(/\[\/b\]/gi, "</b>");
   
   area.innerHTML = formattedContent;
   //alert(formattedContent.innerText);
   
   console.log("Your content");
 	
    var fileload = {
       'file_id': fid,
       'file_content': content
     };
    $http({
      method: 'POST',
      url: SERVER.url+'/latex2pdf.php',
      data: $.param(fileload),
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        //'Authorization': AuthService.authToken
      }
    }).then(onConversionComplete, onConversionFailed);
			
  };
  
  function onDownloadComplete(response){
      // $scope.pdfFile =response.data;
       	console.log('Download succeeded', response.data);
			}
  function onDownloadFailed(response) {
	console.log('Download failed', response.data);
  }
  
   $scope.openPDF = function() {
   var fid=1;
    var fileloadpdf = {
       'file_id': fid,
       'file_content':  $scope.pdfFile
     };   
   $http({
      method: 'POST',
      url: SERVER.url+'/down.php',
      data: $.param(fileloadpdf),
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        //'Authorization': AuthService.authToken
      }
    }).then(onDownloadComplete, onDownloadFailed);

   }
   
})
