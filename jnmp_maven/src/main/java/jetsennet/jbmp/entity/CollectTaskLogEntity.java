/**
 * 日 期：2012-6-6
 * 作 者: 何岳军
 * 版 本：v
 * 描 述: 采集日志实体类
 * 历 史：
 */
package jetsennet.jbmp.entity;

import java.io.Serializable;
import java.util.Date;

import jetsennet.jbmp.dataaccess.base.annotation.Column;
import jetsennet.jbmp.dataaccess.base.annotation.Id;
import jetsennet.jbmp.dataaccess.base.annotation.Table;

/**
 * @author ？
 */
@Table(name = "BMP_COLLECTTASKLOG")
public class CollectTaskLogEntity implements Cloneable, Serializable
{

    /**
     * 日志ID
     */
    @Id
    @Column(name = "LOG_ID")
    private int logId;

    /**
     * 任务ID
     */
    @Column(name = "TASK_ID")
    private int taskId;
    /**
     * 采集器ID
     */
    @Column(name = "COLL_ID")
    private int collId;
    /**
     * 采集组ID
     */
    @Column(name = "GROUP_ID")
    private int groupId;
    /**
     * 任务类型。1，单次；2，周期
     */
    @Column(name = "TASK_TYPE")
    private int taskType;
    /**
     * 采集类型。0：SNMP采集；1：SMS采集；2：CAS采集；3：PSI/SI采集；4：MHP采集；5：频道信息采集；6：EPG信息采集； 7：频谱信息采集；101：信道性能数据采集；102：星座图数据采集
     */
    @Column(name = "COLL_TYPE")
    private int collType;
    /**
     * 任务状态。0，停止；1，启动；2，完成。
     */
    @Column(name = "TASK_STATE")
    private int taskState;
    /**
     * 采集任务开始时间
     */
    @Column(name = "START_TIME")
    private Date startTime;
    /**
     * 采集任务结束时间
     */
    @Column(name = "END_TIME")
    private Date endTime;
    /**
     * 采集日期掩码
     */
    @Column(name = "WEEK_MASK")
    private String weekMask;
    /**
     * 采集时间掩码
     */
    @Column(name = "HOUR_MASK")
    private String hourMask;
    /**
     * 创建用户
     */
    @Column(name = "CREATE_USER")
    private String createUser;
    /**
     * 创建时间
     */
    @Column(name = "CREATE_TIME")
    private Date createTime;

    /**
     * 保留字段：存放采集时间
     */
    @Column(name = "FIELD_1")
    private String field1;

    /**
     * 最后采集时间
     */
    @Column(name = "LAST_TIME")
    private Date lastTime;

    /**
     * 采集失败原因。
     */
    @Column(name = "FAILURE_INFO")
    private String failureInfo;

    /**
     * 采集任务对应的监控对象
     */
    private transient MObjectEntity mo;
    /**
     * 采集任务时间间隔
     */
    private int collTimespan;
    /**
     * 单次采集
     */
    public static final int TASK_TYPE_SINGLE = 2;
    /**
     * 周期采集
     */
    public static final int TASK_TYPE_PERIOD = 1;
    /**
     * 成功
     */
    public static final int TASK_STATE_SUCCESS = 0;
    /**
     * 执行中
     */
    public static final int TASK_STATE_RUNNING = 1;
    /**
     * 失败
     */
    public static final int TASK_STATE_FAILURE = 2;

    public static final int COLL_TYPE_SNMP = 0;
    public static final int COLL_TYPE_SMS = 1;
    public static final int COLL_TYPE_CAS = 2;
    public static final int COLL_TYPE_PSISI = 3;
    public static final int COLL_TYPE_MHP = 4;
    public static final int COLL_TYPE_CHANNEL = 5;
    public static final int COLL_TYPE_EPG = 6;
    public static final int COLL_TYPE_FREQ = 7;
    public static final int COLL_TYPE_CHAIN = 101;
    public static final int COLL_TYPE_PLAN = 102;

    /**
     * 构造方法
     */
    public CollectTaskLogEntity()
    {
    }

    /**
     * @return the taskId
     */
    public int getTaskId()
    {
        return taskId;
    }

    /**
     * @param taskId the taskId to set
     */
    public void setTaskId(int taskId)
    {
        this.taskId = taskId;
    }

    /**
     * @return the collId
     */
    public int getCollId()
    {
        return collId;
    }

    /**
     * @param collId the collId to set
     */
    public void setCollId(int collId)
    {
        this.collId = collId;
    }

    public int getGroupId()
    {
        return groupId;
    }

    public void setGroupId(int groupId)
    {
        this.groupId = groupId;
    }

    /**
     * @return the taskType
     */
    public int getTaskType()
    {
        return taskType;
    }

    /**
     * @param taskType the taskType to set
     */
    public void setTaskType(int taskType)
    {
        this.taskType = taskType;
    }

    /**
     * @return the taskState
     */
    public int getTaskState()
    {
        return taskState;
    }

    /**
     * @param taskState the taskState to set
     */
    public void setTaskState(int taskState)
    {
        this.taskState = taskState;
    }

    /**
     * @return the startTime
     */
    public Date getStartTime()
    {
        return startTime;
    }

    /**
     * @param startTime the startTime to set
     */
    public void setStartTime(Date startTime)
    {
        this.startTime = startTime;
    }

    /**
     * @return the endTime
     */
    public Date getEndTime()
    {
        return endTime;
    }

    /**
     * @param endTime the endTime to set
     */
    public void setEndTime(Date endTime)
    {
        this.endTime = endTime;
    }

    /**
     * @return the weekMask
     */
    public String getWeekMask()
    {
        return weekMask;
    }

    /**
     * @param weekMask the weekMask to set
     */
    public void setWeekMask(String weekMask)
    {
        this.weekMask = weekMask;
    }

    /**
     * @return the hourMask
     */
    public String getHourMask()
    {
        return hourMask;
    }

    /**
     * @param hourMask the hourMask to set
     */
    public void setHourMask(String hourMask)
    {
        this.hourMask = hourMask;
    }

    /**
     * @return the createUser
     */
    public String getCreateUser()
    {
        return createUser;
    }

    /**
     * @param createUser the createUser to set
     */
    public void setCreateUser(String createUser)
    {
        this.createUser = createUser;
    }

    /**
     * @return the field1
     */
    public String getField1()
    {
        return field1;
    }

    /**
     * @param field1 the field1 to set
     */
    public void setField1(String field1)
    {
        this.field1 = field1;
    }

    /**
     * @return the lastTime
     */
    public Date getLastTime()
    {
        return lastTime;
    }

    /**
     * @param lastTime the lastTime to set
     */
    public void setLastTime(Date lastTime)
    {
        this.lastTime = lastTime;
    }

    /**
     * @return the createTime
     */
    public Date getCreateTime()
    {
        return createTime;
    }

    /**
     * @param createTime the createTime to set
     */
    public void setCreateTime(Date createTime)
    {
        this.createTime = createTime;
    }

    /**
     * @return the collType
     */
    public int getCollType()
    {
        return collType;
    }

    /**
     * @param collType the collType to set
     */
    public void setCollType(int collType)
    {
        this.collType = collType;
    }

    /**
     * @return the mo
     */
    public MObjectEntity getMo()
    {
        return mo;
    }

    /**
     * @param mo the mo to set
     */
    public void setMo(MObjectEntity mo)
    {
        this.mo = mo;
    }

    /**
     * @return the collTimespan
     */
    public int getCollTimespan()
    {
        return collTimespan;
    }

    /**
     * @param collTimespan the collTimespan to set
     */
    public void setCollTimespan(int collTimespan)
    {
        this.collTimespan = collTimespan;
    }

    public String getFailureInfo()
    {
        return failureInfo;
    }

    public void setFailureInfo(String failureInfo)
    {
        this.failureInfo = failureInfo;
    }

    
    
    public int getLogId() {
		return logId;
	}

	public void setLogId(int logId) {
		this.logId = logId;
	}

	@Override
    public CollectTaskLogEntity clone()
    {
        try
        {
            return (CollectTaskLogEntity) super.clone();
        }
        catch (CloneNotSupportedException e)
        {
            return null;
        }
    }
}
