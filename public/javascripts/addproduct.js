$(document).ready(function(e){

    $('#save').click(function() {
        
        let productData = $('#product').serializeArray();
        //console.log(buildingAddData);

        
        productData.map(function(val){
            val.value = val.value.trim();
            
            if(val.value == ""){
                alert("Please fill all the fields");    
                throw new Error("Please fill all the fields!");
            }
        });


        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/product",
            data: productData,
            complete: function(xhr) {

                if(xhr.status == 500) {
                    alert(xhr.responseJSON.status)
                }

                if(xhr.status == 400) {
                   alert(xhr.responseJSON.message.error);
                }
                
                if(xhr.status == 200) {
                   alert(xhr.responseJSON.status);
                }
            }
        });
           
    });
});