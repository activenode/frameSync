# frameSync
A cross-browser solution for synchronizing cross-document synchronization between multiple sites/iframes.


#Demo: Synchronized CSS Animations in two different windows
![demo](https://raw.githubusercontent.com/activenode/frameSync/master/samplegif.gif)


#Use Cases
- You created html/css ad formats and you want their animation to start synchronous even if they are in different iframes/documents
- You want to make sure that a user is on multiple pages of your sites at the same time

## Usage Example
In your "main" frame:

    //register needs to be called at page start, not at page window load!
    var _root = FrameSync('testNamespace').register('root');

    //set a function that is meant to be called when child is ready
    _root.onload(function(){
        console.log('child is ready / synced');
    });

    document.body.onload = _root.loaded; //set an event-trigger when root is ready

In your "child" frame:

    FrameSync('testNamespace').wait('root')
      .onload(function(){ //set a function that is meant to be called when root is ready
          console.log('synchronized with main!');
      });
