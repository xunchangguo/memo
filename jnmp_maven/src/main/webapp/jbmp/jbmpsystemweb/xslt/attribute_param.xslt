<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema">
	<xsl:template match="/">
		<table id="tabMonitorAttribute" border="0" cellspacing="0"
			cellpadding="2" width="97%">
			<colgroup>
				<col width="30px" align="center"></col>
				<col></col>
				<col></col>
				<col></col>
				<col width="45px" align="center"></col>
				<col width="45px" align="center"></col>
			</colgroup>
			<tr>
				<td align="center" width="30px">
					<input type="checkbox"
						onclick="JetsenWeb.Form.checkAllItems('chkAllObject',this.checked)"
						id="chkCheckAllAttribute"></input>
				</td>
				<td sortfield="ATTRIB_NAME" align="left">
					<b>属性名称</b>
				</td>
				<td sortfield="ATTRIB_VALUE" align="left">
					<b>标识</b>
				</td>
				<td sortfield="ALARM_NAME" align="left">
					<b>关联报警</b>
				</td>
				<td align="center" width="45px">
					<b>编辑</b>
				</td>
				<td align="center" width="45px">
					<b>删除</b>
				</td>
			</tr>
			<xsl:for-each select="RecordSet/Record">
				<tr height="20" ondblclick="editMonitorAttribute('{ATTRIB_ID}')">
					<td align="center">
						<input type="checkbox" name="chkAllObject"
							onclick="$('chkCheckAllAttribute').checked=false;" value="{ATTRIB_ID}"></input>
							<input type="hidden" id="hiddenObjAttr2Alarm{ATTRIB_ID}" value="{ALARM_ID}"/>
					</td>
					<td>
						<xsl:value-of select="ATTRIB_NAME"></xsl:value-of>
					</td>
					<td>
						<xsl:value-of select="ATTRIB_VALUE"></xsl:value-of>
					</td>
					<td>
						<xsl:value-of select="ALARM_NAME"></xsl:value-of>
					</td>
					<td align="center">
						<a href="javascript:void(0)" onclick="editMonitorAttribute('{ATTRIB_ID}')">
							<img border="0" src="images/edit.gif" />
						</a>
					</td>
					<td align="center">
						<img style="cursor:pointer" title="删除" src="images/drop.gif"
							onclick="deleteMonitorAttribute('{ATTRIB_ID}', '{ATTRIB_TYPE}');" />
					</td>
				</tr>
			</xsl:for-each>
		</table>
		<xsl:for-each select="RecordSet/Record1">
			<input type="hidden" value="{TotalCount}" id="hid_Count"></input>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
