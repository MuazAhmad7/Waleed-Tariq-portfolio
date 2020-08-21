//functions
// if ('ontouchstart' in document.documentElement) {
//   document.addEventListener('touchstart', onTouchStart, {passive: true});
// }
function byId(id) {
  return document.getElementById(id);
}
function byClass(className) {
  return document.getElementsByClassName(className);
}
function forEach(list, callback) {
  for (var i = list.length; i--;) {
    callback(list[i], i, list);
  }
}
//smooth scroll-behavior
var toggler = byId('nav-toggler'),
    scrollBtn = byClass('scrollBtn'),
    targetOffset, currentPosition,
    body = document.body,
    animateTime = 000;
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if(!!window.chrome && !isOpera )
    { animateTime = 900;
    }
// get the y offset
function getPageScroll() {
  var yScroll;
  if (window.pageYOffset) {
    yScroll = window.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop;
  } else if (document.body) { //last resort
    yScroll = document.body.scrollTop;
  }
  return yScroll;
}
function smoothSroll(event) {
  if(!event) {
    event = window.event;
  }
  var target = event.target;
  console.log(event.target);
  targetOffset = byId(target.dataset.href.substr(1)).offsetTop;
  currentPosition = getPageScroll(); // uses yScroll's value

  // // accounting for hidden-nav
  // if (toggler.checked && window.innerWidth < 1000){
  //   targetOffset = targetOffset ;
  //   currentPosition = currentPosition;
  // } else if(toggler.checked){
  //   targetOffset = targetOffset;
  //   currentPosition = currentPosition;
  // }
  body.classList.add('in-transition');
  if (targetOffset < currentPosition) {
    body.style.WebitTransform = "translate(0, " + (currentPosition - targetOffset) + "px)";
    body.style.MozTransform = "translate(0, " + (currentPosition - targetOffset) + "px)";
    body.style.transform = "translate(0, " + (currentPosition - targetOffset) + "px)";
  } else {
    body.style.WebitTransform = "translate(0, -" + (targetOffset - currentPosition) + "px)";
    body.style.MozTransform = "translate(0, -" + (targetOffset - currentPosition) + "px)";
    body.style.transform = "translate(0, -" + (targetOffset - currentPosition) + "px)";
  }


  window.setTimeout(function () {
    body.classList.remove('in-transition');
    body.style.cssText = "";
    window.scrollTo(0, targetOffset);
  }, animateTime);

  event.preventDefault();
}
for (var i = 0; i < scrollBtn.length; i++){
scrollBtn[i].addEventListener('click', function(event) {
    smoothSroll(event);
  }, false);
}

//questionnaire
var question = byClass('continue');
var wHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
var wScroll;
var rect = [];
var continueBox = [];
var checkboxes = document.getElementsByTagName('input');
for(var i = 0; i < checkboxes.length; i++) {
  if(checkboxes[i].dataset.continue) {
    continueBox.push(checkboxes[i]);
  } else {
    checkboxes[i].addEventListener('change', checked, false);
  }
}
for (var i = 0; i < continueBox.length; i++) {
  continueBox[i].addEventListener('change', checked, false)
}
function passesCenter(a) {
   return !(a.bottom - (wHeight / 2) < 0 || a.top - (wHeight / 2) >= 0);
}

function checked() {
  if (this.checked) {

    rect = [];
    for (var i = 0; i < question.length; i++) {
      rect.push(question[i].getBoundingClientRect());
    }
    console.log(rect);
    window.addEventListener('scroll', function(){
      wScroll = window.pageYOffset;
      for (var i = 0; i < question.length; i++) {
        if(passesCenter(question[i].getBoundingClientRect())) {
          question[i].classList.add('in-center');
        } else {
          question[i].classList.remove('in-center');
        }
      }
      }
    )
  }
}

// Expand or collapse details
if (byClass('updateDetails')) {
  var toggle = byId('toggle');
  var list= document.querySelectorAll("details");


}
function toggleOpen() {
  for (var i = 0; i < list.length; i++) {
    console.log(i);
    list[i].setAttribute('open', 'true');
  }
}

function toggleClosed() {
  for (var i = 0; i < list.length; i++) {
    console.log(i);
    list[i].removeAttribute('open');
  }
}



// Change background for hashed item to easily see item highlighted

if(window.location.hash) {
     var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
     var hashDetails = hash + "-details";
     var hashedElem = byId(hash);
     if (hashedElem) {
       var hashedDetailElem = byId(hashDetails)
       hashedElem.style.backgroundColor = "var(--grey)";
       hashedDetailElem.setAttribute('open', 'true');
     }
     // hash found
 } else {
     // No hash found
 }

// filter for archive sites.

  // filter
  var filter = byId('filter');
  var posts = byClass('list-item');

  function togglePosts(check) {
    for(var c = 0; c < posts.length; c++) {
      posts[c].classList.add('hidden');
      posts[c].classList.remove('not-hidden');
        if (posts[c].dataset.type == check) {
          posts[c].classList.remove('hidden');
          posts[c].classList.add('not-hidden');
        }
        if (check == null || undefined) {
          posts[c].classList.remove('hidden');
          posts[c].classList.add('not-hidden');
        }
    }
  }
  if(filter) {
    filter.addEventListener('change', function() {
      var selected_val = filter[filter.selectedIndex].value;
      if(selected_val.length === 0){
        togglePosts();
      }
      else {
        togglePosts(selected_val);
      }
      }
    );
  }
var accessToken = '12cf5726b061b5e521a31389b6aea25a51f977b46537c693ca5fb8231d21fb3f';

// Call Dribble v2 API
// Date formatter

var months = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"];



$(function() {
  $.ajax({
      url: 'https://api.dribbble.com/v2/user/shots?access_token=' + accessToken,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log(data);
        var image;
        if (data.length > 0) {
          $.each(data.reverse(), function(i, val) {
            var postDate = new Date(val.published_at);
            var m = postDate.getMonth(); // returns 6
            var d = postDate.getDay();  // returns 15
            var y = postDate.getFullYear();  // returns 2012
            var mLong = months[m];
            image = val.images.normal;
            if (val.low_profile === false) {
              $('#shots').prepend(
               '<a class="shot module grid-item"  rel="noreferrer" target="_blank" href="'+ val.html_url +'" title="' + val.title + '">'+
                '<img loading="lazy" src="'+ image +'" alt="' + val.teaser + '"/>'+
                '<div>' +
                     '<h6>'+ d + ' ' + mLong + ' ' + y +'</h6>'+
                     '<h5>'+ val.title + '</h5>'+
                 '</div>' +
               '</a>'
              )

              $('.truncate').each(function(index, value) {
                 $(this).html($(this).html().substring(0, 400));
                // number of characters
              })
            }
            return i < 12
          })
        }
        else {
          $('#shots').append('<p>No shots yet!</p>');
        }
      }

  });
});
