$(document).ready(function(){

   // jQuery methods go here...
   	$.ajax({
	  	type:"GET",
	  	url: "http://localhost:3000/api/product",
	  	complete: function(xhr, statusText){  
		
		if(xhr.status == 200){
			let products = xhr.responseJSON.message.product;
			
			let productListBuild = "";
			
			for(i in products){
				productListBuild += '<tr>'+
										'<td>'+products[i].name+'</td>'+
										'<td>'+products[i].code+'</td>';

				if(products[i].quantity < 30){
					
					if(products[i].quantity < 30 && products[i].quantity >= 10){
						productListBuild += '<td class="lessThanThirty" id='+products[i]._id+'>'+products[i].quantity+'</td>';		
					}else{
						productListBuild += '<td class="lessThanTen" id='+products[i]._id+'>'+products[i].quantity+'</td>';
					} 
				}else{
					productListBuild += '<td class="default" id='+products[i]._id+'>'+products[i].quantity+'</td>';	
				}						
				

				productListBuild +=	'<td>'+products[i].expiry+'</td>'+
									'<td><button class="edit" data-id='+products[i]._id+'>Edit</button><button class="delete" data-id='+products[i]._id+'>Delete</button></td>'+
												 '</tr>';
			}         
		  
			$("#products").append(productListBuild);
		}
	  }
	});

	$(document).on('click','.edit', function(){
		
		$(this).text("Update");
		$(this).attr("class","update");
	  	$(this).closest('tr').find('td').each(function(){
			$(this).attr("contenteditable","true");
		});
	});

	$(document).on('click','.update', function(){
		
		let id = $(this).attr("data-id");
		let rowData = [];
		
		$(this).text("Edit");
		$(this).attr("class","edit");

		$(this).closest('tr').find('td').each(function(){
			$(this).attr("contenteditable","false");
			if($(this).text().trim() == ""){
				alert("data values improper");
				return;	
			} 
			
			let cellData = $(this).text();
			rowData.push(cellData);
		});


		let updateProduct = {
			_id: id,
			name: rowData[0],
			code: rowData[1],
			quantity: parseInt(rowData[2]),
			expiry: rowData[3]
		};

		$.ajax({
            type: "PUT",
            url: "http://localhost:3000/api/product",
            data: updateProduct,
            complete: function(xhr, statusText) {

                /*if(xhr.status == 500) {
                    alert(xhr.responseJSON.status)
                }

                if(xhr.status == 200) {
                   alert(xhr.responseJSON.status);
                }*/

                
                if(updateProduct.quantity < 30){
					
					if(updateProduct.quantity < 30 && updateProduct.quantity >= 10){
						$("#"+id).attr("class","lessThanThirty");		
					}else{
						$("#"+id).attr("class","lessThanTen");
					} 
				}else{
					$("#"+id).attr("class","default");	
				}
            }
        });
	});
	
	$(document).on('click','.delete', function(){
		
		let id = $(this).attr("data-id");
		
		$(this).closest('tr').remove();
		
		$.ajax({
            type: "DELETE",
            url: "http://localhost:3000/api/product",
            data: { "productId" : id},
            complete: function(xhr, statusText) {


                /*if(xhr.status == 500) {
                    alert(xhr.responseJSON.status)
                }

                if(xhr.status == 200) {
                   alert(xhr.responseJSON.status);
                }*/
            }
        });
	});
});