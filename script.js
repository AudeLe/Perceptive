document.addEventListener('DOMContentLoaded', function(){

    // Submit form
    jQuery(document).on('click', '#submitBtn', function(e){
        e.preventDefault();

        jQuery.getJSON('script.php', {
            command: 'fetch',
        }).done(function(data){
            console.log(data);
            console.log('WS successful');
        }).fail(function(data){
            console.log(data);
            console.log('An error occurred, we could not retrieve the data. Pleas try again later.');
        });

    });

});