var gmv_jsPlumb = (function () {
  var color = "gray";
  var arrowCommon = { foldback:0.5, fillStyle:color, width:10 };
  // var overlays = [ [ "Arrow", { location:0.8 }, arrowCommon ] ];
  var overlays = [];

  /* ******************************
   * jsPlumb specifications
   * ******************************
  */

  var plumbNewNode = function(newNd) {

    var connect = $('<div>').addClass('connect');
    newNd.append(connect);

    jsPlumb.makeTarget(newNd, {
      anchor: 'Continuous'
    });

    jsPlumb.makeSource(connect, {
      parent: newNd,
      paintStyle:{ fillStyle:"blue", outlineColor:"black", outlineWidth:1 },
      anchor: 'Continuous'
    });

    jsPlumb.addEndpoint(newNd, {
      uuid: $(newNd).attr("id") + "-bottom",
      anchor: "Bottom",
      endpointStyle : { radius:3, fillStyle:color },
      maxConnections: -1
    });

    jsPlumb.addEndpoint(newNd, {
      uuid: $(newNd).attr("id") + "-top",
      anchor: "Top",
      endpointStyle : { radius:3, fillStyle:color },
      maxConnections: -1
    });
    jsPlumb.draggable(newNd);
  };

  var plumbConnect = function(newNd) {
    var idIs = $(newNd).attr("id");
    var parentIs = $(newNd).attr("parent");
    jsPlumb.connect({uuids:[parentIs + "-bottom", idIs + "-top" ],
      		// connector : [ "Bezier", { curviness:10 } ],
      		connector : [ "Flowchart", { stub:10 } ],
          paintStyle: { strokeStyle: color, lineWidth: 1 }, overlays: overlays});
  };

  var doDrawPlumb = function (ndl) {
    _.forEach(ndl, function(a_node) {
      plumbNewNode(a_node);
      plumbConnect(a_node);
    });  
  };

  return {
    drawPlumb : function (ndl) {
      doDrawPlumb(ndl);
    }
  };

}());
