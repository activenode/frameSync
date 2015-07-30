# frameSync
A cross-browser solution for synchronizing cross-document synchronization between multiple sites/iframes


#Use Cases
- You created html/css ad formats and you want their animation to start synchronous even if they are in different iframes/documents
- You want to make sure that a user is on multiple pages of your sites at the same time

## Usage Example
In your "main" frame:

  var _main = 
    FrameSync('ANY_UNIQUE_NAME').register('main')
      .onload(function(){
        console.log('synchronized with child!');
      });
  document.body.onload = _main.loaded;

In your "child" frame:

  FrameSync('ANY_UNIQUE_NAME').wait('main')
    .onload(function(){
        console.log('synchronized with main!');
    });
