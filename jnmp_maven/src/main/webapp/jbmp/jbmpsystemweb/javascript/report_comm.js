//显示给用户的报表参数
var dbCustomReportParam="";
setCustomReportParamProperty();
//报表管理js
function loadData()
{
    //conditionCollection.SqlConditions.push(JetsenWeb.SqlCondition.create("PARENT_ID",gParentId,JetsenWeb.SqlLogicType.And,JetsenWeb.SqlRelationType.Equal,JetsenWeb.SqlParamType.Numeric));
    conditionCollection.SqlConditions.push(JetsenWeb.SqlCondition.create("ID",0,JetsenWeb.SqlLogicType.And,JetsenWeb.SqlRelationType.NotEqual,JetsenWeb.SqlParamType.Numeric));   
    
    var sqlQuery = new JetsenWeb.SqlQuery();    
    JetsenWeb.extend(sqlQuery,{IsPageResult:1,KeyId:"ID",PageInfo:pInfo,ResultFields:"",          
            QueryTable:JetsenWeb.extend(new JetsenWeb.QueryTable(),{TableName:"BMP_REPORT"})});
          
    sqlQuery.Conditions = conditionCollection;
    sqlQuery.OrderString = pInfo.orderBy;

    var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
    ws.soapheader = JetsenWeb.Application.authenticationHeader;
    ws.oncallback = function(ret)
    {
    	renderGrid(ret.resultVal);
    	
    	//var dataDoc = new JetsenWeb.XmlDoc();
        //dataDoc.async = false;
        //dataDoc.loadXML(ret.resultVal);
        //var size = valueOf(dataDoc.selectSingleNode("//Record1/TotalCount"),"text",0)
        //pInfo.setRowCount(size);
    	
        //$('divContainer').innerHTML = JetsenWeb.Xml.transformXML("xslt/report.xslt",ret.resultVal);
        //var o = new JetsenWeb.UI.GridList();
        //var rc = o.bind($('divContainer'), $('tabReport'));	
        //pInfo.setRowCount($('hid_TotalCount').value);             
    }
    ws.onerror = function(ex){ jetsennet.error(ex);};
    ws.call("bmpObjQuery",[sqlQuery.toXml()]);
}

/*
 *显示表格
 */
function renderGrid(xml){
	$("divContainer").innerHTML = "";

	var gGridList = new JetsenWeb.UI.GridList("report-grid");
	gGridList.columns = [
	 { index: 0, fieldName: "ID", width: 30, align: "center", isCheck: true, checkName: "chkReport" },
	 { index: 1, fieldName: "NAME", width: 180, name: "名称"},
	 { index: 2, fieldName: "PARAM", width: 450, name: "链接参数"},
     { index: 3, fieldName: "DESCRIPTION", width: 440, name: "描述"},
     { index: 4, fieldName: "ID", width: 45, align: "center", name: "编辑" },
     { index: 5, fieldName: "ID", width: 45, align: "center", name: "删除"}];

	gGridList.columns[4].format = function (val,vals){
		val = "<a href='javascript:void(0)' onclick=\"editReport('"+vals[0]+"')\"><img src='images/edit.gif' border='0' style='cursor:pointer' title='编辑'/></a>"
		return val;
	}
	gGridList.columns[5].format = function (val,vals){
		val = "<a href='javascript:void(0)' onclick=\"deleteReport('"+vals[0]+"')\"><img src='images/drop.gif' border='0' style='cursor:pointer' title='删除'/></a>"
		return val;
	}

	gGridList.parentId = 0;
	gGridList.idField = "ID";
	gGridList.parentField = "PARENT_ID";
	gGridList.treeControlIndex = 1;
    gGridList.treeOpenLevel = 1;
	gGridList.dataSource = xml;
	gGridList.render("divContainer");
	gGridList.colorSelectedRows();
}

function loadNavigation(Id)
{
    if(Id=="0")
    {
        $('divNavigation').innerHTML = "&nbsp;:: 系统报表";
    }
    else
    {
        var sqlQuery = new JetsenWeb.SqlQuery();    
        JetsenWeb.extend(sqlQuery,{IsPageResult:0,KeyId:"ID",PageInfo:null,ResultFields:"F1.*,F2.NAME as PARENT_NAME",               
               QueryTable:JetsenWeb.createJoinQuery("BMP_REPORT","F1","BMP_REPORT","F2","F1.PARENT_ID=F2.ID")});
              
        var condition = new JetsenWeb.SqlConditionCollection();
        condition.SqlConditions.push(JetsenWeb.SqlCondition.create("F1.ID",Id,JetsenWeb.SqlLogicType.And,JetsenWeb.SqlRelationType.Equal,JetsenWeb.SqlParamType.Numeric));        
        sqlQuery.Conditions = condition;         
    
        var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
        ws.soapheader = JetsenWeb.Application.authenticationHeader;
        ws.async = false;
        ws.oncallback = function(ret)
        {
            var obj = JetsenWeb.Xml.toObject(ret.resultVal).Record;
            if(obj!=null)
            {              
                var strTemp = "";
                if(obj.PARENT_ID!="0")
                {
                    strTemp += " :: <a href='report.htm?PID=0'>系统报表</a>";
                }
                strTemp += " :: <a href='report.htm?PID="+obj.PARENT_ID+"'>"+obj.PARENT_NAME+"</a>";
                strTemp+=" :: "+obj.NAME; 
                $('divNavigation').innerHTML  = strTemp;            
            }            
        }
        ws.onerror = function(ex){ jetsennet.error(ex);};
        ws.call("bmpObjQuery",[sqlQuery.toXml()]);
    }
}
function getReportsByParentId(pid)
{
    window.location = "report.htm?PID="+pid+"&"+JetsenWeb.getValideQueryString();
}
function loadParentReport()
{    
    $('divReportTree').innerHTML = "<iframe style='width:100%; height:100%; filter:alpha(opacity=0);-moz-opacity:0; z-index:-1;position: absolute;'></iframe>";
    
    var condition = new JetsenWeb.SqlConditionCollection();
    condition.SqlConditions.push(JetsenWeb.SqlCondition.create("TYPE",1,JetsenWeb.SqlLogicType.And,JetsenWeb.SqlRelationType.NotEqual,JetsenWeb.SqlParamType.Numeric));
    
    var sqlQuery = new JetsenWeb.SqlQuery();    
    JetsenWeb.extend(sqlQuery,{IsPageResult:0,KeyId:"ID",PageInfo:null,ResultFields:"ID,NAME,PARENT_ID",OrderString:"Order By PARENT_ID,VIEW_POS",
           QueryTable:JetsenWeb.extend(new JetsenWeb.QueryTable(),{TableName:"BMP_REPORT"})});
     
    sqlQuery.Conditions = condition;
        
    var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
    ws.soapheader = JetsenWeb.Application.authenticationHeader;
    ws.oncallback = function(ret)
    {
        gReportTree = JetsenWeb.UI.Tree.createTree("parent-tree",ret.resultVal,{parentId:"0",parentField:"PARENT_ID",itemName:"Record",textField:"NAME",valueField:"ID",showCheck:false,paramFields:"ID,PARENT_ID,NAME"});
        gReportTree.addItem(new JetsenWeb.UI.TreeItem("没有父级",null,null,null,{ID:0,NAME:""}));
        gReportTree.onclick = function(item){ 
            $('txt_Report').value = valueOf(item.treeParam,"NAME","");
            $('hidParentId').value  = valueOf(item.treeParam,"ID","");
        };
        $('divReportTree').appendChild(gReportTree.render());
    }
    ws.onerror = function(ex){ jetsennet.error(ex);};
    ws.call("bmpObjQuery",[sqlQuery.toXml()]);
}
function newReport()
{
    var areaElements = JetsenWeb.Form.getElements('divReport');
    JetsenWeb.Form.resetValue(areaElements); 
    JetsenWeb.Form.clearValidateState(areaElements);         
    //$('txt_ID').disabled = false;
    $('hidParentId').value = "0";
    
    var dialog = new JetsenWeb.UI.Window("new-object-win");
    JetsenWeb.extend(dialog,{submitBox:true,cancelBox:true,maximizeBox:false,minimizeBox:false,windowStyle : 1,size:{width:550,height:0},title:"新建报表",showScroll:false});           
    dialog.controls = ["divReport"];
    dialog.onclosed = function()
    {
   	    document.getElementById("divReportTree").style.display = "none";
   	    var popframeid = document.getElementById("divReportTree").popframeid;
   	    if(document.getElementById(popframeid)!=null&&document.getElementById(popframeid)!=""){
   	    document.getElementById(popframeid).style.display = "none";
   	    }
    	JetsenWeb.UI.Windows.close("new-object-win");	
    }
    dialog.onsubmit = function()
    { 
        if(JetsenWeb.Form.Validate(areaElements,true)){
        	if($('txt_ViewPos').value <= 0 || $('txt_ViewPos').value >= 100000)
            {
                jetsennet.alert("排序号必须为0～1000000之间的数！");
                return;
            }
        	
            //<ID>"+$('txt_ID').value+"</ID>
            var objXml = "<Report><PARENT_ID>"+$('hidParentId').value+"</PARENT_ID><NAME>"+JetsenWeb.Xml.xmlEscape($('txt_Name').value)+"</NAME>"
            objXml+= "<PARAM>"+JetsenWeb.Xml.xmlEscape($('txt_Param').value)+"</PARAM>";
            objXml+= "<DESCRIPTION>"+JetsenWeb.Xml.xmlEscape($('txt_Desc').value)+"</DESCRIPTION>";
            objXml+= "<STATE>"+$('txtState').value+"</STATE>";
            objXml+= "<VIEW_POS>"+$('txt_ViewPos').value+"</VIEW_POS>";
            objXml+= "<TYPE>"+$('txtType').value+"</TYPE></Report>";
            
		    var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
            ws.soapheader = JetsenWeb.Application.authenticationHeader;
            ws.oncallback = function(ret)
            {
                JetsenWeb.UI.Windows.close("new-object-win");	       
                loadData();
                loadParentReport();	     
                //window.parent.location.reload();
            }
            ws.onerror = function(ex){ jetsennet.error(ex);};
            ws.call("bmpObjInsert",["BMP_REPORT",objXml]);
	    }             
    };
    dialog.showDialog();
}
function editReport(Id,departNo,name)
{   
    var areaElements = JetsenWeb.Form.getElements('divReport');
    JetsenWeb.Form.resetValue(areaElements); 
    JetsenWeb.Form.clearValidateState(areaElements);    
    //$('txt_ID').disabled = true;
    $('hidParentId').value = gParentId;
    //JetsenWeb.UI.DropDownList.initOptions('txtState');
    //JetsenWeb.UI.DropDownList.initOptions('txtType');    
    
    var condition = new JetsenWeb.SqlConditionCollection();
    condition.SqlConditions.push(JetsenWeb.SqlCondition.create("ID",Id,JetsenWeb.SqlLogicType.And,JetsenWeb.SqlRelationType.Equal,JetsenWeb.SqlParamType.Numeric));
    
    var sqlQuery = new JetsenWeb.SqlQuery();    
    JetsenWeb.extend(sqlQuery,{IsPageResult:0,KeyId:"ID",PageInfo:null,ResultFields:"",               
           QueryTable:JetsenWeb.extend(new JetsenWeb.QueryTable(),{TableName:"BMP_REPORT"})});
     
    sqlQuery.Conditions = condition;
    
    var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
    ws.soapheader = JetsenWeb.Application.authenticationHeader;
    ws.async = false;
    ws.oncallback = function(ret)
    {
        var obj = JetsenWeb.Xml.toObject(ret.resultVal).Record;
        if(obj!=null)
        {           
            //$('txt_ID').value = obj.ID;
            $('txt_Name').value = valueOf(obj,"NAME",""); 
            $('txt_Param').value =valueOf(obj,"PARAM","") ;
            $('txt_Desc').value =valueOf(obj,"DESCRIPTION",""); 
            $('txtState').value=obj.STATE;
            $('txtType').value=obj.TYPE;
            //JetsenWeb.UI.DropDownList['txtState'].setValue(obj.STATE);
            //JetsenWeb.UI.DropDownList['txtType'].setValue(obj.TYPE);    
            $('txt_ViewPos').value = valueOf(obj,"VIEW_POS","0"); 
            /*gReportTree.getItem(function(item)
            {
                if(item && valueOf(item.treeParam,"ID","")==valueOf(obj,"PARENT_ID","0"))
                {
                    $('txt_Report').value = valueOf(item.treeParam,"NAME","");
                    return true;
                }
            });*/         
            $('hidParentId').value = valueOf(obj,"PARENT_ID","0");
            getParentNameByParentId(valueOf(obj,"PARENT_ID","0"));
        }            
    }
    ws.onerror = function(ex){ jetsennet.error(ex);};
    ws.call("bmpObjQuery",[sqlQuery.toXml()]);
         
    var dialog = new JetsenWeb.UI.Window("edit-object-win");
    JetsenWeb.extend(dialog,{submitBox:true,cancelBox:true,maximizeBox:false,minimizeBox:false,size:{width:550,height:0},title:"编辑报表",showScroll:false});           
    dialog.controls = ["divReport"];
    dialog.onclosed = function()
    {
   	    document.getElementById("divReportTree").style.display = "none";
   	    var popframeid = document.getElementById("divReportTree").popframeid;
   	    if(document.getElementById(popframeid)!=null&&document.getElementById(popframeid)!=""){
   	    document.getElementById(popframeid).style.display = "none";
   	    }
    	JetsenWeb.UI.Windows.close("new-object-win");	
    }
    dialog.onsubmit = function()
    {             
        if($('hidParentId').value == Id)
        {
            jetsennet.alert("所属报表不为能自身,请重新选择所属报表！");
            return false;
        }
        if(JetsenWeb.Form.Validate(areaElements,true)){
        	if($('txt_ViewPos').value <= 0 || $('txt_ViewPos').value >= 100000)
            {
                jetsennet.alert("排序号必须为0～100000之间的整数！");
                return;
            }

            var objXml = "<Report><ID>"+Id+"</ID><PARENT_ID>"+$('hidParentId').value+"</PARENT_ID><NAME>"+JetsenWeb.Xml.xmlEscape($('txt_Name').value)+"</NAME>"
            objXml+= "<PARAM>"+JetsenWeb.Xml.xmlEscape($('txt_Param').value)+"</PARAM>";
            objXml+= "<DESCRIPTION>"+JetsenWeb.Xml.xmlEscape($('txt_Desc').value)+"</DESCRIPTION>";
            objXml+= "<STATE>"+$('txtState').value+"</STATE>";
            objXml+= "<VIEW_POS>"+$('txt_ViewPos').value+"</VIEW_POS>";
            objXml+= "<TYPE>"+$('txtType').value+"</TYPE></Report>";
            
		    var ws2 = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
            ws2.soapheader = JetsenWeb.Application.authenticationHeader;
            ws2.oncallback = function(ret)
            {
                JetsenWeb.UI.Windows.close("edit-object-win");	
                loadData();  
                loadParentReport();	     
                //window.parent.location.reload();                
            }
            ws2.onerror = function(ex){ jetsennet.error(ex);};
            ws2.call("bmpObjUpdate",["BMP_REPORT",objXml]);
	    }             
    };
    dialog.showDialog();
}

function getParentNameByParentId(Id)
{
	if(Id!=0)
	{
		var condition = new JetsenWeb.SqlConditionCollection();
	    condition.SqlConditions.push(JetsenWeb.SqlCondition.create("ID",Id,JetsenWeb.SqlLogicType.And,JetsenWeb.SqlRelationType.Equal,JetsenWeb.SqlParamType.Numeric));
	    
	    var sqlQuery = new JetsenWeb.SqlQuery();    
	    JetsenWeb.extend(sqlQuery,{IsPageResult:0,KeyId:"ID",PageInfo:null,ResultFields:"",               
	           QueryTable:JetsenWeb.extend(new JetsenWeb.QueryTable(),{TableName:"BMP_REPORT"})});
	     
	    sqlQuery.Conditions = condition;
	    
	    var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
	    ws.soapheader = JetsenWeb.Application.authenticationHeader;
	    ws.async = false;
	    ws.oncallback = function(ret)
	    {
	        var obj = JetsenWeb.Xml.toObject(ret.resultVal).Record;
	        if(obj!=null)
	        {           
	        	$('txt_Report').value = obj.NAME;
	        }            
	    }
	    ws.onerror = function(ex){ jetsennet.error(ex);};
	    ws.call("bmpObjQuery",[sqlQuery.toXml()]);
	}
}

function deleteReport(Id)
{
    var checkIds = [];
    if(Id)
    {
        checkIds = [Id];
    }
    else
    {
        checkIds = JetsenWeb.Form.getCheckedValues("chkReport");
    }
    
    if(checkIds.length==0)
    {
        jetsennet.alert("请选择要删除的项！");
        return;
    }
    
    $('chkDeleteAll').checked = false;
    var dialog = new JetsenWeb.UI.Window("delete-object-win");
    JetsenWeb.extend(dialog,{submitBox:true,cancelBox:true,maximizeBox:false,windowStyle:1,minimizeBox:false,size:{width:350,height:150},title:"确定删除？"});           
    dialog.controls = ["divDelete"];
    dialog.onsubmit = function()
    {        
        var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
        ws.soapheader = JetsenWeb.Application.authenticationHeader;
        ws.oncallback = function(ret)
        {                       	                
            loadData();     
            loadParentReport();	     
            //window.parent.location.reload();
            JetsenWeb.UI.Windows.close("delete-object-win");
        }
        ws.onerror = function(ex){ jetsennet.error(ex);};
        ws.call("bmpObjDelete",["BMP_REPORT","<Request>"+($('chkDeleteAll').checked==true?"<Recursive>1</Recursive>":"")+"<Item><Id>"+checkIds.join("</Id></Item><Item><Id>")+"</Id></Item></Request>"]);
    };
    dialog.showDialog();
}

//定时报表js
//获得当前报表ID
function getReportId() {
	var reportId; //报表ID
	var url = document.location.toString();
	if (url.lastIndexOf("=") != -1) {
		reportId = url.substring(url.lastIndexOf("=") + 1, url.length);
	} else {
		reportId = "";
	}
	
	return reportId;
}

// 定制报表
function customReportTime() {
	var areaElements = JetsenWeb.Form.getElements("divReportTime");
	JetsenWeb.Form.resetValue(areaElements);
	JetsenWeb.Form.clearValidateState(areaElements);
	$("divReportTimeList").innerHTML = "数据加载中...";
	$("divReportTimePage").innerHTML = "";

	var dialog = new JetsenWeb.UI.Window("view-object-win");
	JetsenWeb.extend(dialog, {
		cancelBox : true,
		windowStyle : 1,
		maximizeBox : true,
		minimizeBox : true,
		size : {
			width : 905,
			height : 450
		},
		title : "定制报表",
		cancelButtonText : "关闭"
	});
	dialog.controls = [ "divReportTime" ];
	dialog.onsubmit = function() {
		return false;
	};
	
	$("hid_REPORT_ID").value = getReportId();
	initParamFormat();
	loadReportTime($("hid_REPORT_ID").value);
	dialog.showDialog();
}

function getHourMask() {
	var hourMask = "";
	var startValue = $("txtSHour").value;
	var endValue = $("txtEHour").value;
	var startHour = startValue == "" ? 0 : Number(startValue);
	var endHour = endValue == "" ? 23 : Number(endValue);
	if (isNaN(startHour) || isNaN(endHour) || startHour < 0 || startHour > 23
			|| endHour < 0 || endHour > 23 || startValue.indexOf(".") != -1
			|| endValue.indexOf(".") != -1 || startHour > endHour) {
		return null;
	}
	
	for ( var i = 0; i < 24; i++) {
		hourMask += (i >= startHour && i <= endHour) ? "1" : "0";
	}
	return hourMask;
}

// 新建定制报表
function newReportTime() {
	var areaElements = JetsenWeb.Form.getElements('divReportTimeEdit');
	JetsenWeb.Form.resetValue(areaElements);
	JetsenWeb.Form.clearValidateState(areaElements);
	$('txt_START_DATE').value = new Date().toDateString();
	$('txt_END_DATE').value = new Date().toDateString();
	setCustomReportParamProperty();
	var dialog = new JetsenWeb.UI.Window("new-object-win");
	JetsenWeb.extend(dialog, {
		submitBox : true,
		cancelBox : true,
		windowStyle : 1,
		maximizeBox : false,
		minimizeBox : false,
		size : {
			width : 500,
			height : getReportDailogHeight()
		},
		title : "新建报表任务"
	});
	dialog.controls = [ "divReportTimeEdit" ];
	dialog.onsubmit = function() {
		if (JetsenWeb.Form.Validate(areaElements, true)) {

			if ($("txt_TASK_NAME").value == "") {
				jetsennet.alert("请输入任务名称！");
				return;
			}

			var weekMask = 0;
			var weekdays = JetsenWeb.Form.getCheckedValues("chkWeek");
			if ($("cbo_TASK_TYPE").value == "1" && weekdays.length == 0) {
				jetsennet.alert("请选择周几生成报表！");
				return;
			}

			for ( var i = 0; i < weekdays.length; i++) {
				weekMask |= parseInt(weekdays[i]);
			}

			var hourMask = getHourMask();
			if (!hourMask) {
				jetsennet.alert("生成起始时间有误！");
				return;
			}

			if (($("txt_START_DATE").value + " " + $("txt_START_TIME").value) >= ($("txt_END_DATE").value + " " + $("txt_END_TIME").value)) {
				jetsennet.alert("开始日期不能大于结束日期！");
				return;
			}
			if($('txt_COLL_TIMESPAN_DAY').value <0 || 
					$('txt_COLL_TIMESPAN_HOUR').value <0 || 
					$('txt_COLL_TIMESPAN_MINUTE').value <0 || 
					$('txt_COLL_TIMESPAN_SECOND').value <0
					){
				jetsennet.alert("生成周期必须为正整数！");
				return;
			}
			
			setGenerationCycle();
			if( $('txt_COLL_TIMESPAN').value <=0){
				jetsennet.alert("生成周期必须为正整数！");
				return;
			}
			if (Number($("txt_COLL_TIMESPAN").value) > 100000000) {
				jetsennet.alert("生成周期不能大于100000000秒！");
				return;
			}
			
			var chkWeeks = document.getElementsByName("chkWeek");
			var weekStr = "";
			var first = true;
			for ( var i = 0; i < chkWeeks.length; i++) {
				if (chkWeeks[i].checked) {
					if (!first) {
						weekStr += "、";
					}
					weekStr += $("l" + chkWeeks[i].id).innerText;
					first = false;
				}
			}
			var objReportTime = {
				TASK_NAME : $("txt_TASK_NAME").value,
				TASK_TYPE : getSelectedValue($("cbo_TASK_TYPE")),
				TASK_STATE : 0,
				WEEK_MASK : JetsenWeb.Util
						.padLeft(weekMask.toString(2), 7, "0"),
				WEEK_STR : $("cbo_TASK_TYPE").value == "1" ? weekStr : "",
				HOUR_MASK : hourMask,
				HOUR_STR : $("txtSHour").value + "点-" + $("txtEHour").value
						+ "点",
				START_TIME : $("txt_START_DATE").value + " "
						+ $("txt_START_TIME").value,
				END_TIME : $("txt_END_DATE").value + " "
						+ $("txt_END_TIME").value,
				COLL_TIMESPAN : $("txt_COLL_TIMESPAN").value,
				IS_MAIL : $("cbo_IS_MAIL").value,
				FILE_FORMAT : $("cbo_FILE_FORMAT").value,
				REPORT_TYPE : reportType,
				PARAM_FORMAT : paramFormat,
				REPORT_ID : $("hid_REPORT_ID").value,
				CREATE_USER : JetsenWeb.Application.userInfo.UserName,
				FIELD_1 : $("txt_customReportParam").value
			};
			var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
			ws.soapheader = JetsenWeb.Application.authenticationHeader;
			ws.oncallback = function(ret) {
				JetsenWeb.UI.Windows.close("new-object-win");
				loadReportTime($("hid_REPORT_ID").value);
			};
			ws.onerror = function(ex) {
				jetsennet.error(ex);
			};
			ws.call("bmpObjInsert", ["BMP_REPORTTIME",JetsenWeb.Xml.serializer(objReportTime,"BMP_REPORTTIME") ]);
		}
	};
	changeTaskType($("cbo_TASK_TYPE").options[0].value);
	dialog.showDialog();
	//初始化用户定制报表参数
	$("chk_paramOrign").checked= true;
	dbCustomReportParam="";
	setCustomReportParam("");
	cleanSelectedCheckboxOptions(document.getElementsByName("chkWeek"));
}

// 编辑定制报表
function editReportTime(taskId) {
	var params; //放置数据库中的报表参数
	
	var areaElements = JetsenWeb.Form.getElements("divReportTimeEdit");
	JetsenWeb.Form.resetValue(areaElements);
	JetsenWeb.Form.clearValidateState(areaElements);

	var condition = new JetsenWeb.SqlConditionCollection();
	condition.SqlConditions.push(JetsenWeb.SqlCondition.create("TASK_ID",
			taskId, JetsenWeb.SqlLogicType.And,
			JetsenWeb.SqlRelationType.Equal, JetsenWeb.SqlParamType.Numeric));
	
	var sqlQuery = new JetsenWeb.SqlQuery();
	JetsenWeb.extend(sqlQuery, {
		IsPageResult : 0,
		KeyId : "TASK_ID",
		PageInfo : null,
		QueryTable : JetsenWeb.extend(new JetsenWeb.QueryTable(), {
			TableName : "BMP_REPORTTIME"
		})
	});
	sqlQuery.Conditions = condition;

	var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
	ws.soapheader = JetsenWeb.Application.authenticationHeader;
	ws.oncallback = function(ret) {
		var objReportTime = JetsenWeb.Xml.toObject(ret.resultVal, "Record")[0];
		$("txt_TASK_NAME").value = valueOf(objReportTime, "TASK_NAME", "");
		$("cbo_TASK_TYPE").value = valueOf(objReportTime, "TASK_TYPE", "");
		$("txt_START_DATE").value = valueOf(objReportTime, "START_TIME", "")
				.substring(0, 10).replace('T', ' ');
		$("txt_END_DATE").value = valueOf(objReportTime, "END_TIME", "")
				.substring(0, 10).replace('T', ' ');
		$("txt_START_TIME").value = valueOf(objReportTime, "START_TIME", "")
				.substring(11, 19).replace('T', ' ');
		$("txt_END_TIME").value = valueOf(objReportTime, "END_TIME", "")
				.substring(11, 19).replace('T', ' ');
		$("txt_COLL_TIMESPAN").value = valueOf(objReportTime, "COLL_TIMESPAN",
				"0");
		//保存数据库中显示给用户的报表参数
		dbCustomReportParam= valueOf(objReportTime,"FIELD_1","");
		//初始化用户定制报表参数
		if($("chk_paramOrign")!=null && $("chk_paramOrign")!= undefined){
			$("chk_paramOrign").checked= false;
			setCustomReportParam(taskId);
		}
		//设置生成周期各表单项目初始值
		setGenerationCycleItem($("txt_COLL_TIMESPAN").value);
		$("cbo_IS_MAIL").value = valueOf(objReportTime, "IS_MAIL", "");
		$("cbo_FILE_FORMAT").value = valueOf(objReportTime, "FILE_FORMAT", "");
		changeTaskType($("cbo_TASK_TYPE").value);
		params =  valueOf(objReportTime, "PARAM_FORMAT", "");

		if ($("cbo_TASK_TYPE").value == "1") {
			var weekMask = valueOf(objReportTime, "WEEK_MASK", "");
			if (weekMask) {
				var chkWeeks = document.getElementsByName("chkWeek");
				var weekStr = "";
				var first = true;
				for ( var i = 0; i < chkWeeks.length; i++) {
					chkWeeks[i].checked = (parseInt(weekMask, 2) & parseInt(chkWeeks[i].value)) > 0;
					if (chkWeeks[i].checked) {
						if (!first) {
							weekStr += "、";
						}
						weekStr += $("l" + chkWeeks[i].id).innerText;
						first = false;
					}
				}
			}

			var hourMask = valueOf(objReportTime, "HOUR_MASK", "");
			if (hourMask) {
				$("txtSHour").value = hourMask.indexOf("1");
				$("txtEHour").value = hourMask.lastIndexOf("1");
			}
		}

		var chkWeeks = document.getElementsByName("chkWeek");
		var weekStr = "";
		var first = true;
		for ( var i = 0; i < chkWeeks.length; i++) {
			if (chkWeeks[i].checked) {
				if (!first) {
					weekStr += "、";
				}
				weekStr += $("l" + chkWeeks[i].id).innerText;
				first = false;
			}
		}
	};
	ws.onerror = function(ex) {
		jetsennet.error(ex);
	};
	ws.call("bmpObjQuery", [ sqlQuery.toXml() ]);
	setCustomReportParamProperty();
	var dialog = new JetsenWeb.UI.Window("edit-object-win");
	JetsenWeb.extend(dialog, {
		submitBox : true,
		cancelBox : true,
		windowStyle : 1,
		maximizeBox : false,
		minimizeBox : false,
		size : {
			width : 500,
			height : getReportDailogHeight()
		},
		title : "编辑报表任务"
	});
	dialog.controls = [ "divReportTimeEdit" ];
	dialog.onsubmit = function() {
		if (JetsenWeb.Form.Validate(areaElements, true)) {
			if ($("txt_TASK_NAME").value == "") {
				jetsennet.alert("请输入任务名称！");
				return;
			}

			var weekMask = 0;
			var weekdays = JetsenWeb.Form.getCheckedValues("chkWeek");
			if ($("cbo_TASK_TYPE").value == "1" && weekdays.length == 0) {
				jetsennet.alert("请选择周几生成报表！");
				return;
			}

			for ( var i = 0; i < weekdays.length; i++) {
				weekMask |= parseInt(weekdays[i]);
			}

			var hourMask = getHourMask();
			if (!hourMask) {
				jetsennet.alert("生成起始时间有误！");
				return;
			}
			
			if (($("txt_START_DATE").value + " " + $("txt_START_TIME").value) >= ($("txt_END_DATE").value + " " + $("txt_END_TIME").value)) {
				jetsennet.alert("开始日期不能大于结束日期！");
				return;
			}
			
			if($('txt_COLL_TIMESPAN_DAY').value <0 || 
					$('txt_COLL_TIMESPAN_HOUR').value <0 || 
					$('txt_COLL_TIMESPAN_MINUTE').value <0 || 
					$('txt_COLL_TIMESPAN_SECOND').value <0
					){
				jetsennet.alert("生成周期必须为正整数！");
				return;
			}
			
			setGenerationCycle();
			if( $('txt_COLL_TIMESPAN').value <=0){
				jetsennet.alert("生成周期必须为正整数！");
				return;
			}
			if (Number($("txt_COLL_TIMESPAN").value) > 100000000) {
				jetsennet.alert("生成周期不能大于100000000秒！");
				return;
			}
				
			var chkWeeks = document.getElementsByName("chkWeek");
			var weekStr = "";
			var first = true;
			for ( var i = 0; i < chkWeeks.length; i++) {
				if (chkWeeks[i].checked) {
					if (!first) {
						weekStr += "、";
					}
					weekStr += $("l" + chkWeeks[i].id).innerText;
					first = false;
				}
			}

			var oReportTime = {
				TASK_ID : taskId,
				TASK_NAME : $("txt_TASK_NAME").value,
				TASK_TYPE : $("cbo_TASK_TYPE").value,
				WEEK_MASK : JetsenWeb.Util
						.padLeft(weekMask.toString(2), 7, "0"),
				WEEK_STR : $("cbo_TASK_TYPE").value == "1" ? weekStr : "",
				HOUR_MASK : hourMask,
				HOUR_STR : $("txtSHour").value + "点-" + $("txtEHour").value
						+ "点",
				START_TIME : $("txt_START_DATE").value + " "
						+ $("txt_START_TIME").value,
				END_TIME : $("txt_END_DATE").value + " "
						+ $("txt_END_TIME").value,
				COLL_TIMESPAN : $("txt_COLL_TIMESPAN").value,
				IS_MAIL : $("cbo_IS_MAIL").value,
				FILE_FORMAT : $("cbo_FILE_FORMAT").value,
				PARAM_FORMAT : paramFormat == "" ? params : paramFormat
			};
			if($("txt_customReportParam") != undefined && $("txt_customReportParam") != null){
				oReportTime["FIELD_1"] = $("txt_customReportParam").value
			}
			var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
			ws.soapheader = JetsenWeb.Application.authenticationHeader;
			ws.oncallback = function(ret) {
				JetsenWeb.UI.Windows.close("edit-object-win");
				loadReportTime($("hid_REPORT_ID").value);
			};
			ws.onerror = function(ex) {
				jetsennet.error(ex);
			};
			ws.call("bmpObjUpdate", [ "BMP_REPORTTIME",
					JetsenWeb.Xml.serializer(oReportTime, "BMP_REPORTTIME") ]);
		}
	};
	dialog.showDialog();
}

// 删除定制报表
function deleteReportTime(taskId) {
	jetsennet.confirm("确定删除？", function () {
	var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
	ws.soapheader = JetsenWeb.Application.authenticationHeader;
	ws.oncallback = function(ret) {
		loadReportTime($("hid_REPORT_ID").value);
	};
	ws.onerror = function(ex) {
		jetsennet.error(ex);
	};
	ws.call("bmpObjDelete", [ "BMP_REPORTTIME", taskId ]);
	return true;
	});
}

// 加载定制报表列表
function loadReportTime(reportId) {
	gReportTimePage.orderBy = "Order By t.CREATE_TIME Desc";
	var gSqlQuery = new JetsenWeb.SqlQuery();
	var gQueryTable = JetsenWeb.createQueryTable("BMP_REPORTTIME", "t");
	gQueryTable.addJoinTable(JetsenWeb.createJoinTable("BMP_REPORT",
			"r", "r.ID=t.REPORT_ID", JetsenWeb.TableJoinType.Left));
	gReportTimeCondition.SqlConditions.push(JetsenWeb.SqlCondition.create(
			"REPORT_ID", reportId, JetsenWeb.SqlLogicType.And,
			JetsenWeb.SqlRelationType.Equal, JetsenWeb.SqlParamType.Numeric));
	JetsenWeb.extend(gSqlQuery, {
		KeyId : "",
		QueryTable : gQueryTable,
		PageInfo : gReportTimePage,
		OrderString : gReportTimePage.orderBy,
		Conditions : gReportTimeCondition,
		ResultFields : "t.*,r.NAME"
	});
	var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
	ws.soapheader = JetsenWeb.Application.authenticationHeader;
	ws.oncallback = function(ret) {
		var xmlDoc = new JetsenWeb.XmlDoc();
		xmlDoc.loadXML(ret.resultVal);
		var nodes = xmlDoc.documentElement.selectNodes("Record");
		var weekdays = [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ];
		var weekMasks = [ 64, 32, 16, 8, 4, 2, 1 ];
		for ( var i = 0; i < nodes.length; i++) {
			var field1 = valueOf(nodes[i].selectSingleNode("FIELD_1"),
					"text", "");
			var taskType = valueOf(nodes[i].selectSingleNode("TASK_TYPE"),
					"text", "");
			var weekMask = valueOf(nodes[i].selectSingleNode("WEEK_MASK"),
					"text", "");
			var hourMask = valueOf(nodes[i].selectSingleNode("HOUR_MASK"),
					"text", "");
			if (taskType == "1" && weekMask && hourMask) {
				weekMask = parseInt(weekMask, 2);
				var weekTip = "每";
				var token = false;
				for ( var j = 0; j < 7; j++) {
					if ((weekMask & weekMasks[j]) > 0) {
						if (token) {
							weekTip += "、";
						}
						token = true;
						weekTip += weekdays[j];
					}
				}
				nodes[i].selectSingleNode("WEEK_MASK").text = weekTip;
				nodes[i].selectSingleNode("HOUR_MASK").text = hourMask
						.indexOf("1")
						+ "点-" + hourMask.lastIndexOf("1") + "点";
			}
			nodes[i].selectSingleNode("FIELD_1").text=field1.replace(new RegExp("\n","gm"),"<br />");   
		}

		$("divReportTimeList").innerHTML = JetsenWeb.Xml._transformXML(
				"xslt/reporttime.xslt", xmlDoc);
		gReportTimeGridList.bind($("divReportTimeList"), $("tabReportTime"));
		gReportTimePage.setRowCount($("hid_ReportTimeCount").value);
	};
	ws.onerror = function(ex) {
		jetsennet.error(ex);
	};
	ws.call("bmpObjQuery", [ gSqlQuery.toXml() ]);
	gReportTimeCondition.SqlConditions = [];
}

// 搜索定制报表
function searchReportTime() {
	gReportTimeCondition.SqlConditions = [];
	if ($('txt_ReportTime_Key').value != "") {
		gReportTimeCondition.SqlConditions.push(JetsenWeb.SqlCondition.create(
				"TASK_NAME", $('txt_ReportTime_Key').value,
				JetsenWeb.SqlLogicType.And, JetsenWeb.SqlRelationType.ILike,
				JetsenWeb.SqlParamType.String));
	}
	gReportTimePage.currentPage = 1;
	loadReportTime($("hid_REPORT_ID").value);
}

//提交定制报表
function commitReportTime(taskId) {
	var ws = new JetsenWeb.Service(BMP_SYSTEM_SERVICE);
	ws.soapheader = JetsenWeb.Application.authenticationHeader;
	ws.oncallback = function(ret) {
		loadReportTime($("hid_REPORT_ID").value);
		jetsennet.alert("提交成功！");
	};
	ws.onerror = function(ex) {
		jetsennet.error(ex);
	};
	ws.call("bmpObjUpdate", [ "BMP_REPORTTIME", JetsenWeb.Xml.serializer( {
		TASK_ID : taskId,
		TASK_STATE : "1"
	}, "BMP_REPORTTIME") ]);
}

function changeTaskType(type) {
	var win = JetsenWeb.UI.Windows.getById("new-object-win");
	if (!win) {
		win = JetsenWeb.UI.Windows.getById("edit-object-win");
	}
	$("trWeek").style.display = (type == "1") ? "" : "none";
	$("trHour").style.display = (type == "1") ? "" : "none";
}

//设置生成周期各表单 hyj
function setGenerationCycleItem(dbSecond){
	var day = parseInt(dbSecond / (24 * 3600));
	var hour = parseInt((dbSecond - day * 24 * 3600) / 3600);
	var minute = parseInt((dbSecond - day * 24 * 3600 - hour * 3600) / 60);
	var second = dbSecond%60;
	$('txt_COLL_TIMESPAN_DAY').value = day;
	$('txt_COLL_TIMESPAN_HOUR').value = hour;
	$('txt_COLL_TIMESPAN_MINUTE').value = minute;
	$('txt_COLL_TIMESPAN_SECOND').value = second;
	$('txt_COLL_TIMESPAN').value = dbSecond;
}

//设置生成周期 hyj
function setGenerationCycle() {
	$('txt_COLL_TIMESPAN').value = parseInt($('txt_COLL_TIMESPAN_DAY').value * 24 * 3600)
			+ parseInt($('txt_COLL_TIMESPAN_HOUR').value * 3600)
			+ parseInt($('txt_COLL_TIMESPAN_MINUTE').value * 60)
			+ parseInt($('txt_COLL_TIMESPAN_SECOND').value);
}

//查看报表参数
function viewReportParam(param){
	if($(txt_view_reportParam)){
		$(txt_view_reportParam).disabled = "disabled";
	}
	param=param.replace(new RegExp("<br />","gm"),"\n");
	var areaElements = JetsenWeb.Form.getElements("divViewReportParam");
	JetsenWeb.Form.resetValue(areaElements);
	JetsenWeb.Form.clearValidateState(areaElements);
	var dialog = new JetsenWeb.UI.Window("new-object-win");
	JetsenWeb.extend(dialog, {
		cancelBox : true,
		windowStyle : 1,
		maximizeBox : false,
		minimizeBox : false,
		size : {
			width : 500,
			height : 160
		},
		title : "报表参数",
		cancelButtonText : "关闭"
	});
	dialog.controls = [ "divViewReportParam" ];
	dialog.showDialog();
	//$("txt_view_reportParam").readOnly = true;
	$("txt_view_reportParam").value=param;
}

//清空复选框选中项 
function cleanSelectedCheckboxOptions(chkName) {
	for ( var j = 0; j < chkName.length; j++) {
		chkName[j].checked = false;
	}
}

// 获得定制报表中新建/编辑窗口的高度
function getReportDailogHeight(){
	var reportDailogHeight = 300;
	if($("txt_customReportParam")){
		reportDailogHeight=410
	}
	return reportDailogHeight;
}

//设置新建/编辑时报表参数文本域属性
function setCustomReportParamProperty(){
	if($("txt_customReportParam")){
		$("txt_customReportParam").disabled = "disabled";
	}
}