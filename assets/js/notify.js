var notify = {
    options: {
        target: $('#notify'),
    },
    message: function(message, type){
        if(opt.target.hasClass('alert alert-*'));
            opt.target.removeClass('alert alert-*');

        switch(type) {
            case 'info':
                opt.target.addClass('alert alert-info');
                break;
            case 'success':
                opt.target.addClass('alert alert-success');
                break;
            case 'warning':
                opt.target.addClass('alert alert-warning');
                break;
            case 'danger':
                opt.target.addClass('alert alert-danger');
                break;
            default:
                opt.target.addClass('alert alert-secondary');
        }
        var p = opt.target.children();
        p.text(message);
        opt.target.fadeIn(2000);
    },
    destroy: function() {
        opt.target.delay(3000).fadeOut('2000');
    },
    init: function(){
        opt = notify.options;
    }
}
$(document).ready(function(){
    notify.init();
});