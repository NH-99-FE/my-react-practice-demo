import { Button, Card, Descriptions } from 'antd'
import MyCard from '../../components/MyCard.tsx'
import api from '../../api'
import { useEffect, useState } from 'react'
import type { IReportData } from '../../types/api.ts'
import useStore from '../../store'
import { formatState } from '../../utils'
import { useCharts } from '../../hooks/useChart.ts'

const Dashboard = () => {
  const [report, setReport] = useState<IReportData>()
  const { userInfo } = useStore()
  const [lineRef, lineChart] = useCharts()
  const [pie1Ref, pie1Chart] = useCharts()
  const [pie2Ref, pie2Chart] = useCharts()
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    getReportData()
  }, [])

  useEffect(() => {
    getLineChart()
    getPie1Chart()
    getPie2Chart()
    getRadarChart()
  }, [lineChart, pie1Chart, radarChart])

  const getLineChart = async () => {
    const data = await api.getLineData()
    if (lineChart) {
      lineChart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['订单', '流水'],
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 20,
        },
        xAxis: {
          type: 'category',
          data: data.label,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '订单',
            data: data.order,
            type: 'line',
          },
          {
            name: '流水',
            data: data.money,
            type: 'line',
          },
        ],
      })
    }
  }

  const getPie1Chart = async () => {
    const data = await api.getPieCityData()
    if (pie1Chart) {
      pie1Chart.setOption({
        title: {
          text: '前端top分布',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '城市分布',
            type: 'pie',
            radius: '55%',
            data: data,
          },
        ],
      })
    }
  }
  const getPie2Chart = async () => {
    const data = await api.getPieAgeData()
    if (pie2Chart) {
      pie2Chart.setOption({
        title: {
          text: '后端top分布',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '城市分布',
            type: 'pie',
            radius: '55%',
            data: data,
          },
        ],
        roseType: 'area',
      })
    }
  }

  const getRadarChart = async () => {
    const data = await api.getRadarData()
    if (radarChart) {
      radarChart.setOption({
        legend: {
          data: ['程序员技术分析模型'],
          top: 'bottom',
        },
        radar: {
          indicator: data.indicator,
        },
        series: [
          {
            name: '程序员技术分析模型',
            type: 'radar',
            data: data.data,
          },
        ],
      })
    }
  }

  const renderLineChart = () => {
    getLineChart()
  }

  const renderPieChart = () => {
    getPie1Chart()
    getPie2Chart()
  }
  const renderRadarChart = () => {
    getRadarChart()
  }

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  return (
    <div className="rounded-md bg-white p-3 dark:bg-gray-800">
      <div className="flex items-center justify-center">
        <img
          src={userInfo.userImg || '/imgs/avatar.jpg'}
          className="mr-5 h-15 w-15 rounded-full"
          alt="avatar"
        />
        <Descriptions title="用户信息">
          <Descriptions.Item label="用户ID">{userInfo.userId}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label="状态">{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label="手机号">{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label="岗位">{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label="部门">{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="flex">
        <MyCard
          title="提交代码行数"
          content={`${report?.codeLine}行`}
          className="flex-1 bg-red-200"
        ></MyCard>
        <MyCard
          title="工资"
          content={`${report?.salary}元`}
          className="flex-1 bg-amber-100"
        ></MyCard>
        <MyCard
          title="完成需求"
          content={`${report?.icafeCount}个`}
          className="flex-1 bg-green-200"
        ></MyCard>
        <MyCard
          title="项目数量"
          content={`${report?.projectNum}行`}
          className="flex-1 bg-blue-300"
        ></MyCard>
      </div>
      <div className="p-2">
        <Card
          title="消费流水"
          extra={
            <Button type="primary" onClick={renderLineChart}>
              刷新
            </Button>
          }
          style={{ marginTop: 20 }}
        >
          <div ref={lineRef} className="h-72"></div>
        </Card>
        <Card
          title="程序员top6"
          extra={
            <Button type="primary" onClick={renderPieChart}>
              刷新
            </Button>
          }
          style={{ marginTop: 20 }}
        >
          <div className="flex h-64">
            <div ref={pie1Ref} className="h-64 flex-1"></div>
            <div ref={pie2Ref} className="h-64 flex-1"></div>
          </div>
        </Card>
        <Card
          title="技术分析"
          extra={
            <Button type="primary" onClick={renderRadarChart}>
              刷新
            </Button>
          }
          style={{ marginTop: 20 }}
        >
          <div ref={radarRef} className="h-80"></div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
