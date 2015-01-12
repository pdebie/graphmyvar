# GraphMyVar

GraphMyVar is a library to render with a graphic a javascript variable or a json.

jsPlumb render the graphic.
Next versions will support others libraries to render.

## Implementation 
 
### graphmyvar.js

This library walk in your json data and produce node and edge.

All the node are div and are applied to a user given DOM div.

Dagre is used to positionning nodes and edges on the DOM.

### gmv_jsPlumb.js 

This functions will render the graphic with jsPlumb library.

### CSS

CSS is important for jsPlumb  to render the graph.

To be detailed ...


## Dependencies

* Dagre
* jsPlumb
* lodash
* jquery

## Known problem

* Longs strings in array are bad rendered
* Circular data are not tested so ...
 






