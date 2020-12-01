// NOTE NG KA ERROR PO  SA CONNECTION GINAMIT KO PO MUNA ANG LUMANG AJAX FOR NOW  ETO PO ANG ERROR https://prnt.sc/vt47m6

// let getKeyDates = doAjax({
//     url:`actions.php`,
//     type: 'POST',
//     data:JSON.stringify({
//         'action':'Get Key Dates',
//         'country':'nz'//au or nz
//     })
// });


// getKeyDates.then(data=>{
//     let resp = JSON.parse(data);
//     console.log(data,'weak');
//     if(resp.status){
//         let keyDates = resp.response.data;
//         keyDates.map(function(i){
           
//         });
//     }else{
//         console.log(resp);
//     }
// });


$.ajax({
    url:"keydates.json",
    method:"GET",
    crossdomain:true,
    success:function(response){
        let output = response.data;  
        let pushItem = [];
               output.map(function(i){
                 let id =  i.id;
                 let current = i.current;
                 let keydates =  i.key_dates;
                 let month =  i.month;
                 let notes =  i.notes;

                 pushItem.push({
                    'id': id,
                    'current': current,
                    'keydates': keydates,
                    'month': month,
                    'notes': notes
                });
               }); //map
         appenditem(pushItem);
   
    }//success
});//ajax 

function appenditem(pushItem) {
 
    pushItem.map(function(data) {
   
        let dataYear=[];
        let arrYrMonthSplit =  data.id.split('-');

        dataYear.push({
            'month': arrYrMonthSplit[0],
            'year': arrYrMonthSplit[1],
        });
    data.id.replace(/\s/g, '');
        dataYear.map(function(a){
                DifineMonth(a.month)
                if(a.year =="2020"){
                    let appendData=`<div class="eaKeyDate CurrentYear" data-id='${data.id}'>
                                        <span class="eaKeyYear">${a.year}</span>
                                        <span class="eaKeyMonth">${monthData}</span>
                                    </div>`;
                                  $('.mainWrapperKeyDate').append(appendData);
                }else{
            
                }// end if
        });//dataYear Map

  
//resultTableBody
//.filter(x => x.id === xdate.toString())
  
         
    }); //pushItem Map
 
        $(".eaKeyDate").on("click", function(){
        let xdate = $(this).attr("data-id");
        let trimByID = pushItem.filter(x => x.id == xdate);
            removeDuplicate(trimByID);
            displayResult(trimByID);
        });
    
  
     
} // function appenditem

// result each page Data
function displayResult(data){
    data.map(function(i){
        $('.resultTableBody').html("");
        $('.resultDate').html(i.month);
        console.log(i.keydates);
            i.keydates.map(function(kd){
                let appendData=`<tr>
                    <td style="width:12.5%">${kd.category}</td>
                    <td style="width:12.5%">${kd.date}</td>
                    <td style="width:75%">${kd.description}</td>
                </tr>`;

                $('.resultTableBody').append(appendData);
            });

    }); //end map
    
}//end function

function DifineMonth(data){
    switch(data) {
        case "january":
            monthData = "Jan";
        break;

        case "february":
            monthData = "FEB";
        break;

        case "march":
            monthData = "MAR";
        break;

        case "april":
            monthData = "APR";
        break;

        case "may":
            monthData = "MAY";
        break;

        case "june":
            monthData = "JUN";
        break;

        case "july":
            monthData = "JUL";
        break;

        case "august":
            monthData = "AUG";
        break;

        case "september":
            monthData = "SEP";
        break;

        case "october":
            monthData = "OCT";
        break;

        case "november":
            monthData = "NOV";
        break;

        case "december":
            monthData = "DEC";
        break;

        default:
            monthData = "JAN";
    }                             
}//DifineMonth


function removeDuplicate(arr){
    return uniqueItems = Array.from(new Set(arr))
} // end removeDuplicate

/**
 * @param settings
 * Reusable Async AJAX
 * eg: var a = {
        url: ajaxurl,
        type: 'POST',
        data: args
    }
    Callback : a.then(data => {
        console.log(data)
    })
    */
   async function doAjax(settings) {
    let result
    try{
        result = await $.ajax(settings);
        return result;
    }catch(error){
        console.log(error)
    }
}