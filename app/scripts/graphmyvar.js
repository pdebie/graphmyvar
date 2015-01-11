var graphmyvar = (function () {
  var myArrayOfCssClass = ["windowarray", "windowobject", "window"]
  var color = "gray";
  var arrowCommon = { foldback:0.5, fillStyle:color, width:10 };
  // var overlays = [ [ "Arrow", { location:0.8 }, arrowCommon ] ];
  var overlays = [];
  // var i = 0;

  var arrange = function() {
    var nodes = $(".node");
  //  var instPlumb = jsPlumb.getInstance();
  //  var edges = instPlumb.getAllConnections();
    var g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(function() { return {}; });

    /*
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      plumbNewNode(n);
    }

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      plumbConnect(n);
    } */

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      g.setNode(n.id, {width: 40, height: 10});
      g.setEdge($(n).attr("parent"), n.id);
    }

    // for (var i = 0; i < edges.length; i++) {
      // var c = edges[i];
      // g.setEdge(c.source.id, c.target.id );
    // }
    dagre.layout(g);
    g.nodes().forEach(function(v) {
      try {
        $("#" + v).css("left", g.node(v).x + "px");
        $("#" + v).css("top", g.node(v).y + "px");
      }
      catch(err) {
      }
    });

  };

  var compId = function(z) { return z;};

  var stringy = function(s) {
    var res = "";
    if (_.isString(s)) {
      res = s;
    }
    else {
      res = JSON.stringify(s);
    }
    return res;
  };

  var addNewNode = function(apid, aname, acontent, atype) {
    var pid = apid;
    var aclasse = myArrayOfCssClass[2];
    if (atype === Array) {
      aclasse = myArrayOfCssClass[0];
    }
    else {
      if (atype === Object) {
        aclasse = myArrayOfCssClass[1];
      }
    }

    var s_aname = stringy(aname);
    var s_acontent = stringy(acontent);

    var i = _.uniqueId(["fifi"]);

    var baba = '#pop' + i;
    var zzz;
    if ((atype !== Array) && (atype !== Object)) {
      zzz = function() { $(baba).toggle();};
    }
    else zzz = null;

    var newNode = $('<div>').attr('id', compId(i)).attr('parent', pid)
                    .addClass(aclasse).addClass('node').hover(zzz);

    var title = $('<div>').addClass('title').text(s_aname.substring(0,10));
    newNode.append(title);

    var popo = $('<div>').attr('id', 'pop'+compId(i)).addClass("popover above").text(s_acontent).hide();
    newNode.append(popo);

    /*
    newNode.css({
      'top': pid*5 +'em',
      'left': i+2+'em'
    });  */
    return newNode;
  };

  /* ******************************
   * Plumb specifications
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


  var addObject = function (_pid, _name, _content, _type) {
    console.log('addObject: ', _pid, _name, _content, _type);
    var nn = addNewNode(_pid, _name, _content, _type);
    $('#chart-demo').append(nn);
    plumbNewNode(nn);
    plumbConnect(nn);
    return $(nn).attr("id");
  };


  var doWalk = function (oo, a_key, pid) {
    var _id = 0;
    if (_.isArray(oo)) {
      var _title = "Array";
      if (a_key) {
        _title = a_key;
      }
      _id = addObject(pid, _title, null, Array);
      _.forEach(oo, function(item) {
        doWalk(item, null, _id);
      });
    }
    else {
      if (_.isPlainObject(oo)) {
        var _title = "Object";
        if (a_key) {
          _title = a_key;
        }

        _id = addObject(pid, _title, null, Object);
        _.forOwn(oo, function(myValue, myKey) {
          doWalk(myValue, myKey, _id);
        });
      }
      else {
        if (a_key) {
          _id = addObject(pid, a_key, oo, null);
        }
        else {
          _id = addObject(pid, oo, null, null);
        }
      }
    }
  };

  var doSetCss = function(arrayOfCssClass){
    myArrayOfCssClass = arrayOfCssClass;
  };

  return {
    setCss : function (arrayOfCssClass){
      doSetCss(arrayOfCssClass);
    },
    walk : function (oo, a_key, pid) {
      doWalk(oo, a_key, pid);
      arrange();
    }
  };

}());
