Ext.define('BIZ.utilities.mapSupporter', {
	createEdgeLabelsForPolyLinesArray: function (fPolylineArray, HValignFromPoint, fontColor, fontWeight, xOffset, yOffset)
	{
	    for(var i=0; i<fPolylineArray.length; ++i)
		{
			var layer = fPolylineArray[i].layer;
	    	n = fPolylineArray[i].geometry.components[0].components.length;
	    	for (j=0; j< n - 1 ; j++)
	    	{
			    // Add edges into it's layer
			    startPoint = fPolylineArray[i].geometry.components[0].components[j];
		    	endPoint   = fPolylineArray[i].geometry.components[0].components[j + 1];
	
		    	
			    var points = [startPoint,endPoint]
	
			    if ( startPoint.x > endPoint.x )
			    {
			    	pp         = startPoint;
			    	startPoint = endPoint;
			    	endPoint   = pp;
			    	points = [startPoint,endPoint]
			    }
			    
			    var linestring = new OpenLayers.Geometry.LineString(points);
				var dx = endPoint.x-startPoint.x;
				var dy = endPoint.y-startPoint.y;
				var angle90 = Math.atan2(dx,dy);
				var degrees90 = (angle90 > 0 ? angle90 : (2*Math.PI + angle90)) * 360 / (2*Math.PI);
				var degrees = degrees90 > 90 ? degrees90 - 90 : degrees90 + 270;
				
				var formatSupporter = Ext.create('BIZ.utilities.formatSupporter');
				
			    var labelLineFeature = new OpenLayers.Feature.Vector(linestring.getCentroid(true));
			    labelLineFeature.attributes = {
			        name: formatSupporter.formatNumber2Decimals(linestring.getLength()),
			        label: formatSupporter.formatNumber2Decimals(linestring.getLength()),
			        angle: degrees,
			        sequence: GLB_featureCount,
			        type: ObjGeom.point,
			        align: HValignFromPoint,
			        favColor: fontColor,
			        fontWeight: fontWeight,
			        xOffset: xOffset,
			        yOffset: yOffset
			    };
			    
			    if(layer.name == "Editor") {
			    	layer.addFeatures(labelLineFeature);
			    }
			    else {
			    	//GLB_LayerTxtLine.addFeatures(labelLineFeature);
			    	GLB_LayerLabel.addFeatures(labelLineFeature);
			    }
				GLB_featureCount++;
			}
		}	
	},
	
	createVertexLabelsForPolyLinesArray: function (fPolylineArray, HValignFromPoint, fontColor, fontWeight, xOffset, yOffset)
	{
	    for(var i=0; i<fPolylineArray.length; ++i)
		{
			var layer = fPolylineArray[i].layer;
	    	n = fPolylineArray[i].geometry.components[0].components.length;
	    	for (j=0; j< n - 1 ; j++)
	    	{
	    		// Add vertices into it's layer
	    		var labelOffsetFeature = new OpenLayers.Feature.Vector(fPolylineArray[i].geometry.components[0].components[j]);
			    labelOffsetFeature.attributes = {
			        name: j + 1,
			        label: j + 1,
			        sequence: GLB_featureCount,
			        type: ObjGeom.point,
			        align: HValignFromPoint,
			        favColor: fontColor,
			        fontWeight: fontWeight,
			        xOffset: xOffset,
			        yOffset: yOffset
			    };
			    
			    if(layer.name == "Editor") {
			    	layer.addFeatures(labelOffsetFeature);
			    }
			    else {
			    	GLB_LayerTxtVertec.addFeatures(labelOffsetFeature);
			    }
				GLB_featureCount++;
			}
		}
	},
	
	reSortPositionOfPoint: function (listPoints) {
		listPoints.splice(-1,1);
		var ar = listPoints;
		ar.sort(function(a, b){ 
		    if (a.y < b.y) {
		        return 1;
		    }
		    else if (a.y > b.y) {
		        return -1;
		    }
		    else {
		    	if (a.x < b.x) {
		        	return -1;
			    }
			    else if (a.x > b.x) {
			        return 1;
			    }
		    }
		});
		
		return ar;
	},
	
	calculateRightViewBox: function (frameRectangle, viewBox, activeFrame, isFullWidth, isWidth) {
		standardRatioWH = gcn_land_img_width/gcn_land_img_height;
		var framePoints = this.reSortPositionOfPoint(frameRectangle.components[0].components);
		var activeFramePoints = this.reSortPositionOfPoint(activeFrame.components[0].components);
		var top=0,bottom=0,left=0,right=0;
		
		if(isWidth) {
			if(framePoints[0].x < activeFramePoints[0].x) {
				var tempPoint = new OpenLayers.Geometry.Point();
				tempPoint.x = activeFramePoints[0].x;
				tempPoint.y = framePoints[0].y;
				left = framePoints[0].distanceTo(tempPoint)/framePoints[0].distanceTo(framePoints[1]);
			}
			if(framePoints[1].x > activeFramePoints[1].x) {
				var tempPoint = new OpenLayers.Geometry.Point();
				tempPoint.x = activeFramePoints[1].x;
				tempPoint.y = framePoints[1].y;
				right = framePoints[1].distanceTo(tempPoint)/framePoints[0].distanceTo(framePoints[1]);
			}
			if(framePoints[0].y > activeFramePoints[0].y) {
				var tempPoint = new OpenLayers.Geometry.Point();
				tempPoint.x = framePoints[0].x;
				tempPoint.y = activeFramePoints[0].y;
				top = framePoints[0].distanceTo(tempPoint)/framePoints[0].distanceTo(framePoints[3]);
			}
			if(framePoints[3].y < activeFramePoints[3].y) {
				var tempPoint = new OpenLayers.Geometry.Point();
				tempPoint.x = framePoints[3].x;
				tempPoint.y = activeFramePoints[3].y;
				bottom = framePoints[3].distanceTo(tempPoint)/framePoints[0].distanceTo(framePoints[3]);
			}
		}
		else {
			
		}
		if(isFullWidth) {
			if(isWidth) {
				
			}
			else {
				
			}
		}
		else {
			if(isWidth) {
				
			}
			else {
				
			}
		}
		
		viewBoxArray = viewBox.split(" ");
		var startX = parseInt(viewBoxArray[0]);
		var lengthX = parseInt(viewBoxArray[2]);
		var startY = parseInt(viewBoxArray[1]);
		var lengthY = parseInt(viewBoxArray[3]);
		
		var newStartX = Math.floor(startX + left*lengthX);
		var newLengthX = Math.ceil(lengthX - newStartX - right*lengthX);
		var newStartY = Math.floor(startY + top*lengthY);
		var newLengthY = Math.ceil(lengthY - newStartY - bottom*lengthY);
		
		var newViewBox = newStartX + " " + newStartY + " " + newLengthX + " " + newLengthY;
		return newViewBox;
	}
});

