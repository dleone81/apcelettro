function setPrivacy() {
    var value = $(this).attr('checked');
    if(value == undefined)
        $(this).attr('checked', 'checked');
    else
        $(this).removeAttr('checked');
}
function validate(){

    var fullname = $('input#fullname').val();
    var piva = $('input#piva').val();
	var email = $('input#email').val();
	var category = $('select#category').val();
	var interest = $('select#interest').val();
	var msg = $('textarea#msg').val();
    var privacy = $('input#privacy').val();
    var fieldCheck = [];

    // checks
    var regexFullname = /^[a-zA-Z]+/;
    if(fullname.match(regexFullname) == null)
        fieldCheck.push('nome e cognome');

    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(regexEmail) == null)
        fieldCheck.push('indirizzo email');
        
    if(category == undefined)
        fieldCheck.push('categoria');

    if(interest == undefined)
        fieldCheck.push('interesse');

    if(msg == "")
        fieldCheck.push('messaggio');
        
    if(privacy == undefined)
        fieldCheck.push('accettazione privacy');
        
    if(piva == "")
        piva == "not-provided";

    if(fieldCheck.length == 0){
        var formVal = {
            'fullname': fullname,
            'piva': piva,
            'email': email,
            'category': category,
            'interest': interest,
            'message': msg,
            'privacy': privacy
        };
        return(formVal);
    } else {
        var alertMsg = "Impossibile inviare la tua richiesta. Controlla i campi obbligatori: ";
        var i;
        for(i = 0; i < fieldCheck.length; i++){
            if(i < fieldCheck.length -1)
                var alertMsg = alertMsg.concat(fieldCheck[i])+', ';
            else
                var alertMsg = alertMsg.concat(fieldCheck[i]);
        }
        notify.message(alertMsg, 'danger');
        return(false);
    }
}
function sendEmail(obj){
    var fullname = obj.fullname;
    var piva = obj.piva;
    var email = obj.email;
    var category = obj.category;
    var interest = obj.interest;
    var message = obj.message;

    smtp.send(fullname, piva, email, category, interest, message);
}
$(document).ready(function(){
    $('input#checkbox').on('click', function(){
        setPrivacy();
    });
    $('button#send').on('click', function(){
        let promise = new Promise(function(resolve, reject){
            try{
                var res = validate();
                if(res != false)
                    resolve(res);
            } catch(e){
                reject(notify.destroy());
                console.log(e);
            }
        })
        promise.then(function(result){
            sendEmail(result);
        });
    });
})
