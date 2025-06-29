import { type RefObject, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core'

import { LineChart, PieChart, RadarChart } from 'echarts/charts'

import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LineChart,
  PieChart,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
export const useCharts = (): [
  RefObject<HTMLDivElement | null>,
  echarts.EChartsType | undefined,
] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()
  useEffect(() => {
    if (chartRef.current) {
      echarts.dispose(chartRef.current)
      const chartInstance = echarts.init(chartRef.current)
      setChartInstance(chartInstance)
    }
  }, [])

  return [chartRef, chartInstance]
}
