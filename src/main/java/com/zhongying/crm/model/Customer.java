package com.zhongying.crm.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Transient;

@Entity
public class Customer {
private Integer id;

private String customerName;//客户名称//1
private String customerCode;//客户编号//2
private String district;//省市//3
private String linkPersonName;//客户方担当者//4
private String linkPersonDuty;//客户方担当者职务//5
private String tel;//客户电话//6
private String address;//客户地址//7
private String fax;//客户传真//8
private String email;//客户Email//9
private String compayUrl;//公司URL//10
private String product;//公司产品//11
private String equipment;//现使用设备//12
private String technique;//加工工艺//13
private String deviceProblem;//设备问题//14
private String requirement;//机械要求//15
private String features;//计划特点//16
private String planDate;//预约日程//17
private String signDate;//签约日期//18
private String produceDate;//开始生产日期//19
private String deviceArriveDate;//设备达到日期//20
private Double budgetAmount;//预算金额//21
private Integer budgetStatus;//预算状态（:不充足，1:充足，2：未拨款)//22
private String modelName;//机型//23
private Integer num;//台数//24
private String otherDevice;//其他设备//25
private String workProcess;//加工工序//26
private String transport;//工件搬运//27
private String clamp;//夹具周边//28
private String cutter;//刀具//29
private String drawing;//工件图纸//30
private String sampleParts;//样件//31
private String scheme;//工艺方案//32
private String takt;//加工节拍//33
private String priceList;//报价单//34
private String remark;//代理点备注//35
private String expect;//预计//36
private Integer status;//审核状态//37
private Timestamp createTime;//申请时间//38
@Transient
private String truename;//数据库中要保存adminid//39
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public String getCustomerName() {
	return customerName;
}
public void setCustomerName(String customerName) {
	this.customerName = customerName;
}
public String getCustomerCode() {
	return customerCode;
}
public void setCustomerCode(String customerCode) {
	this.customerCode = customerCode;
}
public String getDistrict() {
	return district;
}
public void setDistrict(String district) {
	this.district = district;
}
public String getLinkPersonName() {
	return linkPersonName;
}
public void setLinkPersonName(String linkPersonName) {
	this.linkPersonName = linkPersonName;
}
public String getLinkPersonDuty() {
	return linkPersonDuty;
}
public void setLinkPersonDuty(String linkPersonDuty) {
	this.linkPersonDuty = linkPersonDuty;
}
public String getTel() {
	return tel;
}
public void setTel(String tel) {
	this.tel = tel;
}
public String getAddress() {
	return address;
}
public void setAddress(String address) {
	this.address = address;
}
public String getFax() {
	return fax;
}
public void setFax(String fax) {
	this.fax = fax;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getCompayUrl() {
	return compayUrl;
}
public void setCompayUrl(String compayUrl) {
	this.compayUrl = compayUrl;
}
public String getProduct() {
	return product;
}
public void setProduct(String product) {
	this.product = product;
}
public String getEquipment() {
	return equipment;
}
public void setEquipment(String equipment) {
	this.equipment = equipment;
}
public String getTechnique() {
	return technique;
}
public void setTechnique(String technique) {
	this.technique = technique;
}
public String getDeviceProblem() {
	return deviceProblem;
}
public void setDeviceProblem(String deviceProblem) {
	this.deviceProblem = deviceProblem;
}
public String getRequirement() {
	return requirement;
}
public void setRequirement(String requirement) {
	this.requirement = requirement;
}
public String getFeatures() {
	return features;
}
public void setFeatures(String features) {
	this.features = features;
}
public String getPlanDate() {
	return planDate;
}
public void setPlanDate(String planDate) {
	this.planDate = planDate;
}
public String getSignDate() {
	return signDate;
}
public void setSignDate(String signDate) {
	this.signDate = signDate;
}
public String getProduceDate() {
	return produceDate;
}
public void setProduceDate(String produceDate) {
	this.produceDate = produceDate;
}
public String getDeviceArriveDate() {
	return deviceArriveDate;
}
public void setDeviceArriveDate(String deviceArriveDate) {
	this.deviceArriveDate = deviceArriveDate;
}
public Double getBudgetAmount() {
	return budgetAmount;
}
public void setBudgetAmount(Double budgetAmount) {
	this.budgetAmount = budgetAmount;
}
public Integer getBudgetStatus() {
	return budgetStatus;
}
public void setBudgetStatus(Integer budgetStatus) {
	this.budgetStatus = budgetStatus;
}
public String getModelName() {
	return modelName;
}
public void setModelName(String modelName) {
	this.modelName = modelName;
}
public Integer getNum() {
	return num;
}
public void setNum(Integer num) {
	this.num = num;
}
public String getOtherDevice() {
	return otherDevice;
}
public void setOtherDevice(String otherDevice) {
	this.otherDevice = otherDevice;
}
public String getWorkProcess() {
	return workProcess;
}
public void setWorkProcess(String workProcess) {
	this.workProcess = workProcess;
}
public String getTransport() {
	return transport;
}
public void setTransport(String transport) {
	this.transport = transport;
}
public String getClamp() {
	return clamp;
}
public void setClamp(String clamp) {
	this.clamp = clamp;
}
public String getCutter() {
	return cutter;
}
public void setCutter(String cutter) {
	this.cutter = cutter;
}
public String getDrawing() {
	return drawing;
}
public void setDrawing(String drawing) {
	this.drawing = drawing;
}
public String getSampleParts() {
	return sampleParts;
}
public void setSampleParts(String sampleParts) {
	this.sampleParts = sampleParts;
}
public String getScheme() {
	return scheme;
}
public void setScheme(String scheme) {
	this.scheme = scheme;
}
public String getTakt() {
	return takt;
}
public void setTakt(String takt) {
	this.takt = takt;
}
public String getPriceList() {
	return priceList;
}
public void setPriceList(String priceList) {
	this.priceList = priceList;
}
public String getRemark() {
	return remark;
}
public void setRemark(String remark) {
	this.remark = remark;
}
public String getExpect() {
	return expect;
}
public void setExpect(String expect) {
	this.expect = expect;
}
public Integer getStatus() {
	return status;
}
public void setStatus(Integer status) {
	this.status = status;
}
public Timestamp getCreateTime() {
	return createTime;
}
public void setCreateTime(Timestamp createTime) {
	this.createTime = createTime;
}
public String getTruename() {
	return truename;
}
public void setTruename(String truename) {
	this.truename = truename;
}
@Override
public String toString() {
	return "Customer [id=" + id + ", customerName=" + customerName + ", customerCode=" + customerCode + ", district="
			+ district + ", linkPersonName=" + linkPersonName + ", linkPersonDuty=" + linkPersonDuty + ", tel=" + tel
			+ ", address=" + address + ", fax=" + fax + ", email=" + email + ", compayUrl=" + compayUrl + ", product="
			+ product + ", equipment=" + equipment + ", technique=" + technique + ", deviceProblem=" + deviceProblem
			+ ", requirement=" + requirement + ", features=" + features + ", planDate=" + planDate + ", signDate="
			+ signDate + ", produceDate=" + produceDate + ", deviceArriveDate=" + deviceArriveDate + ", budgetAmount="
			+ budgetAmount + ", budgetStatus=" + budgetStatus + ", modelName=" + modelName + ", num=" + num
			+ ", otherDevice=" + otherDevice + ", workProcess=" + workProcess + ", transport=" + transport + ", clamp="
			+ clamp + ", cutter=" + cutter + ", drawing=" + drawing + ", sampleParts=" + sampleParts + ", scheme="
			+ scheme + ", takt=" + takt + ", priceList=" + priceList + ", remark=" + remark + ", expect=" + expect
			+ ", status=" + status + ", createTime=" + createTime + ", truename=" + truename + "]";
}



}
