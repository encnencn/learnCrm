package com.zhongying.crm.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

/*import org.jeecgframework.poi.excel.annotation.Excel;
import org.jeecgframework.poi.excel.annotation.ExcelTarget;*/

/**
 * @author feng
 * @version 1.15, 2017年6月19日 下午5:00:05
 * 
 */
@Entity
/*@ExcelTarget("VisitRecord")*/
public class VisitRecord {
	 //@GeneratedValue
	@Id
//	 @Excel(name = "编号", orderNum = "1", mergeVertical = true, isImportField = "id")
	private Integer id;
//	 @Excel(name = "回访主题", orderNum = "4", mergeVertical = true, isImportField = "visitTitle")
	private String visitTitle;
//	 @Excel(name = "回访内容", orderNum = "5", mergeVertical = true, isImportField = "content")
	private String content;
//	 @Excel(name = "回访日期", orderNum = "6", mergeVertical = true, isImportField = "visitDate")
	private String visitDate;
//	 @Excel(name = "回访方式", orderNum = "7", mergeVertical = true, isImportField = "visitType")
	private Integer visitType;
	@Transient
//	 @Excel(name = "回访人", orderNum = "3", mergeVertical = true, isImportField = "trueName")
	private String trueName;
	@Transient
//	 @Excel(name = "回访客户", orderNum = "2", mergeVertical = true, isImportField = "customerName")
	private String customerName;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getVisitTitle() {
		return visitTitle;
	}
	public void setVisitTitle(String visitTitle) {
		this.visitTitle = visitTitle;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getVisitDate() {
		return visitDate;
	}
	public void setVisitDate(String visitDate) {
		this.visitDate = visitDate;
	}
	public Integer getVisitType() {
		return visitType;
	}
	public void setVisitType(Integer visitType) {
		this.visitType = visitType;
	}
	public String getTrueName() {
		return trueName;
	}
	public void setTrueName(String trueName) {
		this.trueName = trueName;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	@Override
	public String toString() {
		return "VisitRecord [id=" + id + ", visitTitle=" + visitTitle + ", content=" + content + ", visitDate="
				+ visitDate + ", visitType=" + visitType + ", trueName=" + trueName + ", customerName=" + customerName
				+ "]";
	}
	
	
}
