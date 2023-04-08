$(document).ready(function (){
$('.payWithRazorpay').click(function(e){
     e.preventDefault()
     var fname=$("[name='fname']").val();
     var lname=$("[name='lname']").val();
     var email=$("[name='email']").val();
     var phone=$("[name='phone']").val();
     var address=$("[name='address']").val();
     var city=$("[name='city']").val();
     var state=$("[name='state']").val();
     var country=$("[name='country']").val();
     var pincode=$("[name='pincode']").val();
     var token=$("[name='csrfmiddlewaretoken']").val();

     if(fname == "" ||lname== "" ||email== "" ||phone== "" ||address== "" ||city== "" ||state== ""||country== "" ||pincode== "")
     {
      swal("error found!", "All field are mandatory", "error");
      return false;
     }
     else
     {
      $.ajax({
       method:"GET",
       url:"/proceed-to-pay",
       success: function (response){
       console.log(response)
           var options = {
    "key": "rzp_test_UwEOvPyddHmbsu", // Enter the Key ID generated from the Dashboard
    "amount": response.total_price *100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Aman Fitclub", //your business name
    "description": "Thank you for buying with us",
    "image": "https://th.bing.com/th/id/OIP.lhNsnLWXVKSxJNSyY6X4TAHaE7?w=234&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": function (responseb){
      alert(responseb.razorpay_payment_id)
     $.ajax({
       method:"POST",
       url:"/place-order",
       data:{
           "fname":fname,
           "lname":lname,
           "email":email,
           "phone":phone,
           "address":address,
           "city":city,
           "state":state,
           "country":country,
           "pincode":pincode,
           "payment_mode":"Paid by Razorpay",
           "payment_id":responseb.razorpay_payment_id,
           csrfmiddlewaretoken:token

       },
       success: function (responsec){
       console.log(responsec)
        swal("Congratulations!" , responsec.status ,"success").then((value) => {
        window.location.href ='/my-orders'
        })

       }

      });
    },

    "prefill": {
        "name": fname+" "+lname, //your customer's name
        "email": email,
        "contact": phone
    },

    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
    rzp1.open();
       }
      });
     }


        });
        });