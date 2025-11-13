document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
        32: 'drop'
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        render();
    }
};

// Touch controls for mobile
var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;
    
    // Minimum swipe distance
    var minSwipeDistance = 30;
    
    // Determine if it's a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right
                keyPress('right');
            } else {
                // Swipe left
                keyPress('left');
            }
            render();
        } else {
            // Short tap - rotate
            keyPress('rotate');
            render();
        }
    } else {
        // Vertical swipe
        if (deltaY > minSwipeDistance) {
            // Swipe down
            keyPress('down');
            render();
        } else if (deltaY < -minSwipeDistance) {
            // Swipe up - drop
            keyPress('drop');
            render();
        } else {
            // Short tap - rotate
            keyPress('rotate');
            render();
        }
    }
}
