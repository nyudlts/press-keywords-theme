jQuery(document).ready(function($) {
jQuery('#commentform').validate({
 
rules: {
  author: {
    required: true,
    minlength: 2
  },
 
  email: {
    required: true,
    email: true
  },
 
  comment: {
    required: true,
    minlength: 20
  }
},
 
messages: {
  author: "Please provide your name.",
  email: "Please provide a valid email address.",
  comment: "Comment cannot be empty!"
},
 
errorElement: "span",
errorPlacement: function(error, element) {
  element.after(error);
}
 
});
});
