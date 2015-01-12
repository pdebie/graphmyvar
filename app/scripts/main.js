jsPlumb.ready(function() {
  //	var instance = jsPlumb.getInstance({
  //		Connector : [ "Bezier", { curviness:10 } ],
  // DragOptions : { cursor: "pointer", zIndex:2000 },
  // PaintStyle : { strokeStyle:color, lineWidth:1 },
  // EndpointStyle : { radius:3, fillStyle:color },
  // HoverPaintStyle : {strokeStyle:"#ec9f2e" },
  // EndpointHoverStyle : {fillStyle:"#ec9f2e" },
  // Container:"chart-demo"
  // });

  // suspend drawing and initialise.
  //	instance.doWhileSuspended(function() {
  //	var windows = jsPlumb.getSelector(".chart-demo .window");
  //		instance.draggable(windows);
  //	});
  //	jsPlumb.fire("jsPlumbDemoLoaded", instance);
  /*
  b = [];
  for (var i = 0; i< 10; i++){
  var kk = [];
  for (var z = 0; z< 10; z++){
  kk.push([{a:1}]);
};
b.push(kk);
};

_.forEach(b, function(k) {
k.push([]);
});

*/
// b.replique = b; pas prevu les cycle zut

  graphmyvar.walk(b);
  graphmyvar.applyDOM('#chart-demo');
  gmv_jsPlumb.drawPlumb(graphmyvar.getNodes());
  jsPlumb.repaintEverything();
});

$('#but').click(function(e) {
  addObject(0, '', '', '', null);
  arrange();
  jsPlumb.repaintEverything();
});
