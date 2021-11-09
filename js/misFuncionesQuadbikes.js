/**
 * llama los elementos de la tabla categoria y los almacena en respuesta.
 */
function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.115.74:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
/**
 * llama los elementos contenidos en la tabla cuatrimoto y los pone en response.
 */
function traerInformacionQuadbike() {
    $.ajax({
        url:"http://129.151.115.74:8080/api/Quadbike/all",
        
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaQuadbike(response);
        }

    });

}
/**
 * toma los elementos de response y los pinta en pantalla.
 * @param {*} response 
 */
function pintarRespuestaQuadbike(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonQuadbike2" onclick="borrar(' + response[i].id + ')">Borrar Quadbike!</button></td>';
        myTable+='<td><button class = "botonQuadbike2" onclick="cargarDatosQuadbike(' + response[i].id + ')">Editar Quadbike!</button></td>';
        myTable+='<td><button class = "botonQuadbike2" onclick="actualizar(' + response[i].id + ')">Actualizar Quadbike!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaQuadbike").html(myTable);
}
/**
 * ingresa datos en los campos para facilitar su actualizacion.
 * @param {*} id 
 */
function cargarDatosQuadbike(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.115.74:8080/api/Quadbike/"+id,
        
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
/**
 * valida los datos y procede a almacenarlos en la tabla cuatrimotos.
 */
function agregarQuadbike() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.115.74:8080/api/Quadbike/save",
                
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
/**
 * ubica un elemento por el id y lo borra de la tabla cuatrimoto.
 * @param {*} idElemento 
 */
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.115.74:8080/api/Quadbike/"+idElemento,
            
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaQuadbike").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}
/**
 * ubica un elemento en la tabla por el id y lo actualiza.
 * @param {*} idElemento 
 */
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.115.74:8080/api/Quadbike/update",
            
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaQuadbike").empty();
                listarQuadbike();
                alert("se ha Actualizado Correctamente!")

                
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
