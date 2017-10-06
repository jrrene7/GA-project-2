$(function(){

  $('#submit').on('click', function(event){
  	const name  = $('#name').val();
  	makeCall(name);
  });

  function makeCall(name){
  	var url = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=1507140969558&apikey=46278f901526c87460b842a56dfde620&hash=48e0227480eccb8cd5c928b757883160`;
  	$.ajax(url, {
  		success: function(data){
  			console.log('Data:', data);
  			getData(data)
  		}
  	})

  };

  function getData(responseData){

  		let name = responseData.results.name;
  		let description = responseData.results.description;
  		let thumbnail= responseData.results.thumbnail.path;
  	
  	appendToDom(name, description, thumbnail);
  };

  function appendToDom(name, description, thumbnail){
  	let $result = $('#result').empty();
  	let $name = $('<div class="city"></div>').text(`City: ${city}`).appendTo($result);
  	let $description = $('<div class="description"></div>').text(`Description: ${description}`).appendTo($result);
  	let $thumbnail = $('<div class="thumbnail"></div>').url(`thumbnail: ${thumbnail}`).appendTo($result);
  };

}); // ends doc.ready