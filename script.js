document.addEventListener('DOMContentLoaded', function(){

    // Submit form
    jQuery(document).on('click', '#submitBtn', function(e){
        e.preventDefault();

        var startDate = jQuery('#start_date').val() ? jQuery('#start_date').val() : null;
        var endDate = jQuery('#end_date').val() ? jQuery('#end_date').val() : null;

        jQuery.getJSON('script.php', {
            command: 'fetch',
            start_date: startDate,
            end_date: endDate,
        }).done(function(data){
            console.log(data);
            let results;
            jQuery.each(data, function(i, item){
                var result = '<td>' + data[i].neo_reference_id + '</td>';
                result += '<td>' + data[i].name + '</td>';
                result += '<td>' + data[i].close_approach_data[0].close_approach_date_full + '</td>';


                results += '<tr>' + result + '</tr>';
            });
            jQuery('#results').empty();
            jQuery('#results').append(results);

            if(data.error){
                console.log('Error message: ' + data.error);
            }

        }).fail(function(data){
            console.log(data);
            console.log('An error occurred, we could not retrieve the data. Pleas try again later.');
        });

    });

});