document.addEventListener('DOMContentLoaded', function(){

    // Submit form
    jQuery(document).on('click', '#submitBtn', function(e){
        e.preventDefault();
        var startDate;
        var endDate;
        let message;

        if(jQuery('#start_date').val()){

            startDate = jQuery('#start_date').val()

        } else {
            startDate = (new Date()).toISOString().split('T')[0];
        }


        if(jQuery('#end_date').val()){
            endDate = jQuery('#end_date').val();
        } else {
            endDate = new Date(new Date().setDate(new Date().getDate()+7)).toISOString().split('T')[0];
        }

        var diff_time = new Date(endDate).getTime() - new Date(startDate).getTime();
        var diff_days = diff_time / (1000 * 3600 * 24);

        console.log(startDate, endDate, diff_time, diff_days);
        if(diff_days <= 7){

            jQuery.getJSON('script.php', {
                command: 'fetch',
                start_date: startDate,
                end_date: endDate,
            }).done(function(data){
                console.log(data);

                if(data.status == 'ok'){

                    if(data.results !== null){

                        let neoItems = data.results;
                        let results;
                        jQuery.each(neoItems, function(i, item){
                            var result = '<td>' + neoItems[i].neo_reference_id + '</td>';
                            result += '<td>' + neoItems[i].name + '</td>';
                            result += '<td>' + neoItems[i].close_approach_data[0].close_approach_date_full + '</td>';


                            results += '<tr>' + result + '</tr>';
                        });

                        message = 'You can see the results of the Near Earth Object API query below.';
                        statusMessage(message);
                        jQuery('#results').empty();
                        jQuery('#results').append(results);

                    } else {

                        message = 'Something went wrong, please make sure that the timeframe is of 7 days.';
                        statusMessage(message);

                    }


                } else {
                    console.log('Error message: ' + data.error);

                }




            }).fail(function(data){
                console.log(data);
                console.log('An error occurred, we could not retrieve the data. Please try again later.');
            });

        } else {
            alert('Please enter a maximum of a 7 days timeframe.');
        }


    });

    function statusMessage(message){

        jQuery('#status-message').empty();
        jQuery('#status-message').append('<div>' + message + '</div>');
    }
});