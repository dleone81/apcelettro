var smtp = {
    "token": "bfa671e2-1762-4df4-aa17-f4d1fe0b8957",
    "to": "info@apcelettrorappresentanze.it",
    "in": 750,
    "out": 5000,

    notify: function(m){
        if(m === 'OK'){
            notify.message('Il tuo messaggio è stato inviato con successo','success');
        } else {
            notify.message('Non è stato possibile inviare il tuo messaggio. Riprova più tardi','warning');
        }
    },
    send: function(fullname, piva = "non fornita", email, category, interest, msg){

        Email.send({
            SecureToken: smtp.token,
            To: smtp.to,
            From: fullname+' <'+email+'>',
            Subject: 'Richiesta di informazioni da '+fullname+' per '+interest,
            Body: '<b>Nome: </b>'+fullname+'<br>'+'<b>Partita IVA: </b>'+piva+'<br>'+'<b>Indirizzo email: </b>'+email+'<br>'+'<b>Categoria: </b>'+category+'<br>'+'<b>Interesse: </b>'+interest+'<br>'+'<b>Messaggio: </b>'+msg,
        }).then(function(){
            window.location.replace("./messaggio-ricevuto");
        })
    }
}