"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { stocksData, generateMockRevenueData, type Stock } from "@/data/stocks"

// 模拟数据 - 三商壽(2867)的月营收数据
const mockData = {
  近5年: [
    { month: "2019-01", revenue: 8500000, growthRate: 12.5 },
    { month: "2019-02", revenue: 9200000, growthRate: 8.2 },
    { month: "2019-03", revenue: 7800000, growthRate: -5.3 },
    { month: "2019-04", revenue: 8900000, growthRate: 15.7 },
    { month: "2019-05", revenue: 9500000, growthRate: 6.7 },
    { month: "2019-06", revenue: 10200000, growthRate: 7.4 },
    { month: "2019-07", revenue: 8700000, growthRate: -14.7 },
    { month: "2019-08", revenue: 9800000, growthRate: 12.6 },
    { month: "2019-09", revenue: 9100000, growthRate: -7.1 },
    { month: "2019-10", revenue: 8600000, growthRate: -5.5 },
    { month: "2019-11", revenue: 9300000, growthRate: 8.1 },
    { month: "2019-12", revenue: 10800000, growthRate: 16.1 },
    { month: "2020-01", revenue: 9200000, growthRate: 8.2 },
    { month: "2020-02", revenue: 8800000, growthRate: -4.3 },
    { month: "2020-03", revenue: 8200000, growthRate: 5.1 },
    { month: "2020-04", revenue: 7900000, growthRate: -11.2 },
    { month: "2020-05", revenue: 8500000, growthRate: -10.5 },
    { month: "2020-06", revenue: 9100000, growthRate: -10.8 },
    { month: "2020-07", revenue: 8300000, growthRate: -4.6 },
    { month: "2020-08", revenue: 9200000, growthRate: -6.1 },
    { month: "2020-09", revenue: 8900000, growthRate: -2.2 },
    { month: "2020-10", revenue: 8400000, growthRate: -2.3 },
    { month: "2020-11", revenue: 9000000, growthRate: -3.2 },
    { month: "2020-12", revenue: 10200000, growthRate: -5.6 },
    { month: "2021-01", revenue: 9800000, growthRate: 6.5 },
    { month: "2021-02", revenue: 9400000, growthRate: 6.8 },
    { month: "2021-03", revenue: 8900000, growthRate: 8.5 },
    { month: "2021-04", revenue: 8600000, growthRate: 8.9 },
    { month: "2021-05", revenue: 9200000, growthRate: 8.2 },
    { month: "2021-06", revenue: 9800000, growthRate: 7.7 },
    { month: "2021-07", revenue: 9100000, growthRate: 9.6 },
    { month: "2021-08", revenue: 10200000, growthRate: 10.9 },
    { month: "2021-09", revenue: 9700000, growthRate: 9.0 },
    { month: "2021-10", revenue: 9300000, growthRate: 10.7 },
    { month: "2021-11", revenue: 9900000, growthRate: 10.0 },
    { month: "2021-12", revenue: 11200000, growthRate: 9.8 },
    { month: "2022-01", revenue: 10500000, growthRate: 7.1 },
    { month: "2022-02", revenue: 10100000, growthRate: 7.4 },
    { month: "2022-03", revenue: 9600000, growthRate: 7.9 },
    { month: "2022-04", revenue: 9200000, growthRate: 7.0 },
    { month: "2022-05", revenue: 9800000, growthRate: 6.5 },
    { month: "2022-06", revenue: 10400000, growthRate: 6.1 },
    { month: "2022-07", revenue: 9700000, growthRate: 6.6 },
    { month: "2022-08", revenue: 10800000, growthRate: 5.9 },
    { month: "2022-09", revenue: 10300000, growthRate: 6.2 },
    { month: "2022-10", revenue: 9900000, growthRate: 6.5 },
    { month: "2022-11", revenue: 10500000, growthRate: 6.1 },
    { month: "2022-12", revenue: 11800000, growthRate: 5.4 },
    { month: "2023-01", revenue: 11200000, growthRate: 6.7 },
    { month: "2023-02", revenue: 10800000, growthRate: 6.9 },
    { month: "2023-03", revenue: 10300000, growthRate: 7.3 },
    { month: "2023-04", revenue: 9800000, growthRate: 6.5 },
    { month: "2023-05", revenue: 10400000, growthRate: 6.1 },
    { month: "2023-06", revenue: 11000000, growthRate: 5.8 },
    { month: "2023-07", revenue: 587040, growthRate: 53.65 },
    { month: "2023-08", revenue: 9991845, growthRate: -12.23 },
    { month: "2023-09", revenue: 9704224, growthRate: -0.52 },
    { month: "2023-10", revenue: 6431665, growthRate: -31.04 },
    { month: "2023-11", revenue: 8169564, growthRate: 5.18 },
    { month: "2023-12", revenue: 11548000, growthRate: 26.35 },
  ],
  近3年: [
    { month: "2021-01", revenue: 9800000, growthRate: 6.5 },
    { month: "2021-02", revenue: 9400000, growthRate: 6.8 },
    { month: "2021-03", revenue: 8900000, growthRate: 8.5 },
    { month: "2021-04", revenue: 8600000, growthRate: 8.9 },
    { month: "2021-05", revenue: 9200000, growthRate: 8.2 },
    { month: "2021-06", revenue: 9800000, growthRate: 7.7 },
    { month: "2021-07", revenue: 9100000, growthRate: 9.6 },
    { month: "2021-08", revenue: 10200000, growthRate: 10.9 },
    { month: "2021-09", revenue: 9700000, growthRate: 9.0 },
    { month: "2021-10", revenue: 9300000, growthRate: 10.7 },
    { month: "2021-11", revenue: 9900000, growthRate: 10.0 },
    { month: "2021-12", revenue: 11200000, growthRate: 9.8 },
    { month: "2022-01", revenue: 10500000, growthRate: 7.1 },
    { month: "2022-02", revenue: 10100000, growthRate: 7.4 },
    { month: "2022-03", revenue: 9600000, growthRate: 7.9 },
    { month: "2022-04", revenue: 9200000, growthRate: 7.0 },
    { month: "2022-05", revenue: 9800000, growthRate: 6.5 },
    { month: "2022-06", revenue: 10400000, growthRate: 6.1 },
    { month: "2022-07", revenue: 9700000, growthRate: 6.6 },
    { month: "2022-08", revenue: 10800000, growthRate: 5.9 },
    { month: "2022-09", revenue: 10300000, growthRate: 6.2 },
    { month: "2022-10", revenue: 9900000, growthRate: 6.5 },
    { month: "2022-11", revenue: 10500000, growthRate: 6.1 },
    { month: "2022-12", revenue: 11800000, growthRate: 5.4 },
    { month: "2023-01", revenue: 11200000, growthRate: 6.7 },
    { month: "2023-02", revenue: 10800000, growthRate: 6.9 },
    { month: "2023-03", revenue: 10300000, growthRate: 7.3 },
    { month: "2023-04", revenue: 9800000, growthRate: 6.5 },
    { month: "2023-05", revenue: 10400000, growthRate: 6.1 },
    { month: "2023-06", revenue: 11000000, growthRate: 5.8 },
    { month: "2023-07", revenue: 587040, growthRate: 53.65 },
    { month: "2023-08", revenue: 9991845, growthRate: -12.23 },
    { month: "2023-09", revenue: 9704224, growthRate: -0.52 },
    { month: "2023-10", revenue: 6431665, growthRate: -31.04 },
    { month: "2023-11", revenue: 8169564, growthRate: 5.18 },
    { month: "2023-12", revenue: 11548000, growthRate: 26.35 },
  ],
  近1年: [
    { month: "2023-01", revenue: 11200000, growthRate: 6.7 },
    { month: "2023-02", revenue: 10800000, growthRate: 6.9 },
    { month: "2023-03", revenue: 10300000, growthRate: 7.3 },
    { month: "2023-04", revenue: 9800000, growthRate: 6.5 },
    { month: "2023-05", revenue: 10400000, growthRate: 6.1 },
    { month: "2023-06", revenue: 11000000, growthRate: 5.8 },
    { month: "2023-07", revenue: 587040, growthRate: 53.65 },
    { month: "2023-08", revenue: 9991845, growthRate: -12.23 },
    { month: "2023-09", revenue: 9704224, growthRate: -0.52 },
    { month: "2023-10", revenue: 6431665, growthRate: -31.04 },
    { month: "2023-11", revenue: 8169564, growthRate: 5.18 },
    { month: "2023-12", revenue: 11548000, growthRate: 26.35 },
  ],
}

// 自定义Tooltip组件
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    console.log(JSON.stringify(payload))
    const revenueData = payload.find((p: any) => p.dataKey === "revenue")
    const growthData = payload.find((p: any) => p.dataKey === "growthRate")

    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl z-50">
        <p className="font-semibold text-gray-800 mb-2 border-b pb-1">{`${label}`}</p>
        {revenueData && (
          <p className="text-blue-600 font-medium flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-600 rounded-sm"></span>
            {`每月營收: ${revenueData.value?.toLocaleString()} 千元`}
          </p>
        )}
        {growthData && (
          <p
            className={`font-medium flex items-center gap-2 mt-1 ${
              growthData.value >= 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            <span className={`w-3 h-3 rounded-sm ${growthData.value >= 0 ? "bg-red-500" : "bg-green-500"}`}></span>
            {`年增率: ${growthData.value >= 0 ? "+" : ""}${growthData.value?.toFixed(2)}%`}
          </p>
        )}
      </div>
    )
  }
  return null
}

// 自定义图例组件
const CustomLegend = ({ payload, onLegendClick, activeLegends }: any) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-4">
      {payload?.map((entry: any, index: number) => {
        const isActive = activeLegends[entry.dataKey]
        return (
          <div
            key={index}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
              isActive ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => onLegendClick(entry.dataKey)}
          >
            <div
              className={`w-4 h-4 rounded-sm transition-all duration-200 ${
                isActive ? "" : "border-2 border-gray-400 bg-transparent"
              }`}
              style={{
                backgroundColor: isActive ? entry.color : "transparent",
                borderColor: isActive ? entry.color : "#9ca3af",
              }}
            />
            <span
              className={`text-sm font-medium transition-all duration-200 ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {entry.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function MonthlyRevenuePage() {
  const [timePeriod, setTimePeriod] = useState("近1年")
  const [searchQuery, setSearchQuery] = useState("三商壽(2867)")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedStock, setSelectedStock] = useState<Stock>(stocksData[0])
  const [currentMockData, setCurrentMockData] = useState(mockData)
  const [activeLegends, setActiveLegends] = useState({
    revenue: true,
    growthRate: true,
  })
  const tableRef = useRef<HTMLDivElement>(null)

  const filteredStocks = stocksData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.code.includes(searchQuery) ||
      stock.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const currentData = currentMockData[timePeriod as keyof typeof currentMockData] || []

  const handleLegendClick = (dataKey: string) => {
    if (dataKey !== "revenue" && dataKey !== "growthRate") return
    setActiveLegends((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }))
  }

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock)
    setSearchQuery(stock.fullName)
    setIsSearchFocused(false)

    // 如果是三商壽，使用原始数据，否则生成新数据
    if (stock.code === "2867") {
      setCurrentMockData(mockData)
    } else {
      setCurrentMockData(generateMockRevenueData(stock.code))
    }
  }

  // 滚动到表格最右侧（最新数据）
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollLeft = tableRef.current.scrollWidth
    }
  }, [timePeriod])

  // 格式化数字显示
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // 格式化增长率
  const formatGrowthRate = (rate: number) => {
    return rate.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="輸入台/美股代號,查看公司價值"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsSearchFocused(false), 200)
            }}
            className="pl-10 h-12 text-lg"
          />
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <div
                    key={stock.code}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">{stock.name}</span>
                        <span className="text-gray-500 ml-2">({stock.code})</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">找不到相關股票</div>
              )}
            </div>
          )}
        </div>

        {/* 股票信息 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">{selectedStock.fullName}</h1>
        </div>

        {/* 图表卡片 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">每月營收</CardTitle>
              <p className="text-sm text-gray-500 mt-1">千元 · 模擬資料展示</p>
            </div>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="近1年">近1年</SelectItem>
                <SelectItem value="近3年">近3年</SelectItem>
                <SelectItem value="近5年">近5年</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis
                    yAxisId="revenue"
                    orientation="left"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <YAxis
                    yAxisId="growth"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                    label={{ value: "股价", angle: 90, position: "insideRight" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                    animationDuration={200}
                    position={{ x: undefined, y: undefined }}
                  />
                  <Bar
                    yAxisId="revenue"
                    dataKey="revenue"
                    fill="#3b82f6"
                    name="每月營收"
                    opacity={0.8}
                    radius={[2, 2, 0, 0]}
                    hide={!activeLegends.revenue}
                  />
                  <Line
                    yAxisId="growth"
                    type="monotone"
                    dataKey="growthRate"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="單月營收年增率(%)"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2, fill: "#fff" }}
                    hide={!activeLegends.growthRate}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend
              payload={[
                { dataKey: "revenue", value: "每月營收", color: "#3b82f6" },
                { dataKey: "growthRate", value: "單月營收年增率(%)", color: "#ef4444" },
              ]}
              onLegendClick={handleLegendClick}
              activeLegends={activeLegends}
            />
          </CardContent>
        </Card>

        {/* 详细数据表格 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">詳細數據</CardTitle>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="近1年">近1年</SelectItem>
                <SelectItem value="近3年">近3年</SelectItem>
                <SelectItem value="近5年">近5年</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div ref={tableRef} className="overflow-x-auto" style={{ scrollBehavior: "smooth" }}>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-700 sticky left-0 bg-white border-r">
                      年度月份
                    </th>
                    {currentData.map((item, index) => (
                      <th key={index} className="text-center p-3 font-medium text-gray-700 min-w-32 border-r">
                        {item.month.replace("-", "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-700 sticky left-0 bg-white border-r">每月營收</td>
                    {currentData.map((item, index) => (
                      <td key={index} className="text-center p-3 border-r">
                        {formatNumber(item.revenue)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700 sticky left-0 bg-white border-r">單月營收年增率(%)</td>
                    {currentData.map((item, index) => (
                      <td
                        key={index}
                        className={`text-center p-3 border-r ${
                          item.growthRate >= 0 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {formatGrowthRate(item.growthRate)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>圖表單位:千元,數據來自公開資訊觀測站</p>
              <p>網頁圖表歡迎轉貼引用,請註明出處為財報狗</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
