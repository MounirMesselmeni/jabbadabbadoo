var json = '{"table_headings": ["Jabba", "Dabba", "Doo"],"display_rules": [2,3,5],"table_marker":"X"}';

$(document).ready(function(){
	//Using jQuery parseJSON to get js object
	var data = $.parseJSON(json);
	
	//test if data is valid
	if(data.table_headings.length != data.display_rules.length){
		alert('JSON Data parse error: table_headings length should be equal to display_rules length');
		return;
	}

	//Adding default table_marker if not provided
	if(!data.table_marker){
		data.table_marker = 'X';
	}

	//Processing headers
	var headerItems = [];
	$.each(data.table_headings, function(index, value){
		headerItems.push("<td>"+ value +"</td>");
	});
	//Updating colspan in thead
	$('thead td').attr('colspan', data.table_headings.length + 2);
	//Inserting new headers
	$('.first-line td:first').after(headerItems.join(''));

	var counter = 0;

	//Metohd used to add new row
	var insertRow = function(){
		counter ++;
		var row = $('<tr></tr>');
		row.append($('<td></td>').text(counter));
		// Add table_headings td
		var text = '';
		for (var i = 0; i < data.table_headings.length; i++) {
			if((counter % data.display_rules[i]) === 0){
				//Counter is divisible by current td rule
				row.append($('<td></td>').text(data.table_marker));
				//Append text to be displayed
				text += data.table_headings[i];
			}else{
				row.append($('<td></td>'));
			}
		};
		//Append last td and set text result
		row.append($('<td></td>').text(text));
		//Append row to the table
		$('table').append(row);
	};

	//button click event binding
	$('#add_row_btn').on('click', insertRow);
});
