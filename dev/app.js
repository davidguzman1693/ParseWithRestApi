var parseAppID='your-parse-app-id'
var parseRestKey='your-rest-api-key'
$(document).ready(function(){
	getMessages()
	$('#send').click(function(){
		var $sendButton = $(this)
		$sendButton.html('<img src="img/spinner.gif" width="20"/>')
		var username = $('input[name=username]').val()
		var message = $('input[name=message]').val()
		$.ajax({
			url: ' https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseAppID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'message': message
			}),
			type: 'POST',
			success: function() {
				console.log('sent')
				getMessages()
				$sendButton.html('SEND')
			},
			error: function() {
				console.log('error')
				$sendButton.html('SEND')
			}
		})
	})
})

function getMessages() {
	$.ajax({
		url: ' https://api.parse.com/1/classes/MessageBoard?limit=1000',
		headers: {
			'X-Parse-Application-Id': parseAppID,
			'X-Parse-REST-API-Key': parseRestKey
		},
		contentType: 'application/json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log('get')
			updateView(data)
		},
		error: function() {
			console.log('error')
		}
	})
}
