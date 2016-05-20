<img src="./icon.png" width="300">

# urbanLAB VR Cardboard
Cardboard (VR) navigable photospheres with Three.js.
Augmented videos and annotations.
Forked from https://github.com/quanto/cardboard.

## How-to

- Add some videos in the `videos/` folder
- Change the corresponding sources in the `index.html` file
- Load your web app on a phone
- Click twice to enable fullscreen (and enable videos in the background — yup, this is a hack*)
- Put the phone in a cardboard
- Enjoy!

## *Videos' hack

On mobile device, we can't preload videos nor launch videos when the page has loaded (for bandwidth and data reasons). The only thing we can do is to trigger an interaction event between the user and the webpage like scroll, tap, touch, etc. Because your phone is on your head and not in your hand, I choose to use the click (tap) event. That's why you have to touch your screen before putting it in your cardboard. Some cardboards has a button, it should work too :)