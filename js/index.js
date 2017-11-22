//function for processing selected mode 
			var getUsers = function() {
						switch ($( "input:radio:checked" ).val()) {
							case 'all':
								break;
							case 'online':
								$( ".userInfo" ).each(function( index ) {
									var streamer = "#streamer_" + index;
									var status = "#status_" + index;																		
									if( $( status ).text() != "Online" ) {
										$( streamer ).hide();
									}
								});
								break;
							case 'offline':
								$( ".userInfo" ).each(function( index ) {
									var streamer = "#streamer_" + index;
									var status = "#status_" + index;
									if( $( status ).text() != "Offline" ) {
										$( streamer ).hide();
									}
								});
								break;
							}
						};		

			$(document).ready(function() {
				var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
				$( "#inlineRadio1" ).prop( "checked",true );

				//output information about streamers
				$.each( streamers, function( index, value ) {						
						$( "#streamers" ).append( "<div class='userInfo row' id='streamer_" + index + "'><div class='col-lg-2'><img id='img_" + index + "' class='userImg'></div><div class='col-lg-8'><div class='row nickname'><a  target='_blank' id='userLink_" + index + "' href='https://www.twitch.tv/" + value + "'>" + value + "</a></div><div class='row details'><span id='detail_" + index + "'></span></div></div><div class='col-lg-2 userStatus'><span id='status_" + index + "'></span></div></div>");
						$.getJSON( "https://wind-bow.gomix.me/twitch-api/streams/" + value + "?callback=?", function( data ) {
							var streamer = "#streamer_" + index;
							var status = "#status_" + index;
							var img = "#img_" + index;
							var detail = "#detail_" + index;
              
  						if( data.stream ) {  						  							
	  							$( streamer ).css( "background-color", "#E6F8EF" );
	  							$( detail ).text( data.stream.game );
	  							$( img ).attr( "src", data.stream.channel.logo );
	  							$( status ).text( "Online" );
  						} else {
  								$.getJSON( "https://wind-bow.gomix.me/twitch-api/channels/" + value + "?callback=?", function( data ) {
  									$( streamer ).css( "background-color", "#F4F6F0" );
  									$( img ).attr( "src", data.logo );
  									$( status ).text( "Offline" );
  								});
  						}
						});
					});
				
				//display streamers according to selected mode
				$( "input:radio" ).change( function() {
					$( ".userInfo" ).each( function() {
						if( $( this ).css("display") == "none" ) {
							$( this ).css( "display", "block" );
						}
					});
					getUsers();
				});

				// search streamers
				$( "#inputSuccess5" ).keyup( function() {					
					$( ".userInfo" ).each( function( index ) {
						var expression = new RegExp( $( "#inputSuccess5" ).val(),"i" );						
						var userName = $( "#userLink_" + index ).text();						
						if( userName.search( expression ) < 0 ) {
							$( "#streamer_" + index ).css( "display", "none" );
						} else {
							$( "#streamer_" + index ).css( "display", "block" );
						}
					});					
				});				
			});
