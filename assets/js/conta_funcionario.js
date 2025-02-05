let campos=[ $telefone = $('#telefone'),
 $nome = $('#nome'),
 $email = $('#email'),
 $cep = $('#cep'),
 $rua = $('#rua'),
 $bairro = $('#bairro'),
 $cidade = $('#cidade'),
 $estado = $('#estado'),
 $senha = $('#senha'),
 $senhaconfirm = $('#senhaconfirm'),
 $role = $('#role')]
 let $salario = $('#salario')
 let $especialidade = $('#especialidade')
 let $crm = $('#crm')
$salario.hide()
$especialidade.hide()
$crm.hide()


const changing_role = () =>{
    if($role[0].value == "admin" || $role[0].value == "funcionario"){
        if($role[0].value == "funcionario"){
            $('#salario').prop( "disabled", true );
            $('#role').prop( "disabled", true );
        }
        $salario.show()
        $especialidade.hide()
        $crm.hide()
    }else if($role[0].value == "medico"){
        $('#salario').prop( "disabled", true );
        $('#role').prop( "disabled", true );
        $salario.show()
        $crm.show()
        $especialidade.show()
    }else{
    $salario.hide()
    $especialidade.hide()
    $crm.hide()
    }
}


const get_user = () =>{
    let id = window.location.hash.substring(1,window.location.hash.length)
    console.log(id)
     let user = {
         "email":"testeemail",
         "nome":"testenome",
         "telefone":"(31)99779-2370",
         "endereco":"idaleatorio",
         "role":"admin",
        "salario":10000,
        "especialidade":"Pediatria",
        "crm":123
        
    }
    let endereco = {
        "cep":"32240010",
         "rua":"Rua Teste",
         "bairro":"Bairro Teste",
         "cidade":"Cidade TEste",
         "estado":"Estado Teste"
    }
    $telefone[0].value = user.telefone
    $nome[0].value = user.nome
    $email[0].value = user.email
    $cep[0].value = endereco.cep
    $rua[0].value = endereco.rua
    $bairro[0].value = endereco.bairro
    $cidade[0].value = endereco.cidade
    $estado[0].value = endereco.estado
    $role[0].value=user.role
    $salario[0].value = user.salario
    $especialidade[0].value = user.especialidade
    $crm[0].value = user.crm
    changing_role()
 }

 get_user()

let value,valuenoformt 
$telefone.on('input',function(){
    value = $telefone[0].value
    valuenoformt = value.replaceAll('(','').replaceAll(')','').replaceAll('-','')
    if(!$.isNumeric(valuenoformt))
    value=value.substring(0,value.length-1)
    else{ if(value.length==2)
    value=`(${value})`
    if(value.length==9 && value.includes('-'))
    value=value.replaceAll('-','')
    else if(value.length==9)
    value=`${value}-`
    if(value.length>14)
    value=value.substring(0,value.length-1)}
    $telefone[0].value=value
})
$cep.on('input',function(){
    value = $cep[0].value
    if(!$.isNumeric(value))
    value=value.substring(0,value.length-1)
    else if(value.length>8)
    value=value.substring(0,value.length-1)
    $cep[0].value=value
})

$senhaconfirm.on('change',function(){
    if($senhaconfirm[0].value!=$senha[0].value)
    alert('A confirmação de senha deve ser igual a senha')
})

$role.on('change',function(){
   changing_role()
})

let $cadastrar = $('#cadastro')
$cadastrar.on('click',function(){
    let stringerro = new String('')
    let dados ={}
    if($role[0].value == "admin" || $role[0].value == "funcionario"){
        if(campos.indexOf($salario)==-1)
        campos.push($salario)
        if(campos.indexOf($especialidade)!=-1)
        campos.splice(campos.indexOf($especialidade), 1);
        if(campos.indexOf($crm)!=-1)
        campos.splice(campos.indexOf($crm), 1);
    }else if($role[0].value == "medico"){
        if(campos.indexOf($salario)==-1)
        campos.push($salario)
        if(campos.indexOf($especialidade)==-1)
        campos.push($especialidade)
        if(campos.indexOf($crm)==-1)
        campos.push($crm)
    }else{
        if(campos.indexOf($salario)!=-1)
        campos.splice(campos.indexOf($salario), 1);
        if(campos.indexOf($especialidade)!=-1)
        campos.splice(campos.indexOf($especialidade), 1);
        if(campos.indexOf($crm)!=-1)
        campos.splice(campos.indexOf($crm), 1);
    alert('O tipo de funcionario não pode ficar em branco')
    }
    if($senhaconfirm[0].value!=$senha[0].value)
    alert('A confirmação de senha deve ser igual a senha')
    else{
    campos.forEach(element => {
        console.log(element)
        if(element[0].id!="senhaconfirm" || element[0].id!="role")
            if(element[0].value)
            dados[element[0].id]=element[0].value
        if(!element[0].value)
        stringerro = stringerro + element[0].id+", "
    });
    if(stringerro.length)
    alert(`Os campos ${stringerro.substring(0,stringerro.length-2)} não podem ficar em branco`)
    console.log(dados)}
})