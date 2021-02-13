$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        var min = parseFloat($('#min').val(), 1);
        var max = parseFloat($('#max').val(), 1);


        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && price <= max)) {
            return true;
        }
        return false;
    }
);

$(document).ready(function() {
    var table = $('#tableData').DataTable();
    $('#min, #max').keyup(function() {
        table.draw();
    });
});

$('#tableData').dataTable({
    oLanguage: {
        "sSearch": "Search:"
    },
    aLengthMenu: [
        [50, 100, 200, 500, -1],
        [50, 100, 200, 500, "All"]
    ],
    iDisplayLength: 100,

    
    
    dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
    //sDom: '<"wrapper"lfptip>'
});


$(document).ready( function() {
    $('#tableDataa').dataTable( {
    "aaSorting": [1,'desc']
    } );
} );
