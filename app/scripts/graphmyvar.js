var graphmyvar = (function () {

  var myArrayOfCssClass = ["windowarray", "windowobject", "window"]
  var nodeList = [];

  var arrange = function() {
    var g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(function() { return {}; });
    
    _.forEach(nodeList, function(n) {
      g.setNode($(n).attr("id"), {width: 40, height: 1});
      g.setEdge($(n).attr("parent"), $(n).attr("id"));
    });  
    dagre.layout(g);
    g.nodes().forEach(function(v) {
      try {
        $("#" + v).css("left", g.node(v).x + "px");
        $("#" + v).css("top", g.node(v).y + "px");
        /*var nude = g.node(v);
        if (nude) {
        nude.css({
          'top': nude.y + "px",
          'left': nude.x + "px"
        });
        }*/
      }
      catch(err) {
      }
    });

  };

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
    var uid = _.uniqueId(["fifi"]);
    console.log('addNewNode: name is', aname, '/ Id is', uid, '/ ParentId is' , apid);
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

    var idPop = '#pop' + uid;
    var myFuncHover = null;
    if ((atype !== Array) && (atype !== Object)) {
      myFuncHover = function() { $(idPop).toggle();};
    }    

    var newNode = $('<div>').attr('id', uid).attr('parent', apid).addClass(aclasse).hover(myFuncHover); // .addClass('node')

    var title = $('<div>').addClass('title').text(s_aname.substring(0,10));
    newNode.append(title);

    var divPop = $('<div>').attr('id', 'pop'+uid).addClass("popover above").text(s_acontent).hide();
    newNode.append(divPop);
    
    nodeList.push(newNode);

    return uid;
  };

  var doWalk = function (oo, a_key, pid) {
    var _id = 0;
    if (_.isArray(oo)) {
      var _title = "Array";
      if (a_key) {
        _title = a_key;
      }
      _id = addNewNode(pid, _title, null, Array);
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

        _id = addNewNode(pid, _title, null, Object);
        _.forOwn(oo, function(myValue, myKey) {
          doWalk(myValue, myKey, _id);
        });
      }
      else {
        if (a_key) {
          _id = addNewNode(pid, a_key, oo, null);
        }
        else {
          _id = addNewNode(pid, oo, null, null);
        }
      }
    }
  };

  var doSetCss = function(arrayOfCssClass){
    myArrayOfCssClass = arrayOfCssClass;
  };
  
  var doApplyDOM = function(a_div) {
    _.forEach(nodeList, function(a_node) {
      $(a_div).append(a_node);
    });
    arrange();
  };
  
  var doGetNodes = function() {
    return nodeList;
  };  

  return {
    setCss : function (arrayOfCssClass) {
      doSetCss(arrayOfCssClass);
    },
    getNodes : function () {
      return doGetNodes();
    },    
    applyDOM : function (a_div) {
      doApplyDOM(a_div);      
    },
    walk : function (oo) {
      doWalk(oo, null, 0);      
    }
  };

}());
