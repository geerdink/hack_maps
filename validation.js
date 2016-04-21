$(function()
{
    // maak de verzend knop inactief  
    $("#button").attr("disabled", "disabled");

    // laad de validatie bibliotheek en wacht een halve seconde na focus
    var pcode = new LiveValidation( "postcode", { validMessage: " OK", wait: 500 } );

    // leeg veld melding toevoegen
    pcode.add( Validate.Presence, { failureMessage: " Het postcode veld is verplicht" } );

    // formaat controle             
    pcode.add( Validate.Format, { pattern:  /^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/,
        failureMessage: " Incorrecte postcode, formaat is 1234AB" } );

    pcode.onValid=function()                        // validatie succesvol
    {
        var zip = $("#postcode").val();             // sla op in variabele zip
        zip     = zip.toUpperCase();                // hoofdletters
        zip     = zip.replace(" ", "");             // verwijder spatie
        $("#postcode").val(zip);                    // zet terug in formulier
        $("#button").removeAttr("disabled");        // maak de verzend knop actief
    }

    $( "#postcode" ).keyup(function()               // fout 
    {
        $("#msg").html('')                          // haal vink weg
        $("#button").attr("disabled", "disabled");  // maak de verzend knop inactief
    })

    $( "#button" ).click(function()
    {
        $("frm").submit();                           // verstuur formulier
        $("#button").attr("disabled", "disabled");   // maak de verzend knop inactief
    })
});
