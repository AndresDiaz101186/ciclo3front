/**
 * llama los elementos contenidos en la tabla clientes que requiere mostrar en esta pantalla de mensajes.
 */
function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.115.74:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
/**
 * llama los elementos contenidos en la tabla de cuatrimotos que requiere mostrar en la pantalla de mensajes.
 */
function autoInicioQuadbike(){

    $.ajax({
        url:"http://129.151.115.74:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-Quadbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}
/**
 * llama los elementos contenidos en la tabla de mensajes y los almacena en respuesta.
 */
function autoInicioMensajes(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.115.74:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    
    })

}
/**
 * recibe lo que hay en respuesta 
 * @param {*} respuesta 
 */
function pintarRespuestaMensajes(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        //myTable+="<td>"+respuesta[i].Quadbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}
/**
 * funcion que verifica id y almacena datos en las tablas de mensajes.
 */
function guardarInformacionMensajes(){
    if ($("#messagetext").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let var2 = {
        
        messageText:$("#messagetext").val(),
        Quadbike:{id: +$("#select-Quadbike").val()},
        client:{idClient: +$("#select-client").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.115.74:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}
/**
 * toma el id para actualizar un elemento.
 * @param {*} idElemento 
 */
function actualizarInformacionMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messagetext").val(),
        Quadbike:{id: +$("#select-Quadbike").val()},
        client:{idClient: +$("#select-client").val()},

    


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.115.74:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messagetext").val("");
           
            autoInicioMensajes();
            alert("se ha Actualizado correctamente el Mensaje")
        }
    });

}
/**
 * toma el id para borrar un mensaje.
 * @param {*} idElemento 
 */
function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.115.74:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioMensajes();
            alert("Se ha Eliminado.")
        }
    });

}